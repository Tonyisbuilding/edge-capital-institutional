'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Lang = 'en' | 'nl';

interface ChangeLanguageContextType {
    language: Lang;
    setLanguage: (value: Lang) => void;
}

const ChangeLanguageContext =
    createContext<ChangeLanguageContextType | null>(null);

export const useChangeLanguageContext = () => {
    const ctx = useContext(ChangeLanguageContext);
    if (!ctx) throw new Error('ChangeLanguageContext not found');
    return ctx;
};

// Helper — runs only in the browser
const detectBrowserLanguage = (): Lang => {
    if (typeof navigator === 'undefined') return 'en';

    // navigator.languages is preferred (it’s an ordered list of the user’s UI languages)
    const langs: string[] =
        (navigator.languages as string[]) ?? [navigator.language];

    const isDutch = langs.some((l) => l.toLowerCase().startsWith('nl'));
    return isDutch ? 'nl' : 'en';
};

export const ChangeLanguageProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    // Start with a neutral default to avoid hydration mismatches in SSR
    const [language, setLanguageState] = useState<Lang>('en');

    useEffect(() => {
        // 1. Stored preference wins
        const saved =
            typeof window !== 'undefined'
                ? localStorage.getItem('preferredLanguage')
                : null;

        if (saved === 'en' || saved === 'nl') {
            setLanguageState(saved);
            return;
        }

        // 2. Otherwise, detect from browser settings
        setLanguageState(detectBrowserLanguage());
    }, []);

    const setLanguage = (value: Lang) => {
        setLanguageState(value);
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferredLanguage', value);
        }
    };

    return (
        <ChangeLanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </ChangeLanguageContext.Provider>
    );
};
