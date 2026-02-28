import React from 'react';
import { Language } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

type Theme = 'light' | 'dark';

interface HeaderProps {
    t: { [key: string]: string };
    language: Language;
    setLanguage: (lang: Language) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const Header: React.FC<HeaderProps> = ({ t, language, setLanguage, theme, setTheme }) => {
    return (
        <header className="text-center mb-8">
            <div className="flex justify-center items-center gap-4">
                 <LanguageSwitcher currentLanguage={language} setLanguage={setLanguage} />
                 <ThemeSwitcher theme={theme} setTheme={setTheme} />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg font-bold">{t.designer}</p>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-orange-500">
                {t.mainTitle}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">{t.subTitle}</p>
        </header>
    );
};

export default Header;