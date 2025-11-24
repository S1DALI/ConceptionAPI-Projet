import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, route }) => {
  if (route?.id === '/') {
    return {
      user: locals.user
    };
  }

  if (!locals.user) {
    throw redirect(302, '/');
  }

  return {
    user: locals.user
  };
};