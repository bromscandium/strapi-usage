import { getNewsList, mediaUrl } from '@/lib/strapi';

export const revalidate = 300;

export default async function NewsList({ params }) {
    const { locale } = await params;
    const { sports, culture } = await getNewsList({ locale });

    return (
        <main className="container py-8">
            <h1>{locale === 'uk-UA' ? 'Новини' : 'News'}</h1>

            <section>
                <h2>{locale === 'uk-UA' ? 'Спорт' : 'Sports'}</h2>
                <ul>
                    {sports.map((n) => {
                        const a = n.attributes;
                        const img = a.banner?.data?.attributes?.url;
                        return (
                            <li key={n.id}>
                                <a href={`/${locale}/news/${a.slug}`}>
                                    {img && <img src={mediaUrl(img)} alt="" width={240} />}
                                    <h3>{a.title}</h3>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <section>
                <h2>{locale === 'uk-UA' ? 'Культура' : 'Culture'}</h2>
                <ul>
                    {culture.map((n) => {
                        const a = n.attributes;
                        const img = a.banner?.data?.attributes?.url;
                        return (
                            <li key={n.id}>
                                <a href={`/${locale}/news/${a.slug}`}>
                                    {img && <img src={mediaUrl(img)} alt="" width={240} />}
                                    <h3>{a.title}</h3>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}
