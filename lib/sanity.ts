import { createClient } from "next-sanity"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
})

export interface Destination {
  _id: string
  name: string
  slug: { current: string }
  country: string
  region: string
  description?: string
  mainImage?: any
}

export interface RouteStop {
  _key: string
  destination: string // City or country name
  country: string
  latitude: number
  longitude: number
  description?: string
  arrivalDate?: string
  departureDate?: string
  highlights?: string[]
  accommodation?: string
  activities?: string[]
}

export interface Transportation {
  _key: string
  method: "bus" | "plane" | "train" | "car" | "boat" | "walk" | "bike"
  emoji: string
  duration?: string
  cost?: string
  description?: string
  tips?: string
}

export interface Route {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  mainImage?: any
  stops: RouteStop[]
  transportation: Transportation[]
  totalDuration?: string
  difficulty?: "easy" | "moderate" | "challenging"
  budget?: "budget" | "moderate" | "luxury"
  bestTimeToVisit?: string
  mapType: "country" | "region" | "multi-country"
  mapCenter?: { lat: number; lng: number }
  mapZoom?: number
}

export async function getAllDestinations(): Promise<Destination[]> {
  try {
    return await client.fetch(
      `*[_type == "destination"] | order(name asc) {
        _id,
        name,
        slug,
        country,
        region,
        description,
        mainImage
      }`,
    )
  } catch (error) {
    console.error("[v0] Sanity fetch error:", error)
    // Return empty array if fetch fails
    return []
  }
}

export async function getAllRoutes(): Promise<Route[]> {
  try {
    return await client.fetch(
      `*[_type == "route"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        description,
        mainImage,
        stops[] {
          _key,
          destination,
          country,
          latitude,
          longitude,
          description,
          arrivalDate,
          departureDate,
          highlights,
          accommodation,
          activities
        },
        transportation[] {
          _key,
          method,
          emoji,
          duration,
          cost,
          description,
          tips
        },
        totalDuration,
        difficulty,
        budget,
        bestTimeToVisit,
        mapType,
        mapCenter,
        mapZoom
      }`,
    )
  } catch (error) {
    console.error("[v0] Sanity fetch routes error:", error)
    return []
  }
}

export async function getRouteBySlug(slug: string): Promise<Route | null> {
  try {
    return await client.fetch(
      `*[_type == "route" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        mainImage,
        stops[] {
          _key,
          destination,
          country,
          latitude,
          longitude,
          description,
          arrivalDate,
          departureDate,
          highlights,
          accommodation,
          activities
        },
        transportation[] {
          _key,
          method,
          emoji,
          duration,
          cost,
          description,
          tips
        },
        totalDuration,
        difficulty,
        budget,
        bestTimeToVisit,
        mapType,
        mapCenter,
        mapZoom,
        "destination": destination->{name, slug, country, region}
      }
    `,
      { slug },
    )
  } catch (error) {
    console.error("[v0] Sanity fetch route error:", error)
    return null
  }
}

// /lib/sanity/route.ts

export async function getRoutesByDestinationId(destinationId: string): Promise<Route[]> {
    try {
      return await client.fetch(
        `*[_type == "route" && $destinationId in destinations[]._ref] {
          _id,
          title,
          slug,
          mainImage,
          description
        }`,
        { destinationId }
      )
    } catch (error) {
      console.error("[Sanity] fetch routes by destination error:", error)
      return []
    }
  }
  
