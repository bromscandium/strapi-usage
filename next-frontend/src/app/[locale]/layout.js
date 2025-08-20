import '@/styles/globals.css';
import Header from '@/components/header/Header';

export default async function LocaleLayout({children, params}) {
    const {locale} = await params;
    return (
        <html lang={locale} suppressHydrationWarning>
        <body suppressHydrationWarning>
        <Header locale={locale}/>
        {children}
        </body>
        </html>
    );
}
