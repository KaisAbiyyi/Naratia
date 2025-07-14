// src/components/auth/ProfileDialog.tsx

"use client";

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";
import { Check, Copy, Pencil, Trophy, Trash2 } from "lucide-react";

type ProfileDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    user: User;
};

export function ProfileDialog({ isOpen, onOpenChange, user }: ProfileDialogProps) {
    const [hasCopied, setHasCopied] = useState(false);
    const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    const onCopy = () => {
        navigator.clipboard.writeText(user.id);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    // Placeholder data untuk statistik
    const userStats = {
        contributions: 12,
        wins: 3,
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>My Profile</DialogTitle>
                    </DialogHeader>

                    <Tabs defaultValue="overview" className="mt-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        {/* Tab Overview: Info Utama & Statistik */}
                        <TabsContent value="overview">
                            <div className="flex items-center space-x-4 py-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email ?? ''} />
                                    <AvatarFallback>{user.email?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-semibold">
                                        {user.user_metadata?.full_name ?? 'Naratia User'}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-sm text-muted-foreground">Contributions</p>
                                    <p className="text-2xl font-bold flex items-center gap-2">
                                        <Pencil className="w-5 h-5" /> {userStats.contributions}
                                    </p>
                                </div>
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-sm text-muted-foreground">Votes Won</p>
                                    <p className="text-2xl font-bold flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-yellow-500" /> {userStats.wins}
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Tab Settings: Info Akun & Aksi */}
                        <TabsContent value="settings">
                            <div className="py-4 space-y-6">
                                <h3 className="font-semibold">Account Information</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Joined on</span>
                                        <span className="font-medium">{joinedDate}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">User ID</span>
                                        <Button onClick={onCopy} variant="ghost" size="sm" className="font-mono text-xs">
                                            {hasCopied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                                            {hasCopied ? 'Copied!' : 'Copy ID'}
                                        </Button>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="font-semibold text-destructive">Danger Zone</h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        These actions are permanent and cannot be undone.
                                    </p>
                                    <Button onClick={() => setDeleteAlertOpen(true)} variant="destructive" className="mt-4 w-full">
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete My Account
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>

            {/* Dialog Konfirmasi untuk Hapus Akun */}
            <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => console.log('Account deletion requested')}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}