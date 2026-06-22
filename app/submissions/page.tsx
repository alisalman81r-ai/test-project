"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Trash2, Mail, Clock, HardHat } from "lucide-react";

interface Submission {
  id: string;
  source: "contact" | "quote";
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  submittedAt: string;
  status: "pending" | "accepted";
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("allSubmissions") || "[]");
    setSubmissions(stored);
  }, []);

  const handleDeleteClick = (id: string) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = (id: string) => {
    const updated = submissions.filter((item) => item.id !== id);
    setSubmissions(updated);
    localStorage.setItem("allSubmissions", JSON.stringify(updated));
    setPendingDeleteId(null);
  };

  const acceptedCount = useMemo(
    () => submissions.filter((item) => item.status === "accepted").length,
    [submissions]
  );

  const pendingCount = useMemo(
    () => submissions.filter((item) => item.status === "pending").length,
    [submissions]
  );

  const updateSubmission = (id: string, updates: Partial<Submission>) => {
    const updated = submissions.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    setSubmissions(updated);
    localStorage.setItem("allSubmissions", JSON.stringify(updated));
  };

  const deleteSubmission = (id: string) => {
    const updated = submissions.filter((item) => item.id !== id);
    setSubmissions(updated);
    localStorage.setItem("allSubmissions", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-300">Review panel</p>
            <h1 className="mt-2 text-4xl font-black">Submitted requests</h1>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
          >
            <HardHat size={18} />
            Back to site
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">Pending</p>
            <p className="mt-2 text-3xl font-black">{pendingCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">Accepted</p>
            <p className="mt-2 text-3xl font-black">{acceptedCount}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {submissions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-300">
              No submissions yet.
            </div>
          ) : (
            submissions
              .slice()
              .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
              .map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-black">{item.name || "Unnamed request"}</h2>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                          {item.source}
                        </span>
                        {item.status === "accepted" ? (
                          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                            Accepted
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-200">
                            Pending
                          </span>
                        )}
                      </div>

                      <div className="mt-3 space-y-2 text-sm text-slate-300">
                        <p className="flex items-center gap-2">
                          <Mail size={16} />
                          {item.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock size={16} />
                          {new Date(item.submittedAt).toLocaleString()}
                        </p>
                        {item.phone ? (
                          <p className="text-slate-300">Phone: {item.phone}</p>
                        ) : null}
                        {item.projectType ? (
                          <p className="text-slate-300">Project: {item.projectType}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateSubmission(item.id, {
                            status: item.status === "accepted" ? "pending" : "accepted",
                          })
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                      >
                        <CheckCircle2 size={16} />
                        {item.status === "accepted" ? "Undo" : "Accept"}
                      </button>
                      {pendingDeleteId === item.id ? (
                        <div className="flex flex-col gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 sm:flex-row sm:items-center">
                          <span className="text-sm font-medium text-rose-100">Delete this email?</span>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => confirmDelete(item.id)}
                              className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-400"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setPendingDeleteId(null)}
                              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(item.id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-400"
                        >
                          <Trash2 size={16} />
                          Delete email
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 rounded-2xl bg-black/20 p-4 text-sm leading-6 text-slate-200">
                    {item.message || "No message provided."}
                  </p>
                </article>
              ))
          )}
        </div>
      </section>
    </main>
  );
}
