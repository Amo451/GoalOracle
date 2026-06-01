import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Wifi,
  WifiOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { getConfidenceLevel, getFeaturedBookmakers } from "@/lib/data"
import {
  fetchMatchBySlug,
  fetchAllMatches,
  fetchHeadToHead,
} from "@/lib/data-api"

interface Props {
  params: Promise<{ slug: string }>
}

// Helper: resolve team display info from the match (API data takes priority over mock)
function resolveTeam(match: Awaited<ReturnType<typeof fetchMatchBySlug>>, side: "home" | "away") {
  const apiData = (match as any)?._apiData
  if (side === "home") {
    return {
      name: apiData?.homeTeamName || match!.homeTeam,
      flag: apiData?.homeTeamCrest || "⚽",
      tla: apiData?.homeTeamTla || match!.homeTeam,
    }
  }
  return {
    name: apiData?.awayTeamName || match!.awayTeam,
    flag: apiData?.awayTeamCrest || "⚽",
    tla: apiData?.awayTeamTla || match!.awayTeam,
  }
}

function isImageUrl(s: string) {
  return s.startsWith("http")
}

export async function generateStaticParams() {
  try {
    const matches = await fetchAllMatches()
    return matches.map((match) => ({ slug: match.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const match = await fetchMatchBySlug(slug)

  if (!match) return { title: "Match Not Found" }

  const home = resolveTeam(match, "home")
  const away = resolveTeam(match, "away")
  const title = `${home.name} vs ${away.name} Prediction`
  const description = `AI prediction for ${home.name} vs ${away.name}. ${match.prediction.confidence}% confidence. Get betting tips, odds comparison, and expert analysis.`

  return {
    title,
    description,
    openGraph: { title: `${title} | GoalOracle AI`, description, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  }
}

export const revalidate = 60

export default async function MatchPredictionPage({ params }: Props) {
  const { slug } = await params
  const match = await fetchMatchBySlug(slug)

  if (!match) notFound()

  const apiData = (match as any)._apiData
  const home = resolveTeam(match, "home")
  const away = resolveTeam(match, "away")
  const bookmakers = getFeaturedBookmakers()
  const confidenceLevel = getConfidenceLevel(match.prediction.confidence)

  // Attempt to fetch live H2H data; fall back to stored data
  const h2h = await fetchHeadToHead(match.id).catch(() => null)
  const h2hData = h2h
    ? {
        homeWins: h2h.homeTeam.wins,
        draws: h2h.homeTeam.draws + h2h.awayTeam.draws,  // pick one side
        awayWins: h2h.awayTeam.wins,
        totalGoals: h2h.totalGoals,
      }
    : {
        homeWins: match.headToHead.homeWins,
        draws: match.headToHead.draws,
        awayWins: match.headToHead.awayWins,
        totalGoals: null,
      }

  const confidenceColors = {
    high: "bg-primary/10 text-primary border-primary/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-destructive/10 text-destructive border-destructive/20",
  }

  // Live score display
  const score = apiData?.score
  const isLive = apiData?.isLive
  const isFinished = apiData?.isFinished
  const statusText = apiData?.statusText

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${home.name} vs ${away.name}`,
    startDate: `${match.date}T${match.time}:00`,
    location: { "@type": "Place", name: match.venue },
    competitor: [
      { "@type": "SportsTeam", name: home.name },
      { "@type": "SportsTeam", name: away.name },
    ],
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Who will win ${home.name} vs ${away.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Our AI predicts ${match.prediction.winner === "home" ? home.name : match.prediction.winner === "away" ? away.name : "a draw"} with ${match.prediction.confidence}% confidence. Predicted score: ${match.prediction.predictedScore.home}-${match.prediction.predictedScore.away}.`,
        },
      },
      {
        "@type": "Question",
        name: `What are the best odds for ${home.name} vs ${away.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The best odds vary by bookmaker. ${match.odds[0]?.bookmaker} offers ${match.odds[0]?.home} for ${home.name}, ${match.odds[0]?.draw} for draw, and ${match.odds[0]?.away} for ${away.name}.`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/predictions" className="hover:text-foreground">Predictions</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{home.name} vs {away.name}</span>
        </nav>

        <Button asChild variant="ghost" className="mb-6 gap-2">
          <Link href="/predictions">
            <ArrowLeft className="h-4 w-4" />
            Back to Predictions
          </Link>
        </Button>

        {/* Live / Finished status pill */}
        {statusText && (
          <div className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
            isLive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
          )}>
            {isLive ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            {statusText}
          </div>
        )}

        {/* Match Header */}
        <Card className="mb-8">
          <CardContent className="p-6 lg:p-8">
            <div className="flex flex-col items-center">
              {/* Stage & Info */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
                <Badge>{match.stage}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {match.date}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {match.time}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {match.venue}
                </div>
              </div>

              {/* Teams */}
              <div className="flex w-full items-center justify-center gap-4 sm:gap-8 lg:gap-16">
                {/* Home Team */}
                <div className="group flex flex-col items-center gap-3">
                  {isImageUrl(home.flag) ? (
                    <img src={home.flag} alt={home.name} className="h-16 w-16 lg:h-24 lg:w-24 rounded-full object-contain border border-border p-1" />
                  ) : (
                    <span className="text-5xl lg:text-7xl">{home.flag}</span>
                  )}
                  <div className="text-center">
                    <h2 className="text-lg font-bold lg:text-2xl">{home.name}</h2>
                    <p className="text-sm text-muted-foreground">{home.tla}</p>
                  </div>
                </div>

                {/* Score / VS */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl font-bold text-muted-foreground lg:text-3xl">
                    {isFinished || isLive ? (
                      <span className={cn(isLive && "animate-pulse text-emerald-500")}>
                        {score?.fullTime?.home ?? "?"} – {score?.fullTime?.away ?? "?"}
                      </span>
                    ) : (
                      "VS"
                    )}
                  </div>
                  {!(isFinished || isLive) && (
                    <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2">
                      <span className="text-2xl font-bold lg:text-3xl">{match.prediction.predictedScore.home}</span>
                      <span className="text-xl text-muted-foreground">-</span>
                      <span className="text-2xl font-bold lg:text-3xl">{match.prediction.predictedScore.away}</span>
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {isFinished ? "Full Time" : isLive ? "Live Score" : "Predicted Score"}
                  </span>
                </div>

                {/* Away Team */}
                <div className="group flex flex-col items-center gap-3">
                  {isImageUrl(away.flag) ? (
                    <img src={away.flag} alt={away.name} className="h-16 w-16 lg:h-24 lg:w-24 rounded-full object-contain border border-border p-1" />
                  ) : (
                    <span className="text-5xl lg:text-7xl">{away.flag}</span>
                  )}
                  <div className="text-center">
                    <h2 className="text-lg font-bold lg:text-2xl">{away.name}</h2>
                    <p className="text-sm text-muted-foreground">{away.tla}</p>
                  </div>
                </div>
              </div>

              {/* AI Prediction Badge */}
              <div className="mt-8 flex flex-col items-center gap-2">
                <Badge className={cn("text-lg px-6 py-2", confidenceColors[confidenceLevel])}>
                  {match.prediction.confidence}% AI Confidence
                </Badge>
                <p className="text-lg font-semibold">
                  Prediction:{" "}
                  {match.prediction.winner === "home"
                    ? `${home.name} Win`
                    : match.prediction.winner === "away"
                    ? `${away.name} Win`
                    : "Draw"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{match.prediction.analysis}</p>
                <h4 className="mt-6 mb-3 font-semibold">Key Factors</h4>
                <ul className="space-y-2">
                  {match.prediction.keyFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{factor}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Head to Head */}
            <Card>
              <CardHeader>
                <CardTitle>Head to Head</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-bold">{h2hData.homeWins}</p>
                    <p className="text-sm text-muted-foreground">{home.name} Wins</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-bold">{h2hData.draws}</p>
                    <p className="text-sm text-muted-foreground">Draws</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-bold">{h2hData.awayWins}</p>
                    <p className="text-sm text-muted-foreground">{away.name} Wins</p>
                  </div>
                </div>
                {h2hData.totalGoals !== null && (
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {h2hData.totalGoals} total goals in historical meetings
                  </p>
                )}
                {match.headToHead.lastMatches.length > 0 && (
                  <>
                    <h4 className="mb-3 font-semibold">Recent Meetings</h4>
                    <div className="space-y-2">
                      {match.headToHead.lastMatches.map((m, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                          <span className="text-sm text-muted-foreground">{m.date}</span>
                          <span className="font-semibold">{m.score}</span>
                          <Badge variant="outline">{m.winner}</Badge>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Win Probability Bar */}
            <Card>
              <CardHeader>
                <CardTitle>Win Probability</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const keyFactors = match.prediction.keyFactors
                  // Parse probabilities out of keyFactors (set in data-api.ts)
                  const homeProb = parseInt(keyFactors[0]?.match(/\d+/)?.[0] || "40")
                  const drawProb = parseInt(keyFactors[1]?.match(/\d+/)?.[0] || "25")
                  const awayProb = parseInt(keyFactors[2]?.match(/\d+/)?.[0] || "35")
                  return (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{home.name}</span>
                          <span className="font-semibold">{homeProb}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${homeProb}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Draw</span>
                          <span className="font-semibold">{drawProb}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-warning rounded-full" style={{ width: `${drawProb}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{away.name}</span>
                          <span className="font-semibold">{awayProb}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-destructive rounded-full" style={{ width: `${awayProb}%` }} />
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>

            {/* Injuries (if any) */}
            {match.injuries.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Injury News
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {match.injuries.map((injury, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                        <span className="font-medium">{injury.player}</span>
                        <Badge variant={injury.status === "Out" ? "destructive" : "secondary"}>
                          {injury.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Odds Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Odds Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bookmaker</TableHead>
                      <TableHead className="text-center">{home.name}</TableHead>
                      <TableHead className="text-center">Draw</TableHead>
                      <TableHead className="text-center">{away.name}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {match.odds.map((odd, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{odd.bookmaker}</TableCell>
                        <TableCell className="text-center">{odd.home.toFixed(2)}</TableCell>
                        <TableCell className="text-center">{odd.draw.toFixed(2)}</TableCell>
                        <TableCell className="text-center">{odd.away.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Who will win {home.name} vs {away.name}?</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our AI predicts{" "}
                    {match.prediction.winner === "home" ? home.name : match.prediction.winner === "away" ? away.name : "a draw"}{" "}
                    with {match.prediction.confidence}% confidence. The predicted score is{" "}
                    {match.prediction.predictedScore.home}-{match.prediction.predictedScore.away}.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold">What time does {home.name} vs {away.name} kick off?</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The match kicks off at {match.time} on {match.date} at {match.venue}.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold">What are the best bets for this match?</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our top suggested bet is {match.suggestedBets[0]?.selection} at odds of{" "}
                    {match.suggestedBets[0]?.odds.toFixed(2)} with {match.suggestedBets[0]?.confidence}% confidence.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Suggested Bets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {match.suggestedBets.map((bet, index) => (
                  <div key={index} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{bet.type}</span>
                      <Badge variant="outline" className={confidenceColors[getConfidenceLevel(bet.confidence)]}>
                        {bet.confidence}%
                      </Badge>
                    </div>
                    <p className="font-semibold">{bet.selection}</p>
                    <p className="text-lg font-bold text-primary">{bet.odds.toFixed(2)}</p>
                  </div>
                ))}

                <Separator className="my-4" />

                <p className="text-sm font-medium mb-3">Place Your Bet</p>
                {bookmakers.slice(0, 3).map((bm) => (
                  <Button key={bm.id} asChild variant="outline" className="w-full justify-between mb-2">
                    <Link href={bm.url} target="_blank">
                      <span>{bm.name}</span>
                      <span className="text-xs text-muted-foreground">{bm.bonusValue}</span>
                    </Link>
                  </Button>
                ))}

                <p className="text-xs text-muted-foreground text-center mt-4">
                  18+ | Gamble Responsibly | T&Cs Apply
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
