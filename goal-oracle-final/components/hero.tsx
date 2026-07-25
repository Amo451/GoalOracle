import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Zap, Calendar, Trophy, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2">
            <Zap className="h-4 w-4 text-primary" />
            AI-Powered Predictions
          </Badge>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">Smarter Football </span> Predictions. {" "}
            <span className="gradient-text">Better Betting </span> Decisions.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Get expert match predictions, betting tips, and comprehensive analysis powered by 
            advanced AI technology. Join thousands of winning bettors.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/today-predictions">
                <Calendar className="h-5 w-5" />
                Today&apos;s Predictions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/predictions">
                <TrendingUp className="h-5 w-5" />
                View All Predictions
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <span className="mt-2 text-2xl font-bold">78%</span>
              <span className="text-sm text-muted-foreground">Win Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <span className="mt-2 text-2xl font-bold">500+</span>
              <span className="text-sm text-muted-foreground">Predictions</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="mt-2 text-2xl font-bold">50K+</span>
              <span className="text-sm text-muted-foreground">Users</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <span className="mt-2 text-2xl font-bold">24/7</span>
              <span className="text-sm text-muted-foreground">AI Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
