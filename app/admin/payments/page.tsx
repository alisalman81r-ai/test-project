import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import PaymentsDashboard from "./PaymentsDashboard";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia" as const,
});

const PLAN_LABELS: Record<string, string> = {
  starter:      "Starter",
  professional: "Professional",
  enterprise:   "Enterprise",
};

export default async function PaymentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // Fetch up to 100 checkout sessions from Stripe
  const stripeSessions = await stripe.checkout.sessions.list({
    limit: 100,
    expand: ["data.payment_intent"],
  });

  const payments = stripeSessions.data.map((s) => {
    const pi = s.payment_intent as Stripe.PaymentIntent | null;
    return {
      id:          s.id,
      customerName: s.metadata?.customer_name || s.customer_details?.name || "—",
      email:        s.customer_details?.email || s.customer_email || "—",
      plan:         PLAN_LABELS[s.metadata?.plan ?? ""] || s.metadata?.plan || "—",
      amount:       s.amount_total ? s.amount_total / 100 : 0,
      currency:     s.currency?.toUpperCase() || "USD",
      status:       s.payment_status,
      paymentStatus: pi?.status || s.payment_status,
      createdAt:    new Date(s.created * 1000).toISOString(),
      stripeUrl:    `https://dashboard.stripe.com/test/payments/${typeof s.payment_intent === "string" ? s.payment_intent : pi?.id ?? ""}`,
    };
  });

  const stats = {
    total:     payments.length,
    paid:      payments.filter((p) => p.status === "paid").length,
    unpaid:    payments.filter((p) => p.status === "unpaid").length,
    revenue:   payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
  };

  return <PaymentsDashboard payments={payments} stats={stats} />;
}
