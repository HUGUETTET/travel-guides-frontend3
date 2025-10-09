import { getAllPosts } from "@/lib/sanity"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/lib/image-url"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

export const metadata = {
  title: "Artículos - Viajeros Sin Límites",
  description: "Lee nuestros artículos sobre viajes, consejos, presupuestos y experiencias alrededor del mundo.",
}

export default async function PostsPage() {
  const posts = await getAllPosts(50)

  return (
    <main className="min-h-screen py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Artículos de Viaje</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consejos prácticos, experiencias reales y guías detalladas para inspirar tu próxima aventura.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay artículos disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} href={`/posts/${post.slug.current}`}>
                <Card className="overflow-hidden h-full transition-all hover:shadow-xl">
                  <div className="relative h-48">
                    <img
                      src={
                        post.mainImage
                          ? urlFor(post.mainImage).width(600).height(400).url()
                          : "/placeholder.svg?height=400&width=600&query=travel+blog+post"
                      }
                      alt={post.mainImage?.alt || post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories?.slice(0, 2).map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString("es-ES")}</span>
                      </div>
                      {post.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime} min</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
