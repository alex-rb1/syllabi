import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
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
          <Textarea
            placeholder="Paste your syllabus here..."
            className="min-h-80 resize-none"
          />

          <Button className="w-full">
            Generate Schedule
          </Button>
        </div>
      </div>
    </main>
  )
}