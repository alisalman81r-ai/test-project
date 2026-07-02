import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia" as const,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Plan definitions — price_id comes from your Stripe dashboard
// For test mode, create products in Stripe and paste the price IDs here.
const PLANS: Record<string, { name: string; priceId: string; amount: number }> = {
  starter: {
    name: "Starter Package",
    priceId: process.env.STRIPE_PRICE_STARTER || "price_starter_test",
    amount: 29900, // $299 in cents
  },
  professional: {
    name: "Professional Package",
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL || "price_professional_test",
    amount: 99900, // $999 in cents
  },
  enterprise: {
    name: "Enterprise Package",
    priceId: process.env.STRIPE_PRICE_ENTERPRISE || "price_enterprise_test",
    amount: 249900, // $2499 in cents
  },
};

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();

    const plan = PLANS[planId];
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: plan.name },
            unit_amount: plan.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${BASE_URL}/pricing/success?session_id={CHECKOUT_SESSION_ID}&plan=${planId}`,
      cancel_url: `${BASE_URL}/pricing?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
