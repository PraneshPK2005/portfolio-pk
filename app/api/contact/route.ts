import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,       // e.g., yourname@gmail.com
      pass: process.env.EMAIL_PASS,       // Gmail App Password (NOT regular password)
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,       // your second email
    subject: `Portfolio Contact - ${subject}`,
    text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ message: "Error sending email" }, { status: 500 })
  }
}
