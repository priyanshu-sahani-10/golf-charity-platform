"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let cur = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 80) cur = s.id;
      });
      setActiveSection(cur);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (mobileMenuOpen) {
        const menu = document.getElementById("mobileMenu");
        const hb = document.getElementById("hamburger");
        if (menu && hb && !menu.contains(e.target) && !hb.contains(e.target)) {
          setMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [mobileMenuOpen]);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "Is it free to join?",
      a: "Yes, creating an account and joining charity rounds is completely free. You only contribute a donation pledge when you play — and you choose the amount. There are no hidden fees or subscription costs.",
    },
    {
      q: "How are charities verified?",
      a: "Every charity on our platform goes through a rigorous vetting process. We verify legal registration, financial transparency, and impact reporting before any organisation is listed. We re-verify annually.",
    },
    {
      q: "Can I organise my own tournament?",
      a: "Absolutely! Any registered user can create a charity tournament, invite friends or colleagues, set pledge structures, and choose a beneficiary. Our dashboard makes it straightforward to manage the whole event.",
    },
    {
      q: "How do donations actually get transferred?",
      a: "Pledges are processed via our secure payment partner after each round is submitted. Funds are transferred directly to the charity's verified bank account within 5–7 business days. You'll receive a confirmation receipt.",
    },
    {
      q: "What prizes can I win?",
      a: "Top players on our global and event leaderboards win golf equipment, exclusive club memberships, experiences, and merchandise from our sponsor partners. Prizes are awarded monthly and after major events.",
    },
    {
      q: "Is my handicap taken into account?",
      a: "Yes! All scoring on the platform supports Stableford, net stroke play, and gross stroke play formats. You can enter your official handicap index and all leaderboards adjust accordingly for fair competition.",
    },
  ];

  const charities = [
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      name: "Hope For Children",
      desc: "Providing education, nutrition, and healthcare support to underprivileged children across rural communities.",
      founded: "Joined 2018",
      raised: "$1.8M Raised",
    },
    {
      image:
        "https://img.freepik.com/free-photo/earth-day-environment-eco-concept-top-view_185193-110598.jpg?semt=ais_hybrid&w=740&q=80",
      name: "Green Earth Initiative",
      desc: "Focused on reforestation, climate action, and protecting natural ecosystems for future generations.",
      founded: "Joined 2020",
      raised: "$2.4M Raised",
    },
    {
      image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb",
      name: "Clean Water Mission",
      desc: "Building sustainable water systems and delivering safe drinking water to remote communities.",
      founded: "Joined 2019",
      raised: "$1.2M Raised",
    },
    {
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
      name: "Health Access Foundation",
      desc: "Supporting medical camps, essential treatments, and healthcare outreach programs worldwide.",
      founded: "Joined 2017",
      raised: "$3.1M Raised",
    },
  ];

  const navLinkClass = (id) =>
    `text-xs font-medium tracking-widest px-3.5 py-1.5 rounded-lg transition-colors duration-200 ${
      activeSection === id
        ? "text-white"
        : "text-white/45 hover:text-white hover:bg-white/[0.04]"
    }`;

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "#0a1a0f",
        color: "#f0f0ec",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
     
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.7); }
        }
        .animate-fade-up { animation: fadeUp 0.9s ease both; }
        .pulse-dot { animation: pulse-dot 1.8s ease-in-out infinite; }
        .gold-gradient-text {
          background: linear-gradient(135deg, #4a9850, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .green-gold-gradient-text {
          background: linear-gradient(135deg, #4a9850 0%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.25s;
          padding: 0 20px;
        }
        .faq-answer.open {
          max-height: 300px;
          padding: 0 20px 18px;
        }
        .hero-grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.035;
        }
      `}</style>

      



      {/* ── HERO ── */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden text-center"
        style={{ padding: "100px 5% 80px" }}
      >
        {/* Backgrounds */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% -5%, rgba(74,152,74,0.22), transparent)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 80% 85%, rgba(212,175,55,0.09), transparent)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none hero-grid-bg" />

        <div className="relative max-w-[820px] mx-auto flex flex-col items-center gap-7 animate-fade-up">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-[18px] py-1.5 rounded-full text-[0.7rem] font-bold tracking-[0.12em] uppercase"
            style={{
              border: "1px solid rgba(212,175,55,0.4)",
              background: "rgba(212,175,55,0.09)",
              color: "#d4af37",
            }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full pulse-dot"
              style={{ background: "#d4af37" }}
            />
            Charity Edition · 2025
          </div>

          <h1
            className="serif font-black leading-[1.06] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3rem, 7vw, 5.2rem)", color: "#f0f0ec" }}
          >
            Play Golf.
            <br />
            <span className="green-gold-gradient-text">Change Lives.</span>
          </h1>

          <p
            className="text-[1.05rem] leading-[1.75] max-w-[560px]"
            style={{ color: "rgba(240,240,236,0.45)" }}
          >
            Every round you play raises real money for causes that matter. Join
            thousands of golfers making an impact — one hole at a time.
          </p>

          {/* Stats */}
          <div className="flex gap-8 flex-wrap justify-center mt-1">
            {[
              { num: "$2.4M", label: "Raised" },
              { num: "14,200", label: "Players" },
              { num: "38", label: "Charities" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                {i > 0 && (
                  <div
                    className="w-px h-9"
                    style={{ background: "rgba(255,255,255,0.09)" }}
                  />
                )}
                <div className="flex flex-col items-center gap-0.5">
                  <span
                    className="serif font-bold text-[1.8rem] leading-none"
                    style={{ color: "#f0f0ec" }}
                  >
                    {stat.num}
                  </span>
                  <span
                    className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase"
                    style={{ color: "rgba(240,240,236,0.45)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[10px] font-semibold text-sm tracking-wide text-white no-underline transition-all duration-200"
              style={{
                background: "#3d8143",
                boxShadow: "0 4px 20px rgba(61,129,67,0.35)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#4a9850";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 28px rgba(61,129,67,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#3d8143";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(61,129,67,0.35)";
              }}
            >
              ⛳ Start Playing
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[10px] font-semibold text-sm tracking-wide no-underline transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#f0f0ec",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.transform = "";
              }}
            >
              Learn How It Works
            </a>
            <a
              href="#charities"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[10px] font-semibold text-sm tracking-wide no-underline transition-all duration-200"
              style={{
                background: "rgba(212,175,55,0.15)",
                color: "#d4af37",
                border: "1px solid rgba(212,175,55,0.3)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(212,175,55,0.22)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(212,175,55,0.15)";
                e.currentTarget.style.transform = "";
              }}
            >
              View Charities
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how"
        className="py-24 px-[5%]"
        style={{
          background: "#0d2012",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          borderBottom: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <span
            className="text-[0.7rem] font-bold tracking-[0.15em] uppercase"
            style={{ color: "#4a9850" }}
          >
            The Process
          </span>
          <h2
            className="serif font-black leading-[1.1] tracking-[-0.02em] mt-3.5 mb-4"
            style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", color: "#f0f0ec" }}
          >
            How It Works
          </h2>
          <p
            className="text-[0.97rem] leading-[1.75] max-w-[540px] mx-auto"
            style={{ color: "rgba(240,240,236,0.45)" }}
          >
            Simple, transparent, and impactful. Here's how your game becomes a
            force for good.
          </p>
        </div>

        <div
          className="max-w-[900px] mx-auto mt-14 grid overflow-hidden rounded-2xl"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2px",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          {[
            {
              num: "01",
              icon: "💳",
              title: "Subscribe to the Platform",
              desc: "Choose a monthly or yearly subscription plan to unlock access to score tracking, monthly draws, and exclusive rewards.",
            },
            {
              num: "02",
              icon: "💚",
              title: "Choose Your Charity",
              desc: "Select a charity you want to support. A portion of every subscription is automatically donated to your chosen cause.",
            },
            {
              num: "03",
              icon: "⛳",
              title: "Enter Your 5 Golf Scores",
              desc: "Submit your latest 5 Stableford scores. Your scores are securely stored and automatically updated over time.",
            },
            {
              num: "04",
              icon: "🏆",
              title: "Monthly Draw & Rewards",
              desc: "Every month a draw is generated. Match numbers with your golf scores and win a share of the prize pool.",
            },
          ].map((card, i) => (
            <div
              key={card.num}
              className="flex flex-col gap-3.5 p-9 transition-colors duration-200 relative"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.09)" : "none",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
              }
            >
              <span
                className="serif font-black text-[2.4rem] leading-none"
                style={{ color: "#4a9850", opacity: 0.35 }}
              >
                {card.num}
              </span>
              <span className="text-[1.8rem]">{card.icon}</span>
              <div
                className="serif font-bold text-[1.12rem]"
                style={{ color: "#f0f0ec" }}
              >
                {card.title}
              </div>
              <div
                className="text-[0.87rem] leading-[1.7]"
                style={{ color: "rgba(240,240,236,0.45)" }}
              >
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHARITIES ── */}
      <section id="charities" className="py-24 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-wrap gap-12 items-start justify-between mb-14">
            <div>
              <span
                className="text-[0.7rem] font-bold tracking-[0.15em] uppercase"
                style={{ color: "#4a9850" }}
              >
                Who We Support
              </span>
              <h2
                className="serif font-black leading-[1.1] tracking-[-0.02em] mt-3.5 mb-4"
                style={{
                  fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                  color: "#f0f0ec",
                }}
              >
                Featured Charities
              </h2>
              <p
                className="text-[0.97rem] leading-[1.75] max-w-[540px]"
                style={{ color: "rgba(240,240,236,0.45)" }}
              >
                Every organisation is vetted, transparent, and deeply grateful
                for your fairways.
              </p>
            </div>
          </div>

          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {charities.map((c) => (
              <div
                key={c.name}
                className="overflow-hidden rounded-2xl transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.09)",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(74,152,74,0.4)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.transform = "";
                }}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6 flex flex-col gap-3">
                  <div
                    className="serif font-bold text-[1.1rem]"
                    style={{ color: "#f0f0ec" }}
                  >
                    {c.name}
                  </div>

                  <div
                    className="text-[0.85rem] leading-[1.7]"
                    style={{ color: "rgba(240,240,236,0.65)" }}
                  >
                    {c.desc}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span
                      className="text-[0.75rem] uppercase font-semibold"
                      style={{ color: "rgba(240,240,236,0.45)" }}
                    >
                      {c.founded}
                    </span>

                    <span
                      className="text-[0.75rem] uppercase font-bold"
                      style={{ color: "#4a9850" }}
                    >
                      {c.raised}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIZE POOL SECTION ── */}
      <section
        className="py-24 px-[5%]"
        style={{
          background: "#0d2012",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          borderBottom: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-[0.7rem] font-bold tracking-[0.15em] uppercase"
              style={{ color: "#4a9850" }}
            >
              How Funds Work
            </span>

            <h2
              className="serif font-black leading-[1.1] tracking-[-0.02em] mt-3.5 mb-4"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                color: "#f0f0ec",
              }}
            >
              Play. Support. Win.
            </h2>

            <p
              className="text-[0.97rem] leading-[1.75] max-w-[650px] mx-auto"
              style={{ color: "rgba(240,240,236,0.45)" }}
            >
              Every subscription helps charities while also building a monthly
              prize pool for participating golfers.
            </p>
          </div>

          {/* Flow */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
            {[
              "₹999 Subscription",
              "20% Charity",
              "80% Prize Pool",
              "Monthly Draw",
              "Cash Rewards",
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                <div
                  className="px-5 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "#f0f0ec",
                  }}
                >
                  {item}
                </div>

                {i < 4 && (
                  <span
                    className="text-xl"
                    style={{ color: "rgba(240,240,236,0.3)" }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Cards */}
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            }}
          >
            {[
              {
                icon: "💚",
                title: "Charity Donation",
                value: "20%",
                desc: "A portion of every subscription goes directly towards charitable causes.",
              },
              {
                icon: "🏆",
                title: "Prize Pool",
                value: "80%",
                desc: "The remaining amount contributes to a growing monthly reward pool.",
              },
              {
                icon: "🎲",
                title: "Monthly Draw",
                value: "1 Draw",
                desc: "A unique set of numbers is generated each month by the admin.",
              },
              {
                icon: "💰",
                title: "Cash Rewards",
                value: "Real Winnings",
                desc: "Matching scores share the prize pool based on reward rules.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-7 rounded-2xl transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(74,152,74,0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>

                <div
                  className="serif font-bold text-[1.2rem] mb-2"
                  style={{ color: "#f0f0ec" }}
                >
                  {card.title}
                </div>

                <div
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#4a9850" }}
                >
                  {card.value}
                </div>

                <p
                  className="text-[0.87rem] leading-[1.7]"
                  style={{ color: "rgba(240,240,236,0.55)" }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MONTHLY DRAW SHOWCASE ── */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span
              className="text-[0.7rem] font-bold tracking-[0.15em] uppercase"
              style={{ color: "#4a9850" }}
            >
              Monthly Rewards
            </span>

            <h2
              className="serif font-black leading-[1.1] tracking-[-0.02em] mt-3.5 mb-4"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                color: "#f0f0ec",
              }}
            >
              Monthly Draw Showcase
            </h2>

            <p
              className="text-[0.97rem] leading-[1.75] max-w-[650px] mx-auto"
              style={{ color: "rgba(240,240,236,0.45)" }}
            >
              Every month, draw numbers are generated and matched against
              participant golf scores to determine prize winners.
            </p>
          </div>

          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            }}
          >
            {/* Prize Pool */}
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <div className="text-4xl mb-4">🏆</div>

              <div
                className="text-sm uppercase tracking-[0.12em] mb-2"
                style={{ color: "rgba(240,240,236,0.45)" }}
              >
                Current Prize Pool
              </div>

              <div
                className="serif text-5xl font-black"
                style={{ color: "#4a9850" }}
              >
                ₹48,750
              </div>

              <p
                className="mt-4 text-sm leading-7"
                style={{ color: "rgba(240,240,236,0.55)" }}
              >
                Built from active member subscriptions and distributed among
                qualifying winners.
              </p>
            </div>

            {/* Draw Numbers */}
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <div className="text-4xl mb-4">🎲</div>

              <div
                className="text-sm uppercase tracking-[0.12em] mb-5"
                style={{ color: "rgba(240,240,236,0.45)" }}
              >
                Last Draw Numbers
              </div>

              <div className="flex gap-3 flex-wrap">
                {[12, 18, 20, 25, 30].map((num) => (
                  <div
                    key={num}
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{
                      background: "linear-gradient(135deg,#4a9850,#d4af37)",
                      color: "#fff",
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>

              <p
                className="mt-5 text-sm leading-7"
                style={{ color: "rgba(240,240,236,0.55)" }}
              >
                Draw numbers are generated monthly and compared against each
                member's latest golf scores.
              </p>
            </div>

            {/* Winner */}
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <div className="text-4xl mb-4">💰</div>

              <div
                className="text-sm uppercase tracking-[0.12em] mb-4"
                style={{ color: "rgba(240,240,236,0.45)" }}
              >
                Recent Winner
              </div>

              <div
                className="serif text-3xl font-black mb-2"
                style={{ color: "#f0f0ec" }}
              >
                Priyanshu S.
              </div>

              <div className="font-semibold mb-3" style={{ color: "#4a9850" }}>
                5 Number Match
              </div>

              <div className="text-4xl font-black" style={{ color: "#d4af37" }}>
                ₹12,500
              </div>

              <p
                className="mt-4 text-sm leading-7"
                style={{ color: "rgba(240,240,236,0.55)" }}
              >
                Prize distributed based on match count and monthly prize pool
                allocation rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="py-24 px-[5%]"
        style={{
          background: "#0d2012",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          borderBottom: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <div
          className="max-w-[1000px] mx-auto grid gap-[72px]"
          style={{ gridTemplateColumns: "1fr 1.6fr" }}
        >
          <div>
            <span
              className="text-[0.7rem] font-bold tracking-[0.15em] uppercase"
              style={{ color: "#4a9850" }}
            >
              Got Questions?
            </span>
            <h2
              className="serif font-black leading-[1.1] tracking-[-0.02em] mt-3.5 mb-4"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                color: "#f0f0ec",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="text-[0.97rem] leading-[1.75] max-w-[540px]"
              style={{ color: "rgba(240,240,236,0.45)" }}
            >
              Everything you need to know about playing golf for charity.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[10px] font-semibold text-sm no-underline transition-all duration-200 mt-7"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#f0f0ec",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.transform = "";
              }}
            >
              Contact Support →
            </a>
          </div>

          <div className="flex flex-col gap-0.5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-[10px] overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.09)" }}
              >
                <button
                  className="w-full flex justify-between items-center gap-3 px-5 py-[18px] text-left text-[0.92rem] font-semibold cursor-pointer border-none transition-colors duration-200"
                  style={{
                    background:
                      openFaq === i ? "rgba(255,255,255,0.04)" : "transparent",
                    color: openFaq === i ? "#4a9850" : "#f0f0ec",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onClick={() => toggleFaq(i)}
                >
                  {faq.q}
                  <span
                    className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[0.75rem] flex-shrink-0 transition-transform duration-300"
                    style={{
                      border: `1px solid ${openFaq === i ? "#4a9850" : "rgba(255,255,255,0.09)"}`,
                      color:
                        openFaq === i ? "#4a9850" : "rgba(240,240,236,0.45)",
                      transform: openFaq === i ? "rotate(180deg)" : "none",
                    }}
                  >
                    ▾
                  </span>
                </button>
                <div
                  className={`faq-answer text-[0.87rem] leading-[1.75] ${openFaq === i ? "open" : ""}`}
                  style={{ color: "rgba(240,240,236,0.45)" }}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="pt-16 pb-10 px-[5%]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div
          className="max-w-[1100px] mx-auto grid gap-12 pb-12"
          style={{ gridTemplateColumns: "1.6fr repeat(3, 1fr)" }}
        >
          <div>
            <Link
              href="#home"
              className="inline-flex items-center gap-2.5 no-underline mb-3"
            >
              <span className="text-[20px]">⛳</span>
              <span
                className="serif font-black text-[1.05rem] tracking-tight"
                style={{ color: "#f0f0ec" }}
              >
                Golf<span className="gold-gradient-text">Charity</span>
              </span>
            </Link>
            <p
              className="text-[0.85rem] leading-[1.75] max-w-[260px] mt-3"
              style={{ color: "rgba(240,240,236,0.45)" }}
            >
              Every round you play supports a cause that matters. Join a
              community of golfers doing good.
            </p>
          </div>

          {[
            {
              heading: "Platform",
              links: [
                { href: "#home", label: "Home" },
                { href: "#how", label: "How It Works" },
                { href: "#charities", label: "Charities" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "#", label: "Leaderboard" },
              ],
            },
            {
              heading: "Account",
              links: [
                { href: "/signup", label: "Sign Up" },
                { href: "/login", label: "Login" },
                { href: "/admin", label: "Admin Panel" },
                { href: "#", label: "My Profile" },
              ],
            },
            {
              heading: "Company",
              links: [
                { href: "#", label: "About Us" },
                { href: "#faq", label: "FAQ" },
                { href: "#", label: "Contact" },
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Terms of Service" },
              ],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h4
                className="text-[0.72rem] font-bold tracking-[0.12em] uppercase mb-4"
                style={{ color: "rgba(240,240,236,0.45)" }}
              >
                {col.heading}
              </h4>
              <ul className="list-none flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.87rem] no-underline transition-colors duration-200"
                      style={{ color: "rgba(240,240,236,0.5)" }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#f0f0ec")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "rgba(240,240,236,0.5)")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="max-w-[1100px] mx-auto flex flex-wrap gap-3 justify-between items-center text-[0.78rem] pt-6"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.09)",
            color: "rgba(240,240,236,0.25)",
          }}
        >
          <span>© 2025 GolfCharity Platform. All rights reserved.</span>
          <span>
            Made with <span style={{ color: "#e05c5c" }}>♥</span> for courses
            &amp; causes
          </span>
          <span className="flex gap-2">
            {["Privacy", "Terms", "Cookies"].map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                {i > 0 && <span>·</span>}
                <a
                  href="#"
                  className="no-underline transition-colors duration-200"
                  style={{ color: "rgba(240,240,236,0.35)" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "rgba(240,240,236,0.45)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "rgba(240,240,236,0.35)")
                  }
                >
                  {item}
                </a>
              </span>
            ))}
          </span>
        </div>
      </footer>
    </div>
  );
}
