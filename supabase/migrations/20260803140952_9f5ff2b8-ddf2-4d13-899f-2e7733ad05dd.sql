DROP POLICY IF EXISTS "Public read blog-images" ON storage.objects;

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());