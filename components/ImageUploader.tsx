import React, { memo } from 'react';
import { UploadCloud, X } from './icons';

interface ImageUploaderProps {
    image: File | null;
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onImageRemove?: () => void;
    title: string;
    subtitle: string;
    id: string;
    isRemovable?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageChange, onImageRemove, title, subtitle, id, isRemovable = false }) => (
    <div className="relative border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center transition-all duration-300 hover:border-yellow-400 hover:bg-zinc-800/50 w-full h-48 flex flex-col items-center justify-center">
        <label htmlFor={id} className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
            {image ? (
                <img src={URL.createObjectURL(image)} alt={title} className="max-h-full max-w-full object-contain rounded-lg shadow-lg" />
            ) : (
                <>
                    <UploadCloud className="w-10 h-10 text-zinc-600 mb-2" />
                    <span className="text-gray-300 font-bold">{title}</span>
                    <span className="text-xs text-gray-500 mt-1">{subtitle}</span>
                </>
            )}
        </label>
        <input id={id} type="file" accept="image/*" className="hidden" onChange={onImageChange} />
        {image && isRemovable && (
            <button
                onClick={onImageRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-[0_3px_0_#991b1b] hover:shadow-[0_1px_0_#991b1b] hover:translate-y-[2px] active:shadow-none active:translate-y-[3px] transition-all duration-75 border border-red-600"
                aria-label="Remove image"
            >
                <X className="w-4 h-4" />
            </button>
        )}
    </div>
);

export default memo(ImageUploader);