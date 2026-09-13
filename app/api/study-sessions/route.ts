import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { studySessions } from '../../../db/schema';
import { db } from '../../../lib/db';
import { ensureDb } from '../../../lib/ensure-db';

export const runtime = 'nodejs';

async function requireUser() {
  const { userId } = await auth();
  if (!userId) throw new Error('UNAUTHORIZED');
  return userId;
}

function serializeSession(row: any) {
  return {
    id: row.id,
    userId: row.userId,
    subjectId: row.subjectId ?? null,
    taskId: row.taskId ?? null,
    subject: row.subject ?? null,
    task: row.task ?? null,
    startedAt: row.startedAt instanceof Date ? row.startedAt.toISOString() : new Date(row.startedAt).toISOString(),
    endedAt: row.endedAt instanceof Date ? row.endedAt.toISOString() : new Date(row.endedAt).toISOString(),
    durationMinutes: Number(row.durationMinutes ?? 0),
    status: row.status ?? 'completed',
    notes: row.notes ?? null,
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : new Date(row.createdAt ?? Date.now()).toISOString(),
  };
}

export async function GET(req: Request) {
  try {
    const userId = await requireUser();
    await ensureDb();
    const url = new URL(req.url);
    const scope = url.searchParams.get('scope');

    const rows = await db
      .select()
      .from(studySessions)
      .where(eq(studySessions.userId, userId))
      .orderBy(desc(studySessions.startedAt))
      .limit(scope === 'all' ? 200 : 10);

    return NextResponse.json({ sessions: rows.map(serializeSession) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load study sessions' },
      { status: error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await requireUser();
    await ensureDb();
    const body = await req.json();
    const sessionId = String(body.id ?? crypto.randomUUID());
    const startedAt = body.startedAt ? new Date(body.startedAt) : new Date();
    const endedAt = body.endedAt ? new Date(body.endedAt) : new Date();
    const durationMinutes = Math.max(1, Number(body.durationMinutes ?? 1));

    await db
      .insert(studySessions)
      .values({
        id: sessionId,
        userId,
        subjectId: body.subjectId ?? null,
        taskId: body.taskId ?? null,
        subject: body.subject ?? null,
        task: body.task ?? null,
        startedAt,
        endedAt,
        durationMinutes,
        status: String(body.status ?? 'completed'),
        notes: body.notes ?? null,
      })
      .onConflictDoUpdate({
        target: studySessions.id,
        set: {
          subjectId: body.subjectId ?? null,
          taskId: body.taskId ?? null,
          subject: body.subject ?? null,
          task: body.task ?? null,
          startedAt,
          endedAt,
          durationMinutes,
          status: String(body.status ?? 'completed'),
          notes: body.notes ?? null,
          createdAt: new Date(),
        },
      });

    return NextResponse.json({ ok: true, id: sessionId });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save study session' },
      { status: error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500 }
    );
  }
}
