import Stripe from "stripe";
import { readFileSync } from "fs";
import { resolve } from "path";

// Read STRIPE_SECRET_KEY from .env.local
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf8");
const match = envContent.match(/STRIPE_SECRET_KEY="([^"]+)"/);
if (!match) {
  console.error("STRIPE_SECRET_KEY not found in .env.local");
  process.exit(1);
}

const stripe = new Stripe(match[1]);

const plans = [
  {
    key: "starter",
    name: "Starter Package",
    description: "Initial site consultation, feasibility report, basic cost estimate, 1 revision, email support.",
    amount: 29900,
  },
  {
    key: "professional",
    name: "Professional Package",
    description: "Full project management, dedicated site supervisor, weekly progress reports, 3 design revisions, priority phone support.",
    amount: 99900,
  },
  {
    key: "enterprise",
    name: "Enterprise Package",
    description: "End-to-end project delivery, dedicated account manager, daily updates, unlimited revisions, 24/7 support, post-build warranty.",
    amount: 249900,
  },
];

console.log("Creating Stripe products and prices...\n");

const results = {};

for (const plan of plans) {
  // Create product
  const product = await stripe.products.create({
    name: plan.name,
    description: plan.description,
    metadata: { plan_key: plan.key },
  });

  // Create one-time price
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: plan.amount,
    currency: "usd",
    metadata: { plan_key: plan.key },
  });

  results[plan.key] = { productId: product.id, priceId: price.id, amount: plan.amount / 100 };
  console.log(`✓ ${plan.name}`);
  console.log(`  Product: ${product.id}`);
  console.log(`  Price:   ${price.id}  ($${plan.amount / 100})\n`);
}

console.log("Add these to your .env.local:");
console.log(`STRIPE_PRICE_STARTER="${results.starter.priceId}"`);
console.log(`STRIPE_PRICE_PROFESSIONAL="${results.professional.priceId}"`);
console.log(`STRIPE_PRICE_ENTERPRISE="${results.enterprise.priceId}"`);
