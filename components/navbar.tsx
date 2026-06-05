"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchRole(session.user.id);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const fetchRole = async (uid: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", uid)
      .single();

    if (data?.role) {
      setRole(data.role);
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[66px] backdrop-blur-[18px]"
        style={{
          background: "rgba(10,26,15,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="text-[22px]">⛳</span>
          <span
            className="serif font-black text-[2.15rem] tracking-tight"
            style={{ color: "#f0f0ec" }}
          >
            Golf<span className="gold-gradient-text">Charity</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1.5 list-none">
          {[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },

            ...(role === "admin" ? [{ label: "Admin", href: "/admin" }] : []),
          ].map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-xs font-medium tracking-widest px-3.5 py-1.5 rounded-lg transition-colors duration-200 text-white/45 hover:text-white hover:bg-white/[0.04]"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  fontSize: "0.82rem",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold tracking-wide px-3.5 py-1.5 rounded-lg text-white transition-colors duration-200"
                style={{ background: "#dc2626", fontSize: "0.82rem" }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/signup"
                  className="text-xs font-semibold tracking-wide px-3.5 py-1.5 rounded-lg transition-colors duration-200 text-white/80 hover:bg-white/[0.04]"
                  style={{
                    border: "1px solid rgba(255,255,255,0.09)",
                    fontSize: "0.82rem",
                  }}
                >
                  Sign Up
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="text-xs font-semibold tracking-wide px-3.5 py-1.5 rounded-lg text-white transition-colors duration-200"
                  style={{ background: "#3d8143", fontSize: "0.82rem" }}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger */}
        <button
          id="hamburger"
          className="flex md:hidden flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-[22px] h-[2px] rounded-sm"
              style={{ background: "rgba(240,240,236,0.45)" }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobileMenu"
          className="fixed top-[66px] left-0 right-0 z-40 flex flex-col gap-1 px-[5%] pt-4 pb-5 backdrop-blur-[20px]"
          style={{
            background: "rgba(10,26,15,0.97)",
            borderBottom: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          {[
            { label: "Home", href: "#home" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Admin", href: "/admin" },
            { label: "Charities", href: "#charities" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-xs font-medium tracking-widest px-3.5 py-1.5 rounded-lg transition-colors duration-200 text-white/45 hover:text-white hover:bg-white/[0.04]"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  fontSize: "0.82rem",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </div>
      )}
    </>
  );
}
