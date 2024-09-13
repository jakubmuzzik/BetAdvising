CREATE OR REPLACE FUNCTION private.handle_auth_users_after_update()
returns trigger 
language plpgsql
security definer set search_path = ''
as $$
begin
  /*
  * User Profile was completed
  * -> Insert user data
  */
  IF (
    OLD.raw_user_meta_data ->> 'profile_completed' IS NULL AND (NEW.raw_user_meta_data ->> 'profile_completed')::boolean = true
  ) THEN
    INSERT INTO public.users (id, name, email, email_notifications_enabled)
    VALUES (new.id::uuid, new.raw_user_meta_data->>'name', new.email, (NEW.raw_user_meta_data ->> 'email_notifications_enabled')::boolean);
  END IF;

  RETURN NEW;
end;
$$;

CREATE TRIGGER users_after_update
  after update on auth.users
  for each row execute procedure public.handle_auth_users_after_update();