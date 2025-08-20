import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { notFound } from 'next/navigation';
import Image from "next/image";
import { getNewsBySlug, mediaUrl } from '@/lib/strapi';
import BackButton from "@/components/buttons/BackButton";

export const revalidate = 300;

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;
    const d = await getNewsBySlug({ locale, slug });

    if (!d) return {};
    const og = d.seo?.ogImage?.url || d.banner?.url;

    return {
        title: d.seo?.metaTitle || d.title,
        description: d.seo?.metaDescription || '',
        alternates: { canonical: d.seo?.canonicalUrl || undefined },
        openGraph: {
            title: d.seo?.metaTitle || d.title,
            description: d.seo?.metaDescription || '',
            images: og ? [mediaUrl(og)] : [],
        },
    };
}

export default async function Page({ params }) {
    const { locale, slug } = await params;
    const d = await getNewsBySlug({ locale, slug });
    if (!d) return notFound();

    const banner = d.banner;
    const content = d.content;

    return (
        <main className="prose mx-auto py-8">
            <BackButton/>
            {banner && (
                <Image
                    src={mediaUrl(banner.url)}
                    alt={d.seo?.metaTitle}
                    width={banner?.width }
                    height={banner?.height }
                />
            )}
            <h1 className="mt-6 text-3xl font-bold">{d.title}</h1>
            <BlocksRenderer content={content} />
            <h5>{d.datePublished}</h5>
        </main>
    );
}
