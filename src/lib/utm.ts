/**
 * Lightweight UTM capture.
 *
 * Values are read from the landing URL and persisted for the whole visit so a
 * visitor can browse other pages before submitting the contact form. Empty
 * values never overwrite previously captured ones.
 */

export type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

const UTM_KEYS: (keyof UtmParams)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

const STORAGE_KEY = 'hb_utm';

const empty = (): UtmParams => ({
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
});

const read = (): UtmParams => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<UtmParams>;
    const out = empty();
    UTM_KEYS.forEach(key => {
      const value = parsed[key];
      if (typeof value === 'string') out[key] = value.slice(0, 200);
    });
    return out;
  } catch {
    return empty();
  }
};

/** Merge any UTM params found in the current URL into the stored set. */
export const captureUtmParams = (): UtmParams => {
  if (typeof window === 'undefined') return empty();

  const stored = read();
  try {
    const search = new URLSearchParams(window.location.search);
    let changed = false;
    UTM_KEYS.forEach(key => {
      const value = (search.get(key) ?? '').trim();
      // Only non-empty values are written, so navigating without params keeps them.
      if (value) {
        stored[key] = value.slice(0, 200);
        changed = true;
      }
    });
    if (changed) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* storage unavailable — fall back to whatever we already have */
  }
  return stored;
};

export const getUtmParams = (): UtmParams => {
  if (typeof window === 'undefined') return empty();
  return read();
};
