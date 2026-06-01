"use client"

import Link from "next/link"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TelegramCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg glow-primary"
      >
        <Link href="https://t.me/goaloracle" target="_blank">
          <Send className="h-6 w-6" />
          <span className="sr-only">Join our Telegram</span>
        </Link>
      </Button>
    </div>
  )
}
