import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, route, url }) => {
  if (route?.id === '/') {
    return {
      user: locals.user
    };
  }

  if (!locals.user && !url.pathname.startsWith('/api/docs')) {
    throw redirect(302, '/');
  }

  return {
    user: locals.user
  };
};