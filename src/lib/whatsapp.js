export const WHATSAPP_NUMBER = "994000000000"; // TODO: admin real nömrə ilə əvəz etməlidir

export function buildOrderWhatsAppLink(order) {
  const lines = [
    `🛒 Yeni sifariş — ${order.id}`,
    "",
    ...order.items.map((i) => `• ${i.name} x${i.qty} — ${(i.price * i.qty).toFixed(2)} AZN`),
    "",
    `Cəmi: ${order.total.toFixed(2)} AZN`,
    `Ad: ${order.customer.name}`,
    `Telefon: ${order.customer.phone}`,
    order.customer.address ? `Ünvan: ${order.customer.address}` : "",
    "",
    "Ödəniş kart-to-kart üsulu ilə ediləcək. Kart nömrəsini göndərməyinizi xahiş edirəm.",
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
