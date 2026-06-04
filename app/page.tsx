import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="text-7xl mb-6">⛳</div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Golf Charity
            <span className="block text-yellow-400">Platform</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Play golf, support charities, and win exciting prizes through
            our subscription-based charity platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">🏌️ Play Golf</h3>
            <p className="text-gray-300">
              Submit your golf scores and participate in prize draws.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">❤️ Support Charity</h3>
            <p className="text-gray-300">
              A portion of every subscription goes directly to charity.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">🏆 Win Prizes</h3>
            <p className="text-gray-300">
              Match draw numbers with your scores and win cash prizes.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Get Started
            </Button>
          </Link>

          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Login
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Dashboard
            </Button>
          </Link>

          <Link href="/admin">
            <Button
              size="lg"
              variant="destructive"
              className="w-full sm:w-auto"
            >
              Admin
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-20 text-center">
          <div>
            <h2 className="text-3xl font-bold text-yellow-400">20%</h2>
            <p className="text-gray-400">Charity Donation</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-yellow-400">45</h2>
            <p className="text-gray-400">Golf Score Range</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-yellow-400">5</h2>
            <p className="text-gray-400">Draw Numbers</p>
          </div>
        </div>
      </div>
    </main>
  );
}