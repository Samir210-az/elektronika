# Elektronika — Elektron Məhsul Satış Platforması

Next.js əsasında hazırlanmış, PWA dəstəkli, parallax və animasiyalı elektronika satış saytı.

## Xüsusiyyətlər
- Progressive Web App (quraşdırma təklifi)
- Parallax hero, scroll animasiyaları (Framer Motion)
- Məhsul kataloqu, stok statusu (bitib/mövcuddur)
- Səbət və WhatsApp üzərindən kart-to-kart sifariş axını
- Admin panel: məhsul əlavə/redaktə/sil, sifarişləri təsdiqləmə

## Quraşdırma
\`\`\`bash
npm install
npm run dev
\`\`\`

## Admin panel
`/admin` — standart şifrə: `elektronika2026` (istehsalatda mütləq dəyişin, `src/context/StoreContext.js`)

## WhatsApp nömrəsi
`src/lib/whatsapp.js` faylında `WHATSAPP_NUMBER` dəyişənini real nömrə ilə əvəz edin.

## Deploy
Vercel ilə birbaşa GitHub reposundan deploy edilə bilər.
