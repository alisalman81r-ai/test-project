"use client";

import { useState } from "react";
import { ExternalLink, TrendingUp, CheckCircle2, Clock, Search } from "lucide-react";

type Payment = {
  id: string;
  customerName: string;
  email: string;
  plan: string;
  amount: number;
  currency: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  stripeUrl: string;
};

type Stats = {
  total: number;
  paid: number;
  unpaid: number;
  revenue: number;
};

function StatusBadge({ status }: { status: string }) {
  if (status === "paid" || status === "succeeded") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Paid
      </span>
    );
  }
  if (status === "unpaid") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Unpaid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/8 text-white/50 border border-white/10">
      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
      {status}
    </span>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const colors: Record<string, string> = {
    Starter:      "bg-blue-500/15 text-blue-400 border-blue-500/20",
    Professional: "bg-[#ffb274]/15 text-[#ffb274] border-[#ffb274]/20",
    Enterprise:   "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  };
  const cls = colors[plan] || "bg-white/8 text-white/50 border-white/10";
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      {plan}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PaymentsDashboard({
  payments,
  stats,
}: {
  payments: Payment[];
  stats: Stats;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "unpaid">("all");

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.customerName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.plan.toLowerCase().includes(q);
    const matchStatus =
      filterStatus === "all" ||
      p.status === filterStatus ||
      p.paymentStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#07100f] text-[#f7f4ee]">
      {/* Header */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-white/8"
        style={{ background: "rgba(7,16,15,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div>
          <h1 className="text-lg font-bold text-white/90">Payments</h1>
          <p className="text-xs text-white/40 mt-0.5">Stripe checkout sessions</p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Revenue */}
          <div
            className="rounded-2xl p-5 border border-[#ffb274]/14 flex items-center gap-4"
            style={{ background: "rgba(14,19,16,0.92)" }}
          >
            <div className="w-11 h-11 rounded-xl bg-[#ffb274]/15 flex items-center justify-center shrink-0">
              <TrendingUp size={20} className="text-[#ffb274]" />
            </div>
            <div>
              <p className="text-xs text-white/45 mb-0.5">Total Revenue</p>
              <p className="text-2xl font-bold text-[#ffb274]">
                {formatCurrency(stats.revenue)}
              </p>
            </div>
          </div>

          {/* Paid */}
          <div
            className="rounded-2xl p-5 border border-white/8 flex items-center gap-4"
            style={{ background: "rgba(14,19,16,0.92)" }}
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-white/45 mb-0.5">Paid</p>
              <p className="text-2xl font-bold text-emerald-400">{stats.paid}</p>
            </div>
          </div>

          {/* Pending */}
          <div
            className="rounded-2xl p-5 border border-white/8 flex items-center gap-4"
            style={{ background: "rgba(14,19,16,0.92)" }}
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <Clock size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-white/45 mb-0.5">Unpaid / Pending</p>
              <p className="text-2xl font-bold text-amber-400">{stats.unpaid}</p>
            </div>
          </div>
        </div>

        {/* Table card */}
        <div
          className="rounded-2xl border border-white/8 overflow-hidden"
          style={{ background: "rgba(14,19,16,0.92)" }}
        >
          {/* Table toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 border-b border-white/8">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, plan…"
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-white/6 border border-white/10 text-sm text-white/80 placeholder-white/30 outline-none focus:border-[#ffb274]/40 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "paid", "unpaid"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setFilterStatus(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                    filterStatus === v
                      ? "bg-[#ffb274]/20 text-[#ffb274] border border-[#ffb274]/30"
                      : "bg-white/6 text-white/50 border border-white/10 hover:text-white/70"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {["Date", "Customer", "Email", "Plan", "Amount", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold text-white/35 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-white/30 text-sm">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-white/3 transition-colors">
                      <td className="px-5 py-3.5 text-white/50 whitespace-nowrap">
                        {formatDate(p.createdAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-medium text-white/85">{p.customerName}</span>
                      </td>
                      <td className="px-5 py-3.5 text-white/50 text-xs">{p.email}</td>
                      <td className="px-5 py-3.5">
                        <PlanBadge plan={p.plan} />
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-white/80 tabular-nums">
                        {formatCurrency(p.amount, p.currency)}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-5 py-3.5">
                        {p.stripeUrl && (
                          <a
                            href={p.stripeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-white/30 hover:text-[#ffb274] transition-colors"
                          >
                            <ExternalLink size={12} />
                            Stripe
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-white/8 text-xs text-white/30">
              {filtered.length} of {payments.length} sessions
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
