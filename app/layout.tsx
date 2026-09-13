import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
export const metadata: Metadata = {title:'ExamPrep Planner',description:'Calm, focused study planning for competitive exams.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <ClerkProvider><html lang="en"><body>{children}</body></html></ClerkProvider>}
