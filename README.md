# Physio App - Application SaaS pour Kinésithérapeutes

Application SaaS complète permettant aux kinésithérapeutes de rédiger des bilans standardisés, fixer des objectifs de rééducation et générer des PDF professionnels.

## 🎯 Fonctionnalités principales

- **Gestion des patients**: Dossiers patients complets avec historique
- **Bilans standardisés**: Wizard en 5 étapes pour créer des bilans professionnels
- **Bibliothèque de tests**: Tests validés par zone anatomique (genou, épaule, cheville, rachis, hanche)
- **Score A2P**: Calcul automatique du score global (Force 40% + Mobilité 25% + Fonctionnel 25% + Douleur 10%)
- **Objectifs SMART**: Fixation et suivi d'objectifs de rééducation
- **Génération PDF**: Export professionnel avec logo cabinet et signature
- **Multi-utilisateurs**: Gestion de cabinet avec rôles (admin, praticien, assistant)
- **Abonnements Stripe**: Plans Start (29€), Pro (59€), Cabinet (129€)

## 🏗️ Architecture technique

### Stack

- **Frontend**: Next.js 15 (App Router), React Server Components, TypeScript
- **UI**: TailwindCSS, shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Backend**: Next.js API Routes + Supabase
- **Database**: PostgreSQL (Supabase) avec Row Level Security
- **Auth**: Supabase Auth (email/password, magic link)
- **Paiement**: Stripe (abonnements récurrents)
- **PDF**: @react-pdf/renderer (côté serveur)
- **Graphiques**: Chart.js (react-chartjs-2)
- **Tests**: Vitest + Testing Library + Playwright
- **CI/CD**: Husky, lint-staged, ESLint, Prettier

### Contraintes de sécurité

- **RLS (Row Level Security)**: Toutes les données sont scopées par `cabinet_id`
- **RBAC**: 3 rôles (admin, praticien, assistant) avec permissions différenciées
- **Isolation**: Un praticien ne voit que ses propres données
- **RGPD**: Prêt pour conformité (logs de partage, consentements)
- **HDS**: Architecture prête pour migration vers OVHcloud Santé

## 📁 Structure du projet

```
physio-app/
├── .husky/                    # Git hooks
├── app/
│   ├── (public)/             # Pages publiques (landing, pricing)
│   │   ├── page.tsx
│   │   └── pricing/
│   ├── auth/                 # Authentication pages
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── callback/
│   ├── dashboard/            # Dashboard principal
│   ├── patients/             # Gestion des patients
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   └── new/
│   ├── bilans/               # Gestion des bilans
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   └── new/              # Wizard 5 étapes
│   ├── goals/                # Objectifs de rééducation
│   ├── library/              # Bibliothèque (admin only)
│   │   ├── tests/
│   │   └── templates/
│   ├── settings/             # Paramètres cabinet
│   ├── billing/              # Gestion abonnement Stripe
│   ├── api/                  # API Routes
│   │   ├── bilans/
│   │   │   ├── [id]/
│   │   │   │   ├── recompute-a2p/
│   │   │   │   ├── flags/
│   │   │   │   ├── summary/
│   │   │   │   └── suggest-goals/
│   │   ├── pdf/
│   │   │   └── bilan/[id]/
│   │   └── stripe/
│   │       └── webhook/
│   ├── layout.tsx
│   └── globals.css
├── components/               # Composants réutilisables
│   ├── ui/                  # shadcn/ui components
│   ├── patients/
│   ├── bilans/
│   ├── goals/
│   ├── library/
│   └── shared/
├── lib/                      # Utilitaires
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── stripe/
│   ├── pdf/
│   ├── calculations/         # Calculs A2P, flags, etc.
│   └── utils.ts
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql
├── tests/
│   ├── unit/
│   └── e2e/
├── public/
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 Installation et configuration

### Prérequis

- Node.js 18+ et pnpm
- Compte Supabase (gratuit)
- Compte Stripe (mode test)
- Git

### 1. Clone du repository

```bash
git clone https://github.com/votre-org/physio-app.git
cd physio-app
pnpm install
```

### 2. Configuration Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Récupérer les clés API (Settings > API)
3. Créer un bucket Storage `pdf-exports` (public)
4. Exécuter les migrations SQL:

```bash
# Via Supabase CLI
supabase db push

# Ou manuellement dans l'éditeur SQL Supabase
# Copier le contenu de supabase/migrations/001_initial_schema.sql
```

5. Insérer les données de seed:

```bash
pnpm run seed
# Ou exécuter manuellement supabase/seed.sql
```

### 3. Configuration Stripe

1. Créer un compte sur [stripe.com](https://stripe.com)
2. Créer 3 produits récurrents:
   - **START**: 29€/mois
   - **PRO**: 59€/mois
   - **CABINET**: 129€/mois
3. Récupérer les clés API (test mode)
4. Configurer le webhook endpoint: `https://votre-domaine.vercel.app/api/stripe/webhook`
   - Événements à écouter: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`

### 4. Variables d'environnement

Copier `.env.example` vers `.env.local` et remplir:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID_START=price_xxx
STRIPE_PRICE_ID_PRO=price_xxx
STRIPE_PRICE_ID_CABINET=price_xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
PDF_STORAGE_BUCKET=pdf-exports

# Optional (pour migration HDS)
OVH_CLOUD_SANTÉ_ENDPOINT=
```

### 5. Lancement en local

