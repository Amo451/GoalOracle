import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { TelegramCTA } from '@/components/telegram-cta'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://goaloracle.ai'),
  title: {
    default: 'GoalOracle AI - Worldwide Football Predictions & Betting Tips',
    template: '%s | GoalOracle AI'
  },
  description: 'AI-powered football predictions, expert betting tips, match analysis, and odds comparison. Get the most accurate football predictions with our advanced AI technology.',
  keywords: ['football predictions', 'soccer betting tips', 'AI predictions', 'match analysis', 'betting odds', 'FIFA World Cup'],
  authors: [{ name: 'GoalOracle AI' }],
  creator: 'GoalOracle AI',
  publisher: 'GoalOracle AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://goaloracle.ai',
    siteName: 'GoalOracle AI',
    title: 'GoalOracle AI - Worldwide Football Predictions & Betting Tips',
    description: 'AI-powered football predictions, expert betting tips, match analysis, and odds comparison.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GoalOracle AI - Football Predictions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoalOracle AI - Worldwide Football Predictions & Betting Tips',
    description: 'AI-powered predictions and betting tips',
    creator: '@goaloracle',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://goaloracle.ai',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <TelegramCTA />
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
