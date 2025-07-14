// src/components/Navbar.tsx (versi final dengan modal)

"use client"; // 1. Diubah menjadi Client Component

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MountainIcon } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';
import { UserNav } from '../auth/UserNav';
import { LoginModal } from '../auth/LoginModal';

export default function Navbar() {
    // State untuk mengontrol modal login
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    // State untuk menyimpan data user di client
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 2. Mengambil sesi pengguna di sisi klien
    useEffect(() => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Panggil getUser sekali di awal untuk mengatasi state awal
        const initialSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        initialSession();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <MountainIcon className="h-6 w-6" />
                        <span className="font-bold sm:inline-block">Naratia</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {!user &&
                            <ModeToggle />
                        }

                        {/* 3. Render UI berdasarkan state user di client */}
                        {!loading && (
                            user ? (
                                <UserNav user={user} />
                            ) : (
                                <Button onClick={() => setLoginModalOpen(true)}>Get Started</Button>
                            )
                        )}
                    </div>
                </div>
            </header>

            {/* 4. Render komponen modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onOpenChange={setLoginModalOpen}
            />
        </>
    );
}