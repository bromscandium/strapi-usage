"use client";
import {useState} from "react";
import LoadMore from "../buttons/LoadMore";
import Image from "next/image";
import {mediaUrl} from "@/lib/strapi";

export default function NewsSection({title, initialItems, topic, locale}) {
    const [items, setItems] = useState(initialItems);
    const [page, setPage] = useState({[topic]: 1});


    return (
        <section className="container py-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((n) => {
                    const img = n.banner?.url;
                    return (
                        <li key={n.id}
                            className="rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-200">
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

            <LoadMore
                topic={topic}
                items={items}
                setItems={setItems}
                page={page}
                setPage={setPage}
                locale={locale}
            />
        </section>
    );
}
