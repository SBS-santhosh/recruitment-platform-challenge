# Plateforme de Recrutement

Application Next.js de gestion de candidatures avec Redux Toolkit, Ant Design et i18n (EN/FR).

## Configuration

Créez un fichier `.env.local` à la racine du projet pour définir les identifiants de connexion de manière sécurisée :

```
NEXT_PUBLIC_LOGIN_USERNAME=monUtilisateur
NEXT_PUBLIC_LOGIN_PASSWORD=monMotDePasse
```

> Sans ces variables, l'application utilisera les valeurs de secours `admin` / `password`.

## 🚀 Démarrage Rapide

```bash
# Installation
npm install

# Installation les pakages 
npm install antd
npm install @reduxjs/toolkit
npm install react-redux

# Développement
npm run dev          # http://localhost:3000

# Production
npm run build && npm start

# Linting
npm run lint
```

##  Technologies

- **Next.js 14.2.33** (App Router)
- **React 18** + **Redux Toolkit 2.10.1**
- **Ant Design 5.29.1** (UI)
- **localStorage** (persistance)

##  Structure

```
app/
├── candidate/page.jsx    # Formulaire candidature
├── login/page.jsx         # Authentification
├── recruiter/page.jsx     # Dashboard recruteur
└── layout.js              # Layout + StoreProvider

store/
├── store.js              # Redux store
├── candidateSlice.js     # Actions/reducers
└── StoreProvider.js      # Provider

hooks/
└── useTranslations.js    # i18n hook (EN/FR)
```

##  Utilisation

### Candidats
- Route: `/candidate`
- Formulaire: Nom, Prénom, Email, Grade, Ville, Téléphone, CV (PDF/DOC/DOCX, max 5MB)
- Validation automatique + confirmation

### Recruteurs
- Route: `/login` → Credentials définis via `.env.local`
- Actions: Accepter, Rejeter, Voir détails
- Pagination: 5 candidats/page
- Statuts: `pending` → `accepted`

##  Architecture Technique

### Redux Store
```javascript
// Actions disponibles
addCandidate(candidate)      // Ajoute avec id, createdAt, status: 'pending'
acceptCandidate(id)          // Status → 'accepted'
rejectCandidate(id)          // Supprime de la liste
updateCandidate(candidate)   // Met à jour
clearCandidates()            // Vide la liste

// Selectors
selectCandidates()           // Tous les candidats
selectPendingCandidates()    // Candidats en attente
selectAcceptedCandidates()  // Candidats acceptés
```

### Modèle Candidat
```javascript
{
  id: string,                    // Date.now().toString()
  name: string,
  lastname: string,
  email: string,                  // Validé
  grade: string,
  city: string,
  number: string,
  cv: {
    name: string,
    url: string,                  // URL.createObjectURL()
    size: number,
    type: string
  },
  status: 'pending' | 'accepted',
  createdAt: string               // ISO date
}
```

### Persistance
- **localStorage**: Clé `candidatesState`
- Sauvegarde automatique après chaque action
- Chargement au démarrage (SSR-safe avec `typeof window`)

### i18n
- Hook: `useTranslations()`
- Langues: EN, FR
- Basculement: `changeLanguage('en'|'fr')`
- Traductions: `hooks/useTranslations.js`

##  Développement

### Ajouter une action Redux
```javascript
// store/candidateSlice.js
reducers: {
  newAction: (state, action) => {
    // Logique
    if (typeof window !== 'undefined') {
      localStorage.setItem('candidatesState', JSON.stringify(state));
    }
  }
}
```

### Ajouter une traduction
```javascript
// hooks/useTranslations.js
translations: {
  en: { newKey: "Text" },
  fr: { newKey: "Texte" }
}
```

##  Déploiement

### Vercel
```bash
npm i -g vercel && vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

##  Dépannage

```bash
# Module not found
rm -rf node_modules package-lock.json && npm install

# Port occupé
PORT=3001 npm run dev

# Build error
rm -rf .next && npm run build
```

##  Notes Production

- **Auth**: Remplacer credentials en dur par système sécurisé
- **DB**: Remplacer localStorage par base de données
- **Storage**: Utiliser S3/Cloudinary pour les CV au lieu de `URL.createObjectURL`

##  Diagrammes UML

Voir `docs/UML_DIAGRAMS.md` pour les diagrammes complets.

---

**Version**: 0.1.0 | **Node**: 18+ | **Port**: 3000
