"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

function withLocale(path, locale) {
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

export default function LoadMore({ locale }) {
    const pathname = usePathname();
    const isActive = (path) => pathname === withLocale(path, locale);

    return (
        <Link
            href={withLocale('/', locale)}
            className={`px-3 py-2 rounded min-w-[90px] duration-200 text-center ${isActive('/news') ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
        >
            {locale.startsWith('uk') ? 'Переглянути більше' : 'Check more'}
        </Link>
    );
}