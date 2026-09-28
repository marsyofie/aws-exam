# AGENTS.md

Client-side static app (Vite + React + TS + Tailwind) for practicing AWS exam
questions. No backend/DB/runtime APIs — questions are static JSON under
`public/questions/<examId>/`. Only exam currently present: `saa`.

## Commands

- `npm run dev` — local dev server (question JSON changes reflect immediately).
- `npm run build` — `tsc && vite build`. Typecheck runs as part of build; there
  is no separate typecheck script.
- `npm run lint` — ESLint with `--max-warnings 0`, so any warning fails.
- No test framework is configured. Do not assume `npm test` exists.
- `tsconfig` is `strict` with `noUnusedLocals`/`noUnusedParameters` — unused
  vars/params break the build.

## Question data — read this before adding/editing questions

- Source of truth for the schema is `src/types/question.ts` (the `Question`
  interface) and the generator prompt in
  `.agents/rules/generate-questions-saa.md`. Match existing files like
  `public/questions/saa/set-085.json`.
- The `README.md` "Question Data Schema" section is STALE and WRONG. It shows
  `correctAnswer` (singular string) and only A–D. The real schema uses:
  `correctAnswers` (string array), `answerType` (`single`|`multiple`),
  `answerInstruction`, `exam`, `learningObjective`, `tags`, and supports 5
  options (A–E) for multiple-answer questions. Do not follow the README schema.
- Each set file is a JSON array of `Question` objects named `set-NNN.json`.
- Every set MUST be registered in `public/questions/saa/index.json`
  (`{ "id": "set-NNN", "name": "..." }`) or the UI cannot load it.
- Question `id`s are globally sequential across sets (e.g. `saa-1700` is the last
  in set-085; continue from there). Keep ids unique across ALL sets, not just
  within one file.
- The app shuffles questions on load (`fetchQuestions`), so ordering in the file
  does not matter.

## Routing / base path gotcha

- `vite.config.ts` sets `base: '/aws-exam/'`. All fetches use
  `import.meta.env.BASE_URL` (`questionUtils.ts`), so assets resolve under
  `/aws-exam/`. Do not hardcode absolute `/questions/...` paths.

## Deploy

- Production deploy is GitHub Pages via `.github/workflows/deploy.yml` on push to
  `main`/`master` (`npm run build` → upload `dist/`). The `/aws-exam/` base path
  exists for this Pages subpath.
- `Dockerfile` + `docker-compose.yml` (port 8080:80, Nginx serving built `dist`)
  are for local containerized runs only. Because Nginx serves the built output,
  question JSON changes require rebuilding the container (`docker-compose up
  --build`) to appear — unlike `npm run dev`.

## Conventions

- Repo guidelines and the question-generation prompt live in `.agents/AGENTS.md`
  and `.agents/rules/generate-questions-saa.md`. Honor the architecture
  constraint: keep the app purely client-side (no backend, DB, or runtime API
  calls).
