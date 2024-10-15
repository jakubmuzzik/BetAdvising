ALTER TABLE unlocked_tickets
ADD CONSTRAINT pk_unlocked_tickets PRIMARY KEY (ticket, "user");

CREATE OR REPLACE FUNCTION private.handle_unlocked_tickets_after_insert()
  RETURNS TRIGGER AS $$
  DECLARE
  user_credits numeric;  -- Declare variable to hold user's credits
  ticket_price numeric;  -- Declare variable to hold ticket's price
BEGIN
 -- Get the user's credits from the users table
  SELECT amount INTO user_credits
  FROM credits
  WHERE id = new.user;

  -- Get the ticket price from the tickets table
  SELECT price INTO ticket_price
  FROM tickets
  WHERE id = NEW.ticket;

   -- Check if user's credits are less than the ticket price
  IF user_credits < ticket_price THEN
    RAISE EXCEPTION 'User does not have enough credits. Required: %, Available: %', ticket_price, user_credits;
   ELSE
    -- Subtract the ticket price from the user's credits
    UPDATE credits
    SET amount = amount - ticket_price
    WHERE id = NEW."user";
  END IF;

  INSERT INTO credit_transactions ("user", transaction_type, amount, ticket)
  VALUES (NEW."user", 'ticket_unlock', ticket_price, NEW.ticket);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

create trigger unlocked_tickets_after_insert
  after insert on unlocked_tickets
  for each row execute function private.handle_unlocked_tickets_after_insert();