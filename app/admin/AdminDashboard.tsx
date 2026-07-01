"use client";

import { useState } from "react";
import {
  Search,
  Trash2,
  CheckCheck,
  RotateCcw,
  FileText,
  Clock,
  Bell,
  SlidersHorizontal,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

type Submission = {
  id: string;
  source: string;
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  message: string | null;
  status: string;
  submittedAt: Date | string;
};

type Filter = "all" | "pending" | "accepted";

const PROJECT_COLORS: Record<string, string> = {
  Commercial:  "#ffb274",
  Residential: "#10b981",
  Renovation:  "#f59e0b",
  Industrial:  "#8b5cf6",
  Management:  "#3b82f6",
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getColor(name: string) {
  const palette = ["#ffb274", "#10b981", "#f59e0b", "#8b5cf6", "#3b82f6", "#ef4444", "#06b6d4"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function fmtTime(d: Date | string) {
  return new Date(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function AdminDashboard({
  initialSubmissions,
  userName,
}: {
  initialSubmissions: Submission[];
  userName: string;
}) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [filter, setFilter] = useState<Filter>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const stats = {
    total:    submissions.length,
    pending:  submissions.filter((s) => s.status === "pending").length,
    accepted: submissions.filter((s) => s.status === "accepted").length,
    quote:    submissions.filter((s) => s.source === "quote").length,
  };

  const recent = submissions.slice(0, 3);

  const filtered = submissions
    .filter((s) => filter === "all" || s.status === filter)
    .filter((s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.projectType ?? "").toLowerCase().includes(search.toLowerCase())
    );

  async function toggleStatus(id: string, current: string) {
    const next = current === "pending" ? "accepted" : "pending";
    const res = await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) setSubmissions((p) => p.map((s) => s.id === id ? { ...s, status: next } : s));
  }

  async function confirmDelete(id: string) {
    const res = await fetch(`/api/submissions/${id}`, { method: "DELETE" });
    if (res.ok) setSubmissions((p) => p.filter((s) => s.id !== id));
    setDeleteId(null);
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "radial-gradient(circle at top, rgba(255,162,58,0.10), transparent 28%), linear-gradient(180deg,#07100f 0%,#040907 100%)",
        color: "#f7f4ee",
      }}
    >
      {/* ── Header ── */}
      <header
        className="flex items-center gap-3 px-6 py-3 sticky top-0 z-20"
        style={{
          background: "rgba(7,16,15,0.88)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,178,116,0.10)",
        }}
      >
        <SidebarTrigger style={{ color: "#bab6a9" }} className="hover:text-[#ffb274] transition-colors" />

        <div className="flex-1 max-w-md relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#bab6a9" }} />
          <input
            type="text"
            placeholder="Search submissions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f7f4ee",
            }}
            className="w-full rounded-xl pl-8 pr-4 py-2 text-sm placeholder:text-[#bab6a9]/60 focus:outline-none focus:border-[#ffb274]/50 focus:ring-1 focus:ring-[#ffb274]/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            className="p-2 rounded-xl transition-colors relative"
            style={{ color: "#bab6a9" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,178,116,0.10)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Bell size={16} />
            {stats.pending > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#ffb274]" />
            )}
          </button>
          <button
            className="p-2 rounded-xl transition-colors"
            style={{ color: "#bab6a9" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,178,116,0.10)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <SlidersHorizontal size={16} />
          </button>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center ml-1 text-xs font-bold"
            style={{ background: "#ffb274", color: "#07100f" }}
          >
            {getInitials(userName)}
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">

        {/* ── Row 1: Recent cards + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Recent Submissions */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#bab6a9" }}>
              Recent Submissions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recent.length === 0 ? (
                <div
                  className="sm:col-span-3 rounded-3xl p-8 text-center text-sm"
                  style={{ background: "rgba(14,19,16,0.92)", border: "1px solid rgba(255,178,116,0.12)", color: "#bab6a9" }}
                >
                  No submissions yet.
                </div>
              ) : (
                recent.map((sub) => {
                  const color = getColor(sub.name);
                  return (
                    <div
                      key={sub.id}
                      className="rounded-3xl p-5 flex flex-col items-center text-center transition-all hover:-translate-y-0.5"
                      style={{
                        background: "rgba(14,19,16,0.92)",
                        border: "1px solid rgba(255,178,116,0.12)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
                      }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-bold mb-3"
                        style={{ background: color + "30", border: `2px solid ${color}50`, color }}
                      >
                        {getInitials(sub.name)}
                      </div>
                      <p className="font-semibold text-sm leading-tight" style={{ color: "#f7f4ee" }}>{sub.name}</p>
                      <p className="text-xs mt-0.5 truncate w-full" style={{ color: "#bab6a9" }}>{sub.email}</p>
                      <span
                        className="mt-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                        style={{ background: color + "20", color }}
                      >
                        {sub.projectType ?? sub.source}
                      </span>
                      <span
                        className="mt-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                        style={
                          sub.status === "accepted"
                            ? { background: "rgba(16,185,129,0.15)", color: "#10b981" }
                            : { background: "rgba(255,178,116,0.15)", color: "#ffb274" }
                        }
                      >
                        {sub.status}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Stats panel */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#bab6a9" }}>
              Overview
            </p>

            {/* Total submissions */}
            <div
              className="rounded-3xl p-5 flex-1 flex flex-col justify-between"
              style={{
                background: "rgba(14,19,16,0.95)",
                border: "1px solid rgba(255,178,116,0.18)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.28)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText size={13} style={{ color: "#ffb274" }} />
                <span className="text-[11px] uppercase tracking-wide" style={{ color: "#bab6a9" }}>All Time</span>
              </div>
              <div>
                <p className="text-5xl font-black leading-none" style={{ color: "#f7f4ee" }}>{stats.total}</p>
                <p className="text-sm mt-1" style={{ color: "#bab6a9" }}>Total Submissions</p>
              </div>
              <div
                className="mt-4 pt-4 grid grid-cols-2 gap-3"
                style={{ borderTop: "1px solid rgba(255,178,116,0.12)" }}
              >
                <div>
                  <p className="text-xl font-bold" style={{ color: "#ffb274" }}>{stats.quote}</p>
                  <p className="text-[11px]" style={{ color: "#bab6a9" }}>Quotes</p>
                </div>
                <div>
                  <p className="text-xl font-bold" style={{ color: "#10b981" }}>{stats.accepted}</p>
                  <p className="text-[11px]" style={{ color: "#bab6a9" }}>Accepted</p>
                </div>
              </div>
            </div>

            {/* Pending */}
            <div
              className="rounded-3xl p-4 flex items-center justify-between"
              style={{
                background: "rgba(255,178,116,0.12)",
                border: "1px solid rgba(255,178,116,0.22)",
              }}
            >
              <div>
                <p className="text-2xl font-black" style={{ color: "#ffb274" }}>{stats.pending}</p>
                <p className="text-xs font-medium" style={{ color: "#bab6a9" }}>Pending Review</p>
              </div>
              <Clock size={28} style={{ color: "rgba(255,178,116,0.30)" }} />
            </div>
          </div>
        </div>

        {/* ── Row 2: Table ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#bab6a9" }}>
              All Submissions
            </p>
            <div className="flex gap-1.5">
              {(["all", "pending", "accepted"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all"
                  style={
                    filter === f
                      ? { background: "#ffb274", color: "#07100f" }
                      : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#bab6a9" }
                  }
                >
                  {f}
                  {f === "pending" && stats.pending > 0 && (
                    <span
                      className="ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                      style={filter === f
                        ? { background: "rgba(7,16,15,0.25)", color: "#07100f" }
                        : { background: "rgba(255,178,116,0.20)", color: "#ffb274" }}
                    >
                      {stats.pending}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(14,19,16,0.92)",
              border: "1px solid rgba(255,178,116,0.12)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.22)",
            }}
          >
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-sm" style={{ color: "#bab6a9" }}>
                No submissions found.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,178,116,0.10)" }}>
                    {["Date", "Name", "Project", "Source", "Status", ""].map((h, i) => (
                      <th
                        key={i}
                        className={`text-left text-[11px] font-semibold uppercase tracking-wider px-5 py-3 ${
                          h === "Project" ? "hidden md:table-cell" :
                          h === "Source"  ? "hidden lg:table-cell" : ""
                        }`}
                        style={{ color: "#bab6a9" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub, i) => {
                    const color = getColor(sub.name);
                    const projColor = PROJECT_COLORS[sub.projectType ?? ""] ?? "#bab6a9";
                    return (
                      <tr
                        key={sub.id}
                        className="transition-colors"
                        style={{
                          borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,178,116,0.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {/* Date */}
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <p className="text-xs" style={{ color: "#bab6a9" }}>{fmtDate(sub.submittedAt)}</p>
                          <p className="text-xs" style={{ color: "rgba(186,182,169,0.45)" }}>{fmtTime(sub.submittedAt)}</p>
                        </td>

                        {/* Name + email */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                              style={{ background: color + "25", color }}
                            >
                              {getInitials(sub.name)}
                            </div>
                            <div>
                              <p className="font-semibold text-sm" style={{ color: "#f7f4ee" }}>{sub.name}</p>
                              <p className="text-xs" style={{ color: "#bab6a9" }}>{sub.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Project */}
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: projColor + "18", color: projColor }}
                          >
                            {sub.projectType ?? "—"}
                          </span>
                        </td>

                        {/* Source */}
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <span className="text-xs capitalize" style={{ color: "#bab6a9" }}>{sub.source}</span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-3.5">
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                            style={
                              sub.status === "accepted"
                                ? { background: "rgba(16,185,129,0.15)", color: "#10b981" }
                                : { background: "rgba(255,178,116,0.15)", color: "#ffb274" }
                            }
                          >
                            {sub.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5 justify-end">
                            <button
                              onClick={() => toggleStatus(sub.id, sub.status)}
                              title={sub.status === "pending" ? "Accept" : "Revert"}
                              className="p-1.5 rounded-lg transition-colors"
                              style={{ color: "#bab6a9" }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,178,116,0.12)"; e.currentTarget.style.color = "#ffb274"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#bab6a9"; }}
                            >
                              {sub.status === "pending" ? <CheckCheck size={14} /> : <RotateCcw size={14} />}
                            </button>
                            <button
                              onClick={() => setDeleteId(sub.id)}
                              className="p-1.5 rounded-lg transition-colors"
                              style={{ color: "#bab6a9" }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.color = "#ef4444"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#bab6a9"; }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6"
            style={{
              background: "rgba(14,19,16,0.98)",
              border: "1px solid rgba(255,178,116,0.18)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            }}
          >
            <h3 className="font-bold text-lg mb-1" style={{ color: "#f7f4ee" }}>Delete submission?</h3>
            <p className="text-sm mb-6" style={{ color: "#bab6a9" }}>This cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl py-2.5 text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color: "#f7f4ee" }}
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteId)}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all"
                style={{ background: "rgba(239,68,68,0.80)", color: "#fff" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
