'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function withLocale(path, locale) {
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

function swapLocale(pathname, nextLocale) {
    const parts = pathname.split('/');
    parts[1] = nextLocale;
    return parts.join('/') || `/${nextLocale}`;
}

export default function Header({ locale = 'en' }) {
    const pathname = usePathname();
    const isActive = (path) => pathname === withLocale(path, locale);

    const otherLocale = locale.startsWith('uk') ? 'en' : 'uk';

    return (
        <header className="border-b">
            <nav className="container mx-auto px-4 py-3 flex items-center gap-4">

                <Link
                    href={withLocale('/', locale)}
                    className={`px-3 py-2 rounded-lg min-w-[90px] text-center ${isActive('/') ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                    {locale.startsWith('uk') ? 'Головна' : 'Home'}
                </Link>

                <Link
                    href={withLocale('/news', locale)}
                    className={`px-3 py-2 rounded-lg min-w-[90px] text-center ${isActive('/') ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                    {locale.startsWith('uk') ? 'Новини' : 'News'}
                </Link>

                <div className="ml-auto" />

                <Link
                    href={swapLocale(pathname, otherLocale)}
                    className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                >
                    {otherLocale.toUpperCase()}
                </Link>
            </nav>
        </header>
    );
}
