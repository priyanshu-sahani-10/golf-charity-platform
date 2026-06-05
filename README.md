# ⛳ Golf Charity Platform

## 🌐 Live Demo

https://golf-charity-platform-xi-eight.vercel.app/

A full-stack charity subscription platform where users support charitable causes through memberships while participating in golf-based prize draws.

Built as an internship assignment using Next.js, TypeScript, Supabase, Tailwind CSS, and Razorpay.

---

## 🚀 Overview

Golf Charity Platform combines charitable giving with gamified engagement.

Users select a charity, purchase a subscription, enter golf scores, and participate in prize draws. A portion of every subscription is donated to charity while the remaining amount contributes to a prize pool distributed among winners.

The platform includes:

* User authentication
* Charity management
* Subscription management
* Donation tracking
* Golf score submissions
* Automated draw generation
* Winner detection
* Weighted prize distribution
* Admin dashboard
* User dashboard

---

## 🔄 Platform Flow

```txt
Signup
↓
Verify Email
↓
Login
↓
Select Charity
↓
Purchase Subscription
↓
Donation Created
↓
Prize Pool Updated
↓
Submit Golf Scores
↓
Admin Creates Draw
↓
Winner Detection
↓
Prize Distribution
```
---

## ✨ Features

### User Features

* Secure signup and login
* Email verification
* Automatic profile creation
* Charity selection
* Monthly and yearly subscriptions
* Razorpay payment integration
* Golf score submission
* View latest scores
* View winnings history
* Track contributions and subscriptions

### Admin Features

* Dashboard analytics
* Charity management
* User management
* Create prize draws
* View draw history
* Winner management
* Prize pool monitoring

---

## 🏗 Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS

### Backend

* Supabase

  * Authentication
  * PostgreSQL Database
  * Row Level Security (RLS)

### Payments

* Razorpay Test Mode

### Deployment

* Vercel

---

## 📊 Business Logic

### Subscription Distribution

Every subscription payment is split automatically:

```txt
20% → Charity Donation
80% → Prize Pool
```

Example:

```txt
₹99 Subscription

₹19.80 → Donation
₹79.20 → Prize Pool
```

---

## ⛳ Golf Score System

Users submit golf scores ranging from:

```txt
1 – 45
```

The system keeps only the latest:

```txt
5 Scores
```

Older scores are automatically removed.

---

## 🎯 Draw System

Admins can create a new draw.

Each draw generates:

```txt
5 Unique Numbers
Range: 1–45
```

These numbers are stored and compared against user golf scores.

---

## 🏆 Winner Detection

Example:

```txt
User Scores:
10 18 20 25 30

Draw Numbers:
12 18 20 25 30

Matches = 4
```

Matching is based on:

```txt
Number Match Only
Position Does Not Matter
```

---

## ⚖️ Weighted Prize Distribution

Winner weights:

```txt
5 Matches → Weight 5
4 Matches → Weight 3
1–3 Matches → Weight 1
```

Prize pools are distributed proportionally based on winner weight.

---

## 🔄 Rollover Logic

If a draw produces no winners:

```txt
Prize Pool
↓
Not Distributed
↓
Rolls Over To Next Draw
```

---

## 🔐 Authentication Flow

```txt
Signup
↓
Verify Email
↓
Login
↓
Profile Auto Creation
↓
Dashboard Access
```

---

## 🗄 Database Schema

### Tables

```txt
profiles
charities
subscriptions
donations
golf_scores
draws
winners
prize_pools
```

---

## 👤 User Dashboard

Displays:

* Profile Information
* Subscription Status
* Selected Charity
* Contribution Breakdown
* Golf Scores
* Winnings History

---

## 🛠 Admin Dashboard

Displays:

* Total Users
* Active Subscriptions
* Donations
* Draw Management
* User Management
* Charity Management
* Winners Overview

---

## 🔒 Security

Implemented using Supabase Row Level Security (RLS).

Protected areas include:

* Profiles
* Subscriptions
* Donations
* Golf Scores
* Winners
* Prize Pools

Role-based access control ensures admin-only functionality remains protected.

---

## 🚀 Local Setup

Clone the repository:

```bash
git clone https://github.com/priyanshu-sahani-10/golf-charity-platform.git
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Start production build:

```bash
npm run start
```

---

## 📈 Future Enhancements

* Winner payout workflow
* Draw history analytics
* Charity performance dashboard
* Email notifications
* Enhanced reporting
* Multi-admin support

---

The platform is fully functional and supports the complete flow from user registration to prize distribution.
