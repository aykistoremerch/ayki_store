import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    await db
      .insert(subscribers)
      .values({ email })
      .onConflictDoNothing();

    return NextResponse.json({ success: true, message: "Inscription réussie !" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
