"use client";

import Link from "next/link";

function withLocale(path, locale) {
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

export default function CheckMore({ locale }) {
    return (
        <Link
            href={withLocale('/news', locale)}
            className="px-8 py-1 mt-8 rounded border duration-200 hover:bg-gray-200"
        >
            {locale.startsWith('uk') ? 'Переглянути більше' : 'Check more'}
        </Link>
    );
}