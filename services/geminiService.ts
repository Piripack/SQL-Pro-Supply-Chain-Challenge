
import { GoogleGenAI } from "@google/genai";

const getHint = async (challengeDescription: string, userQuery: string): Promise<string> => {
    if (!process.env.API_KEY) {
        return "API_KEY environment variable not set. Cannot fetch hint.";
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const prompt = `
        You are an expert SQL tutor specializing in Microsoft SQL Server (T-SQL).
        A student is working on the following SQL challenge:
        Challenge Description: "${challengeDescription}"

        This is the student's current query attempt:
        \`\`\`sql
        ${userQuery}
        \`\`\`

        The student's query is incorrect or incomplete. Your task is to provide a short, helpful hint to guide them toward the correct solution.

        Guidelines for your hint:
        - DO NOT provide the full, correct SQL query.
        - Point out a potential logical error or a syntax mistake.
        - Suggest a specific SQL clause, function, or concept they should consider using (e.g., "Have you considered using a LEFT JOIN?", "Think about how the GROUP BY clause works.", "You might need a WHERE clause to filter the results.").
        - Keep the hint concise (1-3 sentences).
        - Your tone should be encouraging and helpful.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        return response.text.trim();

    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to get a hint from the AI tutor.");
    }
};

export default getHint;
