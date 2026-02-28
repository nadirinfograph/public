import React, { memo } from 'react';
import { Language } from '../types';

interface LanguageSwitcherProps {
    currentLanguage: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, setLanguage }) => {
    const languages: { code: Language, flag: string }[] = [
        { code: 'ar', flag: '🇩🇿' },
        { code: 'en', flag: '🇬🇧' },
        { code: 'fr', flag: '🇫🇷' }
    ];

    return (
        <div className="flex justify-center gap-2">
            {languages.map(({ code, flag }) => (
                <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`p-2 rounded-full transition-all duration-75 text-2xl ${currentLanguage === code ? 'bg-yellow-400 ring-2 ring-yellow-600 scale-110 shadow-[0_4px_0_#ca8a04]' : 'opacity-60 hover:opacity-100 hover:scale-110'}`}
                    aria-label={`Switch to ${code}`}
                >
                    {flag}
                </button>
            ))}
        </div>
    );
};

export default memo(LanguageSwitcher);