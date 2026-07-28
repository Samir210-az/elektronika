import { seedProducts } from "@/data/seedProducts";

const SITE_URL = "https://elektronika-az.vercel.app";

export default function sitemap() {
  const staticRoutes = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/cart`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
  ];

  const productRoutes = seedProducts.map((p) => ({
    url: `${SITE_URL}/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
