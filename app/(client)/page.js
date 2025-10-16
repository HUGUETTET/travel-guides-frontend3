import { getFeaturedPosts, getFeaturedDestinations, getAllDestinations } from "@/lib/sanity"
import { HeroSection } from "@/components/hero-section"
import { FeaturedPosts } from "@/components/featured-posts"
import { FeaturedDestinations } from "@/components/featured-destinations"
// import { NewsletterSection } from "@/components/newsletter-section"
// import { CategoryGrid } from "@/components/category-grid"

export const metadata = {
  title: "Viajeros Sin Límites - Tu Guía de Viajes",
  description: "Descubre los mejores destinos, guías de viaje, consejos y experiencias para tu próxima aventura.",
}

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts()
  const featuredDestinations = await getFeaturedDestinations()
  const destinations = await getAllDestinations()

  return (
    <main className="min-h-screen">
      <HeroSection destinations={destinations}/>
      {/* <CategoryGrid /> */}
      <FeaturedDestinations destinations={featuredDestinations} />
      <FeaturedPosts posts={featuredPosts} />
    </main>
  )
}
