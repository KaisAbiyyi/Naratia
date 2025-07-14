// src/components/auth/GithubSignInButton.tsx

"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Github, LoaderCircle } from "lucide-react";
import { githubSignIn } from "@/features/auth/action"; // Harusnya "actions"

export function GithubSignInButton() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startTransition(async () => {
            await githubSignIn();
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Button
                type="submit"
                variant="outline"
                className="w-full flex items-center gap-2"
                disabled={isPending}
            >
                {isPending ? (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Github className="mr-2 h-4 w-4" />
                )}
                <span>Continue with GitHub</span>
            </Button>
        </form>
    );
}