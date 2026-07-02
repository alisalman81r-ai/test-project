import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia" as const,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const PRICE_IDS: Record<string, string> = {
  starter:      process.env.STRIPE_PRICE_STARTER!,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL!,
  enterprise:   process.env.STRIPE_PRICE_ENTERPRISE!,
};

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();

    const priceId = PRICE_IDS[planId];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${BASE_URL}/pricing/success?session_id={CHECKOUT_SESSION_ID}&plan=${planId}`,
      cancel_url:  `${BASE_URL}/pricing?cancelled=true`,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
