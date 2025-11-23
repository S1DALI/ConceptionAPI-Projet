import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
  const authToken = cookies.get('authToken');
  
  if (authToken && locals.user) {
    throw redirect(302, '/dashboard');
  }
  
};