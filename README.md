# AWS Exam Practice Frontend

A clean, fast, and lightweight static web application for practicing AWS certification exam questions.

## Overview
This application is completely client-side. There is no backend, no database, and no runtime API calls. It loads practice questions from static JSON files and provides an interactive, mobile-friendly interface for exam setup, taking the exam, and reviewing your answers.

## Tech Stack
- **Vite**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Docker** (for containerized builds and serving)

## Running the Application

This project is fully containerized. You do not need Node.js installed locally; you only need Docker.

### 1. Build and Run via Docker Compose

In the root of the project, run:

```bash
docker-compose up --build
```

### 2. Access the App

Open your browser and navigate to:
**http://localhost:8080**

To stop the application, press `Ctrl+C` in your terminal or run `docker-compose down`.

---

## How to Add New Questions

The application loads questions from static JSON files located in the `public/questions/` directory.

### Where to add them
The application uses an `index.json` registry to know which question sets exist. 

To add a new set of questions (e.g., for the SAA exam):
1. Create a new JSON file (e.g., `public/questions/saa/set-002.json`) containing an array of questions.
2. Register this new file in `public/questions/saa/index.json`:
   ```json
   [
     { "id": "set-001", "name": "Practice Set 1" },
     { "id": "set-002", "name": "My New Questions" }
   ]
   ```

### Question Data Schema
Every question inside your set file must follow this exact format:

```json
{
  "id": "saa-011",
  "question": "Your question text goes here. Which AWS service...?",
  "options": {
    "A": "Option A Text",
    "B": "Option B Text",
    "C": "Option C Text",
    "D": "Option D Text"
  },
  "correctAnswer": "A",
  "explanation": "Explanation of why A is the correct answer.",
  "whyOthersAreWrong": {
    "B": "Why B is incorrect.",
    "C": "Why C is incorrect.",
    "D": "Why D is incorrect."
  },
  "topic": "Compute",
  "tags": ["EC2", "Compute"]
}
```

### Important Notes for Adding Questions:
1. **`id`**: Should be unique for every question (e.g., `saa-011`).
2. **`options`**: Exactly four options (A, B, C, D) are supported by the UI.
3. **`correctAnswer`**: Must perfectly match one of the option keys ("A", "B", "C", or "D").
4. **No rebuild required**: Because the JSON files are in the `public` directory, if you are running a local development server (`npm run dev`), changes reflect immediately. *However, if you are running it through Docker, you will need to restart the container for the Nginx server to serve the updated static files!*
