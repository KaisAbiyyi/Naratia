import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
    title: "Login to Naratia",
    description: "Access your account to continue your collaborative writing journey on Naratia. Log in to contribute, vote, and create stories together.",

    // Menentukan URL kanonis untuk halaman ini, baik untuk SEO
    alternates: {
        canonical: "/login",
    },

    // Kustomisasi Open Graph (saat link dibagikan di media sosial)
    openGraph: {
        title: "Login | Naratia",
        description: "Sign in to access your profile, contributions, and join the collaborative storytelling.",
        url: "/login", // URL spesifik untuk halaman ini
        images: [
            {
                url: "/og-image.png", // Bisa menggunakan gambar utama atau gambar spesifik login
                width: 1200,
                height: 630,
                alt: "Login page for Naratia, a collaborative writing platform.",
            },
        ],
    },

    // Kustomisasi untuk Twitter Card
    twitter: {
        card: "summary_large_image",
        title: "Login to Your Naratia Account",
        description: "Sign in to access your profile, contributions, and join the collaborative storytelling.",
        images: ["/og-image.png"], // Gunakan gambar yang sama
    },
};


export default function LoginPage() {
    return <AuthForm mode="login" />;
}