"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(0);
  const [subscriptions, setSubscriptions] = useState(0);
  const [donations, setDonations] = useState(0);
  const [winners, setWinners] = useState<any[]>([]);
  const [drawLoading, setDrawLoading] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }
      const { data } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
      if (data?.role !== "admin") { router.push("/dashboard"); return; }
      setLoading(false);
      fetchStats();
    };

    checkAdmin();

    const fetchStats = async () => {
      const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      const { count: subscriptionsCount } = await supabase.from("subscriptions").select("*", { count: "exact", head: true });
      const { count: donationsCount } = await supabase.from("donations").select("*", { count: "exact", head: true });
      const { data: winnersData } = await supabase
        .from("winners")
        .select(`id, match_count, prize_amount, payment_status, created_at, profiles (full_name)`)
        .order("created_at", { ascending: false });

      setWinners(winnersData || []);
      setUsers(usersCount || 0);
      setSubscriptions(subscriptionsCount || 0);
      setDonations(donationsCount || 0);
    };
  }, [router]);

  const handleCreateDraw = async () => {
    setDrawLoading(true);
    try {
      const numbers = new Set<number>();
      while (numbers.size < 5) numbers.add(Math.floor(Math.random() * 45) + 1);
      const drawNumbers = [...numbers];

      const { data: draw, error } = await supabase
        .from("draws")
        .insert({ draw_mode: "random", status: "completed", jackpot_amount: 5000, draw_numbers: drawNumbers })
        .select().single();

      if (error) { alert(error.message); return; }

      const { data: pools } = await supabase.from("prize_pools").select("*").eq("distributed", false);
      const totalPool = pools?.reduce((sum, p) => sum + Number(p.total_amount), 0) || 0;

      const { data: subscribers } = await supabase.from("subscriptions").select("user_id").eq("status", "active");
      const createdWinners: { id: string; weight: number }[] = [];

      for (const subscriber of subscribers || []) {
        const { data: scores } = await supabase
          .from("golf_scores").select("score").eq("user_id", subscriber.user_id)
          .order("created_at", { ascending: false }).limit(5);

        const userScores = scores?.map((s) => s.score) || [];
        const matchCount = userScores.filter((score) => drawNumbers.includes(score)).length;

        if (matchCount >= 1) {
          const weight = matchCount === 5 ? 5 : matchCount === 4 ? 3 : 1;
          const { data: winner } = await supabase
            .from("winners")
            .insert({ user_id: subscriber.user_id, draw_id: draw.id, match_count: matchCount, match_type: `${matchCount} Match`, weight, prize_amount: 0, draw_numbers: drawNumbers })
            .select("id, weight").single();
          if (winner) createdWinners.push(winner);
        }
      }

      const totalWeight = createdWinners.reduce((sum, w) => sum + w.weight, 0);
      if (createdWinners.length > 0 && totalWeight > 0) {
        for (const winner of createdWinners) {
          const prizeAmount = (totalPool * winner.weight) / totalWeight;
          await supabase.from("winners").update({ prize_amount: Number(prizeAmount.toFixed(2)) }).eq("id", winner.id);
        }
        await supabase.from("prize_pools").update({ distributed: true }).eq("distributed", false);
      }

      alert(`Draw Created | Pool ₹${totalPool} | Winners ${createdWinners.length}`);
    } finally {
      setDrawLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === "paid") return "bg-[#4a9850]/20 text-[#4a9850] border border-[#4a9850]/30";
    if (status === "pending") return "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30";
    return "bg-white/10 text-white/50 border border-white/10";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl animate-bounce">⛳</span>
          <p className="text-white/40 text-sm tracking-widest uppercase">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1a0f] text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(74,152,74,0.15),transparent)] pointer-events-none" />
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Nav */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl select-none">⛳</span>
            <span className="font-black tracking-tight text-lg hidden sm:block" style={{ fontFamily: "Georgia, serif" }}>
              Golf <span className="text-[#4a9850]">Charity</span>
            </span>
            <span className="ml-2 text-[10px] font-bold tracking-widest uppercase bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">Admin</span>
          </div>
          <Link href="/dashboard">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white/60 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          </Link>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Page title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            Admin Dashboard
          </h1>
          <p className="text-white/40 text-sm mt-1">Platform overview and controls</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Users", value: users, icon: "👥", color: "text-blue-400", glow: "rgba(96,165,250,0.15)" },
            { label: "Subscriptions", value: subscriptions, icon: "💳", color: "text-[#4a9850]", glow: "rgba(74,152,74,0.15)" },
            { label: "Donations", value: donations, icon: "❤️", color: "text-[#d4af37]", glow: "rgba(212,175,55,0.15)" },
          ].map((stat) => (
            <div key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 flex items-center gap-4"
              style={{ boxShadow: `0 0 40px ${stat.glow}` }}>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest">{stat.label}</p>
                <p className={`text-3xl font-black mt-0.5 ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Manage Charities */}
          <Link href="/admin/charity" className="block group">
            <div className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-[#4a9850]/40 backdrop-blur-sm p-5 sm:p-6 flex items-center gap-4 transition-all duration-200 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[#4a9850]/15 border border-[#4a9850]/30 flex items-center justify-center text-2xl shrink-0 group-hover:bg-[#4a9850]/25 transition-colors">
                🤝
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-base text-white group-hover:text-[#4a9850] transition-colors">Manage Charities</h2>
                <p className="text-white/40 text-sm mt-0.5">View, add and delete charities</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/20 group-hover:text-[#4a9850] ml-auto shrink-0 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </Link>

          {/* Draw Management */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-2xl shrink-0">
              🎯
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-base text-white">Draw Management</h2>
              <p className="text-white/40 text-sm mt-0.5">Run a new weighted prize draw</p>
            </div>
            <button
              onClick={handleCreateDraw}
              disabled={drawLoading}
              className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold bg-[#d4af37] hover:bg-[#c4a030] text-[#0a1a0f] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {drawLoading ? "Running…" : "Create Draw"}
            </button>
          </div>
        </div>

        {/* Winners Table */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <h2 className="font-bold text-base tracking-wide">Winners</h2>
            {winners.length > 0 && (
              <span className="ml-1 text-xs font-bold px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
                {winners.length}
              </span>
            )}
          </div>

          {winners.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🎯</p>
              <p className="text-white/40 text-sm">No winners yet — run a draw to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-1">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Player", "Matches", "Prize", "Payment"].map((h) => (
                      <th key={h} className="text-left py-2 px-3 text-white/40 text-xs uppercase tracking-widest font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {winners.map((winner) => (
                    <tr key={winner.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 text-white font-medium">
                        {winner.profiles?.full_name || (
                          <span className="text-white/30 italic">Unknown</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 font-bold text-white">
                          {winner.match_count}
                          <span className="text-white/30 text-xs font-normal">match{winner.match_count !== 1 ? "es" : ""}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#d4af37] font-bold">₹{winner.prize_amount}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusStyle(winner.payment_status)}`}>
                          {winner.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}