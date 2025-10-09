import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { urlFor } from "@/lib/image-url"
import { MapPin } from "lucide-react"

export function FeaturedDestinations({ destinations }) {
  if (!destinations || destinations.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Destinos Destacados</h2>
          <p className="mt-4 text-lg text-muted-foreground">Los lugares más populares para tu próxima aventura</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link key={destination._id} href={`/destinos/${destination.slug.current}`}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-xl">
                <div className="relative h-64">
                  <img
                    src={
                      destination.mainImage
                        ? urlFor(destination.mainImage).width(600).height(400).url()
                        : "/placeholder.svg?height=400&width=600&query=travel+destination"
                    }
                    alt={destination.mainImage?.alt || destination.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                    <div className="flex items-center gap-1 mt-2 text-white/90">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{destination.country}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{destination.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
