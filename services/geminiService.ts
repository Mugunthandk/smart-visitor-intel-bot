
import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const summarizeTranscript = async (transcript: ChatMessage[]): Promise<string> => {
  if (!API_KEY) {
    return "Gemini API key not configured. Summary unavailable.";
  }
  
  const formattedTranscript = transcript
    .map(msg => `${msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}: ${msg.text}`)
    .join('\n');

  const prompt = `Summarize the key points and visitor intent from the following chat transcript. Be concise and focus on actionable insights for the sales operator.

Transcript:
---
${formattedTranscript}
---

Summary:`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error summarizing transcript with Gemini:", error);
    return "Could not generate summary due to an API error.";
  }
};
