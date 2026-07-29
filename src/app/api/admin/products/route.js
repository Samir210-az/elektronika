import { NextResponse } from "next/server";
import { getSupabaseAdmin, checkAdminSecret } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.from("products").select("*").order("created_at");
    if (error) throw error;
    return NextResponse.json({ products: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Məhsullar yüklənmədi" }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: "İcazə yoxdur" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const admin = getSupabaseAdmin();
    const id = body.id || "p" + Date.now();
    const payload = {
      id,
      name: body.name,
      category: body.category,
      price: Number(body.price) || 0,
      old_price: Number(body.oldPrice) || 0,
      stock: Number(body.stock) || 0,
      description: body.description,
      images: body.images || [],
      video: body.video || "",
    };
    const { data, error } = await admin
      .from("products")
      .upsert(payload)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ product: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Məhsul saxlanılmadı" }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: "İcazə yoxdur" }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("products").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Məhsul silinmədi" }, { status: 500 });
  }
}
