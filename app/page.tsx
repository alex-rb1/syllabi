"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SyllabusResult } from "@/components/types/syllabus"

export default function Home() {
  const [syllabusText, setSyllabusText] = useState("");
  const [result, setResult] = useState<SyllabusResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    e.preventDefault()

    if (!syllabusText.trim()) {
      setError("Please paste your syllabus first.")
      return
    }

    setIsLoading(true);
    setError("");
    setResult(null);

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
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      const data = await response.json();
      setResult(data)
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Something went wrong")
      }
    } finally {
      setIsLoading(false);
    }
  }

  function formatSchedule() {
    if (!result) return ""

    const weeks = result.weeks.map((week) => {
      const topics = week.topics.length
      ? week.topics
        .map((topic) => `- ${topic}`)
        .join("\n")
      : "- None"

      const readings = week.readings.length
      ? week.readings
        .map((reading) => `- ${reading}`)
        .join("\n")
        : "- None"

      const assessments = week.assessments.length
      ? week.assessments
        .map((assessment) => `- ${assessment}`)
        .join("\n")
        : "- None"
      
    return `${week.week} 
      
    Topics
    ${topics}
    
    Readings
    ${readings}
    
    Assessments
    ${assessments}`
    })
  
    return weeks.join("\n\n");
  }

  async function handleCopy() {
    const text = formatSchedule()
    await navigator.clipboard.writeText(text)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
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
              onChange={(e) => {
                setSyllabusText(e.target.value)
                setError("");
              }}
              disabled={isLoading}
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

          {isLoading && (
            <p>Organizing your syllabus...</p>
          )}

          {result && (
            result.weeks.map((week) => (
              <div key={week.week} className="border rounded-lg p-6 mb-4">
                <h2 className="text-lg font-semibold mb-4">{week.week}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Topics</h3>

                    {week.topics.map((topic) => (
                      <div key={topic}>
                        {topic}
                      </div>
                    ))}

                    {!week.topics.length && (
                      <p>None</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Readings</h3>

                    {week.readings.map((reading) => (
                      <div key={reading}>
                        {reading}
                      </div>
                    ))}

                    {!week.readings.length && (
                      <p>None</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Assessments</h3>

                    {week.assessments.map((assessment) => (
                      <div key={assessment}>
                        {assessment}
                      </div>
                    ))}

                    {!week.assessments.length && (
                      <p>None</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {result && (
            <Button
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy Schedule"}
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}