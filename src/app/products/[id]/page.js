import Script from "next/script";
import { seedProducts } from "@/data/seedProducts";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return seedProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = seedProducts.find((p) => p.id === id);
  if (!product) {
    return { title: "Məhsul tapılmadı" };
  }
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = seedProducts.find((p) => p.id === id);

  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images,
        category: product.category,
        offers: {
          "@type": "Offer",
          priceCurrency: "AZN",
          price: product.price,
          availability:
            product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <Script id={`ld-json-${id}`} type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      )}
      <ProductDetailClient />
    </>
  );
}
