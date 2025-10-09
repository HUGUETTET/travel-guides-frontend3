import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    // Store contact message in Sanity (optional)
    // You could create a "contactMessage" schema to store these
    // For now, we'll just log it
    console.log("Contact form submission:", { name, email, subject, message })

    // In production, you would send an email here using a service like:
    // - Resend
    // - SendGrid
    // - Nodemailer
    // Example:
    // await sendEmail({
    //   to: 'contacto@viajerossinlimites.com',
    //   from: email,
    //   subject: subject,
    //   text: `From: ${name} (${email})\n\n${message}`
    // })

    return NextResponse.json({ message: "Mensaje enviado exitosamente" }, { status: 200 })
  } catch (error) {
    console.error("Error al procesar el mensaje de contacto:", error)
    return NextResponse.json({ error: "Error al procesar el mensaje" }, { status: 500 })
  }
}
