# ExamPrep Planner Architecture

Browser -> Next.js App Router -> Clerk authentication -> protected route handlers -> Neon Postgres.

The browser owns the interactive planner state. A debounced `/api/sync` snapshot writes the user's subjects, topics, tasks, notes and tests to Neon. Every server query is scoped to the Clerk `userId`.

Syllabus files are sent to `/api/parse-syllabus`, parsed on the server, converted into editable text, and then saved as structured topics through the normal sync endpoint. Original uploads are not retained by the app, avoiding unnecessary file-storage cost and privacy exposure.

Vercel is the deployment target. Neon is the Postgres provider because it is serverless-friendly and works cleanly with Vercel. Clerk handles authentication rather than maintaining passwords in the application database.
