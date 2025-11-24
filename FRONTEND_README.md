# MyClasses Frontend

## 🎯 Vue d'ensemble

Un front-end simple et fonctionnel pour la plateforme MyClasses, développé en **Svelte** avec **SvelteKit** et **Tailwind CSS**.

## 📁 Structure du projet

```
app/src/
├── routes/
│   ├── +layout.svelte          # Layout principal avec navigation
│   ├── +page.svelte            # Page d'accueil
│   ├── users/
│   │   └── +page.svelte        # Liste des utilisateurs
│   ├── degrees/
│   │   └── +page.svelte        # Liste des diplômes
│   ├── courses/
│   │   └── +page.svelte        # Catalogue des cours
│   └── classes/
│       └── +page.svelte        # Séances de classe
├── lib/
│   ├── mockData.ts             # Données fictives pour le développement
│   ├── Navigation.svelte       # Composant de navigation
│   ├── index.ts                # Fichier d'exportation
│   └── db.ts                   # (Connexion base de données future)
└── app.css                     # Styles globaux
```

## 🚀 Fonctionnalités implémentées

### 1. **Page d'accueil** (`/`)
- Statistiques globales du système
- Cartes de navigation vers les différentes sections
- Design moderne et réactif
- État de l'API (données fictives activées)

### 2. **Gestion des Utilisateurs** (`/users`)
- Tableau des utilisateurs avec filtrage par rôle
- Détails des utilisateurs (clic sur "Détails")
- Statistiques des utilisateurs par rôle
- Rôles supportés: Étudiant, Professeur, Délégué de classe, Admin

### 3. **Diplômes et Parcours** (`/degrees`)
- Liste extensible des diplômes
- Affichage des cours par diplôme
- Informations détaillées des cours
- Statistiques par diplôme

### 4. **Catalogue des Cours** (`/courses`)
- Grille de cours avec descriptions
- Détails détaillés par cours (code, crédits, durée)
- Lien vers les diplômes
- Statistiques globales

### 5. **Séances de Classe** (`/classes`)
- Liste des séances organisée par cours
- Accès aux ressources (lien externe)
- Informations supplémentaires
- Capacité et détails logistiques

### 6. **Navigation** (Barre persistante)
- Lien vers l'accueil
- Liens vers toutes les sections principales
- Indicateur de la page active
- Design responsive

## 🎨 Design

- **Framework CSS**: Tailwind CSS v4.1
- **Thème**: Dégradés bleus et indigo
- **Emojis**: Icônes visuelles pour une meilleure UX
- **Responsive**: Design mobile-first

## 📊 Données mockées

Les données sont stockées dans `/src/lib/mockData.ts` et incluent:

- **5 utilisateurs** avec différents rôles
- **3 diplômes** (Licence, Master, Diplôme Ingénieur)
- **4 cours** répartis entre les diplômes
- **4 séances de classe** avec liens de ressources

## 🛠️ Configuration

### Installation

```bash
cd app
npm install --force  # (force nécessaire pour compatibilité Node 22.9.0)
```

### Lancer le serveur de développement

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:5173`

### Build pour la production

```bash
npm run build
npm run preview
```

## 🔄 Intégration API

Quand les endpoints seront prêts, il suffira de:

1. Remplacer les imports `mockData.ts` par des appels `fetch()` 
2. Créer un service API dans `lib/api.ts`
3. Utiliser SvelteKit `load()` functions pour pré-charger les données

Exemple:
```typescript
// src/routes/users/+page.ts
export async function load({ fetch }) {
  const response = await fetch('/api/v1/users');
  const users = await response.json();
  return { users };
}
```

## 📚 Technologies utilisées

- **Svelte 5**: Framework réactif
- **SvelteKit**: Framework full-stack
- **Tailwind CSS 4**: Utility-first CSS
- **TypeScript**: Typage statique
- **Vite**: Build tool ultra-rapide

## ✅ Prochaines étapes

- [ ] Connecter les endpoints API réels
- [ ] Ajouter authentification JWT
- [ ] Créer des formulaires de création/modification
- [ ] Ajouter pagination
- [ ] Implémenter la recherche et filtrage
- [ ] Gérer les erreurs et états de chargement
- [ ] Tests unitaires et e2e

## 📝 Notes

- Les données affichées sont fictives et pour le développement uniquement
- Le design est responsive et fonctionne sur mobile et desktop
- La navigation est facile et intuitive
- Le code est modulaire et facile à étendre

---

**Bon courrage!** 🚀

