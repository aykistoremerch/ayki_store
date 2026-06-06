import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    await db.insert(contactMessages).values({
      name,
      email,
      phone: phone || null,
      message,
    });

    return NextResponse.json({ success: true, message: "Message envoyé avec succès !" });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
