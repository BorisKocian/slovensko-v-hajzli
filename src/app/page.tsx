import { Leaderboard } from '@/components/Leaderboard'
import { Podium } from '@/components/Podium'
import { ToiletButton } from '@/components/ToiletButton'
import { Menu } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import Image from "next/image";

export interface LeaderboardEntry {
  id: string
  name: string
  slug: string
  party: string | null
  role: string | null
  image_url: string | null
  total_votes: number
  today_votes: number
  week_votes: number
}

export default async function Home() {
  const supabase = await createClient()

  const { data: leaderboardData } = await supabase
    .from('leaderboard')
    .select('*')
    .order('total_votes', { ascending: false })

  const entries: LeaderboardEntry[] = leaderboardData ?? []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-to-r from-brand to-brand-secondary px-4 py-4 flex items-center justify-between">
        <button className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-white text-3xl">Slovensko v Hajzli</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </nav>

      {/* Main Content */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Podium entries={entries} />
          <Leaderboard entries={entries} />
        </div>
      </div>

      {/* Fixed Toilet Button */}
      <div className="fixed bottom-6 right-6">
        <ToiletButton state={'hungry'}/>
      </div>
    </div>
  )
}
