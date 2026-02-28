import React from 'react';
import { Mode } from '../types';
import ImageUploader from './ImageUploader';
import { Repeat, UserPlus, Wand2, Loader2 } from './icons';

interface ControlPanelProps {
    mode: Mode;
    setMode: (mode: Mode) => void;
    sourceImage: File | null;
    handleImageChange: (file: File | null, setter: React.Dispatch<React.SetStateAction<File | null>>) => void;
    setSourceImage: React.Dispatch<React.SetStateAction<File | null>>;
    targetImage: File | null;
    setTargetImage: React.Dispatch<React.SetStateAction<File | null>>;
    prompt: string;
    setPrompt: (prompt: string) => void;
    handleSubmit: () => void;
    isLoading: boolean;
    error: string;
    t: { [key: string]: string };
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    mode, setMode, sourceImage, handleImageChange, setSourceImage, targetImage, setTargetImage,
    prompt, setPrompt, handleSubmit, isLoading, error, t
}) => {

    const onSourceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleImageChange(e.target.files[0], setSourceImage);
        }
    };

    const onTargetImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleImageChange(e.target.files[0], setTargetImage);
        }
    };

    return (
        <div className="bg-zinc-800 p-6 shadow-lg flex flex-col gap-6 transition-colors duration-300 min-h-[calc(100vh-120px)] lg:h-[calc(100vh-120px)]">
            <div className="bg-zinc-900 p-2 rounded-xl flex gap-2 flex-shrink-0">
                <button 
                    onClick={() => setMode('swap')} 
                    className={`w-1/2 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all duration-75 ${mode === 'swap' ? 'bg-yellow-400 text-zinc-900 shadow-[0_4px_0_#ca8a04] translate-y-[-2px] border border-yellow-500' : 'bg-transparent text-gray-400 hover:bg-zinc-700'}`}
                >
                    <Repeat className="w-5 h-5" />{t.modeSwap}
                </button>
                <button 
                    onClick={() => setMode('add')} 
                    className={`w-1/2 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all duration-75 ${mode === 'add' ? 'bg-yellow-400 text-zinc-900 shadow-[0_4px_0_#ca8a04] translate-y-[-2px] border border-yellow-500' : 'bg-transparent text-gray-400 hover:bg-zinc-700'}`}
                >
                    <UserPlus className="w-5 h-5" />{t.modeAdd}
                </button>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-8">
                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-700">
                    <ImageUploader image={sourceImage} onImageChange={onSourceImageChange} title={t.uploadSceneTitle} subtitle={t.uploaderSubtitle} id="source-uploader" />
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-700">
                    <ImageUploader image={targetImage} onImageChange={onTargetImageChange} onImageRemove={() => setTargetImage(null)} title={mode === 'swap' ? t.targetHeadTitle : t.uploadPersonTitle} subtitle={t.uploaderSubtitle} id="target-uploader" isRemovable={true} />
                </div>
                
                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-700">
                    {mode === 'swap' ? (
                        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t.adjustPlaceholder} className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
                    ) : (
                        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t.addPersonPromptPlaceholder} className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
                    )}
                </div>
            </div>
            
            <div className="mt-auto">
                <button 
                    onClick={handleSubmit} 
                    disabled={isLoading} 
                    className="w-full bg-yellow-400 text-zinc-900 font-black py-4 px-6 rounded-xl text-xl shadow-[0_6px_0_#ca8a04] hover:shadow-[0_4px_0_#ca8a04] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] transition-all duration-75 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center uppercase tracking-widest border-2 border-yellow-500"
                >
                    {isLoading ? (
                        <><Loader2 className="animate-spin rtl:ml-3 ltr:mr-3 h-6 w-6" /> {t.submitButtonLoading}</>
                    ) : (
                        <><Wand2 className="rtl:ml-3 ltr:mr-3" /> {mode === 'swap' ? t.submitButtonSwap : t.submitButtonAdd}</>
                    )}
                </button>
                {error && <p className="text-red-500 mt-4 text-center font-bold">{error}</p>}
            </div>
        </div>
    );
};

export default ControlPanel;