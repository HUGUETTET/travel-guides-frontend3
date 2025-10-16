"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Destinos", href: "/destinos" },
    // { name: "Guías", href: "/guias" },
    { name: "Artículos", href: "/posts" },
    { name: "Nosotros", href: "/nosotros" },
    // { name: "Contacto", href: "/contacto" },
  ]

  const handleSearch = () => {
    router.push("/buscar")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-foreground">Viajeros Sin Límites</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            style={{display: mobileMenuOpen ? 'none' : 'flex'}}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium leading-6 text-foreground hover:text-muted-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost" size="icon" onClick={handleSearch}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
        className="lg:hidden" 
        style={{zIndex: 100, position: 'fixed', width: '100%', right: 0, display: 'flex', justifyContent: 'center'}}>
          <div className="fixed inset-0" />
          <div className="fixed inset-y-0 right-0 w-full overflow-y-auto px-6 py-6 sm:max-w-sm ">
            <div className="flex items-center justify-between" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', background: 'transparent'}}>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground right-0 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <X className="h-6 w-6 left-0" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root bg-background/60 backdrop-blur lg:hidden" style={{zIndex: 100, position: 'fixed', width: '100%', right: 0, display: 'flex', justifyContent: 'center'}}>
              <div className="-my-6 divide-y lg:hidden">
                <div className="space-y-2 py-6 lg:hidden" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block px-3 py-2 text-sm font-medium leading-6 text-foreground hover:text-muted-foreground transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/buscar"
                    className="-mx-3 block px-3 py-2 text-sm font-medium leading-6 text-foreground hover:text-muted-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Buscar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
