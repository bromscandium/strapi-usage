const BASE = process.env.STRAPI_URL;

export const CT = {
    sports:  'sports',
    culture: 'cultures',
};

export async function strapi(path, { revalidate = 300 } = {}) {
    const url = `${BASE}${path}`;
    const res = await fetch(url, {
        next: { revalidate },
    });

    if (res.status === 404) return null;

    if (!res.ok) {
        const txt = await res.text();
        console.error("STRAPI_ERROR", { url, status: res.status, body: txt });
        throw new Error(`Strapi ${res.status} for ${url}\n${txt}`);
    }
    return res.json();
}

export function mediaUrl(url) {
    if (!url) return '';
    return url.startsWith('http') ? url : `${BASE}${url}`;
}

export async function getHome({ locale = 'en', revalidate = 300 } = {}) {
    const q = `/api/home-page?locale=${encodeURIComponent(locale)}&populate[seo][populate]=*`;
    const data = await strapi(q, { revalidate });
    return data || null;
}

export async function getNewsList({ locale = 'en' } = {}) {
    const base = `?locale=${encodeURIComponent(locale)}&populate[banner][populate]=*&sort=publishedAt:desc`;


    const [sports, culture] = await Promise.all([
        strapi(`/api/${CT.sports}${base}`),
        strapi(`/api/${CT.culture}${base}`),
    ]);

    return {
        sports: sports?.data ?? [],
        culture: culture?.data ?? [],
    };
}

export async function getNewsBySlug({ locale = 'en', slug }) {
    const q =
        `?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${encodeURIComponent(locale)}`;

    const [s, c] = await Promise.all([
        strapi(`/api/${CT.sports}${q}`),
        strapi(`/api/${CT.culture}${q}`),
    ]);

    return (s?.data?.[0] ?? c?.data?.[0]) || null;
}