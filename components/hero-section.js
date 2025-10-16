"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { InteractiveGlobe } from "@/components/ui/interactive-globe"

export function HeroSection({ destinations = [] }) {

  return (
    <section className="relative h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        // style={{
        //   backgroundImage: "url('/beautiful-mountain-landscape-with-traveler.jpg')",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <InteractiveGlobe destinations={destinations} />
        {/* <div className="absolute inset-0 bg-black/40" /> */}
      </div>

      {/* <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl text-balance">
          Descubre el Mundo Sin Límites
        </h1>  
        <p className="mt-6 text-lg leading-relaxed text-white/90 max-w-2xl mx-auto text-pretty">
          Guías completas, consejos prácticos y experiencias auténticas para inspirar tu próxima aventura por el mundo.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Button size="lg" asChild>
            <Link href="/destinos">
              Explorar Destinos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div> */}
    </section>
  )
}
