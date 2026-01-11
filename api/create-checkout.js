import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

export default async function handler(req, res) {
  const { cart, userId } = req.body;

  const line_items = cart.map(p => ({
    price_data: {
      currency: "thb",
      product_data: { name: p.title },
      unit_amount: p.price * 100
    },
    quantity: 1
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "promptpay"],
    mode: "payment",
    line_items,
    success_url: "https://manbag.vercel.app/success.html",
    cancel_url: "https://manbag.vercel.app/cancel.html",
    metadata: {
      user_id: userId,
      products: JSON.stringify(cart.map(p => p.id))
    }
  });

  res.json({ url: session.url });
}
