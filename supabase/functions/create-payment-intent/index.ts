
import Stripe from "https://esm.sh/stripe?target=deno";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  httpClient: Stripe.createFetchHttpClient()
});

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

const createOrRetrieveCustomer = async (authHeader: string) => {
  // Get JWT from auth header
  const jwt = authHeader.replace("Bearer ", "");
  // Get the user object
  const {
    data: { user },
  } = await supabaseAdmin.auth.getUser(jwt);
  if (!user) throw new Error("No user found for JWT!");

  // Check if the user already has a Stripe customer ID in the Database.
  const { data, error } = await supabaseAdmin
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("id", user?.id);
  console.log(data?.length, data, error);
  if (error) throw error;
  if (data?.length === 1) {
    // Exactly one customer found, return it.
    const customer = data[0].stripe_customer_id;
    console.log(`Found customer id: ${customer}`);
    return customer;
  }
  if (data?.length === 0) {
    // Create customer object in Stripe.
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { uid: user.id },
    });
    console.log(`New customer "${customer.id}" created for user "${user.id}"`);
    // Insert new customer into DB
    await supabaseAdmin
      .from("stripe_customers")
      .insert({ id: user.id, stripe_customer_id: customer.id })
      .throwOnError();
    return customer.id;
  } else throw new Error(`Unexpected count of customer rows: ${data?.length}`);
}

Deno.serve(async (req) => {
   // This is needed if you're planning to invoke your function from a browser.
   if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

  try {
    const { packageId } = await req.json();

    if (!packageId) {
      return new Response(
        JSON.stringify({ error: "Missing packageId" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const { data: packageDate, error: packageRetrieveError } = await supabaseAdmin
      .from("packages")
      .select("price, credits")
      .eq("id", packageId)
      .single();

    if (packageRetrieveError) {
      console.error(packageRetrieveError);
      return new Response(
        JSON.stringify({ error: packageRetrieveError }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    } else if (!packageDate) {
      console.error("Selected package was not found.");
      return new Response(
        JSON.stringify({ error: "Selected package was not found." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    const authHeader = req.headers.get("Authorization")!;

    const customer = await createOrRetrieveCustomer(authHeader);
  
    const publishableKey = Deno.env.get("STRIPE_PUBLISHABLE_KEY") ?? "";
  
    if (!publishableKey) {
      throw new Error("Missing STRIPE_PUBLISHABLE_KEY in .env");
    }
  
    const data = await stripe.paymentIntents.create({
      amount: packageDate.price * 100,
      currency: "czk",
      customer,
      automatic_payment_methods: { enabled: true },
      metadata: { 
        packageId, 
        credits: packageDate.credits,
        userId: customer
      },
    });

    const res = {
      publishableKey,
      clientSecret: data.client_secret,
    };
  
    return new Response(JSON.stringify(res), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
  
})
