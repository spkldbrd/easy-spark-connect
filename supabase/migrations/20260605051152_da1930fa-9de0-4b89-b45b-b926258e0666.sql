DROP POLICY IF EXISTS "Public can insert not_found_logs" ON public.not_found_logs;

CREATE POLICY "Public can insert not_found_logs"
ON public.not_found_logs
FOR INSERT
TO public
WITH CHECK (
  length(path) > 0
  AND length(path) <= 2048
  AND (referrer IS NULL OR length(referrer) <= 2048)
  AND (user_agent IS NULL OR length(user_agent) <= 1024)
);