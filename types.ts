export type Mode = 'swap' | 'add';
export type Language = 'ar' | 'en' | 'fr';

export interface Translation {
    [key: string]: string;
}

export interface Translations {
    ar: Translation;
    en: Translation;
    fr: Translation;
}