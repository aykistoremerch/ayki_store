import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, email, address, paymentMethod, items, subtotal, shipping, total } = body;

    if (!fullName || !phone || !email || !address) {
      return NextResponse.json({ error: "Informations manquantes" }, { status: 400 });
    }

    const [order] = await db
      .insert(orders)
      .values({
        fullName,
        phone,
        email,
        address,
        paymentMethod,
        items: typeof items === "string" ? items : JSON.stringify(items),
        subtotal: String(subtotal),
        shipping: String(shipping),
        total: String(total),
        status: "pending",
      })
      .returning();

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allOrders = await db.select().from(orders);
    return NextResponse.json(allOrders);
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
