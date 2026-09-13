import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { and, asc, eq } from 'drizzle-orm';
import { db } from '../../../lib/db';
import { ensureDb } from '../../../lib/ensure-db';
import { notes, subjects, tasks, tests, topics } from '../../../db/schema';

export const runtime = 'nodejs';

async function requireUser(){
  const { userId } = await auth();
  if(!userId) throw new Error('UNAUTHORIZED');
  return userId;
}

export async function GET(){
  try{
    const userId = await requireUser();
    await ensureDb();
    const [subjectRows, topicRows, taskRows, noteRows, testRows] = await Promise.all([
      db.select().from(subjects).where(eq(subjects.userId,userId)).orderBy(asc(subjects.createdAt)),
      db.select().from(topics).where(eq(topics.userId,userId)).orderBy(asc(topics.position)),
      db.select().from(tasks).where(eq(tasks.userId,userId)),
      db.select().from(notes).where(eq(notes.userId,userId)),
      db.select().from(tests).where(eq(tests.userId,userId)),
    ]);
    return NextResponse.json({
      subjects: subjectRows.map(s=>({id:s.id,name:s.name,topics:topicRows.filter(t=>t.subjectId===s.id).map(t=>({id:t.id,name:t.name,done:t.done}))})),
      tasks: taskRows.map(t=>({id:t.id,title:t.title,subject:t.subject,date:t.date,minutes:t.minutes,done:t.done})),
      notes: noteRows.map(n=>({id:n.id,title:n.title,body:n.body,updated:n.updatedAt.toISOString()})),
      tests: testRows.map(t=>({id:t.id,title:t.title,subject:t.subject,questions:t.questions,score:t.score ?? undefined,date:t.date}))
    });
  }catch(e){
    return NextResponse.json({error:e instanceof Error?e.message:'Failed to load data'},{status:e instanceof Error&&e.message==='UNAUTHORIZED'?401:500});
  }
}

export async function POST(req:Request){
  try{
    const userId = await requireUser();
    await ensureDb();
    const body = await req.json();
    const safeSubjects = Array.isArray(body.subjects)?body.subjects:[];
    const safeTasks = Array.isArray(body.tasks)?body.tasks:[];
    const safeNotes = Array.isArray(body.notes)?body.notes:[];
    const safeTests = Array.isArray(body.tests)?body.tests:[];

    // Replace the user's planner snapshot. All IDs originate from the client and are scoped by Clerk userId.
    await db.delete(topics).where(eq(topics.userId,userId));
    await db.delete(subjects).where(eq(subjects.userId,userId));
    await db.delete(tasks).where(eq(tasks.userId,userId));
    await db.delete(notes).where(eq(notes.userId,userId));
    await db.delete(tests).where(eq(tests.userId,userId));

    if(safeSubjects.length){
      await db.insert(subjects).values(safeSubjects.map((s:any)=>({id:String(s.id),userId,name:String(s.name||'Untitled')})));
      const topicValues:any[]=[];
      safeSubjects.forEach((s:any)=> (Array.isArray(s.topics)?s.topics:[]).forEach((t:any,i:number)=>topicValues.push({id:String(t.id),userId,subjectId:String(s.id),name:String(t.name||'Untitled'),done:Boolean(t.done),position:i})));
      if(topicValues.length) await db.insert(topics).values(topicValues);
    }
    if(safeTasks.length) await db.insert(tasks).values(safeTasks.map((t:any)=>({id:String(t.id),userId,title:String(t.title||''),subject:String(t.subject||''),date:String(t.date||''),minutes:Math.max(1,Number(t.minutes)||1),done:Boolean(t.done)})));
    if(safeNotes.length) await db.insert(notes).values(safeNotes.map((n:any)=>({id:String(n.id),userId,title:String(n.title||'Untitled note'),body:String(n.body||''),updatedAt:n.updated?new Date(n.updated):new Date()})));
    if(safeTests.length) await db.insert(tests).values(safeTests.map((t:any)=>({id:String(t.id),userId,title:String(t.title||''),subject:String(t.subject||''),questions:Math.max(1,Number(t.questions)||1),score:t.score==null?null:Number(t.score),date:String(t.date||'')})));
    return NextResponse.json({ok:true});
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Failed to save data'},{status:e instanceof Error&&e.message==='UNAUTHORIZED'?401:500});}
}
