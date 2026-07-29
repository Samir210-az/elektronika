import { NextResponse } from "next/server";
import { getSupabaseAdmin, checkAdminSecret } from "@/lib/supabaseAdmin";

export async function GET(request) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: "İcazə yoxdur" }, { status: 401 });
  }
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ orders: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Sifarişlər yüklənmədi" }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: "İcazə yoxdur" }, { status: 401 });
  }
  try {
    const { id, status } = await request.json();
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ order: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Sifariş yenilənmədi" }, { status: 500 });
  }
}
