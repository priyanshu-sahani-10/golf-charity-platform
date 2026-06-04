<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Golf Charity Platform</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --green: #3d8143;
      --green-light: #4a9850;
      --green-glow: rgba(74,152,74,0.18);
      --gold: #d4af37;
      --gold-dim: rgba(212,175,55,0.15);
      --bg: #0a1a0f;
      --bg2: #0d2012;
      --surface: rgba(255,255,255,0.04);
      --border: rgba(255,255,255,0.09);
      --text: #f0f0ec;
      --muted: rgba(240,240,236,0.45);
      --sans: 'DM Sans', sans-serif;
      --serif: 'Playfair Display', Georgia, serif;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--sans);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ───── NAVBAR ───── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5%;
      height: 66px;
      background: rgba(10,26,15,0.85);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border);
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .nav-logo span.icon { font-size: 22px; }
    .nav-logo span.name {
      font-family: var(--serif);
      font-weight: 900;
      font-size: 1.15rem;
      color: var(--text);
      letter-spacing: -0.01em;
    }
    .nav-logo span.name em {
      font-style: normal;
      background: linear-gradient(135deg, var(--green-light), var(--gold));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 6px;
      list-style: none;
    }
    .nav-links a {
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: var(--muted);
      padding: 7px 14px;
      border-radius: 8px;
      transition: color 0.2s, background 0.2s;
    }
    .nav-links a:hover { color: var(--text); background: var(--surface); }
    .nav-links a.btn-login {
      background: var(--green);
      color: #fff;
      font-weight: 600;
    }
    .nav-links a.btn-login:hover { background: var(--green-light); }
    .nav-links a.btn-signup {
      border: 1px solid var(--border);
      color: var(--text);
    }
    .nav-links a.btn-signup:hover { background: var(--surface); }

    /* hamburger */
    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 8px; }
    .hamburger span { display: block; width: 22px; height: 2px; background: var(--muted); border-radius: 2px; transition: 0.3s; }
    .mobile-menu {
      display: none;
      position: fixed;
      top: 66px; left: 0; right: 0;
      background: rgba(10,26,15,0.97);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: 16px 5% 20px;
      z-index: 99;
      flex-direction: column;
      gap: 4px;
    }
    .mobile-menu.open { display: flex; }
    .mobile-menu a {
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--muted);
      padding: 10px 14px;
      border-radius: 8px;
      transition: 0.2s;
    }
    .mobile-menu a:hover { color: var(--text); background: var(--surface); }

    /* ───── HERO ───── */
    #home {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: 100px 5% 80px;
      text-align: center;
    }

    .hero-bg1 {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 75% 55% at 50% -5%, rgba(74,152,74,0.22), transparent);
      pointer-events: none;
    }
    .hero-bg2 {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 40% 40% at 80% 85%, rgba(212,175,55,0.09), transparent);
      pointer-events: none;
    }
    .hero-grid {
      position: absolute; inset: 0; opacity: 0.035; pointer-events: none;
      background-image:
        linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .hero-inner {
      position: relative;
      max-width: 820px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 28px;
      animation: fadeUp 0.9s ease both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid rgba(212,175,55,0.4);
      background: rgba(212,175,55,0.09);
      padding: 6px 18px;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--gold);
    }
    .badge-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: var(--gold);
      animation: pulse 1.8s ease-in-out infinite;
    }
    @keyframes pulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50%      { opacity: 0.5; transform: scale(0.7); }
    }

    .hero-title {
      font-family: var(--serif);
      font-weight: 900;
      font-size: clamp(3rem, 7vw, 5.2rem);
      line-height: 1.06;
      letter-spacing: -0.02em;
      color: var(--text);
    }
    .hero-title .accent {
      display: inline-block;
      background: linear-gradient(135deg, var(--green-light) 0%, var(--gold) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-sub {
      font-size: 1.05rem;
      color: var(--muted);
      line-height: 1.75;
      max-width: 560px;
    }

    .hero-stats {
      display: flex;
      gap: 32px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 4px;
    }
    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .stat-num {
      font-family: var(--serif);
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text);
      line-height: 1;
    }
    .stat-label {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .hero-divider {
      width: 1px;
      height: 36px;
      background: var(--border);
    }

    .hero-ctas {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 28px;
      border-radius: 10px;
      font-family: var(--sans);
      font-weight: 600;
      font-size: 0.88rem;
      letter-spacing: 0.03em;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
      border: none;
    }
    .btn-primary {
      background: var(--green);
      color: #fff;
      box-shadow: 0 4px 20px rgba(61,129,67,0.35);
    }
    .btn-primary:hover { background: var(--green-light); transform: translateY(-1px); box-shadow: 0 8px 28px rgba(61,129,67,0.4); }
    .btn-ghost {
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-ghost:hover { background: rgba(255,255,255,0.08); transform: translateY(-1px); }
    .btn-gold {
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(212,175,55,0.3);
    }
    .btn-gold:hover { background: rgba(212,175,55,0.22); transform: translateY(-1px); }

    /* ───── SECTION SHARED ───── */
    section { padding: 96px 5%; }
    .section-label {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--green-light);
      margin-bottom: 14px;
    }
    .section-title {
      font-family: var(--serif);
      font-weight: 900;
      font-size: clamp(1.9rem, 4vw, 2.9rem);
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--text);
      margin-bottom: 16px;
    }
    .section-sub {
      font-size: 0.97rem;
      color: var(--muted);
      line-height: 1.75;
      max-width: 540px;
    }
    .divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
    }

    /* ───── HOW IT WORKS ───── */
    #how {
      background: var(--bg2);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .how-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2px;
      margin-top: 52px;
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
    }
    .how-card {
      background: var(--surface);
      padding: 36px 28px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: background 0.2s;
      position: relative;
    }
    .how-card:hover { background: rgba(255,255,255,0.07); }
    .how-card + .how-card { border-left: 1px solid var(--border); }
    @media (max-width: 680px) {
      .how-card + .how-card { border-left: none; border-top: 1px solid var(--border); }
    }
    .how-num {
      font-family: var(--serif);
      font-size: 2.4rem;
      font-weight: 900;
      color: var(--green-light);
      opacity: 0.35;
      line-height: 1;
    }
    .how-icon { font-size: 1.8rem; }
    .how-title {
      font-family: var(--serif);
      font-size: 1.12rem;
      font-weight: 700;
      color: var(--text);
    }
    .how-desc { font-size: 0.87rem; color: var(--muted); line-height: 1.7; }

    /* ───── CHARITIES ───── */
    #charities { padding: 96px 5%; }
    .charities-head { display: flex; flex-wrap: wrap; gap: 48px; align-items: flex-start; justify-content: space-between; margin-bottom: 52px; }
    .charity-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .charity-card {
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
      background: var(--surface);
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: border-color 0.2s, transform 0.2s;
    }
    .charity-card:hover { border-color: rgba(74,152,74,0.4); transform: translateY(-3px); }
    .charity-icon { font-size: 2rem; }
    .charity-name { font-family: var(--serif); font-size: 1rem; font-weight: 700; color: var(--text); }
    .charity-desc { font-size: 0.83rem; color: var(--muted); line-height: 1.65; }
    .charity-raised {
      margin-top: auto;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--green-light);
      text-transform: uppercase;
    }

    /* ───── FAQs ───── */
    #faq {
      background: var(--bg2);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .faq-layout {
      display: grid;
      grid-template-columns: 1fr 1.6fr;
      gap: 72px;
      align-items: start;
      margin-top: 0;
    }
    @media (max-width: 820px) {
      .faq-layout { grid-template-columns: 1fr; gap: 40px; }
    }
    .faq-list { display: flex; flex-direction: column; gap: 2px; }
    .faq-item {
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
    }
    .faq-q {
      width: 100%;
      background: none;
      border: none;
      text-align: left;
      padding: 18px 20px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      font-family: var(--sans);
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--text);
      transition: background 0.2s;
    }
    .faq-q:hover { background: var(--surface); }
    .faq-q.open { background: var(--surface); color: var(--green-light); }
    .faq-arrow {
      width: 18px; height: 18px;
      border-radius: 50%;
      border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.75rem;
      flex-shrink: 0;
      transition: transform 0.3s;
      color: var(--muted);
    }
    .faq-q.open .faq-arrow { transform: rotate(180deg); border-color: var(--green-light); color: var(--green-light); }
    .faq-a {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease, padding 0.25s;
      font-size: 0.87rem;
      color: var(--muted);
      line-height: 1.75;
      padding: 0 20px;
    }
    .faq-a.open { max-height: 300px; padding: 0 20px 18px; }

    /* ───── FOOTER ───── */
    footer {
      padding: 64px 5% 40px;
      border-top: 1px solid var(--border);
    }
    .footer-top {
      display: grid;
      grid-template-columns: 1.6fr repeat(3, 1fr);
      gap: 48px;
      padding-bottom: 48px;
    }
    @media (max-width: 820px) {
      .footer-top { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 520px) {
      .footer-top { grid-template-columns: 1fr; }
    }
    .footer-brand p {
      font-size: 0.85rem;
      color: var(--muted);
      line-height: 1.75;
      margin-top: 12px;
      max-width: 260px;
    }
    .footer-col h4 {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 16px;
    }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col a {
      text-decoration: none;
      font-size: 0.87rem;
      color: rgba(240,240,236,0.5);
      transition: color 0.2s;
    }
    .footer-col a:hover { color: var(--text); }
    .footer-bottom {
      border-top: 1px solid var(--border);
      padding-top: 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: space-between;
      align-items: center;
      font-size: 0.78rem;
      color: rgba(240,240,236,0.25);
    }
    .footer-bottom a { color: rgba(240,240,236,0.35); text-decoration: none; }
    .footer-bottom a:hover { color: var(--muted); }
    .footer-heart { color: #e05c5c; }
  </style>
</head>
<body>

<!-- ── NAVBAR ── -->
<nav>
  <a href="#home" class="nav-logo">
    <span class="icon">⛳</span>
    <span class="name">Golf<em>Charity</em></span>
  </a>
  <ul class="nav-links" id="navLinks">
    <li><a href="#home">Home</a></li>
    <li><a href="#how">How It Works</a></li>
    <li><a href="#charities">Charities</a></li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#" class="btn-signup">Sign Up</a></li>
    <li><a href="#" class="btn-login">Login</a></li>
  </ul>
  <div class="hamburger" id="hamburger" onclick="toggleMenu()">
    <span></span><span></span><span></span>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="#home" onclick="toggleMenu()">Home</a>
  <a href="#how" onclick="toggleMenu()">How It Works</a>
  <a href="#charities" onclick="toggleMenu()">Charities</a>
  <a href="#faq" onclick="toggleMenu()">FAQ</a>
  <a href="#" onclick="toggleMenu()">Sign Up</a>
  <a href="#" onclick="toggleMenu()">Login</a>
</div>

<!-- ── HERO ── -->
<section id="home">
  <div class="hero-bg1"></div>
  <div class="hero-bg2"></div>
  <div class="hero-grid"></div>

  <div class="hero-inner">
    <div class="badge"><span class="badge-dot"></span>Charity Edition · 2025</div>

    <h1 class="hero-title">
      Play Golf.<br>
      <span class="accent">Change Lives.</span>
    </h1>

    <p class="hero-sub">
      Every round you play raises real money for causes that matter.
      Join thousands of golfers making an impact — one hole at a time.
    </p>

    <div class="hero-stats">
      <div class="stat">
        <span class="stat-num">$2.4M</span>
        <span class="stat-label">Raised</span>
      </div>
      <div class="hero-divider"></div>
      <div class="stat">
        <span class="stat-num">14,200</span>
        <span class="stat-label">Players</span>
      </div>
      <div class="hero-divider"></div>
      <div class="stat">
        <span class="stat-num">38</span>
        <span class="stat-label">Charities</span>
      </div>
    </div>

    <div class="hero-ctas">
      <a href="#" class="btn btn-primary">⛳ Start Playing</a>
      <a href="#how" class="btn btn-ghost">Learn How It Works</a>
      <a href="#charities" class="btn btn-gold">View Charities</a>
    </div>
  </div>
</section>

<!-- ── HOW IT WORKS ── -->
<section id="how">
  <div style="max-width:900px; margin:0 auto; text-align:center;">
    <span class="section-label">The Process</span>
    <h2 class="section-title">How It Works</h2>
    <p class="section-sub" style="margin:0 auto;">
      Simple, transparent, and impactful. Here's how your game becomes a force for good.
    </p>
  </div>

  <div class="how-grid" style="max-width:900px; margin:52px auto 0;">
    <div class="how-card">
      <span class="how-num">01</span>
      <span class="how-icon">🏌️</span>
      <div class="how-title">Sign Up &amp; Choose a Charity</div>
      <div class="how-desc">Create a free account and pick from our curated list of verified charitable organisations you want to support.</div>
    </div>
    <div class="how-card">
      <span class="how-num">02</span>
      <span class="how-icon">📋</span>
      <div class="how-title">Join or Create a Tournament</div>
      <div class="how-desc">Browse upcoming charity golf events, join a team, or organise your own fundraising round with friends.</div>
    </div>
    <div class="how-card">
      <span class="how-num">03</span>
      <span class="how-icon">🎯</span>
      <div class="how-title">Play &amp; Track Your Scores</div>
      <div class="how-desc">Submit your scores after each round. Every stroke and birdie auto-converts into a donation pledge.</div>
    </div>
    <div class="how-card">
      <span class="how-num">04</span>
      <span class="how-icon">💚</span>
      <div class="how-title">Funds Go Directly to Charity</div>
      <div class="how-desc">100% of your pledges transfer to your chosen cause. Get a receipt, a leaderboard spot, and a good conscience.</div>
    </div>
  </div>
</section>

<!-- ── CHARITIES ── -->
<section id="charities">
  <div class="charities-head">
    <div>
      <span class="section-label">Who We Support</span>
      <h2 class="section-title">Featured Charities</h2>
      <p class="section-sub">Every organisation is vetted, transparent, and deeply grateful for your fairways.</p>
    </div>
    <a href="#" class="btn btn-ghost" style="white-space:nowrap; align-self:flex-end;">View All 38 →</a>
  </div>

  <div class="charity-cards" style="max-width:1100px; margin:0 auto;">
    <div class="charity-card">
      <span class="charity-icon">🌱</span>
      <div class="charity-name">GreenRoots Foundation</div>
      <div class="charity-desc">Planting trees in deforested regions and restoring biodiversity across 12 countries.</div>
      <div class="charity-raised">$340K raised</div>
    </div>
    <div class="charity-card">
      <span class="charity-icon">🏥</span>
      <div class="charity-name">Rural Health Initiative</div>
      <div class="charity-desc">Bringing free medical care and essential medicines to underserved rural communities.</div>
      <div class="charity-raised">$512K raised</div>
    </div>
    <div class="charity-card">
      <span class="charity-icon">📚</span>
      <div class="charity-name">Books for All</div>
      <div class="charity-desc">Building libraries and funding literacy programmes in low-income schools worldwide.</div>
      <div class="charity-raised">$198K raised</div>
    </div>
    <div class="charity-card">
      <span class="charity-icon">💧</span>
      <div class="charity-name">Clean Water Project</div>
      <div class="charity-desc">Installing purification systems and drilling wells in drought-affected communities.</div>
      <div class="charity-raised">$427K raised</div>
    </div>
  </div>
</section>

<!-- ── FAQ ── -->
<section id="faq">
  <div class="faq-layout" style="max-width:1000px; margin:0 auto;">
    <div>
      <span class="section-label">Got Questions?</span>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-sub">Everything you need to know about playing golf for charity.</p>
      <a href="#" class="btn btn-ghost" style="margin-top:28px; display:inline-flex;">Contact Support →</a>
    </div>

    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          Is it free to join?
          <span class="faq-arrow">▾</span>
        </button>
        <div class="faq-a">Yes, creating an account and joining charity rounds is completely free. You only contribute a donation pledge when you play — and you choose the amount. There are no hidden fees or subscription costs.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          How are charities verified?
          <span class="faq-arrow">▾</span>
        </button>
        <div class="faq-a">Every charity on our platform goes through a rigorous vetting process. We verify legal registration, financial transparency, and impact reporting before any organisation is listed. We re-verify annually.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          Can I organise my own tournament?
          <span class="faq-arrow">▾</span>
        </button>
        <div class="faq-a">Absolutely! Any registered user can create a charity tournament, invite friends or colleagues, set pledge structures, and choose a beneficiary. Our dashboard makes it straightforward to manage the whole event.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          How do donations actually get transferred?
          <span class="faq-arrow">▾</span>
        </button>
        <div class="faq-a">Pledges are processed via our secure payment partner after each round is submitted. Funds are transferred directly to the charity's verified bank account within 5–7 business days. You'll receive a confirmation receipt.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          What prizes can I win?
          <span class="faq-arrow">▾</span>
        </button>
        <div class="faq-a">Top players on our global and event leaderboards win golf equipment, exclusive club memberships, experiences, and merchandise from our sponsor partners. Prizes are awarded monthly and after major events.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          Is my handicap taken into account?
          <span class="faq-arrow">▾</span>
        </button>
        <div class="faq-a">Yes! All scoring on the platform supports Stableford, net stroke play, and gross stroke play formats. You can enter your official handicap index and all leaderboards adjust accordingly for fair competition.</div>
      </div>
    </div>
  </div>
</section>

<!-- ── FOOTER ── -->
<footer>
  <div class="footer-top" style="max-width:1100px; margin:0 auto;">
    <div class="footer-brand">
      <a href="#home" class="nav-logo" style="display:inline-flex; margin-bottom:0;">
        <span class="icon" style="font-size:20px;">⛳</span>
        <span class="name" style="font-family:'Playfair Display',serif; font-weight:900; font-size:1.05rem; color:var(--text);">Golf<em style="font-style:normal; background:linear-gradient(135deg,#4a9850,#d4af37); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Charity</em></span>
      </a>
      <p>Every round you play supports a cause that matters. Join a community of golfers doing good.</p>
    </div>

    <div class="footer-col">
      <h4>Platform</h4>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#how">How It Works</a></li>
        <li><a href="#charities">Charities</a></li>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Leaderboard</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Account</h4>
      <ul>
        <li><a href="#">Sign Up</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">Admin Panel</a></li>
        <li><a href="#">My Profile</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom" style="max-width:1100px; margin:0 auto;">
    <span>© 2025 GolfCharity Platform. All rights reserved.</span>
    <span>Made with <span class="footer-heart">♥</span> for courses &amp; causes</span>
    <span>
      <a href="#">Privacy</a> &nbsp;·&nbsp;
      <a href="#">Terms</a> &nbsp;·&nbsp;
      <a href="#">Cookies</a>
    </span>
  </div>
</footer>

<script>
  function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
  }

  function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-q.open').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  }

  // close mobile menu on outside click
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const hb = document.getElementById('hamburger');
    if (menu.classList.contains('open') && !menu.contains(e.target) && !hb.contains(e.target)) {
      menu.classList.remove('open');
    }
  });

  // highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) cur = s.id;
    });
    links.forEach(l => {
      l.style.color = l.getAttribute('href') === '#' + cur ? 'var(--text)' : '';
    });
  });
</script>
</body>
</html>