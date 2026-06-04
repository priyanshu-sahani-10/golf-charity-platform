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
      .select(
        `
      charities (
        name
      )
    `,
      )
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (data?.charities) {
      setCharityName((data.charities as any).name);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setEmail(session.user.email || "");
      setUserId(session.user.id);

      fetchScores(session.user.id);
      fetchSubscription(session.user.id);
      fetchSelectedCharity(session.user.id);
    };

    const fetchCharities = async () => {
      const { data } = await supabase.from("charities").select("id,name");

      if (data) {
        setCharities(data);
      }
    };

    checkUser();
    fetchCharities();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p>Welcome {email}</p>

      {!subscription && (
        <div className="max-w-md">
          <h2 className="font-semibold mb-2">Select Charity</h2>

          <Select
            value={selectedCharity}
            onValueChange={(value) => {
              setSelectedCharity(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a charity" />
            </SelectTrigger>

            <SelectContent>
              {charities.map((charity) => (
                <SelectItem key={charity.id} value={charity.id}>
                  {charity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {subscription && (
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold">Subscription Active ✅</h2>
          <p>Plan: {subscription.plan}</p>
          <p>Status: {subscription.status}</p>
          <p>Charity: {charityName}</p>
        </div>
      )}

      {!subscription && (
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Subscription</h2>

          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => {
                if (!selectedCharity) {
                  alert("Please select a charity");
                  return;
                }

                const options = {
                  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                  amount: 9900,
                  currency: "INR",
                  name: "Golf Charity",
                  description: "Monthly Subscription",

                  handler: async (response: any) => {
                    const { data: subscription } = await supabase
                      .from("subscriptions")
                      .insert({
                        user_id: userId,
                        plan: "monthly",
                        status: "active",
                        amount: 99,
                        payment_id: response.razorpay_payment_id,
                      })
                      .select()
                      .single();

                    const donationAmount = 99 * 0.2;

                    await supabase.from("donations").insert({
                      user_id: userId,
                      charity_id: selectedCharity,
                      amount: donationAmount,
                    });

                    await supabase.from("prize_pools").insert({
                      source_subscription_id: subscription?.id,
                      total_amount: 99 * 0.8,
                    });

                    alert("Monthly Subscription Activated");
                  },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
              }}
            >
              Monthly ₹99
            </Button>

            <Button
              onClick={() => {
                if (!selectedCharity) {
                  alert("Please select a charity");
                  return;
                }

                const options = {
                  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                  amount: 99900,
                  currency: "INR",
                  name: "Golf Charity",
                  description: "Yearly Subscription",

                  handler: async (response: any) => {
                    const { data: subscription } = await supabase
                      .from("subscriptions")
                      .insert({
                        user_id: userId,
                        plan: "yearly",
                        status: "active",
                        amount: 999,
                        payment_id: response.razorpay_payment_id,
                      })
                      .select()
                      .single();

                    const donationAmount = 999 * 0.2;

                    await supabase.from("donations").insert({
                      user_id: userId,
                      charity_id: selectedCharity,
                      amount: donationAmount,
                    });

                    await supabase.from("prize_pools").insert({
                      source_subscription_id: subscription?.id,
                      total_amount: 999 * 0.8,
                    });

                    alert("Yearly Subscription Activated");
                  },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
              }}
            >
              Yearly ₹999
            </Button>
          </div>
        </div>
      )}

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-2">Golf Scores</h2>

        <input
          type="number"
          min="1"
          max="45"
          placeholder="Enter score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <Button
          className="mt-2"
          onClick={async () => {
            if (!score || !userId) return;

            const scoreValue = Number(score);

            const { error } = await supabase.from("golf_scores").insert({
              user_id: userId,
              score: scoreValue,
              played_at: new Date().toISOString().split("T")[0],
            });

            if (error) {
              alert(error.message);
              return;
            }

            fetchScores(userId);
            setScore("");
          }}
        >
          Save Score
        </Button>

        <div className="mt-4">
          <h3 className="font-medium">Latest Scores</h3>

          {scores.map((s) => (
            <p key={s.id}>{s.score}</p>
          ))}
        </div>
      </div>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
