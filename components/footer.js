import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-foreground mb-4">Viajeros Sin Límites</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Tu compañero de viajes para descubrir el mundo. Guías detalladas, consejos prácticos y experiencias
              auténticas para inspirar tu próxima aventura.
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Explora</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/destinos"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Destinos
                </Link>
              </li>
              <li>
                <Link href="/guias" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Guías de Viaje
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Artículos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Información</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/nosotros"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {currentYear} Viajeros Sin Límites. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
