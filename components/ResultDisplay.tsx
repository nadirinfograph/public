import React from 'react';
import { Loader2, ImageIcon, Download, Repeat } from './icons';

interface ResultDisplayProps {
    isLoading: boolean;
    loadingStatus: string;
    resultImage: string | null;
    t: { [key: string]: string };
    onRegenerate: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, loadingStatus, resultImage, t, onRegenerate }) => {
    return (
        <div className="bg-zinc-800 flex flex-col items-center justify-center min-h-[500px] lg:h-[calc(100vh-120px)] transition-colors duration-300 w-full">
            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                {isLoading ? (
                    <div className="text-center p-4">
                        <Loader2 className="w-16 h-16 animate-spin text-yellow-400 mx-auto" />
                        <p className="mt-4 text-gray-300 font-bold">{loadingStatus}</p>
                    </div>
                ) : resultImage ? (
                    <div className="relative group w-full h-full flex items-center justify-center p-2">
                        <img src={resultImage} alt="Result" className="max-w-full max-h-full object-contain shadow-2xl" />
                        <div className="absolute bottom-6 right-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={onRegenerate}
                                className="bg-yellow-400 text-zinc-900 p-4 rounded-full shadow-[0_4px_0_#ca8a04] hover:shadow-[0_2px_0_#ca8a04] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all duration-75 border border-yellow-500"
                                title={t.regenerateButton}
                                aria-label={t.regenerateButton}
                            >
                                <Repeat className="h-6 w-6" />
                            </button>
                            <a 
                                href={resultImage} 
                                download={`ai-scene-by-nadir.png`} 
                                className="bg-yellow-400 text-zinc-900 p-4 rounded-full shadow-[0_4px_0_#ca8a04] hover:shadow-[0_2px_0_#ca8a04] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all duration-75 border border-yellow-500" 
                                title={t.downloadButton}
                                aria-label={t.downloadButton}
                            >
                                <Download className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 p-4">
                        <ImageIcon className="w-20 h-20 mx-auto mb-4 text-zinc-700 opacity-30" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultDisplay;