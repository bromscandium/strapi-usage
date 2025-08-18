import { NextResponse } from 'next/server';

const locales = ['en', 'uk'];
const defaultLocale = 'en';

export function middleware(req) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/api') || pathname.startsWith('/_next') || /\.\w+$/.test(pathname)) {
        return;
    }

    const seg = pathname.split('/')[1];
    if (!locales.includes(seg)) {
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url));
    }
}

export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};
