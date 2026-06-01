"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your newsletter service
    setSubmitted(true)
  }

  return (
    <section className="border-y border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Card className="glass-strong">
          <CardContent className="flex flex-col items-center p-8 text-center lg:p-12">
            {submitted ? (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-2xl font-bold">You&apos;re In!</h3>
                <p className="mt-2 text-muted-foreground">
                  Check your inbox for a confirmation email. Welcome to GoalOracle AI!
                </p>
              </>
            ) : (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mt-4 text-2xl font-bold lg:text-3xl">
                  Get Daily Predictions Delivered
                </h2>
                <p className="mt-2 max-w-md text-muted-foreground">
                  Subscribe to receive our AI-powered match predictions, betting tips, 
                  and exclusive analysis straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                  <Button type="submit" size="lg" className="gap-2">
                    <Send className="h-4 w-4" />
                    Subscribe
                  </Button>
                </form>
                <p className="mt-4 text-xs text-muted-foreground">
                  No spam, unsubscribe anytime. Free forever.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
