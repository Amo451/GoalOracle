import Link from "next/link"
import { ArrowRight, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/lib/data"

interface BlogSectionProps {
  posts: BlogPost[]
  showTitle?: boolean
}

const categoryColors: Record<string, string> = {
  'predictions': 'bg-primary/10 text-primary border-primary/20',
  'betting-tips': 'bg-accent/10 text-accent border-accent/20',
  'streaming': 'bg-info/10 text-info border-info/20',
  'analysis': 'bg-warning/10 text-warning border-warning/20',
  'news': 'bg-secondary text-secondary-foreground',
}

export function BlogSection({ posts, showTitle = true }: BlogSectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {showTitle && (
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold lg:text-3xl">Latest Articles</h2>
              <p className="mt-1 text-muted-foreground">
                Expert analysis, betting tips, and World Cup insights
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-1">
              <Link href="/blog">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className={`group h-full transition-smooth hover:border-primary/50 hover:shadow-lg ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
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
    </section>
  )
}
