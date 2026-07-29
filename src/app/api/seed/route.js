import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { seedProducts } from "@/data/seedProducts";

export async function GET(request) {
  const key = request.nextUrl.searchParams.get("key");
  if (!key || key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "İcazə yoxdur" }, { status: 401 });
  }
  try {
    const admin = getSupabaseAdmin();
    const { data: existing } = await admin.from("products").select("id").limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ ok: true, message: "Baza artıq doludur, seed edilmədi." });
    }
    const rows = seedProducts.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      old_price: p.oldPrice,
      stock: p.stock,
      description: p.description,
      images: p.images,
      video: p.video || "",
    }));
    const { error } = await admin.from("products").insert(rows);
    if (error) throw error;
    return NextResponse.json({ ok: true, message: `${rows.length} məhsul əlavə edildi.` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
