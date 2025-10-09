"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <Mail className="h-12 w-12 mx-auto mb-6" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Únete a Nuestra Comunidad</h2>
        <p className="text-lg leading-relaxed mb-8 text-primary-foreground/90">
          Recibe las mejores guías de viaje, consejos exclusivos y ofertas directamente en tu correo.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white text-foreground"
          />
          <Button type="submit" variant="secondary" disabled={status === "loading"}>
            {status === "loading" ? "Enviando..." : "Suscribirse"}
          </Button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm text-primary-foreground/90">¡Gracias por suscribirte! Revisa tu correo.</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-destructive-foreground">Hubo un error. Inténtalo de nuevo.</p>
        )}
      </div>
    </section>
  )
}
