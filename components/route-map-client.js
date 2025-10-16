"use client"
import { RouteMap } from "./route-map"

export default function RouteMapClient({ route }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      element.classList.add("ring-4", "ring-orange-500", "ring-offset-4")
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-orange-500", "ring-offset-4")
      }, 2000)
    }
  }

  return (
    <RouteMap
      route={route}
      onStopClick={(index) => scrollToSection(`stop-${index}`)}
      onTransportClick={(index) => scrollToSection(`transport-${index}`)}
    />
  )
}
