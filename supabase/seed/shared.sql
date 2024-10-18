CREATE OR REPLACE FUNCTION private.get_hmac(message text, secret_name text) 
RETURNS varchar
AS $$
  -- Generate HMAC using pgcrypto's hmac function and encode the result to hex
  SELECT ENCODE(
    HMAC(
      message, 
      (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = secret_name), 
      'sha256' -- explicitly specify the algorithm as text
    ),
    'hex'
  );
$$ LANGUAGE sql security definer set search_path = 'extensions';

CREATE EXTENSION IF NOT EXISTS "pgcrypto" SCHEMA private;