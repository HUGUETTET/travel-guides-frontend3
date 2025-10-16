import { urlFor } from "@/lib/image-url"
import { notFound } from "next/navigation"
import { getRouteBySlug } from "@/lib/sanity.ts"
import RouteMapClient from "@/components/route-map-client"
import { RouteTimeline } from "@/components/route-timeline"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MapPin, DollarSign, TrendingUp } from "lucide-react"

export async function generateMetadata({ params }) {
  const route = await getRouteBySlug(params.slug)

  if (!route) {
    return {
      title: "Ruta no encontrada",
    }
  }

  return {
    title: `${route.title} - Ruta de Viaje`,
    description: route.description || `Ruta de viaje: ${route.title}`,
  }
}

export default async function RoutePage({ params }) {
  const route = await getRouteBySlug(params.slug)

  if (!route) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] lg:h-[500px]">
        <img
          src={
            route.mainImage
              ? urlFor(route.mainImage).width(1920).height(1080).url()
              : "/placeholder.svg?height=1080&width=1920&query=travel+destination+route"
          }
          alt={route.mainImage?.alt || route.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="mx-auto max-w-4xl">
            {route.destination && (
              <Link href={`/destinos/${route.destination.slug.current}`}>
                <Badge className="mb-4 bg-white/90 text-foreground hover:bg-white">
                  <MapPin className="h-3 w-3 mr-1" />
                  {route.destination.name}, {route.destination.country}
                </Badge>
              </Link>
            )}
            {route.difficulty && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {route.difficulty}
              </Badge>
            )}
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl text-balance">{route.title}</h1>
            {route.description && <p className="mt-4 text-lg text-white/90 max-w-2xl">{route.description}</p>}
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {route.totalDuration && (
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duración</p>
                  <p className="font-semibold text-foreground">{route.totalDuration}</p>
                </div>
              </div>
            )}
            {route.bestTimeToVisit && (
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mejor Época</p>
                  <p className="font-semibold text-foreground">{route.bestTimeToVisit}</p>
                </div>
              </div>
            )}
            {route.budget && (
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Presupuesto</p>
                  <p className="font-semibold text-foreground">
                    {route.budget.low} - {route.budget.high}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2">Route Map</h2>
        <p className="text-muted-foreground mb-6">
          Click on the numbered pins to jump to that destination, or click the transportation icons to learn about
          travel between stops.
        </p>
        <RouteMapClient route={route} />
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2">Itinerary</h2>
        <p className="text-muted-foreground mb-6">
          Follow the journey chronologically through each destination.
        </p>
        <RouteTimeline route={route} />
      </div>
    {/* </div> */}
    </main>
  )
}
