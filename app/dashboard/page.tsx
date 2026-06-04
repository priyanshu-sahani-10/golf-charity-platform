"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Charity = {
  id: string;
  name: string;
};

type GolfScore = {
  id: string;
  score: number;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [charities, setCharities] = useState<Charity[]>([]);
  const [selectedCharity, setSelectedCharity] = useState("");
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<GolfScore[]>([]);
  const [userId, setUserId] = useState("");
  const [subscription, setSubscription] = useState<any>(null);
  const [charityName, setCharityName] = useState("");
  const [winnings, setWinnings] = useState<any[]>([]);

  const fetchWinnings = async (uid: string) => {
    const { data } = await supabase
      .from("winners")
      .select(`id, match_count, prize_amount, payment_status, created_at, draws (created_at)`)
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    setWinnings(data || []);
  };

  const fetchScores = async (uid: string) => {
    const { data } = await supabase
      .from("golf_scores")
      .select("id, score")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    if (!data) return;
    setScores(data.slice(0, 5));
    if (data.length > 5) {
      const idsToDelete = data.slice(5).map((s) => s.id);
      await supabase.from("golf_scores").delete().in("id", idsToDelete);
    }
  };

  const fetchSubscription = async (uid: string) => {
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", uid)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (data) setSubscription(data);
  };

  const fetchSelectedCharity = async (uid: string) => {
    const { data } = await supabase
      .from("donations")
      .select(`charities (name)`)
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (data?.charities) setCharityName((data.charities as any).name);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }
      setEmail(session.user.email || "");
      setUserId(session.user.id);
      fetchScores(session.user.id);
      fetchSubscription(session.user.id);
      fetchSelectedCharity(session.user.id);
      fetchWinnings(session.user.id);
    };
    const fetchCharities = async () => {
      const { data } = await supabase.from("charities").select("id,name");
      if (data) setCharities(data);
    };
    checkUser();
    fetchCharities();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleMonthlySubscription = () => {
    if (!selectedCharity) { alert("Please select a charity"); return; }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 9900,
      currency: "INR",
      name: "Golf Charity",
      description: "Monthly Subscription",
      handler: async (response: any) => {
        const { data: subscription } = await supabase
          .from("subscriptions")
          .insert({ user_id: userId, plan: "monthly", status: "active", amount: 99, payment_id: response.razorpay_payment_id })
          .select().single();
        await supabase.from("donations").insert({ user_id: userId, charity_id: selectedCharity, amount: 99 * 0.2 });
        await supabase.from("prize_pools").insert({ source_subscription_id: subscription?.id, total_amount: 99 * 0.8 });
        alert("Monthly Subscription Activated");
      },
    };
    new window.Razorpay(options).open();
  };

  const handleYearlySubscription = () => {
    if (!selectedCharity) { alert("Please select a charity"); return; }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 99900,
      currency: "INR",
      name: "Golf Charity",
      description: "Yearly Subscription",
      handler: async (response: any) => {
        const { data: subscription } = await supabase
          .from("subscriptions")
          .insert({ user_id: userId, plan: "yearly", status: "active", amount: 999, payment_id: response.razorpay_payment_id })
          .select().single();
        await supabase.from("donations").insert({ user_id: userId, charity_id: selectedCharity, amount: 999 * 0.2 });
        await supabase.from("prize_pools").insert({ source_subscription_id: subscription?.id, total_amount: 999 * 0.8 });
        alert("Yearly Subscription Activated");
      },
    };
    new window.Razorpay(options).open();
  };

  const getScoreColor = (s: number) => {
    if (s >= 35) return "text-[#4a9850]";
    if (s >= 25) return "text-[#d4af37]";
    return "text-red-400";
  };

  const getStatusStyle = (status: string) => {
    if (status === "paid") return "bg-[#4a9850]/20 text-[#4a9850] border border-[#4a9850]/30";
    if (status === "pending") return "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30";
    return "bg-white/10 text-white/50 border border-white/10";
  };

  return (
    <div className="min-h-screen bg-[#0a1a0f] text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(74,152,74,0.15),transparent)] pointer-events-none" />
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Nav */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl select-none">⛳</span>
            <span className="font-black tracking-tight text-lg hidden sm:block" style={{ fontFamily: "Georgia, serif" }}>
              Golf <span className="text-[#4a9850]">Charity</span>
            </span>
          </div>
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex flex-col items-end min-w-0">
              <span className="text-xs text-white/40 uppercase tracking-widest">Logged in as</span>
              <span className="text-sm text-white/80 truncate max-w-[180px]">{email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white/60 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span className="hidden xs:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Welcome */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            Welcome back 👋
          </h1>
          <p className="text-white/40 text-sm mt-1 sm:hidden truncate">{email}</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Subscription Card ── */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              <h2 className="font-bold text-base tracking-wide">Subscription</h2>
            </div>

            {subscription ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4a9850] animate-pulse" />
                  <span className="text-[#4a9850] font-semibold text-sm uppercase tracking-wider">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Plan", value: subscription.plan },
                    { label: "Status", value: subscription.status },
                    { label: "Charity", value: charityName, full: true },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-xl bg-white/5 border border-white/10 p-3 ${item.full ? "col-span-2" : ""}`}
                    >
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-white font-semibold text-sm capitalize">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Select Charity</p>
                  <Select value={selectedCharity} onValueChange={setSelectedCharity}>
                    <SelectTrigger className="bg-white/5 border-white/15 text-white rounded-xl h-10">
                      <SelectValue placeholder="Choose a charity" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f2318] border-white/15 text-white">
                      {charities.map((charity) => (
                        <SelectItem key={charity.id} value={charity.id} className="focus:bg-white/10">
                          {charity.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Choose Plan</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Monthly */}
                    <button
                      onClick={handleMonthlySubscription}
                      className="group relative rounded-xl border border-white/15 bg-white/5 hover:border-[#4a9850]/50 hover:bg-[#4a9850]/10 transition-all duration-200 p-4 text-left"
                    >
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Monthly</p>
                      <p className="text-white font-black text-xl">₹99</p>
                      <p className="text-white/30 text-xs mt-1">per month</p>
                    </button>
                    {/* Yearly */}
                    <button
                      onClick={handleYearlySubscription}
                      className="group relative rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/5 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/15 transition-all duration-200 p-4 text-left"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[#d4af37]/70 text-xs uppercase tracking-widest">Yearly</p>
                        <span className="text-[10px] font-bold text-[#d4af37] bg-[#d4af37]/20 px-1.5 py-0.5 rounded-full">SAVE 15%</span>
                      </div>
                      <p className="text-white font-black text-xl">₹999</p>
                      <p className="text-white/30 text-xs mt-1">per year</p>
                    </button>
                  </div>
                </div>

                <p className="text-white/25 text-xs">20% of your subscription goes directly to your chosen charity.</p>
              </div>
            )}
          </div>

          {/* ── Golf Scores Card ── */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏌️</span>
              <h2 className="font-bold text-base tracking-wide">Golf Scores</h2>
            </div>

            <div className="space-y-2">
              <p className="text-white/40 text-xs uppercase tracking-widest">Enter Today's Score</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="45"
                  placeholder="Score (1–45)"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#4a9850]/60 focus:ring-1 focus:ring-[#4a9850]/30 transition-all"
                />
                <button
                  onClick={async () => {
                    if (!score || !userId) return;
                    const { error } = await supabase.from("golf_scores").insert({
                      user_id: userId,
                      score: Number(score),
                      played_at: new Date().toISOString().split("T")[0],
                    });
                    if (error) { alert(error.message); return; }
                    fetchScores(userId);
                    setScore("");
                  }}
                  className="shrink-0 px-4 py-2.5 rounded-xl bg-[#4a9850] hover:bg-[#3d8143] text-white text-sm font-semibold transition-all duration-200 active:scale-95"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-white/40 text-xs uppercase tracking-widest">Latest Scores</p>
              {scores.length === 0 ? (
                <p className="text-white/30 text-sm py-3 text-center">No scores recorded yet</p>
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {scores.map((s, i) => (
                    <div key={s.id} className="rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col items-center gap-1">
                      <span className="text-white/30 text-[10px] uppercase tracking-widest">#{i + 1}</span>
                      <span className={`text-2xl font-black ${getScoreColor(s.score)}`}>{s.score}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Winnings Table ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <h2 className="font-bold text-base tracking-wide">My Winnings</h2>
          </div>

          {winnings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">🎯</p>
              <p className="text-white/40 text-sm">No winnings yet — keep playing!</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-1">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Matches", "Prize", "Status", "Draw Date"].map((h) => (
                      <th key={h} className="text-left py-2 px-3 text-white/40 text-xs uppercase tracking-widest font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {winnings.map((win) => (
                    <tr key={win.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 text-white font-semibold">{win.match_count}</td>
                      <td className="py-3 px-3 text-[#d4af37] font-bold">₹{win.prize_amount}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusStyle(win.payment_status)}`}>
                          {win.payment_status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-white/50 text-xs">
                        {new Date((win.draws as any)?.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
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