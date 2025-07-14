// src/app/not-found.tsx

import { Button } from '@/components/ui/button';
import { BookX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center text-center">
            <div className="flex max-w-md flex-col items-center gap-4">
                <BookX className="h-20 w-20 text-muted-foreground" strokeWidth={1} />

                <h1 className="text-5xl font-bold tracking-tighter">404</h1>

                <h2 className="text-2xl font-semibold">
                    Page Lost From the Story
                </h2>

                <p className="text-muted-foreground">
                    It seems the page you&apos;re looking for doesn&apos;t exist in our narrative, or perhaps it has been moved to another chapter.
                </p>

                <Button asChild className="mt-4">
                    <Link href="/">Return to Homepage</Link>
                </Button>
            </div>
        </div>
    );
}