"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminUsersPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name")
        .order("created_at", { ascending: false });

      const { data: subscriptions } = await supabase
        .from("subscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: donations } = await supabase
        .from("donations")
        .select(
          `
          user_id,
          created_at,
          charities (
            name
          )
        `,
        )
        .order("created_at", { ascending: false });

      const mappedUsers = (profiles || []).map((profile) => {
        const latestSubscription = subscriptions?.find(
          (s) => s.user_id === profile.id,
        );

        const latestDonation = donations?.find(
          (d) => d.user_id === profile.id,
        );

        let expiryDate = null;

        if (latestSubscription?.created_at) {
          const expiry = new Date(latestSubscription.created_at);

          if (latestSubscription.plan === "monthly") {
            expiry.setMonth(expiry.getMonth() + 1);
          } else {
            expiry.setFullYear(expiry.getFullYear() + 1);
          }

          expiryDate = expiry;
        }

        return {
          id: profile.id,
          full_name: profile.full_name || "Unknown User",
          plan: latestSubscription?.plan || "-",
          status: latestSubscription?.status || "inactive",
          startedAt: latestSubscription?.created_at || null,
          expiresAt: expiryDate,
          charity:
            (latestDonation?.charities as any)?.name || "Not Selected",
        };
      });

      setUsers(mappedUsers);
      setLoading(false);
    };

    loadData();
  }, [router]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.full_name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const activeSubscribers = users.filter(
    (u) => u.status === "active",
  ).length;

  const getStatusStyle = (status: string) => {
    if (status === "active") {
      return "bg-[#4a9850]/20 text-[#4a9850] border border-[#4a9850]/30";
    }

    return "bg-red-500/20 text-red-400 border border-red-500/30";
  };

  const getExpiryWarning = (expiresAt: Date | null) => {
    if (!expiresAt) return null;

    const today = new Date();

    const diffDays = Math.ceil(
      (expiresAt.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (diffDays <= 7 && diffDays >= 0) {
      return `Expires in ${diffDays} day${
        diffDays !== 1 ? "s" : ""
      }`;
    }

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl animate-bounce">⛳</span>
          <p className="text-white/40 text-sm tracking-widest uppercase">
            Loading…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1a0f] text-white pt-[66px]">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(74,152,74,0.15),transparent)] pointer-events-none" />

      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-black"
              style={{ fontFamily: "Georgia, serif" }}
            >
              User Management
            </h1>

            <p className="text-white/40 mt-1">
              View memberships and subscriptions
            </p>
          </div>

          <Link href="/admin">
            <button className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              Back
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
            <p className="text-white/40 text-xs uppercase tracking-widest">
              Total Users
            </p>

            <p className="text-4xl font-black text-blue-400 mt-2">
              {users.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
            <p className="text-white/40 text-xs uppercase tracking-widest">
              Active Subscribers
            </p>

            <p className="text-4xl font-black text-[#4a9850] mt-2">
              {activeSubscribers}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none"
          />
        </div>

        <div className="hidden lg:block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {[
                  "Name",
                  "Plan",
                  "Status",
                  "Started On",
                  "Expires On",
                  "Charity",
                ].map((head) => (
                  <th
                    key={head}
                    className="text-left px-4 py-4 text-white/40 text-xs uppercase tracking-widest"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-4 py-4 font-medium">
                    {user.full_name}
                  </td>

                  <td className="px-4 py-4 capitalize">
                    {user.plan}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                        user.status,
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {user.startedAt
                      ? new Date(
                          user.startedAt,
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td className="px-4 py-4">
                    <div>
                      {user.expiresAt
                        ? user.expiresAt.toLocaleDateString("en-IN")
                        : "-"}

                      {getExpiryWarning(user.expiresAt) && (
                        <p className="text-[#d4af37] text-xs mt-1">
                          {getExpiryWarning(user.expiresAt)}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {user.charity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5"
            >
              <h3 className="font-bold text-lg">
                {user.full_name}
              </h3>

              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <div>
                  <p className="text-white/40">Plan</p>
                  <p className="capitalize">{user.plan}</p>
                </div>

                <div>
                  <p className="text-white/40">Status</p>
                  <p className="capitalize">{user.status}</p>
                </div>

                <div>
                  <p className="text-white/40">Started</p>
                  <p>
                    {user.startedAt
                      ? new Date(
                          user.startedAt,
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-white/40">Expires</p>
                  <p>
                    {user.expiresAt
                      ? user.expiresAt.toLocaleDateString("en-IN")
                      : "-"}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-white/40">Charity</p>
                  <p>{user.charity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}