import React, { useState, useEffect, useCallback } from 'react';
import { Mode, Language } from './types';
import { translations } from './constants';
import { resizeImage, addWatermark } from './utils/imageUtils';
import { performFaceSwap, addPersonToScene } from './services/geminiService';
import LanguageSwitcher from './components/LanguageSwitcher';
import ControlPanel from './components/ControlPanel';
import ResultDisplay from './components/ResultDisplay';

export default function App() {
    const [mode, setMode] = useState<Mode>('swap');
    const [sourceImage, setSourceImage] = useState<File | null>(null);
    const [targetImage, setTargetImage] = useState<File | null>(null);
    const [prompt, setPrompt] = useState('');
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('');
    const [error, setError] = useState('');
    const [language, setLanguage] = useState<Language>('ar');

    const t = translations[language];
    
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        const fontId = 'dynamic-font-link';
        const existingFontLink = document.getElementById(fontId);
        if (existingFontLink) {
            existingFontLink.remove();
        }
        if (language === 'ar') {
            const fontLink = document.createElement('link');
            fontLink.id = fontId;
            fontLink.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap";
            fontLink.rel = "stylesheet";
            document.head.appendChild(fontLink);
            document.body.style.fontFamily = "'Cairo', sans-serif";
        } else {
            document.body.style.fontFamily = "'Inter', sans-serif";
        }
    }, [language]);

    const handleImageChange = useCallback(async (file: File | null, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (!file) {
            setter(null);
            return;
        }
        try {
            const resizedFile = await resizeImage(file);
            setter(resizedFile);
        } catch (err) {
            console.error(err);
            setError(t.errorResize);
        }
    }, [t.errorResize]);

    useEffect(() => {
        setSourceImage(null);
        setTargetImage(null);
        setPrompt('');
        setResultImage(null);
        setError('');
    }, [mode]);

    const handleSubmit = async () => {
        if (!sourceImage || !targetImage) {
            setError(mode === 'swap' ? t.errorUploadSwap : t.errorUploadAdd);
            return;
        }

        setIsLoading(true);
        setLoadingStatus(t.resultLoadingText);
        setResultImage(null);
        setError('');

        try {
            let finalImageBase64;
            if (mode === 'swap') {
                finalImageBase64 = await performFaceSwap(sourceImage, targetImage, prompt, setLoadingStatus, t);
            } else { // mode === 'add'
                // For 'add' mode, we can directly show the final step status
                setLoadingStatus(t.loadingStatus2);
                finalImageBase64 = await addPersonToScene(sourceImage, targetImage, prompt, t);
            }

            if (!finalImageBase64) {
                throw new Error(t.errorNoImage);
            }
            const watermarkedImage = await addWatermark(`data:image/png;base64,${finalImageBase64}`);
            setResultImage(watermarkedImage);
        } catch (err) {
            console.error(err);
            const message = err instanceof Error ? err.message : String(err);
            setError(`${t.errorPrefix}: ${message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900 text-gray-200 min-h-screen w-screen flex flex-col transition-colors duration-300 overflow-x-hidden">
            <header className="w-full bg-zinc-800/80 backdrop-blur-md border-b border-zinc-700 sticky top-0 z-50 flex flex-col">
                <div className="w-full p-2 flex justify-end border-b border-zinc-700/50">
                    <LanguageSwitcher currentLanguage={language} setLanguage={setLanguage} />
                </div>
                <div className="w-full p-4 text-center">
                    <h1 className="text-xl md:text-3xl font-bold text-yellow-400 tracking-wider">
                        AI Scene Director By Nadir Infograph
                    </h1>
                </div>
            </header>
            <div className="flex-grow flex flex-col lg:flex-row gap-0">
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full flex-grow divide-y lg:divide-y-0 lg:divide-x divide-zinc-700 rtl:lg:divide-x-reverse">
                    <ControlPanel
                        mode={mode}
                        setMode={setMode}
                        sourceImage={sourceImage}
                        setSourceImage={setSourceImage}
                        targetImage={targetImage}
                        setTargetImage={setTargetImage}
                        handleImageChange={handleImageChange}
                        prompt={prompt}
                        setPrompt={setPrompt}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        error={error}
                        t={t}
                    />
                    <ResultDisplay
                        isLoading={isLoading}
                        loadingStatus={loadingStatus}
                        resultImage={resultImage}
                        t={t}
                        onRegenerate={handleSubmit}
                    />
                </main>
            </div>
            <footer className="w-full bg-zinc-800 border-t border-zinc-700 p-4 text-center">
                <p className="text-yellow-400 font-bold text-lg">
                    هذه الآداة من تطوير : حوامرية نذير
                </p>
            </footer>
        </div>
    );
}