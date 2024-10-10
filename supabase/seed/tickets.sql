CREATE SEQUENCE IF NOT EXISTS ticket_name
    INCREMENT BY 1 
    NO MAXVALUE
    START WITH 1
    CYCLE;

ALTER TABLE tickets 
ADD COLUMN name TEXT DEFAULT NEXTVAL('ticket_name')::TEXT;

CREATE OR REPLACE FUNCTION private.handle_tickets_after_update()
  RETURNS TRIGGER AS $$
BEGIN
  IF NEW.result = 'win' AND NEW.result != OLD.result THEN
    INSERT INTO notifications ("user", type, ticket)
    SELECT "user", 
           'ticket_success',
           NEW.id
    FROM unlocked_tickets
    WHERE unlocked_tickets.ticket = NEW.id;
  END IF;

   IF NEW.result = 'lose' AND NEW.result != OLD.result THEN
    INSERT INTO notifications ("user", type, ticket)
    SELECT "user", 
           'credit_returned',
           NEW.id
    FROM unlocked_tickets
    WHERE unlocked_tickets.ticket = NEW.id;

    -- Refund the user's credits
    UPDATE users
    SET credits = credits + NEW.price
    WHERE id = (SELECT "user" FROM unlocked_tickets WHERE ticket = NEW.id);
    
    -- Insert refund credit transactions entry
    INSERT INTO credit_transactions ("user", transaction_type, amount, ticket)
    SELECT "user", 
           'failed_ticket_refund',
           NEW.price,
           NEW.id
    FROM unlocked_tickets
    WHERE unlocked_tickets.ticket = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

create trigger tickets_after_update
  after update on tickets
  for each row execute function private.handle_tickets_after_update();