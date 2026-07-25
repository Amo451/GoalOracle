import Link from "next/link"
import { Metadata } from "next"
import { BookOpen, Clock, User, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/data"

export const metadata: Metadata = {
  title: "Blog",
  description: "Betting tips, predictions analysis, streaming guides, and expert football insights",
  openGraph: {
    title: "Blog | GoalOracle AI",
    description: "2026 football betting tips, predictions, and expert analysis.",
  },
}

const categoryColors: Record<string, string> = {
  'predictions': 'bg-primary/10 text-primary border-primary/20',
  'betting-tips': 'bg-accent/10 text-accent border-accent/20',
  'streaming': 'bg-info/10 text-info border-info/20',
  'analysis': 'bg-warning/10 text-warning border-warning/20',
  'news': 'bg-secondary text-secondary-foreground',
}

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Predictions', slug: 'predictions' },
  { name: 'Betting Tips', slug: 'betting-tips' },
  { name: 'Analysis', slug: 'analysis' },
  { name: 'Streaming', slug: 'streaming' },
  { name: 'News', slug: 'news' },
]

export default function BlogPage() {
  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-2 gap-1">
          <BookOpen className="h-3 w-3" />
          Blog
        </Badge>
        <h1 className="text-3xl font-bold lg:text-4xl">Latest Articles</h1>
        <p className="mt-2 text-muted-foreground">
          Expert analysis, betting tips, and WC insights
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              variant={cat.slug === 'all' ? 'default' : 'outline'}
              size="sm"
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <Link href={`/blog/${featuredPost.slug}`} className="block mb-12">
        <Card className="group overflow-hidden transition-smooth hover:border-primary/50 hover:shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold text-muted-foreground/10">
                  {featuredPost.title.charAt(0)}
                </span>
              </div>
              <Badge 
                variant="outline" 
                className={`absolute top-4 left-4 ${categoryColors[featuredPost.category] || ''}`}
              >
                {featuredPost.category.replace('-', ' ')}
              </Badge>
              <Badge className="absolute top-4 right-4">Featured</Badge>
            </div>
            <CardContent className="p-6 lg:p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold lg:text-3xl transition-smooth group-hover:text-primary">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-muted-foreground line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readTime} min read
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {featuredPost.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>

      {/* All Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="group h-full transition-smooth hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-0">
                {/* Image placeholder */}
                <div className="relative aspect-video overflow-hidden rounded-t-lg bg-gradient-to-br from-secondary to-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`absolute top-3 left-3 ${categoryColors[post.category] || ''}`}
                  >
                    {post.category.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-2 text-lg font-semibold transition-smooth group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
