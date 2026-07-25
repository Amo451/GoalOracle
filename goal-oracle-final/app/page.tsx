import Link from "next/link"
import { ArrowRight, TrendingUp, Calendar, Zap, Target, Shield, Brain, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Hero } from "@/components/hero"
import { MatchCard } from "@/components/match-card"
import { NewsletterSection } from "@/components/newsletter-section"
import { BookmakerCTA } from "@/components/bookmaker-cta"
import { BlogSection } from "@/components/blog-section"
import { blogPosts } from "@/lib/data"
import { fetchUpcomingMatches, checkApiStatus } from "@/lib/data-api"

export const revalidate = 60 // Revalidate every minute

export default async function HomePage() {
  // Fetch real data from API
  const [matches, apiStatus] = await Promise.all([
    fetchUpcomingMatches(10),
    checkApiStatus(),
  ])
  
  const featuredMatches = matches.filter(m => m.isFeatured || m.isTrending).slice(0, 4)
  const trendingMatches = matches.slice(0, 6)
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <>
      {/* API Status Banner */}
      {apiStatus.available ? (
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 py-2">
          <div className="mx-auto max-w-7xl px-4 flex items-center justify-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <Wifi className="h-4 w-4" />
            <span>Live data from Football-Data.org - {apiStatus.matchCount} matches available</span>
          </div>
        </div>
      ) : (
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-2">
          <div className="mx-auto max-w-7xl px-4 flex items-center justify-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <WifiOff className="h-4 w-4" />
            <span>Using cached data - API temporarily unavailable</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero />

      {/* Featured Matches */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2 gap-1">
                <Zap className="h-3 w-3" />
                Featured
              </Badge>
              <h2 className="text-2xl font-bold lg:text-3xl">Featured Predictions</h2>
              <p className="mt-1 text-muted-foreground">
                Our top AI-powered match predictions
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-1">
              <Link href="/predictions">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {featuredMatches.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredMatches.map((match) => (
                <MatchCard key={match.id} match={match} variant="featured" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No featured matches at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Matches */}
      <section className="border-y border-border bg-secondary/20 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2 gap-1">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
              <h2 className="text-2xl font-bold lg:text-3xl">Upcoming Matches</h2>
              <p className="mt-1 text-muted-foreground">
                Most anticipated matches coming up
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-1">
              <Link href="/predictions">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {trendingMatches.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trendingMatches.map((match) => (
                <MatchCard key={match.id} match={match} variant="default" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No upcoming matches scheduled. Check back during the tournament!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">Why GoalOracle AI</Badge>
            <h2 className="text-3xl font-bold lg:text-4xl">
              The Smarter Way to Bet on Football
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our advanced AI analyzes millions of data points to deliver the most accurate 
              football predictions available anywhere.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Brain className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">AI-Powered Analysis</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our machine learning models process historical data, current form, 
                and real-time statistics for accurate predictions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">78% Win Rate</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our predictions have maintained a 78% success rate across 
                major tournaments over the past 3 years.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Responsible Betting</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We promote responsible gambling with bankroll management tips 
                and clear confidence ratings on every prediction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      {/* Bookmaker CTA */}
      <BookmakerCTA />

      {/* Blog Section */}
      <BlogSection posts={latestPosts} />

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
            <div className="relative flex flex-col items-center text-center">
              <Badge variant="secondary" className="mb-4 gap-1">
                <Calendar className="h-3 w-3" />
                New Season prediction
              </Badge>
              <h2 className="max-w-2xl text-3xl font-bold lg:text-4xl">
                Ready to Start Winning?
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Join thousands of bettors who trust GoalOracle AI for their daily football predictions. 
                Get started today - it&apos;s completely free.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/today-predictions">
                    <Zap className="h-5 w-5" />
                    Get Today&apos;s Predictions
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <Link href="https://t.me/goaloracle" target="_blank">
                    Join Telegram Channel
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
