import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? '').trim().slice(0, 120);
    const email = String(body.email ?? '').trim().slice(0, 254);
    const project = String(body.project ?? 'Something else').trim().slice(0, 120);
    const message = String(body.message ?? '').trim().slice(0, 5000);
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 });
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: 'Contact form is not configured yet. Add Supabase environment variables.' }, { status: 503 });
    const { error } = await getSupabaseServer().from('contact_messages').insert({ name, email, project, message });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to save your message.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
