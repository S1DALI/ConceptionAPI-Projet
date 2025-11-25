import type { Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';
import { getUserByEmail, getUserByGoogleId } from '$lib/db';

export const handle: Handle = async ({ event, resolve }) => {
  const authToken = event.cookies.get('authToken');

  if (authToken) {
    try {
      // Décoder le JWT sans vérifier la signature (on fait confiance à Google)
      const decoded = jwtDecode(authToken) as { email?: string; sub?: string; picture?: string };

      if (decoded) {
        let user = null;
        if (decoded.email) {
          user = getUserByEmail(decoded.email);
        } else if (decoded.sub) {
          user = getUserByGoogleId(decoded.sub);
        }
        if (user) {
          if (decoded.picture) user.picture = decoded.picture;
          event.locals.user = user;
        }
      }
    } catch (error) {
      console.error('Token decode failed:', error);
      event.cookies.delete('authToken', { path: '/' });
    }
  }

  return resolve(event);
};