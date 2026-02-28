import { GoogleGenAI, Modality, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { fileToBase64 } from '../utils/imageUtils';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

const getBase64Part = async (file: File) => {
    const data = await fileToBase64(file);
    return {
        inlineData: {
            data,
            mimeType: file.type,
        },
    };
};

const getSceneDescription = async (sceneImage: File): Promise<string> => {
    const scenePart = await getBase64Part(sceneImage);
    const sceneDescriptionPromptText = `Strictly analyze the provided image. Identify the main person. You must create a detailed description of this person and their environment, but under NO circumstances should you describe their facial features (eyes, nose, mouth). Your description MUST include: their exact pose and body position, their complete clothing from head to toe, their hairstyle and hair color, any accessories they are wearing (like glasses or a hat), the background setting, the lighting conditions (direction, color, intensity), and the camera angle. Your output must be a descriptive text only.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: sceneDescriptionPromptText }, scenePart] },
        safetySettings,
    });
    return response.text;
};


export const performFaceSwap = async (
    sceneImage: File,
    faceImage: File,
    userPrompt: string,
    onStatusUpdate: (status: string) => void,
    t: { [key: string]: string }
): Promise<string> => {
    onStatusUpdate(t.loadingStatus1);
    const sceneDescription = await getSceneDescription(sceneImage);
    
    onStatusUpdate(t.loadingStatus2);
    const facePart = await getBase64Part(faceImage);
    let imageGenText = `Your task is to re-create a scene. The provided image contains the person (Person B) whose identity you will use. The following text describes a scene, a pose, and clothing. You MUST generate a new, photorealistic image where Person B is depicted in the exact situation described by the text. The face of Person B must be a 100% perfect clone from the provided image. The body, clothing, pose, and environment must perfectly match the text description. Text description: '${sceneDescription}'`;
    
    if (userPrompt) {
        imageGenText += `\nAdditional user instructions to apply: "${userPrompt}"`;
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: imageGenText }, facePart] },
        config: {
            responseModalities: [Modality.IMAGE],
        },
        safetySettings,
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    throw new Error(t.errorNoImage);
};

export const addPersonToScene = async (
    sceneImage: File,
    personImage: File,
    userPrompt: string,
    t: { [key: string]: string }
): Promise<string> => {
    const [scenePart, personPart] = await Promise.all([
        getBase64Part(sceneImage),
        getBase64Part(personImage)
    ]);
    
    let instruction = `**ROLE: AI Scene Director & VFX Compositor**
**MISSION**: Seamlessly and photorealistically integrate the person from the 'Person Image' (Image 2) into the 'Scene Image' (Image 1). The final image must be a single, coherent scene.
**CONTEXT**:
*   **Image 1 (Scene)**: This is the background and environment.
*   **Image 2 (Person)**: This contains the person to be added. You must extract this person perfectly.
**USER'S INSTRUCTIONS**: You MUST follow these instructions precisely to determine the added person's position, pose, action, and appearance. User instructions: "${userPrompt}"
**CRITICAL RULES for execution**:
1.  **Photorealism is paramount.** The added person must match the scene's lighting, shadows, perspective, and overall style.
2.  **Seamless Integration.** There should be no visible seams, artifacts, or signs of editing.
3.  **Adherence to Instructions.** The user's prompt is the definitive guide for the composition. If no specific instructions are given, place the person in a natural and logical position within the scene.
4.  **Do not alter the original scene** beyond what is necessary to add the person.
5.  **Output:** Your final output must be ONLY the resulting image. Do not add any text or explanation.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: instruction }, scenePart, personPart] },
        config: {
            responseModalities: [Modality.IMAGE],
        },
        safetySettings,
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    throw new Error(t.errorNoImage);
};
