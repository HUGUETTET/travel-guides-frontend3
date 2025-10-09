import { NextResponse } from "next/server"
import { subscribeToNewsletter } from "@/lib/sanity"

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    await subscribeToNewsletter(email)

    return NextResponse.json({ message: "Suscripción exitosa" }, { status: 200 })
  } catch (error) {
    console.error("Error al suscribir:", error)
    return NextResponse.json({ error: "Error al procesar la suscripción" }, { status: 500 })
  }
}
