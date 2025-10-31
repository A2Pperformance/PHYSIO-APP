# 🏥 Physio App - Fiche Bilan Post-Chirurgie LCA

Application web professionnelle pour la création et la gestion de fiches bilan kinésithérapie pour les patients en post-opératoire de chirurgie du **Ligament Croisé Antérieur (LCA)**.

## 📋 Fonctionnalités

### ✨ Évaluation complète et structurée

- **Informations patient** : Données démographiques et coordonnées
- **Informations chirurgicales** : Type de ligamentoplastie, chirurgien, lésions associées
- **Évaluation de la douleur** : Échelles visuelles analogiques (EVA) pour repos, mouvement et nuit
- **Bilan articulaire** : Amplitudes actives/passives en flexion et extension
- **Bilan musculaire** : Testing musculaire (échelle 0-5) avec calcul automatique de l'amyotrophie
- **Tests fonctionnels** : Marche, escaliers, appui unipodal, accroupissement
- **Proprioception** : Tests d'équilibre et de contrôle neuromusculaire
- **Scores standardisés** : IKDC, Lysholm, KOOS, ACL-RSI
- **Objectifs de traitement** : Court, moyen et long terme
- **Plan de traitement** : Techniques manuelles, exercices, conseils patient

### 🎯 Fonctionnalités avancées

- ✅ **Calculs automatiques** : Jours post-op, âge, amyotrophie
- ✅ **Validation en temps réel** : Formulaire avec validation complète
- ✅ **Indicateurs visuels** : Codes couleur pour les scores et mesures
- ✅ **Suggestions intelligentes** : Exercices et techniques pré-définis
- ✅ **Export PDF** : Impression optimisée pour archivage
- ✅ **Interface responsive** : Compatible desktop, tablette et mobile
- ✅ **Design professionnel** : Interface épurée avec Tailwind CSS

## 🚀 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Étapes d'installation

```bash
# Cloner le repository
git clone <votre-repo>
cd PHYSIO-APP

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 🛠️ Technologies utilisées

- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Vite** : Build tool ultra-rapide
- **Tailwind CSS** : Framework CSS utility-first
- **React Hook Form** : Gestion des formulaires
- **Zod** : Validation de schémas
- **date-fns** : Manipulation des dates

## 📖 Structure du projet

```
PHYSIO-APP/
├── src/
│   ├── components/
│   │   ├── sections/          # Sections du formulaire
│   │   │   ├── PatientInfoSection.tsx
│   │   │   ├── ChirurgieInfoSection.tsx
│   │   │   ├── DouleurGonflementSection.tsx
│   │   │   ├── BilanArticulaireSection.tsx
│   │   │   ├── BilanMusculaireSection.tsx
│   │   │   ├── TestsFonctionnelsSection.tsx
│   │   │   ├── ProprioceptionSection.tsx
│   │   │   ├── ScoresSection.tsx
│   │   │   ├── ObjectifsSection.tsx
│   │   │   └── PlanTraitementSection.tsx
│   │   ├── FormInput.tsx      # Composants de formulaire réutilisables
│   │   ├── FormSelect.tsx
│   │   ├── FormTextarea.tsx
│   │   ├── PainScale.tsx
│   │   └── LCAAssessmentForm.tsx
│   ├── types/
│   │   └── lca-assessment.ts  # Types TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 📊 Sections de la fiche bilan

### 1. Informations Patient
- Identité complète (nom, prénom, date de naissance)
- Âge (calculé automatiquement)
- Coordonnées (téléphone, email)

### 2. Informations Chirurgicales
- Date de chirurgie
- Type de ligamentoplastie (DT4, DIDT, Kenneth-Jones)
- Chirurgien
- Genou opéré
- Lésions associées
- Complications post-opératoires

### 3. Douleur et Gonflement
- Échelles de douleur (0-10) : repos, mouvement, nocturne
- Localisation de la douleur
- Niveau de gonflement
- Épanchement et signes inflammatoires

### 4. Bilan Articulaire
- Flexion active et passive (en degrés)
- Extension active et passive (en degrés)
- Qualité de fin de course
- Mobilité rotulienne

### 5. Bilan Musculaire
- Testing musculaire (0-5) : quadriceps, ischio-jambiers, triceps sural, moyen fessier
- Qualité de contraction du quadriceps
- Mesures périmètriques (amyotrophie calculée automatiquement)

### 6. Tests Fonctionnels
- Marche (qualité, périmètre, aides techniques)
- Escaliers (montée/descente)
- Assis-debout
- Appui unipodal
- Accroupissement

### 7. Proprioception
- Équilibre unipodal (yeux ouverts/fermés)
- Contrôle neuromusculaire
- Qualité de réception

### 8. Scores d'Évaluation
- IKDC Subjectif (0-100)
- Lysholm (0-100)
- KOOS (5 sous-sections)
- ACL-RSI (0-100)

### 9. Objectifs de Traitement
- Court terme (0-6 semaines)
- Moyen terme (6 semaines - 3 mois)
- Long terme (3-9 mois)
- Fréquence des séances

### 10. Plan de Traitement
- Techniques manuelles
- Exercices de renforcement
- Exercices de proprioception
- Exercices de mobilité
- Conseils au patient
- Critères de progression

### 11. Observations Cliniques
- Notes cliniques
- Précautions et contre-indications
- Informations du kinésithérapeute
- Date du prochain bilan

## 🎨 Personnalisation

### Couleurs
Les couleurs peuvent être personnalisées dans `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Vos couleurs personnalisées
      }
    }
  }
}
```

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte automatiquement:
- 📱 Mobile : Layout en colonne unique
- 💻 Tablet : Layout en 2 colonnes
- 🖥️ Desktop : Layout en 3 colonnes pour les grilles

## 🖨️ Impression / Export PDF

La fiche bilan peut être imprimée ou exportée en PDF:
1. Cliquez sur "Imprimer / Exporter PDF"
2. Utilisez "Enregistrer au format PDF" dans les options d'impression
3. Les boutons et éléments non imprimables sont automatiquement masqués

## 🔒 Sécurité et Confidentialité

⚠️ **Important**: Cette application stocke actuellement les données localement dans le navigateur. Pour une utilisation en production avec des données patients réelles:

- Implémenter une authentification sécurisée
- Utiliser une base de données conforme RGPD
- Chiffrer les données sensibles
- Mettre en place des sauvegardes régulières
- Respecter les normes de confidentialité médicale

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à:
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Soumettre des pull requests

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 👨‍⚕️ Usage Professionnel

Cette application a été conçue par un kinésithérapeute expert en rééducation post-chirurgie LCA. Elle suit les recommandations et protocoles internationaux pour la rééducation du LCA.

### Phases de rééducation couvertes:

- **Phase 1 (0-6 sem)** : Protection, contrôle inflammation, récupération ROM
- **Phase 2 (6-12 sem)** : Renforcement progressif, proprioception
- **Phase 3 (3-6 mois)** : Renforcement intensif, début running
- **Phase 4 (6-9 mois)** : Retour sport progressif
- **Phase 5 (9-12 mois)** : Retour sport compétition

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Développé avec ❤️ pour les professionnels de la kinésithérapie**
