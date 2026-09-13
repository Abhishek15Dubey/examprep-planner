import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import mammoth from 'mammoth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const form = await req.formData();
  const file = form.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'No file uploaded' },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    let text = '';

    if (file.name.toLowerCase().endsWith('.pdf')) {
      if (typeof globalThis.DOMMatrix === 'undefined') {
        (globalThis as any).DOMMatrix = class DOMMatrix {};
      }

      const pdfModule = await import('pdf-parse');
      const pdfParse = ('default' in pdfModule ? (pdfModule as any).default : pdfModule) as (
        data: Buffer
      ) => Promise<{ text: string }>;
      const result = await pdfParse(buffer);

      text = result.text;
    } else if (file.name.toLowerCase().endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer });

      text = result.value;
    } else {
      text = buffer.toString('utf8');
    }

    return NextResponse.json({
      text: text.replace(/\r/g, '').trim(),
    });
  } catch {
    return NextResponse.json(
      {
        error:
          'Could not parse this file. Try a text-based PDF/DOCX or paste the syllabus.',
      },
      { status: 422 }
    );
  }
}