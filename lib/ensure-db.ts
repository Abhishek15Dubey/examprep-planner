import { neon } from '@neondatabase/serverless';
let ready: Promise<void> | null = null;
export function ensureDb(){
  if(ready) return ready;
  const sql=neon(process.env.DATABASE_URL!);
  ready=(async()=>{
    await sql`create table if not exists subjects (id text primary key, user_id text not null, name text not null, created_at timestamptz not null default now())`;
    await sql`create table if not exists topics (id text primary key, user_id text not null, subject_id text not null, name text not null, done boolean not null default false, position integer not null default 0)`;
    await sql`create table if not exists tasks (id text primary key, user_id text not null, title text not null, subject text not null, date text not null, minutes integer not null, done boolean not null default false)`;
    await sql`create table if not exists notes (id text primary key, user_id text not null, title text not null, body text not null, updated_at timestamptz not null default now())`;
    await sql`create table if not exists tests (id text primary key, user_id text not null, title text not null, subject text not null, questions integer not null, score integer, date text not null)`;
    await sql`create table if not exists study_sessions (id text primary key, user_id text not null, subject_id text, task_id text, subject text, task text, started_at timestamptz not null, ended_at timestamptz not null, duration_minutes integer not null, status text not null default 'completed', notes text, created_at timestamptz not null default now())`;
    await sql`create index if not exists subjects_user_idx on subjects(user_id)`;
    await sql`create index if not exists topics_user_idx on topics(user_id)`;
    await sql`create index if not exists tasks_user_idx on tasks(user_id)`;
    await sql`create index if not exists notes_user_idx on notes(user_id)`;
    await sql`create index if not exists tests_user_idx on tests(user_id)`;
    await sql`create index if not exists study_sessions_user_idx on study_sessions(user_id)`;
    await sql`create index if not exists study_sessions_started_idx on study_sessions(started_at)`;
    await sql`create index if not exists study_sessions_created_idx on study_sessions(created_at)`;
  })();
  return ready;
}
