'use client';

import { ChangeLanguageProvider } from "@/context/ChangeLanguage";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChangeLanguageProvider>
            {children}
        </ChangeLanguageProvider>
    );
}
