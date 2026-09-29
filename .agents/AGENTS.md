# .agents/AGENTS.md

Guidance for AI agents working in this repo. Kept intentionally short — the two
sources of truth below are authoritative, so do not duplicate their content here.

## Development

Follow the root `AGENTS.md` for architecture constraints, build/lint commands,
the real question schema, the `/aws-exam/` base path, and deploy. Key constraint:
this is a purely client-side static app — no backend, database, or runtime API
calls. Questions are static JSON under `public/questions/<examId>/`.

Note: the "Question Data Schema" section in `README.md` is STALE — do not follow
it. The real schema lives in `src/types/question.ts` and is summarized in the
root `AGENTS.md`.

## Generating questions

Use the prompt in `.agents/rules/generate-questions-saa.md`. It is the single
source of truth for question generation: output format, difficulty focus,
SAA-C03 blueprint and domain weights, in/out-of-scope services, ID and file
rules, and the validation checklist. If you add another exam, create a sibling
`.agents/rules/generate-questions-<exam>.md` rather than expanding this file.
