

export const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
        } else {
            reject(new Error('Failed to read file as string.'));
        }
    };
    reader.onerror = error => reject(error);
});

export const resizeImage = (file: File, maxSize = 1280): Promise<File> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const img = new Image();
        if (!event.target?.result || typeof event.target.result !== 'string') {
            return reject(new Error("Could not read image source."));
        }
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;

            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error("Could not get canvas context."));
            }
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    }));
                } else {
                    reject(new Error('Canvas to Blob conversion failed'));
                }
            }, 'image/jpeg', 0.9);
        };
        img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
});

export const addWatermark = (base64Image: string): Promise<string> => new Promise((resolve, reject) => {
    const watermarkText = "Generate By Nadir Infograph";
    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return reject(new Error("Could not get canvas context for watermarking."));
        }

        ctx.drawImage(img, 0, 0);

        const fontSize = Math.max(12, Math.min(img.width * 0.015, 32));
        ctx.font = `bold ${fontSize}px "Cairo", "Inter", sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        const padding = 15;
        ctx.fillText(watermarkText, canvas.width - padding, canvas.height - padding);

        resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => reject(new Error("Failed to load image for watermarking."));
});