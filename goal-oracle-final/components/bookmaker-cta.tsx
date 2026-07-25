import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { bookmakers, getFeaturedBookmakers } from "@/lib/data"

export function BookmakerCTA() {
  const featured = getFeaturedBookmakers()

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold lg:text-3xl">Best Betting Sites</h2>
            <p className="mt-1 text-muted-foreground">
              Top-rated bookmakers 2026/2027
            </p>
          </div>
          <Button asChild variant="ghost" className="gap-1">
            <Link href="/betting-sites">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((bookmaker) => (
            <Card key={bookmaker.id} className="group transition-smooth hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-24 items-center justify-center rounded-lg bg-secondary text-lg font-bold">
                    {bookmaker.name.slice(0, 3)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{bookmaker.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold">{bookmaker.name}</h3>
                
                <div className="mt-3 rounded-lg bg-primary/10 p-3">
                  <p className="text-sm text-muted-foreground">Welcome Bonus</p>
                  <p className="font-semibold text-primary">{bookmaker.welcomeBonus}</p>
                  <p className="text-xs text-muted-foreground">{bookmaker.bonusValue}</p>
                </div>

                <Button asChild className="mt-4 w-full">
                  <Link href={bookmaker.url} target="_blank">
                    Claim Bonus
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          18+ only. Gambling involves risk. Please bet responsibly. T&Cs apply.
        </p>
      </div>
    </section>
  )
}
