import { json } from '@sveltejs/kit';
export async function GET() {
  return json({ message: 'je test le backend' });
}

/*export async function POST({ request }) {
  const data = await request.json();
  return json({ data });
}*/