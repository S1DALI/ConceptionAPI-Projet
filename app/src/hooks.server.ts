import type { Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export const handle: Handle = async ({ event, resolve }) => {
  const authToken = event.cookies.get('authToken');

  if (authToken) {
    try {
      // Décoder le JWT sans vérifier la signature (on fait confiance à Google)
      const decoded = jwtDecode(authToken);
      
      if (decoded && decoded.sub) {
        event.locals.user = decoded;
        console.log('User authenticated:', decoded.email || decoded.sub);
      }
    } catch (error) {
      console.error('Token decode failed:', error);
      event.cookies.delete('authToken', { path: '/' });
    }
  }

  return resolve(event);
};