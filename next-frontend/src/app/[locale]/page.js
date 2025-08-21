import {getHome, getLatestNews, mediaUrl} from '@/lib/strapi';
import Image from "next/image";
import CheckMore from "@/components/buttons/CheckMore";

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

    const allNews = await getLatestNews(locale);

    return (
        <main className="container py-8">
            <div className="flex items-center gap-3">
                {img && (
                    <Image
                        src={mediaUrl(img)}
                        alt={seo?.metaTitle}
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
                <p className="text-xl mt-7 font-semibold mb-4">{seo.metaDescription}</p>
            )}

            <section className="mb-10">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {allNews.map((n) => {
                        const img = n.banner?.url;
                        return (
                            <li
                                key={n.id}
                                className="rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                            >
                                <a href={`/${locale}/news/${n.slug}`} className="block p-4 h-full">
                                    {img && (
                                        <Image
                                            src={mediaUrl(img)}
                                            alt={n.title}
                                            width={400}
                                            height={220}
                                            className="rounded-lg mb-3 object-cover w-full h-40"
                                        />
                                    )}
                                    <h3 className="text-lg font-semibold leading-snug mb-2 line-clamp-2">
                                        {n.title}
                                    </h3>
                                    <h6 className="text-xs font-semibold leading-snug mt-5 line-clamp-2">
                                        {n.datePublished}
                                    </h6>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <CheckMore locale={locale} />
        </main>
    );
}
