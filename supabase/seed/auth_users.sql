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

    INSERT INTO public.credits (id, amount)
    VALUES (new.id::uuid, 0);
  END IF;

  /**
  * User Phone was confirmed
  * -> Add 100 credits to the user credit's record
  */
   IF (
    OLD.phone_confirmed_at IS NULL AND NEW.phone_confirmed_at IS NOT NULL
  ) THEN
    UPDATE public.credits
    SET amount = amount + 100
    WHERE id = NEW.id::uuid;
  END IF;

   /**
   * Phone number was updated
   */
  IF (
    OLD.phone IS DISTINCT FROM NEW.phone
  ) THEN
    UPDATE public.users
    SET phone = NEW.phone
    WHERE id = NEW.id::uuid;
  END IF;

  RETURN NEW;
end;
$$;

CREATE TRIGGER users_after_update
  after update on auth.users
  for each row execute procedure public.handle_auth_users_after_update();