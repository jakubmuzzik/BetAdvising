import Stripe from "https://esm.sh/stripe@17.1.0?target=deno";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  httpClient: Stripe.createFetchHttpClient()
});
// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider()

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

Deno.serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature')

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = await request.text()
  let receivedEvent
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider
    )

    console.log('🔔 Event received', receivedEvent.id)
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return new Response(err.message, { status: 400 })
  }

  try {
    const paymentIntent = receivedEvent.data.object
    console.log('PaymentIntent: ', paymentIntent)

    if (receivedEvent.type === 'payment_intent.succeeded') {
      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log('💰 Payment captured!');

      await supabaseAdmin
        .from("payment_intents")
        .insert({ 
          id: paymentIntent.id, 
          user: paymentIntent.metadata.userId,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          credits: paymentIntent.metadata.credits,
          package_id: paymentIntent.metadata.packageId,
          status: 'succeeded'
        })
        .throwOnError();
    }
  } catch(e) {
    console.error('Error processing webhook event: ', e)
    return new Response(e.message, { status: 500 })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
})