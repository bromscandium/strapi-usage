import {getNews, getNewsList, mediaUrl} from '@/lib/strapi';
import NewsSection from "@/components/sections/NewsSection";


export const revalidate = 300;

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const d = await getNews({ locale, revalidate });
    const seo = d?.data?.seo;
    const og = seo?.ogImage?.url;

    return {
        title: seo?.metaTitle || (locale === 'uk' ? 'Новини' : 'News'),
        description: seo?.metaDescription || '',
        alternates: { canonical: seo?.canonicalUrl || undefined },
        openGraph: {
            title: seo?.metaTitle || (locale === 'uk' ? 'Новини' : 'News'),
            description: seo?.metaDescription || '',
            images: og ? [mediaUrl(og)] : [],
        },
    };
}

export default async function NewsPage({ params }) {
    const { locale } = await params;
    const { sports, culture } = await getNewsList({ locale });

    return (
        <main>
            <NewsSection
                title={locale.startsWith("uk") ? "Спорт" : "Sports"}
                initialItems={sports}
                topic="sports"
                locale={locale}
            />

            <NewsSection
                title={locale.startsWith("uk") ? "Культура" : "Culture"}
                initialItems={culture}
                topic="culture"
                locale={locale}
            />
        </main>
    );
}
