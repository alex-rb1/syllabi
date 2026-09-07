import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
    const body = await request.json()

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a syllabus parser. Organize the provided syllabus by week. For each week, extract topics, readings, assessments, and due dates. Do not add advice or information that isn't present in the syllabus. Syllabus: ${body.syllabusText}`,
        config: {
            responseMimeType: "application/json",

            responseJsonSchema: {
                type: "object",
                properties: {
                    weeks: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                week: {
                                    type: "string",
                                },
                                topics: {
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                },
                                readings: {
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                },
                                assessments: {
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                }
                            },
                            required: ["week", "topics", "readings", "assessments"]
                        },
                    }
                },
                required: ["weeks"]
            }
        }
    })

    if (!response.text) {
        throw new Error("Gemini returned no response")
    }

    const result = JSON.parse(response.text);

    return Response.json(result);
}