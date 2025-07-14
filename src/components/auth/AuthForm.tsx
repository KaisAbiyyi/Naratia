// src/components/auth/AuthForm.tsx

"use client";

import { useSearchParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { GithubSignInButton } from "./GithubSignInButton";

export function AuthForm() {
    const searchParams = useSearchParams();
    const errorMessage = searchParams.get('message');

    // Hapus div pembungkus yang memiliki min-height
    return (
        <Card className="w-full max-w-sm border-0 shadow-none">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                    Welcome to Naratia
                </CardTitle>
                <CardDescription>
                    Sign in to continue to the platform.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {errorMessage && (
                    <div className="bg-red-100 text-destructive p-3 rounded-md border border-destructive/50 text-sm">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div className="grid gap-2">
                    <GithubSignInButton />
                    <GoogleSignInButton />
                </div>
            </CardContent>
        </Card>
    );
}