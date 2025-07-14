// src/components/auth/LoginModal.tsx

"use client";

import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { AuthForm } from "./AuthForm";

// Komponen ini menerima props untuk mengontrol state buka/tutup dari parent
type LoginModalProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

export function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                {/* AuthForm ditempatkan di dalam konten modal */}
                <div className="mt-4">
                    <AuthForm />
                </div>
            </DialogContent>
        </Dialog>
    );
}