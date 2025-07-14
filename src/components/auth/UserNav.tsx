// src/components/auth/UserNav.tsx

'use client';

import { useState } from 'react'; // 1. Impor useState
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/features/auth/action';
import type { User } from '@supabase/supabase-js';
import { LogOut, Monitor, Moon, Sun, User as UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ProfileDialog } from './ProfileDialog'; // 2. Impor ProfileDialog

type UserNavProps = {
    user: User;
};

export function UserNav({ user }: UserNavProps) {
    const { setTheme } = useTheme();
    const userInitial = user.email?.charAt(0).toUpperCase() ?? 'U';

    // 3. State untuk mengontrol modal profil
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={user.user_metadata?.avatar_url}
                                alt={user.email ?? 'User Avatar'}
                            />
                            <AvatarFallback>{userInitial}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Signed in as</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* 4. Tambahkan item menu Profile */}
                    <DropdownMenuItem onSelect={() => setProfileModalOpen(true)}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuLabel>Theme</DropdownMenuLabel>
                    {/* ... (item menu tema tetap sama) ... */}
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('system')}>
                        <Monitor className="mr-2 h-4 w-4" />
                        <span>System</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={async () => { await signOut(); }}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* 5. Render komponen dialog profil */}
            <ProfileDialog
                isOpen={isProfileModalOpen}
                onOpenChange={setProfileModalOpen}
                user={user}
            />
        </>
    );
}