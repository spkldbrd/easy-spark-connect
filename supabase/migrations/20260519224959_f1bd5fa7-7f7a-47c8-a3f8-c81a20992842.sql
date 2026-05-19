
CREATE TABLE public.redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text NOT NULL UNIQUE,
  to_path text NOT NULL,
  status_code integer NOT NULL DEFAULT 301,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.not_found_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_not_found_logs_path ON public.not_found_logs(path);
CREATE INDEX idx_not_found_logs_created_at ON public.not_found_logs(created_at DESC);

ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.not_found_logs ENABLE ROW LEVEL SECURITY;

-- Anyone can read redirects (needed for client-side 404 lookup)
CREATE POLICY "Public can read redirects"
  ON public.redirects FOR SELECT
  USING (true);

-- Anyone can insert a 404 log (so visitors hitting 404s get recorded)
CREATE POLICY "Public can insert not_found_logs"
  ON public.not_found_logs FOR INSERT
  WITH CHECK (true);
