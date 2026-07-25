import Link from "next/link"
import { Metadata } from "next"
import { Tv, Globe, Check, ExternalLink, Info, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "How to Watch New Season's Top Leagues Across Europe - Streaming Guide",
  description: "Complete guide on how to watch football live. Free streaming options, TV channels, and broadcasting rights by country.",
  openGraph: {
    title: "New Season's Streaming Guide | GoalOracle AI",
    description: "How to watch every top European League 2026 - free streams, TV channels, and more.",
  },
}

const streamingOptions = [
  {
    country: "United States",
    flag: "🇺🇸",
    channels: ["FOX", "FS1", "Telemundo"],
    streaming: ["Peacock", "Tubi", "Fox Sports App"],
    free: true,
    notes: "FOX and Telemundo offer free over-the-air coverage. Peacock has select matches free."
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    channels: ["BBC", "ITV"],
    streaming: ["BBC iPlayer", "ITVX"],
    free: true,
    notes: "All matches available free on BBC iPlayer and ITVX with a valid TV license."
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    channels: ["CTV", "TSN", "RDS"],
    streaming: ["TSN+", "CTV App"],
    free: false,
    notes: "CTV provides some free matches. TSN+ subscription required for full coverage."
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    channels: ["SBS"],
    streaming: ["SBS On Demand"],
    free: true,
    notes: "SBS broadcasts all matches free-to-air and on SBS On Demand."
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    channels: ["ARD", "ZDF", "MagentaTV"],
    streaming: ["ARD Mediathek", "ZDF Mediathek"],
    free: true,
    notes: "ARD and ZDF share free-to-air rights. MagentaTV has all matches."
  },
  {
    country: "Mexico",
    flag: "🇲🇽",
    channels: ["Televisa", "TV Azteca", "TUDN"],
    streaming: ["ViX"],
    free: true,
    notes: "Free coverage on Televisa and TV Azteca. ViX has additional content."
  },
  {
    country: "Brazil",
    flag: "🇧🇷",
    channels: ["Globo", "SporTV"],
    streaming: ["Globoplay"],
    free: true,
    notes: "Globo provides free-to-air coverage. Globoplay for streaming."
  },
  {
    country: "India",
    flag: "🇮🇳",
    channels: ["Sports18", "JioCinema"],
    streaming: ["JioCinema"],
    free: true,
    notes: "JioCinema offers free streaming for all matches."
  },
]

const faqs = [
  {
    question: "When does the 2026/2027 new season start?",
    answer: "The WC 2026 kicks off in June 2026 with matches held across the United States, Canada, and Mexico. The tournament runs for approximately one month."
  },
  {
    question: "Can I watch top European leagues for free?",
    answer: "Yes! Many countries have free-to-air coverage including the UK (BBC, ITV), Australia (SBS), and the US (FOX, Telemundo). Check our country guide above for your local options."
  },
  {
    question: "What time will matches be shown?",
    answer: "Match times vary depending on the venue (US, Canada, or Mexico). Most matches will be scheduled to accommodate prime time viewing in major markets. Times will be adjusted for your local timezone."
  },
  {
    question: "Can I use a VPN to watch?",
    answer: "While VPNs can technically bypass geo-restrictions, most streaming services prohibit their use in their terms of service. We recommend using official broadcasters in your region."
  },
  {
    question: "Will matches be available in 4K?",
    answer: "Yes, many broadcasters will offer 4K Ultra HD coverage for select matches, particularly knockout rounds and the final. Check with your local broadcaster for 4K availability."
  },
]

export default function StreamingGuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-2 gap-1">
          <Tv className="h-3 w-3" />
          Streaming Guide
        </Badge>
        <h1 className="text-3xl font-bold lg:text-4xl">How to Watch World Cup 2026</h1>
        <p className="mt-2 text-muted-foreground">
          Your complete guide to watching every 2026-27 season game - free streams, TV channels, and broadcasting by country
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">104</p>
            <p className="text-sm text-muted-foreground">Total Matches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">48</p>
            <p className="text-sm text-muted-foreground">Teams Competing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">16</p>
            <p className="text-sm text-muted-foreground">Host Cities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">3</p>
            <p className="text-sm text-muted-foreground">Host Countries</p>
          </CardContent>
        </Card>
      </div>

      {/* Country by Country */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          Streaming by Country
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {streamingOptions.map((option) => (
            <Card key={option.country} className="group transition-smooth hover:border-primary/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{option.flag}</span>
                  <span>{option.country}</span>
                  {option.free && (
                    <Badge variant="secondary" className="ml-auto">Free Options</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">TV Channels</p>
                    <div className="flex flex-wrap gap-1">
                      {option.channels.map((channel) => (
                        <Badge key={channel} variant="outline" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Streaming</p>
                    <div className="flex flex-wrap gap-1">
                      {option.streaming.map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{option.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Streaming Tips</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Test Your Setup Early</h3>
              <p className="text-sm text-muted-foreground">
                Make sure your streaming app or TV connection works before match day. 
                Download apps and create accounts in advance.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Tv className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Check Internet Speed</h3>
              <p className="text-sm text-muted-foreground">
                For HD streaming, you need at least 5 Mbps. For 4K, aim for 25 Mbps or higher. 
                Wired connections are more stable than WiFi.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Use Official Sources</h3>
              <p className="text-sm text-muted-foreground">
                Avoid illegal streams that may contain malware. Official broadcasters 
                provide reliable, high-quality coverage.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
        <Card>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Watch?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Now that you know how to watch, get our AI-powered predictions for every match 
            to enhance your experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/predictions">
                View Predictions
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/betting-sites">
                Best Betting Sites
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
