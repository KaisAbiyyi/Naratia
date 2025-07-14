// src/features/auth/actions.ts

"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import { type z } from "zod"; // DIHAPUS - 'z' tidak digunakan

// --- ACTION UNTUK LOGIN DENGAN EMAIL & PASSWORD ---
export async function login(formData: FormData) {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = await createClient();

    // Validasi input diubah untuk me-redirect
    if (!email || !password) {
        // DIUBAH: dari return object menjadi redirect
        return redirect("/login?message=Email and password are required.");
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Login error:", error.message);
        return redirect("/login?message=Invalid email or password.");
    }

    return redirect("/");
}

// --- ACTION UNTUK SIGN UP / REGISTRASI ---
export async function signup(formData: FormData) {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    // DIPERBAIKI - Tambahkan 'await' untuk mendapatkan headers
    const origin = (await headers()).get("origin")!;
    const supabase = await createClient();

    if (!email || !password) {
        return redirect("/register?message=Email dan password wajib diisi.");
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error("Signup error:", error.message);
        return redirect("/register?message=Registrasi gagal, coba lagi.");
    }

    return redirect("/register?message=Cek email untuk melanjutkan proses pendaftaran.");
}


// --- ACTION UNTUK MEMULAI PROSES LOGIN DENGAN GOOGLE ---
export async function googleSignIn() {
    // DIPERBAIKI - Tambahkan 'await' untuk mendapatkan headers
    const origin = (await headers()).get("origin");
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error("Google Sign In error:", error.message);
        return redirect("/login?message=Gagal login dengan Google.");
    }

    if (data.url) {
        return redirect(data.url);
    }

    return redirect("/login?message=Terjadi kesalahan, coba lagi.");
}
export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();

    // Redirect ke halaman utama setelah logout
    return redirect('/');
}

export async function githubSignIn() {
    const origin = (await headers()).get("origin");
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error("GitHub Sign In error:", error.message);
        return redirect("/login?message=Failed to login with GitHub.");
    }

    if (data.url) {
        // Redirect ke halaman login GitHub
        return redirect(data.url);
    }

    return redirect("/login?message=An error occurred, please try again.");
}