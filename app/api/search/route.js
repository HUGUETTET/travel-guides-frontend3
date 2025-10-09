import { NextResponse } from "next/server"
import { client } from "@/lib/sanity"
import { urlFor } from "@/lib/image-url"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ results: [] }, { status: 200 })
    }

    // Search across posts, guides, and destinations
    const searchQuery = `
      {
        "posts": *[_type == "post" && (
          title match $query + "*" ||
          excerpt match $query + "*"
        )][0...5] {
          _id,
          title,
          slug,
          excerpt,
          mainImage,
          "type": "Artículo"
        },
        "guides": *[_type == "guide" && (
          title match $query + "*" ||
          excerpt match $query + "*"
        )][0...5] {
          _id,
          title,
          slug,
          excerpt,
          mainImage,
          "type": "Guía"
        },
        "destinations": *[_type == "destination" && (
          name match $query + "*" ||
          description match $query + "*" ||
          country match $query + "*"
        )][0...5] {
          _id,
          name,
          slug,
          description,
          mainImage,
          "type": "Destino"
        }
      }
    `

    const data = await client.fetch(searchQuery, { query })

    // Combine and format results
    const results = [
      ...data.posts.map((post) => ({
        _id: post._id,
        title: post.title,
        excerpt: post.excerpt,
        type: post.type,
        url: `/posts/${post.slug.current}`,
        image: post.mainImage ? urlFor(post.mainImage).width(200).height(200).url() : null,
      })),
      ...data.guides.map((guide) => ({
        _id: guide._id,
        title: guide.title,
        excerpt: guide.excerpt,
        type: guide.type,
        url: `/guias/${guide.slug.current}`,
        image: guide.mainImage ? urlFor(guide.mainImage).width(200).height(200).url() : null,
      })),
      ...data.destinations.map((dest) => ({
        _id: dest._id,
        title: dest.name,
        excerpt: dest.description,
        type: dest.type,
        url: `/destinos/${dest.slug.current}`,
        image: dest.mainImage ? urlFor(dest.mainImage).width(200).height(200).url() : null,
      })),
    ]

    return NextResponse.json({ results }, { status: 200 })
  } catch (error) {
    console.error("Error searching:", error)
    return NextResponse.json({ error: "Error al buscar" }, { status: 500 })
  }
}
