import Link from "next/link"
import { Metadata } from "next"
import { Trophy, Star, Check, X, ExternalLink, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { bookmakers } from "@/lib/data"

export const metadata: Metadata = {
  title: "Best Betting Sites for World Cup 2026",
  description: "Compare the best betting sites for WC 2026. Exclusive bonuses, expert reviews, and detailed comparisons to find your perfect bookmaker.",
  openGraph: {
    title: "Best Betting Sites | GoalOracle AI",
    description: "Compare the best betting sites for WC 2026 with exclusive bonuses.",
  },
}

export default function BettingSitesPage() {
  const featuredBookmakers = bookmakers.filter(b => b.featured)
  const otherBookmakers = bookmakers.filter(b => !b.featured)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-2 gap-1">
          <Trophy className="h-3 w-3" />
          Best Betting Sites
        </Badge>
        <h1 className="text-3xl font-bold lg:text-4xl">Best Betting Sites for WC 2026</h1>
        <p className="mt-2 text-muted-foreground">
          Compare top-rated bookmakers with exclusive welcome bonuses and the best odds for WC 26 betting
        </p>
      </div>

      {/* Featured Bookmakers */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Top Rated Bookmakers</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredBookmakers.map((bookmaker, index) => (
            <Card key={bookmaker.id} className={`relative overflow-hidden ${index === 0 ? 'border-primary' : ''}`}>
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                  #1 Choice
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-28 items-center justify-center rounded-lg bg-secondary text-xl font-bold">
                    {bookmaker.name.slice(0, 3)}
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(bookmaker.rating) ? 'fill-primary text-primary' : 'text-muted'}`}
                      />
                    ))}
                    <span className="ml-1 font-bold">{bookmaker.rating}</span>
                  </div>
                </div>
                <CardTitle className="mt-4">{bookmaker.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 rounded-lg bg-primary/10 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Welcome Bonus</p>
                  <p className="text-xl font-bold text-primary">{bookmaker.welcomeBonus}</p>
                  <p className="text-sm font-semibold">{bookmaker.bonusValue}</p>
                </div>

                <div className="mb-4 space-y-2">
                  <h4 className="text-sm font-semibold text-primary">Pros</h4>
                  {bookmaker.pros.slice(0, 3).map((pro, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6 space-y-2">
                  <h4 className="text-sm font-semibold text-destructive">Cons</h4>
                  {bookmaker.cons.map((con, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <X className="h-4 w-4 text-destructive shrink-0" />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full gap-2">
                  <Link href={bookmaker.url} target="_blank">
                    Claim Bonus
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Full Comparison</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bookmaker</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Welcome Bonus</TableHead>
                    <TableHead>Bonus Value</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookmakers.map((bookmaker) => (
                    <TableRow key={bookmaker.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-16 items-center justify-center rounded bg-secondary text-sm font-bold">
                            {bookmaker.name.slice(0, 3)}
                          </div>
                          <span className="font-medium">{bookmaker.name}</span>
                          {bookmaker.featured && (
                            <Badge variant="secondary" className="text-xs">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span>{bookmaker.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{bookmaker.welcomeBonus}</TableCell>
                      <TableCell className="font-semibold text-primary">{bookmaker.bonusValue}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm">
                          <Link href={bookmaker.url} target="_blank">
                            Visit Site
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How We Review */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">How We Review Betting Sites</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Safety & Security</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Licensed, regulated, and using SSL encryption
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Odds Quality</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Competitive odds on WC matches
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Bonus Value</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fair wagering requirements and terms
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">User Experience</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Easy navigation and mobile compatibility
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Disclaimer */}
      <Card className="bg-secondary/30">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">Important Information</h3>
          <p className="text-sm text-muted-foreground">
            18+ only. Gambling involves risk. Please bet responsibly. The offers listed above are subject to change. 
            Always check the bookmaker&apos;s website for the most current terms and conditions. If you have a gambling 
            problem, please seek help at BeGambleAware.org or call the National Council on Problem Gambling helpline 
            at 1-800-522-4700.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
