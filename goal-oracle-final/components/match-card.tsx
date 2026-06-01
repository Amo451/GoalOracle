import Link from "next/link"
import { TrendingUp, Clock, MapPin, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Match, getTeamById, getConfidenceLevel } from "@/lib/data"

interface MatchCardProps {
  match: Match
  variant?: "default" | "compact" | "featured"
}

export function MatchCard({ match, variant = "default" }: MatchCardProps) {
  const homeTeam = getTeamById(match.homeTeam)
  const awayTeam = getTeamById(match.awayTeam)
  const confidenceLevel = getConfidenceLevel(match.prediction.confidence)

  if (!homeTeam || !awayTeam) return null

  const confidenceColors = {
    high: "bg-primary/10 text-primary border-primary/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-destructive/10 text-destructive border-destructive/20",
  }

  if (variant === "compact") {
    return (
      <Link href={`/predictions/${match.slug}`}>
        <Card className="group transition-smooth hover:border-primary/50 hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{homeTeam.flag}</span>
                <span className="text-sm font-medium">{homeTeam.code}</span>
                <span className="text-muted-foreground">vs</span>
                <span className="text-sm font-medium">{awayTeam.code}</span>
                <span className="text-2xl">{awayTeam.flag}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn("text-xs", confidenceColors[confidenceLevel])}>
                  {match.prediction.confidence}%
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-smooth group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  if (variant === "featured") {
    return (
      <Link href={`/predictions/${match.slug}`}>
        <Card className="group relative overflow-hidden transition-smooth hover:border-primary/50 hover:shadow-xl">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-smooth group-hover:opacity-100" />
          
          <CardContent className="relative p-6">
            {/* Stage & Date */}
            <div className="mb-4 flex items-center justify-between">
              <Badge variant="secondary">{match.stage}</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {match.date} at {match.time}
              </div>
            </div>

            {/* Teams */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">{homeTeam.flag}</span>
                <span className="text-sm font-semibold">{homeTeam.name}</span>
                <span className="text-xs text-muted-foreground">#{homeTeam.ranking}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl font-bold text-muted-foreground">VS</div>
                <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
                  <span className="text-lg font-bold">{match.prediction.predictedScore.home}</span>
                  <span className="text-muted-foreground">-</span>
                  <span className="text-lg font-bold">{match.prediction.predictedScore.away}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">{awayTeam.flag}</span>
                <span className="text-sm font-semibold">{awayTeam.name}</span>
                <span className="text-xs text-muted-foreground">#{awayTeam.ranking}</span>
              </div>
            </div>

            {/* Prediction */}
            <div className="mb-4 rounded-lg bg-secondary/50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">AI Prediction</span>
                <Badge className={cn(confidenceColors[confidenceLevel])}>
                  {match.prediction.confidence}% Confidence
                </Badge>
              </div>
              <p className="mt-2 text-sm font-medium">
                {match.prediction.winner === 'home' && `${homeTeam.name} Win`}
                {match.prediction.winner === 'away' && `${awayTeam.name} Win`}
                {match.prediction.winner === 'draw' && 'Draw'}
              </p>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {match.venue}
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  // Default variant
  return (
    <Link href={`/predictions/${match.slug}`}>
      <Card className="group transition-smooth hover:border-primary/50 hover:shadow-lg">
        <CardContent className="p-5">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <Badge variant="outline" className="text-xs">{match.stage}</Badge>
            {match.isTrending && (
              <Badge variant="secondary" className="gap-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
          </div>

          {/* Teams */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{homeTeam.flag}</span>
              <div>
                <p className="font-semibold">{homeTeam.name}</p>
                <p className="text-xs text-muted-foreground">#{homeTeam.ranking}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Predicted</span>
              <div className="flex items-center gap-1 font-bold">
                <span>{match.prediction.predictedScore.home}</span>
                <span className="text-muted-foreground">-</span>
                <span>{match.prediction.predictedScore.away}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold">{awayTeam.name}</p>
                <p className="text-xs text-muted-foreground">#{awayTeam.ranking}</p>
              </div>
              <span className="text-3xl">{awayTeam.flag}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {match.date}
            </div>
            <Badge className={cn("text-xs", confidenceColors[confidenceLevel])}>
              {match.prediction.confidence}% AI Confidence
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
