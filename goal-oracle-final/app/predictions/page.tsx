import { Search, Wifi, WifiOff } from "lucide-react"
import { Metadata } from "next"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MatchCard } from "@/components/match-card"
import { fetchAllMatches, checkApiStatus } from "@/lib/data-api"

export const metadata: Metadata = {
  title: "All Match Predictions",
  description: "Browse all AI-powered FIFA World Cup 2026 match predictions. Get expert analysis, betting tips, and odds comparison for every match.",
  openGraph: {
    title: "All Match Predictions | GoalOracle AI",
    description: "Browse all AI-powered FIFA World Cup 2026 match predictions.",
  },
}

export const revalidate = 60 // Revalidate every minute

export default async function PredictionsPage() {
  const [matches, apiStatus] = await Promise.all([
    fetchAllMatches(),
    checkApiStatus(),
  ])
  
  const groupStageMatches = matches.filter(m => 
    m.stage.toLowerCase().includes('group') || 
    m.stage.toLowerCase().includes('regular')
  )
  const knockoutMatches = matches.filter(m => 
    !m.stage.toLowerCase().includes('group') && 
    !m.stage.toLowerCase().includes('regular')
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* API Status */}
      {apiStatus.available ? (
        <div className="mb-6 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
          <Wifi className="h-4 w-4" />
          <span>Live data - {matches.length} matches loaded</span>
        </div>
      ) : (
        <div className="mb-6 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
          <WifiOff className="h-4 w-4" />
          <span>Using cached data</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-2">Predictions</Badge>
        <h1 className="text-3xl font-bold lg:text-4xl">All Match Predictions</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our AI-powered predictions for all FIFA World Cup 2026 matches
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search matches..." 
            className="pl-10"
          />
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-2">No Matches Available</h2>
          <p className="text-muted-foreground">
            Match data will be available when the tournament schedule is released.
          </p>
        </div>
      ) : (
        <>
          {/* Knockout Stage */}
          {knockoutMatches.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">Knockout Stage</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {knockoutMatches.map((match) => (
                  <MatchCard key={match.id} match={match} variant="featured" />
                ))}
              </div>
            </section>
          )}

          {/* Group Stage */}
          {groupStageMatches.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold">Group Stage</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groupStageMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>
          )}

          {/* If neither filter matched, show all */}
          {knockoutMatches.length === 0 && groupStageMatches.length === 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold">All Matches</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
