"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Charity = {
  id: string;
  name: string;
  description: string;
};

export default function CharityPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchCharities = async () => {
    const { data } = await supabase
      .from("charities")
      .select("*")
      .order("created_at", { ascending: false });

    setCharities(data || []);
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) { router.push("/login"); return; }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (data?.role !== "admin") { router.push("/dashboard"); return; }

      setLoading(false);
      fetchCharities();
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a0f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(74,152,74,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(212,175,55,0.1),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="flex flex-col items-center gap-3 relative z-10">
          <span className="text-5xl animate-bounce select-none">⛳</span>
          <p className="text-white/40 text-xs tracking-widest uppercase font-semibold">Loading…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a1a0f] text-white">

      {/* Background layers */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(74,152,74,0.25),transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(212,175,55,0.1),transparent)] pointer-events-none" />
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative golf flag */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 opacity-[0.06] select-none pointer-events-none text-[120px] leading-none">
        ⛳
      </div>

      {/* Nav */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">⛳</span>
            <span
              className="font-black tracking-tight text-lg hidden sm:block text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Golf{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #4a9850 0%, #d4af37 100%)" }}
              >
                Charity
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-[10px] tracking-widest font-semibold uppercase text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Admin
            </span>
          </div>

          <Link href="/admin">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white/60 border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:text-white transition-all duration-200 active:scale-[0.97]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <span className="hidden sm:inline">Back to Admin</span>
            </button>
          </Link>
        </div>
      </header>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-10 space-y-6">

        {/* Page title card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl px-8 py-7">
          <h1
            className="text-3xl sm:text-4xl font-black leading-none tracking-tight text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Charity{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #4a9850 0%, #d4af37 100%)" }}
            >
              Management
            </span>
          </h1>
          <p className="text-sm text-white/40 tracking-widest uppercase font-medium mt-2">
            Add &nbsp;·&nbsp; View &nbsp;·&nbsp; Delete Charities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
    <p className="text-white/40 text-xs uppercase tracking-widest">
      Total Charities
    </p>
    <p className="text-3xl font-black text-[#d4af37] mt-2">
      {charities.length}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
    <p className="text-white/40 text-xs uppercase tracking-widest">
      Featured Causes
    </p>
    <p className="text-3xl font-black text-[#4a9850] mt-2">
      {charities.length}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
    <p className="text-white/40 text-xs uppercase tracking-widest">
      Platform Status
    </p>
    <p className="text-3xl font-black text-blue-400 mt-2">
      Active
    </p>
  </div>
</div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Add Charity card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-5">

          <div className="flex items-center gap-3">
            <span className="text-xl">🤝</span>
            <h2
              className="font-black text-lg tracking-tight text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Add Charity
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4a9850]/40 bg-[#4a9850]/10 px-3 py-1 text-[10px] tracking-widest font-semibold uppercase text-[#4a9850]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9850] animate-pulse" />
              New
            </span>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="space-y-3">
            <input
              placeholder="Charity Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4a9850]/50 focus:bg-white/[0.08] transition-all duration-200"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4a9850]/50 focus:bg-white/[0.08] transition-all duration-200 resize-none"
            />
          </div>

          <button
            onClick={async () => {
              if (!name) { alert("Enter charity name"); return; }
              const { error } = await supabase.from("charities").insert({ name, description });
              if (error) { alert(error.message); return; }
              setName("");
              setDescription("");
              fetchCharities();
            }}
            className="py-3 px-6 rounded-xl font-semibold text-sm tracking-wide text-white transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#4a9850]/20"
            style={{ background: "linear-gradient(135deg, #4a9850 0%, #3d8143 100%)" }}
          >
            Add Charity
          </button>
        </div>

        {/* Existing Charities card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-5">

          <div className="flex items-center gap-3">
            <span className="text-xl">❤️</span>
            <h2
              className="font-black text-lg tracking-tight text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Existing Charities
            </h2>
            {charities.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1 text-[10px] tracking-widest font-semibold uppercase text-[#d4af37]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                {charities.length} Total
              </span>
            )}
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {charities.length === 0 ? (
            <div className="text-center py-14">
              <p className="text-5xl mb-4 select-none">🤝</p>
              <p className="text-white/40 text-sm tracking-wide">No charities yet — add one above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {charities.map((charity) => (
                <div
                  key={charity.id}
                  className="rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-sm px-5 py-4 flex items-center justify-between gap-4 transition-all duration-200"
                >
                  <div className="min-w-0">
                    <h3
                      className="font-black text-sm text-white truncate"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {charity.name}
                    </h3>
                    {charity.description && (
                      <p className="text-white/40 text-xs mt-0.5 line-clamp-1 tracking-wide">
                        {charity.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={async () => {
                      const ok = confirm("Delete this charity?");
                      if (!ok) return;
                      const { error } = await supabase.from("charities").delete().eq("id", charity.id);
                      if (error) { alert(error.message); return; }
                      fetchCharities();
                    }}
                    className="shrink-0 py-2 px-4 rounded-xl text-xs font-semibold tracking-wide text-red-400 border border-red-500/20 bg-red-500/[0.07] hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 active:scale-[0.97]"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-white/25 text-xs tracking-wide text-center pb-4">
          Every round you play supports a cause that matters.
        </p>
      </div>

      {/* Bottom ambient glow */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#4a9850]/40 to-transparent" />
    </main>
  );
}