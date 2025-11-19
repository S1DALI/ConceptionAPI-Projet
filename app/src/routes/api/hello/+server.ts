import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET() {
    return json({message : 'je test le backend'});
}

export async function POST({ request }: RequestEvent) {
  const data = await request.json();
  return json({ data });
}