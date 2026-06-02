import Link from "next/link"
import { Metadata } from "next"
import { Calendar, Zap, TrendingUp, Shield, Target, Wifi, WifiOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MatchCard } from "@/components/match-card"
import { cn } from "@/lib/utils"
import { fetchTodaysMatches, fetchUpcomingMatches, checkApiStatus } from "@/lib/data-api"
import { getFeaturedBookmakers, getTeamById, getConfidenceLevel } from "@/lib/data"

export const metadata: Metadata = {
  title: "Today's Predictions",
  description: "Get today's AI-powered match predictions. Safest bets, accumulators, and recommended odds for today's matches.",
  openGraph: {
    title: "Today's Predictions | GoalOracle AI",
    description: "Get today's AI-powered match predictions and betting tips.",
  },
}

export const revalidate = 60 // Revalidate every minute

export default async function TodayPredictionsPage() {
  const [todayMatches, apiStatus] = await Promise.all([
    fetchTodaysMatches(),
    checkApiStatus(),
  ])

  // If no matches today, fall back to upcoming matches so the page is never empty
  const displayMatches = todayMatches.length > 0
    ? todayMatches
    : await fetchUpcomingMatches(6)

  const bookmakers = getFeaturedBookmakers()

  // Calculate safest bets (highest confidence)
  const safestBets = displayMatches
    .filter(m => m.prediction.confidence >= 55)
    .slice(0, 4)

  const accumulatorOdds = safestBets.reduce((acc, match) => {
    const odds = match.prediction.winner === "home"
      ? match.odds[0].home
      : match.prediction.winner === "away"
        ? match.odds[0].away
        : match.odds[0].draw
    return acc * odds
  }, 1)

  const confidenceColors = {
    high: "bg-primary/10 text-primary border-primary/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-destructive/10 text-destructive border-destructive/20",
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* API Status */}
      {apiStatus.available ? (
        <div className="mb-6 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
          <Wifi className="h-4 w-4" />
          <span>Live data — {apiStatus.matchCount} matches available</span>
        </div>
      ) : (
        <div className="mb-6 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
          <WifiOff className="h-4 w-4" />
          <span>Using cached data</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-2 gap-1">
          <Calendar className="h-3 w-3" />
          Today
        </Badge>
        <h1 className="text-3xl font-bold lg:text-4xl">Today&apos;s Predictions</h1>
        <p className="mt-2 text-muted-foreground">
          AI-powered match predictions and betting tips for{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Matches */}
          <section>
            <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              {todayMatches.length > 0 ? "Today's Matches" : "Upcoming Matches"}
            </h2>

            {displayMatches.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-12 text-center">
                <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Matches Scheduled</h3>
                <p className="text-muted-foreground text-sm">
                  There are no matches scheduled for today. Check back during the tournament.
                </p>
                <Button asChild className="mt-6" variant="outline">
                  <Link href="/predictions">View All Predictions</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {displayMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </section>

          {/* Safest Bets */}
          {safestBets.length > 0 && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Safest Bets Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    Our highest confidence predictions for today. These picks have the best
                    risk/reward ratio based on our AI analysis.
                  </p>

                  <div className="space-y-4">
                    {safestBets.map((match) => {
                      // Use live API team names when available, fall back to mock lookup
                      const apiData = (match as any)._apiData
                      const homeTeamName = apiData?.homeTeamName || getTeamById(match.homeTeam)?.name || match.homeTeam
                      const awayTeamName = apiData?.awayTeamName || getTeamById(match.awayTeam)?.name || match.awayTeam
                      const homeFlag = apiData?.homeTeamCrest || getTeamById(match.homeTeam)?.flag || "⚽"
                      const awayFlag = apiData?.awayTeamCrest || getTeamById(match.awayTeam)?.flag || "⚽"
                      const confidenceLevel = getConfidenceLevel(match.prediction.confidence)
                      const isImageUrl = (s: string) => s.startsWith("http")

                      return (
                        <Link key={match.id} href={`/predictions/${match.slug}`}>
                          <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-smooth hover:border-primary/50 hover:bg-secondary/50">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                {isImageUrl(homeFlag) ? (
                                  <img src={homeFlag} alt={homeTeamName} className="h-6 w-6 rounded-full object-cover" />
                                ) : (
                                  <span className="text-2xl">{homeFlag}</span>
                                )}
                                <span className="text-sm text-muted-foreground">vs</span>
                                {isImageUrl(awayFlag) ? (
                                  <img src={awayFlag} alt={awayTeamName} className="h-6 w-6 rounded-full object-cover" />
                                ) : (
                                  <span className="text-2xl">{awayFlag}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {match.prediction.winner === "home" && `${homeTeamName} Win`}
                                  {match.prediction.winner === "away" && `${awayTeamName} Win`}
                                  {match.prediction.winner === "draw" && "Draw"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {homeTeamName} vs {awayTeamName}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-primary">
                                {(match.prediction.winner === "home"
                                  ? match.odds[0].home
                                  : match.prediction.winner === "away"
                                    ? match.odds[0].away
                                    : match.odds[0].draw
                                ).toFixed(2)}
                              </span>
                              <Badge className={cn("text-xs", confidenceColors[confidenceLevel])}>
                                {match.prediction.confidence}%
                              </Badge>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Value Bets */}
          {displayMatches.length > 0 && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Value Bets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    Bets where we believe the odds offered are higher than the true probability
                    suggests.
                  </p>

                  <div className="space-y-3">
                    {displayMatches.slice(0, 3).map((match) => {
                      const apiData = (match as any)._apiData
                      const homeTeamName = apiData?.homeTeamName || getTeamById(match.homeTeam)?.name || match.homeTeam
                      const awayTeamName = apiData?.awayTeamName || getTeamById(match.awayTeam)?.name || match.awayTeam
                      const bet = match.suggestedBets[1] || match.suggestedBets[0]

                      return (
                        <div key={match.id} className="rounded-lg bg-secondary/50 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">
                              {homeTeamName} vs {awayTeamName}
                            </span>
                            <Badge variant="outline">{bet?.type}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{bet?.selection}</span>
                            <span className="text-lg font-bold text-primary">
                              {bet?.odds.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Accumulator */}
          {safestBets.length > 0 && (
            <Card className="border-primary/50">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Daily Accumulator
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground">Combined Odds</p>
                  <p className="text-4xl font-bold text-primary">{accumulatorOdds.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    $10 returns ${(10 * accumulatorOdds).toFixed(2)}
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 mb-6">
                  {safestBets.map((match) => {
                    const apiData = (match as any)._apiData
                    const homeTeamName = apiData?.homeTeamName || getTeamById(match.homeTeam)?.name || match.homeTeam
                    const awayTeamName = apiData?.awayTeamName || getTeamById(match.awayTeam)?.name || match.awayTeam
                    const homeFlag = apiData?.homeTeamCrest || getTeamById(match.homeTeam)?.flag
                    const awayFlag = apiData?.awayTeamCrest || getTeamById(match.awayTeam)?.flag
                    const isImageUrl = (s?: string) => s?.startsWith("http")

                    return (
                      <div key={match.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {isImageUrl(homeFlag) ? (
                            <img src={homeFlag} alt="" className="h-5 w-5 rounded-full object-cover" />
                          ) : (
                            <span>{homeFlag}</span>
                          )}
                          <span className="text-muted-foreground">vs</span>
                          {isImageUrl(awayFlag) ? (
                            <img src={awayFlag} alt="" className="h-5 w-5 rounded-full object-cover" />
                          ) : (
                            <span>{awayFlag}</span>
                          )}
                        </div>
                        <span className="font-medium">
                          {match.prediction.winner === "home" && (apiData?.homeTeamTla || homeTeamName)}
                          {match.prediction.winner === "away" && (apiData?.awayTeamTla || awayTeamName)}
                          {match.prediction.winner === "draw" && "Draw"}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <Button asChild className="w-full">
                  <Link href={bookmakers[0]?.url || "#"} target="_blank">
                    Place Accumulator
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Recommended at {bookmakers[0]?.name}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Bookmaker Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Place Your Bets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {bookmakers.map((bm) => (
                <Button key={bm.id} asChild variant="outline" className="w-full justify-between">
                  <Link href={bm.url} target="_blank">
                    <span>{bm.name}</span>
                    <span className="text-xs text-primary">{bm.bonusValue}</span>
                  </Link>
                </Button>
              ))}

              <Button asChild variant="ghost" className="w-full mt-2">
                <Link href="/betting-sites">View All Bookmakers</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-secondary/30">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground text-center">
                18+ only. Gambling involves risk. Past performance does not guarantee future
                results. Please bet responsibly. If you have a gambling problem, seek help at
                BeGambleAware.org.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
