import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';

export const runtime='nodejs';
export async function POST(req:Request){
  const {userId}=await auth(); if(!userId) return NextResponse.json({error:'Unauthorized'},{status:401});
  const form=await req.formData(); const file=form.get('file');
  if(!(file instanceof File)) return NextResponse.json({error:'No file uploaded'},{status:400});
  const buffer=Buffer.from(await file.arrayBuffer());
  try{
    let text='';
    if(file.name.toLowerCase().endsWith('.pdf')) text=(await pdf(buffer)).text;
    else if(file.name.toLowerCase().endsWith('.docx')) text=(await mammoth.extractRawText({buffer})).value;
    else text=buffer.toString('utf8');
    return NextResponse.json({text:text.replace(/\r/g,'').trim()});
  }catch{return NextResponse.json({error:'Could not parse this file. Try a text-based PDF/DOCX or paste the syllabus.'},{status:422});}
}
