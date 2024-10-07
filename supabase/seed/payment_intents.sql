CREATE OR REPLACE FUNCTION private.handle_payment_intents_after_insert()
  RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'succeeded' THEN
    INSERT INTO credit_transactions ("user", transaction_type, amount, payment_intent)
    VALUES (NEW."user", 'purchase', NEW.credits, NEW.id);

    UPDATE users
    SET credits = credits + NEW.credits
    WHERE id = NEW."user";
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

create trigger payment_intents_after_insert
  after insert on payment_intents
  for each row execute function private.handle_payment_intents_after_insert();