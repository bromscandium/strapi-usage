import { getHome, mediaUrl } from '@/lib/strapi';
import Image from "next/image";

export const revalidate = 300;

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const d = await getHome({ locale, revalidate });
    const seo = d?.data?.seo;
    const og = seo?.ogImage?.url;

    return {
        title: seo?.metaTitle || (locale === 'uk' ? 'Головна' : 'Home'),
        description: seo?.metaDescription || '',
        alternates: { canonical: seo?.canonicalUrl || undefined },
        openGraph: {
            title: seo?.metaTitle || (locale === 'uk' ? 'Головна' : 'Home'),
            description: seo?.metaDescription || '',
            images: og ? [mediaUrl(og)] : [],
        },
    };
}

export default async function Page({ params }) {
    const { locale } = await params;
    const d = await getHome({ locale, revalidate });
    const seo = d?.data?.seo;
    const img = mediaUrl(seo?.ogImage?.url);

    return (
        <main className="container py-8">
            <div className="flex items-center gap-3">
                {img && (
                    <Image
                        src={mediaUrl(img)}
                        alt={d.title}
                        width={40}
                        height={40}
                        className="rounded-lg max-h-12 object-cover"
                    />
                )}
                <h1 className="text-3xl font-bold m-0">
                    {seo?.metaTitle || (locale.startsWith('uk') ? 'Головна' : 'Home')}
                </h1>

            </div>
            {seo?.metaDescription && (
                <p className="mt-4 text-gray-600">{seo.metaDescription}</p>
            )}
        </main>
    );
}
