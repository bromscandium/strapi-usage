import { getNewsBySlug, mediaUrl } from '@/lib/strapi';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;
    const d = await getNewsBySlug({ locale, slug });
    if (!d) return {};
    const a = d.attributes;
    const og = a.seo?.ogImage?.data?.attributes?.url || a.banner?.data?.attributes?.url;

    return {
        title: a.seo?.metaTitle || a.title,
        description: a.seo?.metaDescription || '',
        alternates: { canonical: a.seo?.canonicalUrl || undefined },
        openGraph: { title: a.seo?.metaTitle || a.title, description: a.seo?.metaDescription || '', images: og ? [mediaUrl(og)] : [] },
    };
}

export default async function Page({ params }) {
    const { locale, slug } = await params;
    const d = await getNewsBySlug({ locale, slug });
    if (!d) return notFound();

    const a = d.attributes;
    const banner = a.banner?.data?.attributes;

    return (
        <main className="container py-8">
            {banner?.url && (
                <img src={mediaUrl(banner.url)} alt={banner?.alternativeText || ''} width={banner?.width || 1200} height={banner?.height || 630} />
            )}
            <h1 className="mt-6 text-3xl font-bold">{a.title}</h1>
            {/* Якщо контент у тебе HTML: */}
            {a.content && <article dangerouslySetInnerHTML={{ __html: a.content }} />}
        </main>
    );
}
