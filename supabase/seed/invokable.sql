CREATE OR REPLACE FUNCTION unsubscribe_user(token TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_email TEXT;
BEGIN
  -- Attempt to update the user where hash = token_input
  UPDATE users
  SET email_notifications_enabled = FALSE
  WHERE hash = token
  RETURNING email INTO user_email;

  -- If no user was updated, return NULL
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Return the user's email if update was successful
  RETURN user_email;
END;
$$;