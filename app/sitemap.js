import { client } from "@/lib/sanity"

export default async function sitemap() {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL
  // Fetch all posts
  async function getPosts() {
    const query = `
    *[_type == "post"] {
      slug,
      publishedAt,
      _updatedAt
    }
    `
    const data = await client.fetch(query)
    return data
  }

  // Fetch all guides
  async function getGuides() {
    const query = `
    *[_type == "guide"] {
      slug,
      publishedAt,
      _updatedAt
    }
    `
    const data = await client.fetch(query)
    return data
  }

  // Fetch all destinations
  async function getDestinations() {
    const query = `
    *[_type == "destination"] {
      slug,
      _updatedAt
    }
    `
    const data = await client.fetch(query)
    return data
  }

  const [posts, guides, destinations] = await Promise.all([getPosts(), getGuides(), getDestinations()])

  // Generate post URLs
  const postUrls = posts.map((post) => ({
    url: `${FRONTEND_URL}/posts/${post.slug.current}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  // Generate guide URLs
  const guideUrls = guides.map((guide) => ({
    url: `${FRONTEND_URL}/guias/${guide.slug.current}`,
    lastModified: new Date(guide._updatedAt || guide.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  // Generate destination URLs
  const destinationUrls = destinations.map((destination) => ({
    url: `${FRONTEND_URL}/destinos/${destination.slug.current}`,
    lastModified: new Date(destination._updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    // Homepage
    {
      url: FRONTEND_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Posts listing
    {
      url: `${FRONTEND_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    // Guides listing
    {
      url: `${FRONTEND_URL}/guias`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Destinations listing
    {
      url: `${FRONTEND_URL}/destinos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // About page
    {
      url: `${FRONTEND_URL}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Contact page
    {
      url: `${FRONTEND_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Search page
    {
      url: `${FRONTEND_URL}/buscar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Dynamic post URLs
    ...postUrls,
    // Dynamic guide URLs
    ...guideUrls,
    // Dynamic destination URLs
    ...destinationUrls,
  ]
}
