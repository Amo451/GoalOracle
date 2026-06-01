import Link from "next/link"
import { Zap, Send, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  predictions: [
    { name: "Today's Predictions", href: "/today-predictions" },
    { name: "All Predictions", href: "/predictions" },
    { name: "Accumulators", href: "/accumulators" },
    { name: "Best Bets", href: "/best-bets" },
  ],
  teams: [
    { name: "All Teams", href: "/teams" },
    { name: "Group Standings", href: "/groups" },
    { name: "Top Scorers", href: "/top-scorers" },
    { name: "Player Stats", href: "/players" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Betting Guide", href: "/betting-guide" },
    { name: "Streaming Guide", href: "/streaming" },
    { name: "Best Betting Sites", href: "/betting-sites" },
  ],
  legal: [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Responsible Gambling", href: "/responsible-gambling" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Top section */}
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">GoalOracle</span>
                <span className="text-xs font-medium text-primary">AI</span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              AI-powered football predictions for the FIFA World Cup 2026. 
              Get expert analysis, betting tips, and match previews.
            </p>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold">Subscribe to our newsletter</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Get daily predictions delivered to your inbox.
              </p>
              <form className="mt-3 flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-9 text-sm"
                />
                <Button size="sm" type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold">Predictions</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.predictions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Teams</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.teams.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GoalOracle AI. All rights reserved. 
            Gambling involves risk. Please bet responsibly.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://t.me/goaloracle"
              target="_blank"
              className="text-muted-foreground transition-smooth hover:text-primary"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Telegram</span>
            </Link>
            <Link
              href="https://twitter.com/goaloracle"
              target="_blank"
              className="text-muted-foreground transition-smooth hover:text-primary"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://instagram.com/goaloracle"
              target="_blank"
              className="text-muted-foreground transition-smooth hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://youtube.com/goaloracle"
              target="_blank"
              className="text-muted-foreground transition-smooth hover:text-primary"
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
