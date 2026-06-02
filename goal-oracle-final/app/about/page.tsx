import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Target, TrendingUp, Users, Shield, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "About GoalOracle AI | AI-Powered Football Predictions",
  description:
    "Learn about GoalOracle AI - the leading AI-powered platform for Football WC 2026 predictions, match analysis, and betting intelligence.",
  openGraph: {
    title: "About GoalOracle AI | AI-Powered Football Predictions",
    description:
      "Learn about GoalOracle AI - the leading AI-powered platform for football predictions, match analysis, and betting intelligence.",
    type: "website",
  },
}

const features = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description:
      "Our proprietary machine learning algorithms analyze millions of data points including historical performance, player statistics, team dynamics, and situational factors.",
  },
  {
    icon: Target,
    title: "High Accuracy Predictions",
    description:
      "With a proven track record of 78% accuracy across major tournaments, our predictions are trusted by thousands of football enthusiasts worldwide.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analysis",
    description:
      "Our systems continuously update predictions based on the latest team news, injuries, weather conditions, and market movements.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our team combines data scientists, sports analysts, and former professional players to deliver comprehensive match insights.",
  },
  {
    icon: Shield,
    title: "Responsible Gaming",
    description:
      "We promote responsible betting practices and provide educational content to help users make informed decisions.",
  },
  {
    icon: Zap,
    title: "Instant Updates",
    description:
      "Get real-time notifications for prediction updates, odds changes, and breaking team news through our platform.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About <span className="text-primary">GoalOracle AI</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We combine cutting-edge artificial intelligence with deep football expertise to deliver
              the most accurate WC predictions. Our mission is to transform how fans engage
              with the beautiful game.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-muted-foreground leading-relaxed">
                GoalOracle AI was founded with a simple vision: to democratize access to
                professional-grade sports analytics. We believe that every football fan deserves
                access to the same level of data-driven insights that were once only available to
                professional betting syndicates and sports organizations.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our platform processes over 500 variables per match, including historical head-to-head
                records, current form, player availability, tactical matchups, and even psychological
                factors like tournament pressure and home advantage. This comprehensive approach
                allows us to generate predictions that consistently outperform traditional analysis
                methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Sets Us Apart</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "78%", label: "Prediction Accuracy" },
              { value: "50K+", label: "Active Users" },
              { value: "1M+", label: "Predictions Made" },
              { value: "48", label: "Countries Covered" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of football fans who trust GoalOracle AI for their World Cup
                predictions. Explore our free predictions or connect with our community on Telegram.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/predictions"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  View Predictions
                </Link>
                <Link
                  href="https://t.me/goaloracleai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Join Telegram
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
