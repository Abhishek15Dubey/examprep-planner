# ExamPrep Planner — production Vercel build

A calm/Zen green-and-white study planner for UPSC and other competitive exams.

## Stack
- Next.js App Router + TypeScript
- Clerk Authentication (Google OAuth, email/password, verification and password reset are configured in Clerk)
- Neon Postgres + Drizzle ORM
- Vercel deployment
- Stitch-friendly component/UI structure; the included UI follows the supplied calm/Zen visual direction

## Deploy
1. Create a Clerk application and enable Google + email/password sign-in.
2. Create a Neon Postgres database.
3. Import this repo into Vercel.
4. Add these Vercel environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL`
5. Deploy.

The app creates its Postgres tables automatically on the first authenticated data request, so there is no separate migration command required for the normal Vercel deployment.

## Local
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Features
- Clerk login/signup with Google and email/password
- Per-user cloud persistence
- Custom syllabus creation
- TXT/Markdown/CSV/PDF/DOCX syllabus import and topic extraction
- Editable subjects/topics and completion tracking
- Study planner
- Focus timer
- Test/mock-test tracker
- Notes
- Responsive web UI

## Security
All data queries are scoped by the authenticated Clerk `userId`. Never expose `CLERK_SECRET_KEY` to client code.
