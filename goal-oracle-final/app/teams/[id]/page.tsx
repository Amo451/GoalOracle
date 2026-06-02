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
  Target
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
    title: `${team.name} - WC 2026 Profile`,
    description: `${team.name} WC 2026 profile. AI prediction: ${team.tournamentProbability}% chance to win. Squad overview, strengths, weaknesses, and match predictions.`,
    openGraph: {
      title: `${team.name} - WC 2026 | GoalOracle AI`,
      description: `${team.name} WC 2026 profile with AI predictions and analysis.`,
    },
  }
}

export default async function TeamPage({ params }: Props) {
  const { id } = await params
  const team = getTeamById(id)
  
  if (!team) {
    notFound()
  }

  // Get team's upcoming matches
  const teamMatches = matches.filter(
    m => m.homeTeam === team.id || m.awayTeam === team.id
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/teams" className="hover:text-foreground">Teams</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{team.name}</span>
      </nav>

      {/* Back button */}
      <Button asChild variant="ghost" className="mb-6 gap-2">
        <Link href="/teams">
          <ArrowLeft className="h-4 w-4" />
          Back to Teams
        </Link>
      </Button>

      {/* Team Header */}
      <Card className="mb-8">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <span className="text-7xl lg:text-9xl">{team.flag}</span>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold lg:text-4xl">{team.name}</h1>
                <Badge>{team.code}</Badge>
                <Badge variant="outline">Group {team.group}</Badge>
              </div>
              
              <p className="text-muted-foreground mb-4">{team.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold">#{team.ranking}</p>
                  <p className="text-xs text-muted-foreground">FIFA Ranking</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold text-primary">{team.tournamentProbability}%</p>
                  <p className="text-xs text-muted-foreground">Win Probability</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold">{team.stats.goalsFor}</p>
                  <p className="text-xs text-muted-foreground">Goals Scored</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary">
                  <p className="text-2xl font-bold">{team.stats.goalsAgainst}</p>
                  <p className="text-xs text-muted-foreground">Goals Conceded</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Form & Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Recent Form & Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Last 5 Matches</h4>
                <div className="flex gap-2">
                  {team.form.map((result, index) => (
                    <span
                      key={index}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold",
                        result === 'W' && "bg-primary text-primary-foreground",
                        result === 'D' && "bg-warning text-warning-foreground",
                        result === 'L' && "bg-destructive text-destructive-foreground"
                      )}
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">{team.stats.wins}</p>
                  <p className="text-sm text-muted-foreground">Wins</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{team.stats.draws}</p>
                  <p className="text-sm text-muted-foreground">Draws</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-destructive">{team.stats.losses}</p>
                  <p className="text-sm text-muted-foreground">Losses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Weaknesses */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <TrendingUp className="h-5 w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {team.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <TrendingDown className="h-5 w-5" />
                  Weaknesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {team.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-2 w-2 rounded-full bg-destructive mt-2 shrink-0" />
                      <span className="text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Star Players */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Star Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {team.starPlayers.map((player, index) => (
                  <div key={index} className="rounded-lg border border-border p-4 text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h4 className="font-semibold">{player.name}</h4>
                    <p className="text-sm text-muted-foreground">{player.position}</p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-bold">{player.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Matches */}
          {teamMatches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Matches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMatches.map((match) => {
                  const opponent = match.homeTeam === team.id 
                    ? getTeamById(match.awayTeam) 
                    : getTeamById(match.homeTeam)
                  const isHome = match.homeTeam === team.id

                  return (
                    <Link key={match.id} href={`/predictions/${match.slug}`}>
                      <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-smooth hover:border-primary/50 hover:bg-secondary/50">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{opponent?.flag}</span>
                          <div>
                            <p className="font-medium">vs {opponent?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {isHome ? 'Home' : 'Away'} • {match.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{match.stage}</Badge>
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
          {/* Tournament Prediction */}
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Tournament Prediction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-primary">{team.tournamentProbability}%</p>
                <p className="text-sm text-muted-foreground mt-1">Chance to Win World Cup</p>
              </div>
              
              <Progress value={team.tournamentProbability} className="h-3 mb-6" />
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Group Stage</span>
                  <span className="font-medium">98% to qualify</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quarter-Final</span>
                  <span className="font-medium">72% to reach</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Semi-Final</span>
                  <span className="font-medium">48% to reach</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Final</span>
                  <span className="font-medium">28% to reach</span>
                </div>
              </div>

              <Separator className="my-6" />

              <Button asChild className="w-full">
                <Link href="/predictions">
                  View All {team.name} Predictions
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
