import { GoogleGenAI } from "@google/genai";

export async function getAIAnalysis(parameter: string, value: number, score: number, severity: string) {
  // In this environment, the key is injected into process.env.GEMINI_API_KEY
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY") {
    throw new Error('Gemini API key is missing or invalid. Please configure it in the Settings menu.');
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    You are an expert petrochemical process engineer. 
    Analyze this sensor anomaly and provide a concise expert explanation and recommended actions.
    
    Sensor: ${parameter}
    Current Value: ${value}
    Anomaly Score: ${(score * 100).toFixed(1)}%
    Severity: ${severity}
    
    Provide your response in Markdown format. Keep it professional and actionable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    if (!response.text) {
      throw new Error('Gemini returned an empty response.');
    }

    return response.text;
  } catch (error: any) {
    console.error('Gemini Analysis Error:', error);
    
    // Handle specific API errors
    if (error.message?.includes('API key not valid')) {
      throw new Error('Invalid Gemini API key. Please update it in the Settings menu.');
    }
    
    throw error;
  }
}
