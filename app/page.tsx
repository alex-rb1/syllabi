"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [syllabusText, setSyllabusText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    e.preventDefault()

    if (!syllabusText.trim()) return

    setIsLoading(true);
    setError("");

    try{
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            syllabusText
        })
      })

      if (!response.ok) {
        throw new Error("Failed to generate schedule")
      }

      const data = await response.json();

      setSubmittedText(data.result)
    } catch {
      setError("Failed to generate schedule")
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-3xl flex-col px-6 py-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Syllabi
          </h1>

          <p className="mt-3 text-muted-foreground">
            Turn your syllabus into a clean weekly schedule.
          </p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Paste your syllabus here..."
              className="min-h-80 resize-none"
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Schedule"}
            </Button>
          </form>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {submittedText && (
            <div className="mt-8 rounded-lg border p-4">
              <h2 className="mb-2 font-medium">
                Submitted syllabus
              </h2>

              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {submittedText}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}