"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) { alert(error.message); return; }
    alert("Signup successful. Check your email.");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a0f]">

      {/* Background layers */}
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

      {/* Decorative golf flag */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-20 select-none pointer-events-none text-[80px] sm:text-[100px]">
        ⛳
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-5 sm:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 sm:p-12 flex flex-col items-center gap-8">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4a9850]/40 bg-[#4a9850]/10 px-4 py-1.5 text-xs tracking-widest font-semibold uppercase text-[#4a9850]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a9850] animate-pulse" />
            Join Us
          </span>

          {/* Heading */}
          <div className="text-center space-y-3">
            <h1
              className="text-4xl sm:text-5xl font-black leading-none tracking-tight text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Create{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #4a9850 0%, #d4af37 100%)" }}
              >
                Account
              </span>
            </h1>
            <p className="text-sm text-white/50 tracking-widest uppercase font-medium">
              Play Golf &nbsp;·&nbsp; Support Charity &nbsp;·&nbsp; Win Prizes
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Fields */}
          <div className="w-full space-y-3">
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4a9850]/50 focus:bg-white/[0.08] transition-all duration-200"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4a9850]/50 focus:bg-white/[0.08] transition-all duration-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4a9850]/50 focus:bg-white/[0.08] transition-all duration-200"
            />
          </div>

          {/* Submit button */}
          <button
            onClick={handleSignup}
            className="w-full py-3 px-6 rounded-xl font-semibold text-sm tracking-wide text-white transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#4a9850]/20"
            style={{ background: "linear-gradient(135deg, #4a9850 0%, #3d8143 100%)" }}
          >
            Create Account
          </button>

          {/* Login link */}
          <p className="text-white/40 text-sm tracking-wide text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#d4af37] hover:text-[#f0cc60] font-semibold transition-colors duration-200"
            >
              Login
            </Link>
          </p>

        </div>
      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#4a9850]/40 to-transparent" />
    </main>
  );
}