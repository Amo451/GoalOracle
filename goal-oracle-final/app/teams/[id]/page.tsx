import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { 
  ArrowLeft, 
  ChevronRight, 
  Trophy, 
  TrendingUp, 
  TrendingDown,
  Users,
  Star,
  Target,
  MapPin,
  Calendar,
  Shield,
  Award,
  Activity,
  ClipboardList,
  AlertCircle,
  Footprints,
  History,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { teams, matches, getTeamById } from "@/lib/data"

interface Props {
  params: Promise<{ id: string }>
}

// Define league types for better organization
const LEAGUES = {
  PREMIER_LEAGUE: 'Premier League',
  LA_LIGA: 'La Liga',
  BUNDESLIGA: 'Bundesliga',
  SERIE_A: 'Serie A',
  LIGUE_1: 'Ligue 1',
  EREDIVISIE: 'Eredivisie',
  PRIMEIRA_LIGA: 'Primeira Liga'
} as const

type League = typeof LEAGUES[keyof typeof LEAGUES]

export async function generateStaticParams() {
  return teams.map((team) => ({
    id: team.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const team = getTeamById(id)
  
  if (!team) {
    return { title: "Team Not Found" }
  }

  return {
    title: `${team.name} | European Football Analysis & Predictions | Goal Oracle`,
    description: `Comprehensive analysis of ${team.name} including squad overview, league performance, form guide, strengths, weaknesses, star players, and AI-powered predictions for upcoming European league matches.`,
    openGraph: {
      title: `${team.name} | European League Analysis | Goal Oracle AI`,
      description: `Professional football analysis for ${team.name} featuring AI-powered predictions, performance metrics, and match insights from European leagues.`,
    },
  }
}

export default async function TeamPage({ params }: Props) {
  const { id } = await params
  const team = getTeamById(id)
  
  if (!team) {
    notFound()
  }

  // Safe league name with fallback
  const leagueName = team.league || 'European League'
  const leagueSlug = leagueName.toLowerCase().replace(/\s+/g, '-')

  // Get all matches for this team with safe fallback
  const teamMatches = (matches || []).filter(
    m => m.homeTeam === team.id || m.awayTeam === team.id
  )

  // Calculate home/away performance metrics
  const homeMatches = teamMatches.filter(m => m.homeTeam === team.id)
  const awayMatches = teamMatches.filter(m => m.awayTeam === team.id)

  const homeWinRate = homeMatches.length > 0 
    ? (homeMatches.filter(m => m.result === 'W').length / homeMatches.length * 100).toFixed(1)
    : '0'

  const awayWinRate = awayMatches.length > 0
    ? (awayMatches.filter(m => m.result === 'W').length / awayMatches.length * 100).toFixed(1)
    : '0'

  // Calculate form trend (last 5 matches)
  const formTrend = (team.form || []).slice(0, 5)
  const formPoints = formTrend.reduce((acc, result) => {
    if (result === 'W') return acc + 3
    if (result === 'D') return acc + 1
    return acc
  }, 0)

  // Get top scorers from team data with fallback
  const topScorers = team.topScorers || [
    { name: 'Player 1', goals: 12, assists: 4 },
    { name: 'Player 2', goals: 8, assists: 6 },
    { name: 'Player 3', goals: 7, assists: 3 },
  ]

  // Get recent results (last 5 matches with opponents and scores)
  const recentResults = teamMatches.slice(0, 5).map(match => {
    const opponent = match.homeTeam === team.id 
      ? getTeamById(match.awayTeam) 
      : getTeamById(match.homeTeam)
    const isHome = match.homeTeam === team.id
    const scored = match.homeTeam === team.id ? match.homeScore : match.awayScore
    const conceded = match.homeTeam === team.id ? match.awayScore : match.homeScore
    
    return {
      opponent: opponent?.name || 'Unknown',
      opponentFlag: opponent?.flag || '🏳️',
      isHome,
      scored: scored || 0,
      conceded: conceded || 0,
      result: scored > conceded ? 'W' : scored < conceded ? 'L' : 'D',
      date: match.date || 'TBD'
    }
  })

  // Safe stats with fallbacks
  const stats = team.stats || { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0 }
  const totalGames = (stats.wins || 0) + (stats.draws || 0) + (stats.losses || 0) || 1

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/leagues" className="hover:text-foreground transition-colors">Leagues</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/leagues/${leagueSlug}`} className="hover:text-foreground transition-colors">
          {leagueName}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{team.name}</span>
      </nav>

      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6 gap-2 hover:bg-secondary">
        <Link href={`/leagues/${leagueSlug}`}>
          <ArrowLeft className="h-4 w-4" />
          Back to {leagueName}
        </Link>
      </Button>

      {/* Team Header */}
      <Card className="mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <CardContent className="relative p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <span className="text-7xl lg:text-9xl select-none">{team.flag || '🏳️'}</span>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold lg:text-4xl">{team.name}</h1>
                <Badge variant="secondary" className="gap-1">
                  <Award className="h-3 w-3" />
                  {leagueName}
                </Badge>
                {team.code && <Badge variant="outline">{team.code}</Badge>}
              </div>
              
              <p className="text-muted-foreground mb-4 max-w-2xl">{team.description || `Professional football team competing in ${leagueName}.`}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="text-center p-3 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold">#{team.ranking || 'N/A'}</p>
                  <p className="text-xs text-muted-foreground">League Position</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold text-primary">{team.powerRating || 0}%</p>
                  <p className="text-xs text-muted-foreground">Power Rating</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold text-emerald-500">{stats.goalsFor || 0}</p>
                  <p className="text-xs text-muted-foreground">Goals Scored</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold text-rose-500">{stats.goalsAgainst || 0}</p>
                  <p className="text-xs text-muted-foreground">Goals Conceded</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold">±{stats.goalDifference || 0}</p>
                  <p className="text-xs text-muted-foreground">Goal Difference</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Latest Team Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Latest Team Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Form */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Current Form
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex gap-2 mb-2">
                      {formTrend.length > 0 ? (
                        formTrend.map((result, index) => (
                          <span
                            key={index}
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                              result === 'W' && "bg-emerald-500 text-white",
                              result === 'D' && "bg-amber-500 text-white",
                              result === 'L' && "bg-rose-500 text-white"
                            )}
                          >
                            {result}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No recent matches</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formPoints} points from last {formTrend.length || 0} matches
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="font-medium">
                        {formTrend.length > 0 ? ((formTrend.filter(r => r === 'W').length / formTrend.length) * 100).toFixed(0) : 0}%
                      </span>
                    </div>
                    <Progress 
                      value={formTrend.length > 0 ? (formTrend.filter(r => r === 'W').length / formTrend.length) * 100 : 0} 
                      className="h-2" 
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Goals/Game</span>
                      <span className="font-medium">
                        {(stats.goalsFor / totalGames).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tactical Style */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  Tactical Style
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Formation</span>
                      <span className="font-medium">{team.formation || '4-3-3'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Playing Style</span>
                      <span className="font-medium">{team.playingStyle || 'Possession-based'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Attack Focus</span>
                      <span className="font-medium">{team.attackFocus || 'Wide play'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Defensive Style</span>
                      <span className="font-medium">{team.defensiveStyle || 'High press'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Key Injuries */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-500" />
                  Key Injuries & Suspensions
                </h4>
                {team.injuries && team.injuries.length > 0 ? (
                  <div className="space-y-2">
                    {team.injuries.map((injury, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div>
                          <p className="font-medium text-sm">{injury.player}</p>
                          <p className="text-xs text-muted-foreground">{injury.status}</p>
                        </div>
                        <Badge variant="outline" className="text-rose-500 border-rose-500">
                          {injury.returnDate || 'Out indefinitely'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No significant injuries reported</p>
                )}
              </div>

              <Separator />

              {/* Top Scorers */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Footprints className="h-4 w-4 text-primary" />
                  Top Scorers
                </h4>
                <div className="space-y-2">
                  {topScorers.map((scorer, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                        <div>
                          <p className="font-medium text-sm">{scorer.name}</p>
                          <p className="text-xs text-muted-foreground">{scorer.assists || 0} assists</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold">
                        {scorer.goals || 0} goals
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Head-to-Head Trends */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  Head-to-Head Trends
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-500">{team.h2hWins || 0}</p>
                    <p className="text-xs text-muted-foreground">Wins</p>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-bold text-amber-500">{team.h2hDraws || 0}</p>
                    <p className="text-xs text-muted-foreground">Draws</p>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-bold text-rose-500">{team.h2hLosses || 0}</p>
                    <p className="text-xs text-muted-foreground">Losses</p>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{team.h2hGoalsScored || 0}</p>
                    <p className="text-xs text-muted-foreground">Goals Scored</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Last 5 meetings against top 6 rivals
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentResults.length > 0 ? (
                <div className="space-y-3">
                  {recentResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{result.opponentFlag}</span>
                        <div>
                          <p className="font-medium">{result.opponent}</p>
                          <p className="text-xs text-muted-foreground">
                            {result.isHome ? 'Home' : 'Away'} • {result.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "font-bold text-lg",
                          result.result === 'W' && "text-emerald-500",
                          result.result === 'L' && "text-rose-500",
                          result.result === 'D' && "text-amber-500"
                        )}>
                          {result.scored} - {result.conceded}
                        </span>
                        <Badge 
                          variant="outline"
                          className={cn(
                            result.result === 'W' && "border-emerald-500 text-emerald-500",
                            result.result === 'L' && "border-rose-500 text-rose-500",
                            result.result === 'D' && "border-amber-500 text-amber-500"
                          )}
                        >
                          {result.result}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No recent matches available</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Fixtures */}
          {teamMatches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Fixtures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMatches.slice(0, 5).map((match) => {
                  const opponent = match.homeTeam === team.id 
                    ? getTeamById(match.awayTeam) 
                    : getTeamById(match.homeTeam)
                  const isHome = match.homeTeam === team.id

                  if (!opponent) return null

                  return (
                    <Link key={match.id} href={`/predictions/${match.slug}`}>
                      <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:border-primary/50 hover:bg-secondary/50 hover:shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{opponent.flag || '🏳️'}</span>
                          <div>
                            <p className="font-medium">
                              {isHome ? 'vs' : '@'} {opponent.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {isHome ? 'Home' : 'Away'} • {match.date || 'TBD'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{match.stage || 'League'}</Badge>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Analysis Card */}
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                AI Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-primary">{team.overallRating || 75}%</p>
                <p className="text-sm text-muted-foreground mt-1">Team Performance Index</p>
              </div>
              
              <Progress value={team.overallRating || 75} className="h-3 mb-6" />
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">AI Rating</span>
                  <span className="font-medium">{team.aiRating || 75}/100</span>
                </div>

                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">League Position</span>
                  <span className="font-medium">#{team.ranking || 'N/A'}</span>
                </div>

                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Goals Scored (Avg)</span>
                  <span className="font-medium">{stats.goalsFor || 0} ({(stats.goalsFor / totalGames).toFixed(1)})</span>
                </div>

                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Goals Conceded (Avg)</span>
                  <span className="font-medium">{stats.goalsAgainst || 0} ({(stats.goalsAgainst / totalGames).toFixed(1)})</span>
                </div>

                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Goal Difference</span>
                  <span className={cn(
                    "font-medium",
                    (stats.goalDifference || 0) > 0 && "text-emerald-500",
                    (stats.goalDifference || 0) < 0 && "text-rose-500"
                  )}>
                    {(stats.goalDifference || 0) > 0 ? '+' : ''}{stats.goalDifference || 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recent Form</span>
                  <span className="font-medium">{(team.form || []).join(" ") || 'N/A'}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <Button asChild className="w-full gap-2">
                <Link href={`/predictions?team=${team.id}`}>
                  <Trophy className="h-4 w-4" />
                  View Predictions for {team.name}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
