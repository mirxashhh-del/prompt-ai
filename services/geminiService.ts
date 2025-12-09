import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a sophisticated system prompt based on a simple user idea.
 */
export const generateEnhancedPrompt = async (userInput: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = `
You are an expert Prompt Architect and Senior Software Engineer. 
Your goal is to take a raw, simple user idea and transform it into a highly detailed, professional "System Prompt" that they can paste into an LLM (like ChatGPT, Claude, or Gemini).

You must analyze the user's input to determine the optimal persona (ROLE).
- If the input involves code, games, or technical tasks, the ROLE should be "Senior Software Engineer" or "Tech Lead".
- If the input involves writing, blogs, or marketing, the ROLE should be "Professional Copywriter" or "Editor".
- If the input is general, use "Expert AI Assistant".

Structure the output strictly using the following template:

**ROLE:** 
[The specific persona you selected]

**CONTEXT:** 
The user wants to accomplish the following goal: [Elaborate on the user's simple input slightly to provide context]

**TASK:** 
Your objective is to execute this request with maximum precision, following best practices for the specific domain. [Add specific instructions based on the topic]

**CONSTRAINTS:** 
- Provide clean, efficient, and high-quality output.
- Avoid generic filler text.
- [Add 1-2 specific constraints relevant to the topic, e.g., "Use ES6+ syntax" for JS, or "Use active voice" for writing]

**FORMAT:** 
Return the result in a structured format (e.g., Markdown, JSON, or Code Block as appropriate).

---
Input: "${userInput}"
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userInput, // The user input is the trigger, but the system instruction guides the transformation
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Creativity balanced with structure
      }
    });

    if (response.text) {
      return response.text;
    } else {
      throw new Error("No text returned from Gemini API");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};