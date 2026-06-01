import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  User, 
  Calendar,
  Share2,
  Twitter,
  Facebook,
  Linkedin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { blogPosts, getBlogPostBySlug, matches, getTeamById } from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return { title: "Article Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

const categoryColors: Record<string, string> = {
  'predictions': 'bg-primary/10 text-primary border-primary/20',
  'betting-tips': 'bg-accent/10 text-accent border-accent/20',
  'streaming': 'bg-info/10 text-info border-info/20',
  'analysis': 'bg-warning/10 text-warning border-warning/20',
  'news': 'bg-secondary text-secondary-foreground',
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  // Get some featured matches for sidebar
  const featuredMatches = matches.slice(0, 3)

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "GoalOracle AI",
      logo: {
        "@type": "ImageObject",
        url: "https://goaloracle.ai/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://goaloracle.ai/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground line-clamp-1">{post.title}</span>
        </nav>

        {/* Back button */}
        <Button asChild variant="ghost" className="mb-6 gap-2">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Header */}
            <header className="mb-8">
              <Badge 
                variant="outline" 
                className={`mb-4 ${categoryColors[post.category] || ''}`}
              >
                {post.category.replace('-', ' ')}
              </Badge>
              
              <h1 className="text-3xl font-bold lg:text-4xl text-balance">
                {post.title}
              </h1>
              
              <p className="mt-4 text-lg text-muted-foreground">
                {post.excerpt}
              </p>
              
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{post.author}</p>
                    <p className="text-xs">Author</p>
                  </div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl font-bold text-muted-foreground/10">
                  {post.title.charAt(0)}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The FIFA World Cup 2026 is set to be the largest and most exciting tournament in football history. 
                With 48 teams competing across three host nations - the United States, Canada, and Mexico - 
                there has never been more opportunity for both upsets and dominant performances.
              </p>

              <h2>Key Insights</h2>
              <p>
                Our AI analysis has processed millions of data points from recent international matches, 
                club performances, and historical World Cup data to bring you the most accurate predictions 
                available. Here are the key factors we consider:
              </p>

              <ul>
                <li><strong>Team Form:</strong> Recent match results and performance trends</li>
                <li><strong>Head-to-Head Records:</strong> Historical matchups between teams</li>
                <li><strong>Player Fitness:</strong> Injury reports and squad availability</li>
                <li><strong>Tactical Analysis:</strong> Playing styles and strategic approaches</li>
                <li><strong>Home Advantage:</strong> Impact of playing in familiar conditions</li>
              </ul>

              <h2>What This Means for Bettors</h2>
              <p>
                Understanding these factors is crucial for making informed betting decisions. 
                Our AI-powered predictions combine all these elements to give you a clear picture 
                of each match&apos;s likely outcome.
              </p>

              <blockquote>
                &ldquo;The key to successful sports betting is not just picking winners, 
                but finding value in the odds offered by bookmakers.&rdquo;
              </blockquote>

              <h2>Conclusion</h2>
              <p>
                Stay tuned to GoalOracle AI for the latest predictions, analysis, and betting tips 
                throughout the World Cup 2026 tournament. Our AI continues to learn and improve, 
                ensuring you always have access to the most accurate insights.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
              <span className="text-sm font-medium">Share this article:</span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <Card className="group h-full transition-smooth hover:border-primary/50">
                        <CardContent className="p-4">
                          <Badge 
                            variant="outline" 
                            className={`text-xs mb-2 ${categoryColors[relatedPost.category] || ''}`}
                          >
                            {relatedPost.category.replace('-', ' ')}
                          </Badge>
                          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-smooth">
                            {relatedPost.title}
                          </h3>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {relatedPost.readTime} min read
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Featured Predictions */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Featured Predictions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {featuredMatches.map((match) => {
                  const homeTeam = getTeamById(match.homeTeam)
                  const awayTeam = getTeamById(match.awayTeam)
                  
                  return (
                    <Link key={match.id} href={`/predictions/${match.slug}`}>
                      <div className="flex items-center justify-between rounded-lg p-3 transition-smooth hover:bg-secondary">
                        <div className="flex items-center gap-2">
                          <span>{homeTeam?.flag}</span>
                          <span className="text-xs text-muted-foreground">vs</span>
                          <span>{awayTeam?.flag}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {match.prediction.confidence}%
                        </Badge>
                      </div>
                    </Link>
                  )
                })}
                
                <Button asChild variant="outline" className="w-full mt-2">
                  <Link href="/predictions">
                    View All Predictions
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subscribe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest predictions and betting tips delivered to your inbox.
                </p>
                <Button asChild className="w-full">
                  <Link href="/">
                    Subscribe Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  )
}
