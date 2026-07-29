import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, customer } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Səbət boşdur" }, { status: 400 });
    }
    if (!customer?.name || !customer?.phone) {
      return NextResponse.json({ error: "Müştəri məlumatları əskikdir" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const id = "SF-" + Date.now().toString().slice(-8);

    const { data: order, error: orderError } = await admin
      .from("orders")
      .insert({ id, items, total, customer, status: "Gözləmədə" })
      .select()
      .single();

    if (orderError) throw orderError;

    for (const item of items) {
      const { data: product } = await admin
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();
      if (product) {
        const newStock = Math.max(0, product.stock - item.qty);
        await admin.from("products").update({ stock: newStock }).eq("id", item.id);
      }
    }

    return NextResponse.json({ order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Sifariş yaradıla bilmədi" }, { status: 500 });
  }
}
