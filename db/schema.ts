import { pgTable, text, integer, boolean, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const subjects = pgTable('subjects', {
  id:text('id').primaryKey(), userId:text('user_id').notNull(), name:text('name').notNull(), createdAt:timestamp('created_at').defaultNow().notNull()
}, t => ({userIdx:uniqueIndex('subjects_user_id_id_idx').on(t.userId,t.id)}));
export const topics = pgTable('topics', {
  id:text('id').primaryKey(), userId:text('user_id').notNull(), subjectId:text('subject_id').notNull(), name:text('name').notNull(), done:boolean('done').default(false).notNull(), position:integer('position').default(0).notNull()
});
export const tasks = pgTable('tasks', {
  id:text('id').primaryKey(), userId:text('user_id').notNull(), title:text('title').notNull(), subject:text('subject').notNull(), date:text('date').notNull(), minutes:integer('minutes').notNull(), done:boolean('done').default(false).notNull()
});
export const notes = pgTable('notes', {
  id:text('id').primaryKey(), userId:text('user_id').notNull(), title:text('title').notNull(), body:text('body').notNull(), updatedAt:timestamp('updated_at').defaultNow().notNull()
});
export const tests = pgTable('tests', {
  id:text('id').primaryKey(), userId:text('user_id').notNull(), title:text('title').notNull(), subject:text('subject').notNull(), questions:integer('questions').notNull(), score:integer('score'), date:text('date').notNull()
});

export const studySessions = pgTable('study_sessions', {
  id:text('id').primaryKey(),
  userId:text('user_id').notNull(),
  subjectId:text('subject_id'),
  taskId:text('task_id'),
  subject:text('subject'),
  task:text('task'),
  startedAt:timestamp('started_at').notNull(),
  endedAt:timestamp('ended_at').notNull(),
  durationMinutes:integer('duration_minutes').notNull(),
  status:text('status').notNull().default('completed'),
  notes:text('notes'),
  createdAt:timestamp('created_at').defaultNow().notNull()
}, t => ({
  userStartedIdx:uniqueIndex('study_sessions_user_started_idx').on(t.userId, t.startedAt),
  userCreatedIdx:uniqueIndex('study_sessions_user_created_idx').on(t.userId, t.createdAt)
}));
