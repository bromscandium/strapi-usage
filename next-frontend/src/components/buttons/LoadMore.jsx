"use client";
import { useState } from "react";
import { paginateNewsList } from "@/lib/strapi";

export default function LoadMore({ topic, items, setItems, page, setPage, locale }) {
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        if (loading) return;
        setLoading(true);

        const nextPage = (page?.[topic] ?? 1) + 1;
        const res = await paginateNewsList({ locale, topic, pageNumber: nextPage });
        const newItems = res?.data ?? [];

        setItems(prev => [...prev, ...newItems]);
        setPage(prev => ({ ...prev, [topic]: nextPage }));

        setLoading(false);
    }

    return (
        <button onClick={handleClick} disabled={loading} className={`px-8 py-1 mt-8 rounded border duration-200  hover:bg-gray-200`}>
            {loading ? "…" : "Load more"}
        </button>
    );
}
