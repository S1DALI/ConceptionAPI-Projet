


import { z } from 'zod';
import { UserSchema } from '$lib/schemas';
import type { PageServerLoad } from './$types';

const roleLabels = ['Étudiant', 'Délégué de classe', 'Professeur', 'Administrateur'];
const roleColors = [
  'bg-blue-100 text-blue-800',
  'bg-purple-100 text-purple-800',
  'bg-green-100 text-green-800',
  'bg-red-100 text-red-800'
];

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const usersRes = await fetch('/api/v1/users');
    if (!usersRes.ok) throw new Error('Erreur lors du chargement des utilisateurs');
    const raw = await usersRes.json();
    const users = z.array(UserSchema).parse(raw);
    return {
      users,
      roleLabels,
      roleColors
    };
  } catch (error) {
    throw error;
  }
};
