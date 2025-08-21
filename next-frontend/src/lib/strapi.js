const BASE = process.env.NEXT_PUBLIC_STRAPI_URL;
const TOKEN = process.env.STRAPI_API_TOKEN;

export const CT = {
    sports: 'sports',
    culture: 'cultures',
};

export async function strapi(path, {revalidate = 300} = {}) {
    const url = `${BASE}${path}`;

    const res = await fetch(url, {
        next: {revalidate},
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });


    if (res.status === 404) return null;

    if (!res.ok) {
        const txt = await res.text();
        console.error("STRAPI_ERROR", {url, status: res.status, body: txt});
        throw new Error(`Strapi ${res.status} for ${url}\n${txt}`);
    }
    return res.json();
}

export function mediaUrl(url) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

export async function getHome({locale = 'en', revalidate = 300} = {}) {
    const q = `/api/home-page?locale=${encodeURIComponent(locale)}&populate[seo][populate]=*`;
    const data = await strapi(q, {revalidate});
    return data || null;
}

export async function getNews({locale = 'en', revalidate = 300} = {}) {
    const q = `/api/news?locale=${encodeURIComponent(locale)}&populate[seo][populate]=*`;
    const data = await strapi(q, {revalidate});
    return data || null;
}

export async function getNewsList({locale = 'en'} = {}) {
    const base =
        `?locale=${encodeURIComponent(locale)}` +
        `&fields=title,slug,datePublished` +
        `&sort=datePublished:desc` +
        `&populate[banner][fields][]=url` +
        `&pagination[page]=1&pagination[pageSize]=${3}`;

    const [sports, culture] = await Promise.all([
        strapi(`/api/${CT.sports}${base}`),
        strapi(`/api/${CT.culture}${base}`),
    ])

    return {
        sports: sports?.data ?? [],
        culture: culture?.data ?? [],
    };
}

export async function paginateNewsList({ locale = 'en', topic, pageNumber = 1 } = {}) {
    const base =
        `?locale=${encodeURIComponent(locale)}` +
        `&fields=title,slug,datePublished` +
        `&sort=datePublished:desc` +
        `&populate[banner][fields][]=url` +
        `&pagination[page]=${pageNumber}&pagination[pageSize]=3`;

    return strapi(`/api/${CT[topic]}${base}`);
}

export async function getLatestNews({locale = 'en'} = {}) {
    const { sports = [], culture = [] } = await getNewsList({ locale });
    const all = [...sports, ...culture];

    return all.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
}

export async function getNewsBySlug({locale = 'en', slug}) {
    const q =
        `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
        `&locale=${encodeURIComponent(locale)}` +
        `&populate[banner][populate]=*&populate[seo][populate]=*`;

    const [s, c] = await Promise.all([
        strapi(`/api/${CT.sports}${q}`),
        strapi(`/api/${CT.culture}${q}`),
    ]);

    return (s?.data?.[0] ?? c?.data?.[0]) || null;
}
