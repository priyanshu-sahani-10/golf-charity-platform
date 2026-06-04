"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(0);
  const [subscriptions, setSubscriptions] = useState(0);
  const [donations, setDonations] = useState(0);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (data?.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      setLoading(false);
      fetchStats();
    };

    checkAdmin();
    const fetchStats = async () => {
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: subscriptionsCount } = await supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true });

      const { count: donationsCount } = await supabase
        .from("donations")
        .select("*", { count: "exact", head: true });

      setUsers(usersCount || 0);
      setSubscriptions(subscriptionsCount || 0);
      setDonations(donationsCount || 0);
    };
  }, [router]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Total Users</h2>
            <p className="text-4xl font-bold mt-2">{users}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Subscriptions</h2>
            <p className="text-4xl font-bold mt-2">{subscriptions}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Donations</h2>
            <p className="text-4xl font-bold mt-2">{donations}</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Draw Management</h2>

          <Button
            onClick={async () => {
              const numbers = new Set<number>();

              while (numbers.size < 5) {
                numbers.add(Math.floor(Math.random() * 45) + 1);
              }

              const drawNumbers = [...numbers];

              const { data: draw, error } = await supabase
                .from("draws")
                .insert({
                  draw_mode: "random",
                  status: "completed",
                  jackpot_amount: 5000,
                  draw_numbers: drawNumbers,
                })
                .select()
                .single();

              if (error) {
                alert(error.message);
                return;
              }

              const { data: pools } = await supabase
                .from("prize_pools")
                .select("*")
                .eq("distributed", false);

              const totalPool =
                pools?.reduce((sum, p) => sum + Number(p.total_amount), 0) || 0;

              const { data: subscribers } = await supabase
                .from("subscriptions")
                .select("user_id")
                .eq("status", "active");

              const createdWinners: { id: string; weight: number }[] = [];

              for (const subscriber of subscribers || []) {
                const { data: scores } = await supabase
                  .from("golf_scores")
                  .select("score")
                  .eq("user_id", subscriber.user_id)
                  .order("created_at", { ascending: false })
                  .limit(5);

                const userScores = scores?.map((s) => s.score) || [];

                const matchCount = userScores.filter((score) =>
                  drawNumbers.includes(score),
                ).length;

                if (matchCount >= 1) {
                  const weight =
                    matchCount === 5 ? 5 : matchCount === 4 ? 3 : 1;

                  const { data: winner } = await supabase
                    .from("winners")
                    .insert({
                      user_id: subscriber.user_id,
                      draw_id: draw.id,
                      match_count: matchCount,
                      match_type: `${matchCount} Match`,
                      weight,
                      prize_amount: 0,
                      draw_numbers: drawNumbers,
                    })
                    .select("id, weight")
                    .single();

                  if (winner) {
                    createdWinners.push(winner);
                  }
                }
              }

              const totalWeight = createdWinners.reduce(
                (sum, w) => sum + w.weight,
                0,
              );

              if (createdWinners.length > 0 && totalWeight > 0) {
                for (const winner of createdWinners) {
                  const prizeAmount = (totalPool * winner.weight) / totalWeight;

                  await supabase
                    .from("winners")
                    .update({
                      prize_amount: Number(prizeAmount.toFixed(2)),
                    })
                    .eq("id", winner.id);
                }

                await supabase
                  .from("prize_pools")
                  .update({ distributed: true })
                  .eq("distributed", false);
              }

              alert(
                `Draw Created | Pool ₹${totalPool} | Winners ${createdWinners.length}`,
              );
            }}
          >
            Create Draw
          </Button>
        </div>
      </div>
    </div>
  );
}