```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📊 Modèle de données

### Tables principales

- **users**: Utilisateurs avec rôles (admin/praticien/assistant)
- **cabinets**: Cabinets de kinésithérapie
- **patients**: Dossiers patients
- **bilans**: Bilans de rééducation
- **bilan_tests**: Résultats de tests individuels
- **goals**: Objectifs de rééducation
- **library_tests**: Bibliothèque de tests standardisés
- **library_bilan_templates**: Templates de bilans prédéfinis
- **shares**: Logs de partage de documents

### Politiques RLS (Row Level Security)

Toutes les tables sont protégées par RLS:
- Scoping par `cabinet_id`: un utilisateur ne voit que les données de son cabinet
- Scoping par `owner_user_id`: un praticien ne voit que ses propres patients/bilans
- Les admins voient tout leur cabinet
- Les assistants ont accès en lecture seule

## 🧮 Calcul du Score A2P

Le score A2P (Assessment to Performance) est calculé automatiquement:

```typescript
Score A2P = (Force × 40%) + (Mobilité × 25%) + (Fonctionnel × 25%) + (Douleur × 10%)
```

Avec:
- **Force**: Tests isométriques, dynamométriques (normalisés 0-100)
- **Mobilité**: Amplitudes articulaires en degrés (normalisés)
- **Fonctionnel**: Tests fonctionnels (sauts, équilibre, etc.)
- **Douleur**: VAS inversé (0 = 100, 10 = 0)

Le score final est normalisé sur 100.

## 🔐 Sécurité et conformité

### RGPD

- Logs de partage (table `shares`)
- Consentement patient (à implémenter)
- Export des données personnelles (à implémenter)
- Droit à l'oubli (soft delete)

### HDS (Hébergement Données de Santé)

**État actuel**: Hébergé sur Vercel + Supabase (AWS) - **NON certifié HDS**

**Plan de migration**:
1. Migration base de données vers **OVHcloud PostgreSQL HDS**
2. Migration stockage fichiers vers **OVHcloud Object Storage HDS**
3. Déploiement app vers **OVHcloud Web Cloud HDS** ou serveur auto-hébergé
4. Mise en place chiffrement bout en bout
5. Audit de sécurité et certification

**Timeline estimée**: 3-6 mois pour conformité complète

## 🧪 Tests

### Tests unitaires (Vitest)

```bash
pnpm test
```

Couvre:
- Calculs A2P
- Détection flags hors-norme
- Génération résumés automatiques
- Utilitaires de normalisation

### Tests E2E (Playwright)

```bash
pnpm test:e2e
```

Scénarios:
- Création patient → bilan → export PDF
- RBAC: assistant ne peut pas finaliser un bilan
- Workflow abonnement Stripe

## 📦 Déploiement

### Vercel (Préprod/Prod)

1. Connecter le repo GitHub à Vercel
2. Configurer les variables d'environnement
3. Deploy automatique sur push `main`

```bash
# Via CLI
vercel --prod
```

### Variables d'environnement Vercel

Ajouter toutes les variables de `.env.local` dans les settings Vercel.

### Webhooks Stripe en production

Mettre à jour l'endpoint webhook Stripe avec l'URL de production:
```
https://votre-app.vercel.app/api/stripe/webhook
```

## 🛠️ Scripts disponibles

```bash
pnpm dev              # Lancement dev (localhost:3000)
pnpm build            # Build production
pnpm start            # Lancement prod
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm typecheck        # TypeScript check
pnpm test             # Tests unitaires
pnpm test:e2e         # Tests E2E
pnpm db:push          # Push migrations Supabase
pnpm seed             # Seed données de test
```

## 👥 Gestion des rôles (RBAC)

| Fonctionnalité | Admin | Praticien | Assistant |
|---|---|---|---|
| Créer patient | ✅ | ✅ | ✅ |
| Créer bilan (brouillon) | ✅ | ✅ | ✅ |
| Finaliser bilan | ✅ | ✅ | ❌ |
| Exporter PDF | ✅ | ✅ | ❌ |
| Gérer objectifs | ✅ | ✅ | ✅ |
| Accès bibliothèque | ✅ | ✅ | ✅ (lecture) |
| CRUD bibliothèque | ✅ (plan Cabinet) | ❌ | ❌ |
| Gérer utilisateurs | ✅ | ❌ | ❌ |
| Gérer facturation | ✅ | ❌ | ❌ |

## 💳 Plans tarifaires

| Plan | Prix | Utilisateurs | Fonctionnalités |
|---|---|---|---|
| **START** | 29€/mois | 1 | Patients illimités, bilans basiques, objectifs, export PDF |
| **PRO** | 59€/mois | 1 | START + comparaisons auto, suggestions objectifs, partage sécurisé |
| **CABINET** | 129€/mois | 3 | PRO + multi-utilisateurs, bibliothèque partagée, stats cabinet |

## 🐛 Dépannage

### Erreur "Invalid JWT" Supabase

Vérifier que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont corrects.

### Webhook Stripe non reçu

1. Vérifier le `STRIPE_WEBHOOK_SECRET`
2. Tester avec Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### PDF ne se génère pas

Vérifier que le bucket `pdf-exports` existe dans Supabase Storage et est configuré en public.

## 🗺️ Roadmap

- [x] **V1.0 (MVP)**: Gestion bilans + objectifs + PDF
- [ ] **V1.1**: Notifications email (rappels objectifs)
- [ ] **V1.2**: Comparaison bilans (évolution patient)
- [ ] **V1.3**: Application mobile (React Native)
- [ ] **V2.0**: Migration HDS complète
- [ ] **V2.1**: API REST publique pour intégrations
- [ ] **V3.0**: IA pour suggestions diagnostics

## 📄 Licence

Propriétaire - Tous droits réservés

## 🤝 Support

- Email: support@physio-app.fr
- Documentation: https://docs.physio-app.fr
- Status: https://status.physio-app.fr

---

**Développé avec ❤️ pour les kinésithérapeutes**
