import { describe, it, expect, vi } from "vitest"
import { POST } from "./route"

const { mockGenerateContent } = vi.hoisted(() => ({
  mockGenerateContent: vi.fn(),
}))

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = {
      generateContent: mockGenerateContent,
    }
  },
}))

describe("POST /api/generate", () => {
  it("returns 400 when syllabus text is empty", async () => {
    const request = new Request("http://localhost/api/generate", {
        method: "POST",
        headers: {
             "Content-Type": "application/json",
        },
        body: JSON.stringify({
            syllabusText: "",
        }),
    })

    const response = await POST(request)
    
    expect(response.status).toBe(
        400)

    const data = await response.json()

    expect(data).toEqual({error: "Syllabus text is required"})
  })

    it("returns 200 with a structured syllabus for valid input", async () => {
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify({
                weeks: [
                    {
                        week: "Week 1",
                        topics: ["Linear Regression"],
                        readings: ["Chapter 1"],
                        assessments: [],
                    },
                ],
            }),
        })

        const request = new Request("http://localhost/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                syllabusText: "Week 1\nLinear Regression\nRead Chapter 1",
            }),
        })

        const response = await POST(request)

        expect(response.status).toBe(200)

        const data = await response.json()

        expect(data).toEqual({
            weeks: [
                {
                week: "Week 1",
                topics: ["Linear Regression"],
                readings: ["Chapter 1"],
                assessments: [],
                },
            ],
        })
    })

    it("returns 500 when Gemini fails", async () => {
        mockGenerateContent.mockRejectedValue(
            new Error("Gemini API failed")
        )

        const request = new Request("http://localhost/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                syllabusText: "Week 1\nLinear Regression\nRead Chapter 1",
            }),
        })

        const response = await POST(request)

        expect(response.status).toBe(500)

        const data = await response.json()

        expect(data).toEqual({
            error: "Failed to generate schedule",
        })
    })

    it("returns 500 when Gemini returns no text", async () => {
        mockGenerateContent.mockResolvedValue({
            text: "",
        })

        const request = new Request("http://localhost/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                syllabusText: "Week 1\nLinear Regression",
            }),
        })

        const response = await POST(request)

        expect(response.status).toBe(500)

        const data = await response.json()
        
        expect(data).toEqual({
            error: "Failed to generate schedule"
        })
    })

    it("returns 500 when Gemini returns invalid JSON", async () => {
        mockGenerateContent.mockResolvedValue({
            text: "not valid json",
        })

        const request = new Request("http://localhost/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                syllabusText: "Week 1\nLinear Regression",
            }),
        })

        const response = await POST(request)

        expect(response.status).toBe(500)

        const data = await response.json()

        expect(data).toEqual({
            error: "Failed to generate schedule"
        })
    })
})