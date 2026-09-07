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
* Handles missing sections cleanly
* Simple, responsive interface

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Google Gemini API**

## How It Works

1. The user pastes their syllabus into the app.
2. The frontend sends the syllabus to a Next.js API route.
3. The API sends the syllabus to Gemini with a structured output schema.
4. Gemini extracts the course information into structured JSON.
5. The app renders the result as a week-by-week schedule.

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

## Project Status

Syllabi is currently an MVP under development.

### Implemented

* Syllabus text input
* Gemini integration
* Structured AI output
* Weekly schedule generation
* Topics, readings, and assessments rendering
* Basic result UI

### Planned

* Copyable schedule output
* Improved loading and error states
* More robust syllabus parsing
* Image/PDF syllabus uploads
* Production deployment
