# AWS Exam Practice App Guidelines

These rules apply when developing or modifying this workspace:

1. **Architecture Constraints**:
   - This is a purely client-side static web application.
   - Do NOT introduce any backend, databases, or runtime API calls.
   - Questions are served from static JSON files in `public/questions/`.

2. **Tech Stack**:
   - Framework: Vite + React + TypeScript.
   - Styling: Tailwind CSS.
   - Containerization: Docker (multi-stage build with Nginx).

3. **Running and Building**:
   - Always use Docker to build and run the application to ensure a consistent environment.
   - Use `docker-compose up --build` for deploying changes locally.

4. **Adding Questions**:
   - Follow the schema defined in the `README.md`.
   - Questions are added by creating new JSON files (e.g., `set-002.json`) in `public/questions/<exam_id>/`.
   - Every new set MUST be registered in the corresponding `index.json` file so the frontend can load it.
