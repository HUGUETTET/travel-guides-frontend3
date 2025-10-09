import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Wallet, Shield, Map, Calendar, Users } from "lucide-react"

const categories = [
  {
    name: "Itinerarios",
    icon: Map,
    href: "/posts?category=itinerarios",
    description: "Rutas y planes detallados",
  },
  {
    name: "Presupuesto",
    icon: Wallet,
    href: "/posts?category=presupuesto",
    description: "Viaja sin gastar de más",
  },
  {
    name: "Seguros",
    icon: Shield,
    href: "/posts?category=seguros",
    description: "Viaja con tranquilidad",
  },
  {
    name: "Consejos",
    icon: Compass,
    href: "/posts?category=consejos",
    description: "Tips de viajeros expertos",
  },
  {
    name: "Planificación",
    icon: Calendar,
    href: "/posts?category=planificacion",
    description: "Organiza tu viaje perfecto",
  },
  {
    name: "Experiencias",
    icon: Users,
    href: "/posts?category=experiencias",
    description: "Historias reales de viajeros",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Explora por Categoría</h2>
          <p className="mt-4 text-lg text-muted-foreground">Encuentra exactamente lo que necesitas para tu viaje</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{category.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
