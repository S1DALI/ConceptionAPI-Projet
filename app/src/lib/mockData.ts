// Mock data for development purposes
export const mockUsers = [
  {
    id: 1,
    name: 'Alice Dupont',
    email: 'alice.dupont@example.com',
    role: 'student'
  },
  {
    id: 2,
    name: 'Bob Martin',
    email: 'bob.martin@example.com',
    role: 'student'
  },
  {
    id: 3,
    name: 'Dr. Marie Lefevre',
    email: 'marie.lefevre@example.com',
    role: 'professor'
  },
  {
    id: 4,
    name: 'Jean Admin',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: 5,
    name: 'Sophie Dubois',
    email: 'sophie.dubois@example.com',
    role: 'class_representative'
  }
];

export const mockDegrees = [
  {
    id: 1,
    name: 'Licence Informatique'
  },
  {
    id: 2,
    name: 'Master Génie Logiciel'
  },
  {
    id: 3,
    name: 'Diplôme Ingénieur Réseaux'
  }
];

export const mockCourses = [
  {
    id: 1,
    name: 'Algorithmes et Structures de Données',
    degreeId: 1,
    description: 'Fondamentaux des algorithmes'
  },
  {
    id: 2,
    name: 'Programmation Web',
    degreeId: 1,
    description: 'Développement front-end et back-end'
  },
  {
    id: 3,
    name: 'Architecture Logicielle',
    degreeId: 2,
    description: 'Design patterns et architecture'
  },
  {
    id: 4,
    name: 'Administration Réseaux',
    degreeId: 3,
    description: 'Gestion et configuration des réseaux'
  }
];

export const mockClasses = [
  {
    id: 1,
    name: 'Cours 1 - Introduction',
    courseId: 1,
    link: 'https://example.com/course/algo-1'
  },
  {
    id: 2,
    name: 'Cours 2 - Structures Avancées',
    courseId: 1,
    link: 'https://example.com/course/algo-2'
  },
  {
    id: 3,
    name: 'TP HTML/CSS',
    courseId: 2,
    link: 'https://example.com/course/web-1'
  },
  {
    id: 4,
    name: 'TP JavaScript',
    courseId: 2,
    link: 'https://example.com/course/web-2'
  }
];

