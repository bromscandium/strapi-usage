import { getNewsList, mediaUrl } from '@/lib/strapi';
import Image from 'next/image';


export const revalidate = 300;

export default async function NewsList({ params }) {
    const { locale } = await params;
    const { sports, culture } = await getNewsList({ locale });

    return (
        <main className="container py-8">
            <h1 className="text-3xl font-bold mb-8">
                {locale === 'uk-UA' ? 'Новини' : 'News'}
            </h1>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">
                    {locale.startsWith('uk') ? 'Спорт' : 'Sports'}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {sports.map((n) => {
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
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">
                    {locale.startsWith('uk') ? 'Культура' : 'Culture'}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {culture.map((n) => {
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
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}

