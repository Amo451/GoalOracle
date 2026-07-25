import Link from "next/link"
import { Metadata } from "next"
import { ChevronRight, Trophy, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { teams } from "@/lib/data"

export const metadata: Metadata = {
  title: "Football Teams",
  description: "Browse all top teams across Europe. Get squad information, AI predictions, tournament probabilities, and detailed analysis for each team.",
  openGraph: {
    title: "Football Teams | GoalOracle AI",
    description: "Browse teams with AI predictions and analysis.",
  },
}

export default function TeamsPage() {
  // Sort teams by tournament probability
  const sortedTeams = [...teams].sort((a, b) => b.tournamentProbability - a.tournamentProbability)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-2 gap-1">
          <Users className="h-3 w-3" />
          Teams
        </Badge>
        <h1 className="text-3xl font-bold lg:text-4xl">Premier League Teams</h1>
        <p className="mt-2 text-muted-foreground">
          Explore all teams competing in 2026 premier league new season with AI-powered predictions
        </p>
      </div>

      {/* Tournament Favorites */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          Tournament Favorites
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedTeams.slice(0, 3).map((team, index) => (
            <Link key={team.id} href={`/teams/${team.id}`}>
              <Card className="group h-full transition-smooth hover:border-primary/50 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{team.flag}</span>
                      <div>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-smooth">
                          {team.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">FIFA #{team.ranking}</p>
                      </div>
                    </div>
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      #{index + 1}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Win Probability</span>
                        <span className="font-semibold text-primary">{team.tournamentProbability}%</span>
                      </div>
                      <Progress value={team.tournamentProbability} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Group</span>
                      <Badge variant="outline">{team.group}</Badge>
                    </div>
                    
                    <div className="flex gap-1">
                      {team.form.map((result, i) => (
                        <span
                          key={i}
                          className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                            result === 'W' ? 'bg-primary text-primary-foreground' :
                            result === 'D' ? 'bg-warning text-warning-foreground' :
                            'bg-destructive text-destructive-foreground'
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-end text-sm text-muted-foreground">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1 transition-smooth group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* All Teams */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">All Teams</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedTeams.map((team) => (
            <Link key={team.id} href={`/teams/${team.id}`}>
              <Card className="group transition-smooth hover:border-primary/50 hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{team.flag}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate group-hover:text-primary transition-smooth">
                        {team.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>#{team.ranking}</span>
                        <span>•</span>
                        <span>Group {team.group}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{team.tournamentProbability}%</p>
                      <p className="text-xs text-muted-foreground">Win %</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
