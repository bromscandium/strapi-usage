import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mediaUrl, strapi } from '@/lib/strapi';

describe('mediaUrl', () => {
    const OLD_ENV = process.env;
    beforeEach(() => { process.env = { ...OLD_ENV, NEXT_PUBLIC_STRAPI_URL: 'http://localhost:1337' }; });
    afterEach(() => { process.env = OLD_ENV; });

    it('returns empty for false', () => {
        expect(mediaUrl('')).toBe('');
        expect(mediaUrl(undefined)).toBe('');
        expect(mediaUrl(null)).toBe('');
    });

    it('prefixes relative path', () => {
        expect(mediaUrl('/uploads/x.jpg')).toBe('http://localhost:1337/uploads/x.jpg');
    });

    it('degrades if env missing', () => {
        process.env.NEXT_PUBLIC_STRAPI_URL = '';
        expect(mediaUrl('/uploads/x.jpg')).toBe('/uploads/x.jpg');
    });
});

describe('strapi', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        process.env = {
            ...OLD_ENV,
            STRAPI_URL: 'http://localhost:1337',
            STRAPI_API_TOKEN: 'abc123',
        };
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        process.env = OLD_ENV;
    });

    it('returns json on 200 and sends Authorization', async () => {
        fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ ok: true }) });

        const res = await strapi('/api/sports?locale=en');
        expect(res).toEqual({ ok: true });

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:1337/api/sports?locale=en',
            expect.objectContaining({
                headers: expect.objectContaining({ Authorization: 'Bearer abc123' }),
            })
        );
    });

    it('returns null on 404', async () => {
        fetch.mockResolvedValueOnce({ ok: false, status: 404 });
        expect(await strapi('/api/not-found')).toBeNull();
    });

    it('throws on non-OK (not 404)', async () => {
        fetch.mockResolvedValueOnce({ ok: false, status: 500, text: async () => 'boom' });
        await expect(strapi('/api/fail')).rejects.toThrow(/Strapi 500/);
    });
});
