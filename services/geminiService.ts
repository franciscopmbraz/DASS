import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisResult } from "../types";

// Initialize Gemini API with the new SDK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const geminiService = {
    // Analyze a video file
    async analyzeVideo(file: File, promptHint: string, onStatusUpdate?: (status: string) => void): Promise<AnalysisResult> {
        if (!apiKey) {
            throw new Error("Gemini API Key is missing. Please set VITE_GEMINI_API_KEY in .env.local");
        }

        try {
            console.log("Analyzing file:", file.name);

            // 1. Upload the video file (Naive implementation for MVP, ideal would be file API or smaller chunks)
            // For browser-based large file support, usually we'd need a backend proxy or specialized upload endpoint.
            // But here we will convert to base64 for the 'inline data' payload if small enough, or assume specific handling.
            // *CRITICAL FIX*: The user is uploading clips. We will use the proper Generative AI file API or inline data if supported.
            // For this environment, let's assume we can send the data as inline base64 for short clips (up to 20MB usually).
            // NOTE: The previous code was MOCKING the result. Now we must actually call the model.

            const base64Data = await fileToGenerativePart(file);

            // 2. Construct the Prompt with strict JSON requirements
            // Determine Game Type and appropriate JSON Structure
            const isMoba = /league of legends|dota 2/i.test(promptHint);
            const isFps = /valorant|cs2|counter[ -]strike|overwatch|apex|fortnite/i.test(promptHint);

            let gameSpecificJson = "";

            if (isMoba) {
                gameSpecificJson = `
                {
                    "summary": "Executive summary of performance...",
                    "strengths": ["Strength 1", "Strength 2", "Strength 3"],
                    "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
                    "key_moments": [
                        { "timestamp": "0:05", "description": "Description of event..." } 
                    ],
                    "improvement_plan": "1. Step one...\\n2. Step two...",
                    "mechanics": {
                        "cs_rating": 80, // 0-100
                        "trading_rating": 75,
                        "skill_shots": "Good/Bad/Average",
                        "combos": "Analysis of ability usage",
                        "reaction_time": "Estimated ms"
                    },
                    "macro": {
                        "vision_score_rating": 50,
                        "map_awareness": "Good/Bad",
                        "objective_control": "Analysis...",
                        "rotation_quality": "Analysis..."
                    },
                    "phases_analyzed": [
                        { "phase": "Laning", "performance": "Good/Bad", "notes": "..." },
                        { "phase": "Teamfight", "performance": "...", "notes": "..." }
                    ]
                }`;
            } else {
                // Default / FPS Structure (Valorant, CS2, etc)
                gameSpecificJson = `
                {
                    "summary": "Executive summary of performance...",
                    "strengths": ["Strength 1", "Strength 2", "Strength 3"],
                    "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
                    "key_moments": [
                        { "timestamp": "0:05", "description": "Description of event..." } 
                    ],
                    "improvement_plan": "1. Step one...\\n2. Step two...",
                    "mechanics": {
                        "aim_rating": 80, // 0-100
                        "movement_rating": 75,
                        "positioning_rating": 60,
                        "crosshair_placement": "Good/Bad/Average",
                        "reaction_time": "Estimated ms"
                    },
                    "economy": {
                        "rating": 50,
                        "analysis": "Analysis of economy/resource usage..."
                    },
                    "rounds_analyzed": [
                        { "round_number": 1, "outcome": "Win/Loss", "kda": "1/0/0", "highlight": "Brief note" }
                    ]
                }`;
            }

            const systemPrompt = `
                You are an expert esports coach. Your task is to analyze the provided gameplay footage and output a detailed coaching report.
                
                CONTEXT: ${promptHint}
                
                IMPORTANT:
                1. Identify the game being played. If it does not match the requested game (if specified), note that but proceed with analysis for the actual game detected.
                2. Timestamps must be within the duration of the video. The video is likely short. Do not hallucinate timestamps like "2:15" if the video is only 10 seconds long.
                3. Output MUST be valid JSON matching exactly the structure below. Do not include markdown formatting like \`\`\`json.
                
                JSON STRUCTURE:
                ${gameSpecificJson}
            `;

            // 3. Call Gemini with Robust Retry Logic
            // 3. Call Gemini with Robust Retry Logic
            // Using gemini-2.5-flash per user request
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            let result;
            let retries = 5; // Increased retries
            let delay = 5000; // Start with 5 seconds

            while (retries > 0) {
                try {
                    result = await model.generateContent([
                        systemPrompt,
                        { inlineData: { data: base64Data, mimeType: file.type } }
                    ]);
                    break; // Success
                } catch (error: any) {
                    const isQuotaError = error.message.includes('429') || error.message.includes('Quota exceeded');

                    if (isQuotaError && retries > 1) {
                        // Try to parse specific retry delay from error message: "retryDelay": "31s"
                        const match = error.message.match(/retryDelay"?:\s*"(\d+(?:\.\d+)?)s/);
                        let waitTime = delay;

                        if (match && match[1]) {
                            // If API tells us exactly how long to wait, use that + 2 seconds buffer
                            waitTime = (parseFloat(match[1]) * 1000) + 2000;
                            const msg = `Quota exceeded. Waiting ${Math.ceil(waitTime / 1000)}s before retrying...`;
                            console.log(msg);
                            if (onStatusUpdate) onStatusUpdate(msg);
                        } else {
                            const msg = `Quota exceeded. Retrying in ${delay / 1000}s...`;
                            console.warn(msg);
                            if (onStatusUpdate) onStatusUpdate(msg);
                            // Standard backoff if no specific time found
                            delay *= 2;
                        }

                        await new Promise(resolve => setTimeout(resolve, waitTime));
                        retries--;
                    } else {
                        throw error; // Re-throw other errors or if out of retries
                    }
                }
            }

            if (!result) throw new Error("Failed to generate content after multiple retries (Quota Limit).");

            const responseText = result.response.text();

            // 4. Parse and Validate
            const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const analysisData: AnalysisResult = JSON.parse(cleanJson);

            // Simple validation to prevent hallucinated timestamps (basic heuristic)
            // Real validation would need actual video duration metadata.

            return analysisData;

        } catch (error) {
            console.error("Analysis failed:", error);
            throw error;
        }
    },

    // Chat with the model about the video
    async chat(message: string, history: any[]): Promise<string> {
        if (!apiKey) {
            return "I can't reply because the API Key is missing.";
        }

        try {
            // Get the model instance first
            // Get the model instance first
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            // Start the chat session
            const chat = model.startChat({
                history: history.map(h => ({
                    role: h.role === 'user' ? 'user' : 'model',
                    parts: [{ text: h.content }]
                }))
            });

            // Send the message
            const result = await chat.sendMessage(message);
            const response = await result.response;
            return response.text();

        } catch (error) {
            console.error("Chat error:", error);
            // Enhanced error logging to help debugging
            if (error instanceof Error) {
                return `Error: ${error.message}`;
            }
            return "Sorry, I encountered an error while processing your request.";
        }
    },

    // Generate a personalized training plan
    async generateTrainingPlan(game: string, answers: any): Promise<any> {
        if (!apiKey) {
            throw new Error("Gemini API Key is missing.");
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
                Create a 4-week personalized esports training plan for ${game} based on the following player profile:
                ${JSON.stringify(answers, null, 2)}

                Output MUST be strict JSON with this structure:
                {
                    "weeks": [
                        {
                            "week_number": 1,
                            "focus": "Theme of the week",
                            "daily_routine": [
                                { "day": "Monday", "activity": "...", "duration": "..." }
                            ]
                        }
                    ],
                    "tips": ["Tip 1", "Tip 2"]
                }
            `;

            let result;
            let retries = 3;
            let delay = 2000;

            while (retries > 0) {
                try {
                    result = await model.generateContent(prompt);
                    break;
                } catch (error: any) {
                    const isQuotaError = error.message.includes('429') ||
                        error.message.includes('Quota exceeded') ||
                        error.message.includes('quota') ||
                        error.message.includes('503');

                    if (isQuotaError && retries > 1) {
                        console.warn(`Quota exceeded. Retrying details in ${delay / 1000}s...`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                        delay *= 2;
                        retries--;
                    } else {
                        throw error;
                    }
                }
            }

            if (!result) throw new Error("Failed to generate plan due to high traffic (Quota). Please try again in a minute.");

            const responseText = result.response.text();

            // Robust JSON extraction
            const jsonStart = responseText.indexOf('{');
            const jsonEnd = responseText.lastIndexOf('}');

            if (jsonStart === -1 || jsonEnd === -1) {
                console.error("Invalid JSON response:", responseText); // Log the raw response
                throw new Error("Invalid JSON response from AI");
            }

            const cleanJson = responseText.substring(jsonStart, jsonEnd + 1);
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Training Generation failed:", error);
            throw error;
        }
    }
};

// Helper to convert File to Base64 for inlineData
async function fileToGenerativePart(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            // Remove the data URL prefix (e.g., "data:video/mp4;base64,")
            const base64Data = base64String.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
