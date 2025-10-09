import { getPostBySlug } from "@/lib/sanity"
import { urlFor } from "@/lib/image-url"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { SocialShare } from "@/components/social-share"

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Artículo no encontrado",
    }
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords?.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <img
          src={urlFor(value).width(1200).url() || "/placeholder.svg"}
          alt={value.alt || ""}
          className="rounded-lg w-full"
        />
        {value.caption && (
          <figcaption className="text-sm text-muted-foreground text-center mt-2">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] lg:h-[500px]">
        <img
          src={
            post.mainImage
              ? urlFor(post.mainImage).width(1920).height(1080).url()
              : "/placeholder.svg?height=1080&width=1920&query=travel+blog+post"
          }
          alt={post.mainImage?.alt || post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories?.map((category) => (
                <Badge key={category.slug.current} className="bg-white/90 text-foreground hover:bg-white">
                  {category.title}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl text-balance">{post.title}</h1>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min de lectura</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        {post.excerpt && <p className="text-xl text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>}

        <Separator className="my-8" />

        <div className="prose prose-lg max-w-none text-foreground">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        <Separator className="my-12" />

        {/* Social Share */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <SocialShare url={`/posts/${post.slug.current}`} title={post.title} />

          {post.destinations && post.destinations.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Destinos:</span>
              {post.destinations.map((dest) => (
                <Link key={dest.slug.current} href={`/destinos/${dest.slug.current}`}>
                  <Badge variant="outline">{dest.name}</Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>
    </main>
  )
}
