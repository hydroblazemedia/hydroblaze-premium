
-- Documents table: restrict SELECT
DROP POLICY IF EXISTS "documents select" ON public.documents;
CREATE POLICY "documents select" ON public.documents FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  OR public.has_role(auth.uid(), 'manager'::public.app_role)
  OR uploaded_by = auth.uid()
);

-- Activity log: restrict SELECT
DROP POLICY IF EXISTS "activity_read" ON public.activity_log;
CREATE POLICY "activity_read" ON public.activity_log FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  OR public.has_role(auth.uid(), 'manager'::public.app_role)
  OR actor_id = auth.uid()
);

-- Storage: docs bucket read (non-task-attachments)
DROP POLICY IF EXISTS "docs read" ON storage.objects;
CREATE POLICY "docs read" ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] IS DISTINCT FROM 'task-attachments'
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'manager'::public.app_role)
    OR EXISTS (
      SELECT 1 FROM public.documents d
      WHERE d.storage_path = storage.objects.name AND d.uploaded_by = auth.uid()
    )
  )
);

-- Storage: task attachments - verify task ownership via path task-attachments/<task_id>/<file>
DROP POLICY IF EXISTS "task attachments read" ON storage.objects;
DROP POLICY IF EXISTS "task attachments write" ON storage.objects;
DROP POLICY IF EXISTS "task attachments delete" ON storage.objects;

CREATE POLICY "task attachments read" ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = 'task-attachments'
  AND EXISTS (
    SELECT 1 FROM public.tasks t
    WHERE t.id::text = (storage.foldername(name))[2]
      AND (
        public.has_role(auth.uid(), 'admin'::public.app_role)
        OR t.assignee_id = auth.uid()
        OR t.created_by = auth.uid()
      )
  )
);

CREATE POLICY "task attachments write" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = 'task-attachments'
  AND EXISTS (
    SELECT 1 FROM public.tasks t
    WHERE t.id::text = (storage.foldername(name))[2]
      AND (
        public.has_role(auth.uid(), 'admin'::public.app_role)
        OR t.assignee_id = auth.uid()
        OR t.created_by = auth.uid()
      )
  )
);

CREATE POLICY "task attachments delete" ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = 'task-attachments'
  AND EXISTS (
    SELECT 1 FROM public.tasks t
    WHERE t.id::text = (storage.foldername(name))[2]
      AND (
        public.has_role(auth.uid(), 'admin'::public.app_role)
        OR t.assignee_id = auth.uid()
        OR t.created_by = auth.uid()
      )
  )
);

-- Remove zero-admin bootstrap in signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  invited_role public.app_role;
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = now();

  SELECT role INTO invited_role
  FROM public.invites
  WHERE lower(email) = lower(NEW.email) AND accepted_at IS NULL
  ORDER BY created_at DESC LIMIT 1;

  IF invited_role IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, invited_role)
    ON CONFLICT DO NOTHING;
    UPDATE public.invites SET accepted_at = now(), accepted_by = NEW.id
    WHERE lower(email) = lower(NEW.email) AND accepted_at IS NULL;
  END IF;

  RETURN NEW;
END;
$function$;

-- Revoke EXECUTE on SECURITY DEFINER helpers where not needed
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_invite_by_token(text) FROM PUBLIC, authenticated;
GRANT EXECUTE ON FUNCTION public.get_invite_by_token(text) TO anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
