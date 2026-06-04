"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Charity = {
  id: number;
  name: string;
  description: string;
};

export default function CharitiesPage() {
  const [charities, setCharities] = useState<Charity[]>([]);

  useEffect(() => {
    const fetchCharities = async () => {
  const { data, error } = await supabase
    .from("charities")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (data) {
    setCharities(data);
  }
};

    fetchCharities();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Charities
      </h1>

      <div className="mt-6 grid gap-4">
        {charities.map((charity) => (
          <div
            key={charity.id}
            className="border rounded-lg p-4"
          >
            <h2 className="font-semibold">
              {charity.name}
            </h2>

            <p>{charity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}