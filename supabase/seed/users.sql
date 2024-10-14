CREATE OR REPLACE FUNCTION private.handle_users_before_update()
  RETURNS TRIGGER AS $$
BEGIN
  IF NEW.credits != OLD.credits AND coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' ->> 'userrole', '') != 'ADMIN' THEN
    RAISE EXCEPTION 'You are not allowed to update credits';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER set search_path = 'auth';

CREATE TRIGGER users_before_update
  before update on users
  for each row execute procedure private.handle_users_before_update();