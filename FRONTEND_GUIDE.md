# Guide d'utilisation du Frontend

## 🎬 Démarrage rapide

### 1. Installer et lancer
```bash
cd app
npm install --force
npm run dev
```

Puis ouvrir `http://localhost:5173` dans votre navigateur.

## 🗂️ Architecture du Frontend

### Pages disponibles

#### 🏠 Accueil (`/`)
Page de bienvenue avec:
- Statistiques globales (compteurs)
- 4 cartes de navigation avec emoji
- État de l'API

#### 👥 Utilisateurs (`/users`)
- **Affichage**: Tableau avec colonnes (Nom, Email, Rôle)
- **Interaction**: Clique sur "Détails" pour voir plus d'infos
- **Rôles**: Student, Professor, Class Representative, Admin
- **Statistiques**: Compteur par rôle

#### 🎓 Diplômes (`/degrees`)
- **Affichage**: Liste extensible des diplômes
- **Interaction**: Clique sur un diplôme pour voir ses cours
- **Contenu**: Chaque diplôme montre ses cours associés
- **Statistiques**: Nombre de diplômes, total des cours, moyenne

#### 📚 Cours (`/courses`)
- **Affichage**: Grille de 3 colonnes (responsive)
- **Interaction**: Clique sur une carte pour voir détails
- **Détails**: Code, Crédits ECTS, Durée, Professeur
- **Statistiques**: Total des cours, diplômes couverts, crédits totaux

#### 🏫 Séances (`/classes`)
- **Affichage**: Liste des séances extensible
- **Interaction**: Clique pour voir détails et ressources
- **Ressources**: Lien vers la plateforme externe
- **Infos**: Horaire, Salle, Professeur, Documents

## 📊 Données fictives

Toutes les données sont dans `src/lib/mockData.ts`:

```typescript
mockUsers     // 5 utilisateurs
mockDegrees   // 3 diplômes
mockCourses   // 4 cours
mockClasses   // 4 séances
```

## 🔄 Passer aux données réelles

### Option 1: Créer un service API (recommandé)

Créer `src/lib/api.ts`:
```typescript
export async function getUsers() {
  const res = await fetch('/api/v1/users');
  return res.json();
}
```

### Option 2: Utiliser SvelteKit load()

Dans `src/routes/users/+page.ts`:
```typescript
export async function load() {
  const res = await fetch('/api/v1/users');
  const users = await res.json();
  return { users };
}
```

Dans `src/routes/users/+page.svelte`:
```svelte
<script>
  export let data;
  let users = $state(data.users);
</script>
```

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans les classes Tailwind:
- **Indigo**: Couleur principale (#6366f1)
- **Blue**: Pour utilisateurs
- **Green**: Pour cours
- **Purple**: Pour séances

### Ajouter un emoji
Simplement modifier l'emoji dans le HTML:
```svelte
<span>🎓</span>  <!-- Diplôme -->
<span>📚</span>  <!-- Cours -->
<span>👥</span>  <!-- Utilisateurs -->
```

### Ajouter une nouvelle page

1. Créer le dossier: `src/routes/new-page/`
2. Créer le fichier: `+page.svelte`
3. Ajouter le lien dans `Navigation.svelte`

Exemple:
```svelte
<a href="/new-page" class="text-white">Nouvelle Page</a>
```

## 🚀 Déploiement

### Build pour production
```bash
npm run build
```

### Prévisualiser le build
```bash
npm run preview
```

## 🐛 Débogage

### Vue dans le navigateur
- F12 pour ouvrir DevTools
- Console pour les erreurs
- Network pour voir les requêtes API

### Logs en console
```typescript
console.log('Debug:', users);
console.error('Erreur:', error);
```

## 📋 Checklist de transition vers l'API réelle

- [ ] API endpoints créés et testés
- [ ] Service API (`api.ts`) créé
- [ ] Remplacer `mockData` par appels API
- [ ] Ajouter gestion des erreurs (try/catch)
- [ ] Ajouter état de chargement (loading)
- [ ] Ajouter gestion JWT (si authentification)
- [ ] Tester toutes les pages
- [ ] Vérifier responsive sur mobile

## 📞 Endpoints attendus

```
GET    /api/v1/users              → List users
GET    /api/v1/users/:id          → Get user
GET    /api/v1/degrees            → List degrees
GET    /api/v1/degrees/:id        → Get degree
GET    /api/v1/degrees/:id/courses → Get courses by degree
GET    /api/v1/courses            → List courses
GET    /api/v1/courses/:id        → Get course
GET    /api/v1/classes            → List classes
GET    /api/v1/courses/:id/classes → Get classes by course
```

## 🎯 Prochaines améliorations

1. **Formulaires**: Créer des formulaires pour ajouter/modifier
2. **Recherche**: Barre de recherche globale
3. **Pagination**: Pour les grandes listes
4. **Filtres**: Filtrer par rôle, diplôme, etc.
5. **Tri**: Trier les colonnes
6. **Export**: Exporter en CSV/PDF
7. **Authentification**: Ajouter login/logout
8. **Notifications**: Toast/modal messages

---

**C'est prêt pour utiliser!** 🎉

