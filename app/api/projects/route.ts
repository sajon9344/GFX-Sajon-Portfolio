import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';
import { sampleProjects } from '@/lib/projects';

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ projects: sampleProjects, source: 'sample' });
    const { data, error } = await getSupabaseServer().from('projects').select('id,title,category,year,description,image_url,accent,featured').eq('published', true).order('sort_order', { ascending: true });
    if (error) throw error;
    return NextResponse.json({ projects: data?.length ? data : sampleProjects, source: data?.length ? 'database' : 'sample' });
  } catch {
    return NextResponse.json({ projects: sampleProjects, source: 'sample' });
  }
}
