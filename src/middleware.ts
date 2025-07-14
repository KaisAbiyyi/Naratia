// src/middleware.ts

import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './utils/supabase/server';

export async function middleware(request: NextRequest) {
    // Membuat klien Supabase yang bisa digunakan di server-side components & middleware
    const supabase = await createClient();

    // Mengambil informasi sesi pengguna
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Jika pengguna sudah login dan mencoba mengakses halaman /login atau /register
    if (user && (request.nextUrl.pathname === '/login')) {
        // Alihkan mereka ke halaman utama
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Jika pengguna belum login dan mencoba mengakses halaman yang dilindungi
    // (Tambahkan logika ini jika Anda ingin melindungi halaman lain, contoh: /profile)
    // if (!user && request.nextUrl.pathname.startsWith('/profile')) {
    // 	return NextResponse.redirect(new URL('/login', request.url));
    // }

    // Lanjutkan ke halaman yang dituju jika tidak ada kondisi di atas yang terpenuhi
    return NextResponse.next();
}

// Konfigurasi untuk menentukan path mana yang akan dijalankan oleh middleware
export const config = {
    matcher: [
        /*
         * Cocokkan semua path request kecuali untuk:
         * - Rute API (api)
         * - Rute Next.js internal (_next/static, _next/image)
         * - Aset di folder public (favicon.ico)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};