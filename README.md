# Syllabi

Syllabi is a web app that turns course syllabi into clean, structured weekly schedules.

Paste in a syllabus, and Syllabi uses AI to extract and organize the course content by week, including topics, readings, and assessments.

## Features

* Paste syllabus text directly into the app
* AI-powered syllabus parsing with Gemini
* Structured week-by-week output
* Organizes:

  * Topics
  * Readings
  * Assessments
* Copy generated schedules to the clipboard
* Handles missing sections cleanly
* Loading and error states
* Input validation
* Simple, responsive interface

## Tech Stack

| Technology            | Purpose                             |
| --------------------- | ----------------------------------- |
| **Next.js**           | Full-stack framework and API routes |
| **React**             | Frontend UI                         |
| **TypeScript**        | Type-safe JavaScript                |
| **Tailwind CSS**      | Styling                             |
| **shadcn/ui**         | UI components                       |
| **Google Gemini API** | AI-powered syllabus parsing         |
| **Vitest**            | Automated testing                   |

## How It Works

1. The user pastes their syllabus into the app.
2. The frontend sends the syllabus to a Next.js API route.
3. The API sends the syllabus to Gemini with a structured output schema.
4. Gemini extracts the course information into structured JSON.
5. The app renders the result as a week-by-week schedule.
6. The generated schedule can be copied for use elsewhere.

## Getting Started

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_api_key
```

Then start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Testing

Run the automated tests with:

```bash
npm test
```

The API route is tested for successful generation, invalid input, Gemini failures, missing responses, and invalid JSON responses.

You can also verify the project with:

```bash
npm run lint
npm run build
```

## Project Status

Syllabi is a completed MVP.

### Implemented

* Syllabus text input
* Gemini integration
* Structured AI output
* Weekly schedule generation
* Topics, readings, and assessments rendering
* Copyable schedule output
* Loading and error states
* Input validation
* API route testing
* Production build validation

### Potential Future Improvements

* Image/PDF syllabus uploads
* More robust syllabus parsing
* Saved syllabi and schedules
* Calendar integration
* Production deployment
