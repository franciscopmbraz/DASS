import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize Gemini API with the new SDK
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenAI({ apiKey });

export const geminiService = {
    // Analyze a video file
    async analyzeVideo(file: File, prompt: string): Promise<AnalysisResult> {
        if (!apiKey) {
            throw new Error("Gemini API Key is missing. Please set GEMINI_API_KEY in .env");
        }

        try {
            console.log("Analyzing file:", file.name);

            // Artificial delay for the demo experience
            await new Promise(resolve => setTimeout(resolve, 3500));

            // Mock Result for MVP - Expanded Detail
            return {
                summary: "The player demonstrated comprehensive mechanical skill, particularly in crosshair placement. However, decision-making during mid-round rotations often left the team vulnerable. Economy management was conservative but sometimes inefficient.",
                strengths: ["Exceptional Crosshair Placement at head level", "Controlled Burst firing", "Defensive utility usage on site hold"],
                weaknesses: ["Over-rotating on unconfirmed info", "Lack of trading teammates on entry", "Predictable off-angle positioning"],
                key_moments: [
                    { timestamp: "0:45", description: "Round 3: Excellent double kill entry on B Site" },
                    { timestamp: "1:20", description: "Round 5: Missed trade opportunity on B Main due to hesitation" },
                    { timestamp: "2:15", description: "Round 8: High IQ post-plant positioning won the round" }
                ],
                improvement_plan: "1. Drill: Practice 'slice the pie' technique for clearing angles.\n2. Review VODs to identify timing windows for rotations.\n3. Focus on comms: Call out utility usage before executing.",
                mechanics: {
                    aim_rating: 85,
                    movement_rating: 72,
                    positioning_rating: 65,
                    crosshair_placement: 'Good',
                    reaction_time: '185ms (Estimated)'
                },
                economy: {
                    rating: 70,
                    analysis: "Good saving discipline, but forced buys were mistimed in Round 4 and 9, damaging the economy for subsequent fully-buy rounds."
                },
                rounds_analyzed: [
                    { round_number: 1, outcome: 'Win', kda: '2/0/0', highlight: 'Pistol round multi-kill' },
                    { round_number: 2, outcome: 'Loss', kda: '0/1/0', highlight: 'Caught rotating too early' },
                    { round_number: 3, outcome: 'Win', kda: '1/0/1', highlight: 'Successful site retake' }
                ]
            };

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
            const chat = genAI.chats.create({
                model: "gemini-1.5-flash",
                history: history.map(h => ({
                    role: h.role,
                    parts: [{ text: h.content }]
                }))
            });

            const result = await chat.sendMessage({
                parts: [{ text: message }]
            });

            // The new SDK response structure handling
            // Based on lint feedback, 'text' is a getter or property, not a function.
            if (result.text) {
                return result.text;
            }

            // Fallback
            if (result.candidates && result.candidates.length > 0) {
                return result.candidates[0].content.parts[0].text || "No text in response";
            }

            return "I received a response but couldn't parse the text.";
        } catch (error) {
            console.error("Chat error:", error);
            return "Sorry, I encountered an error while processing your request.";
        }
    }
};
