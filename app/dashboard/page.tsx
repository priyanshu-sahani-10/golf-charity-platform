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

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [charities, setCharities] = useState<Charity[]>([]);
  const [selectedCharity, setSelectedCharity] = useState("");
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      //   if (!session) {
      //     router.push("/login");
      //     return;
      //   }

      //   setEmail(session.user.email || "");
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

      <div className="max-w-md">
        <h2 className="font-semibold mb-2">Select Charity</h2>

        <Select value={selectedCharity} onValueChange={setSelectedCharity}>
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
          onClick={() => {
            if (!score) return;

            setScores((prev) => [Number(score), ...prev].slice(0, 5));

            setScore("");
          }}
        >
          Save Score
        </Button>
        <div className="mt-4">
          <h3 className="font-medium">Latest Scores</h3>

          {scores.map((s, index) => (
            <p key={index}>{s}</p>
          ))}
        </div>
      </div>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
