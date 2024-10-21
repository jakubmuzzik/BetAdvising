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

CREATE OR REPLACE FUNCTION count_users_by_phone()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_count INTEGER;
BEGIN
    -- Query to count the number of users with the given phone number
    SELECT COUNT(*) INTO user_count
    FROM verified_phone_numbers
    WHERE phone = p_phone;

    -- Return the count of users
    RETURN user_count;
END;
$$;