# 🏥 A2P Performance - Assistant IA Kinésithérapique

Application **web et desktop** professionnelle avec **Assistant IA intégré** pour la création et la gestion de bilans kinésithérapiques pour les patients en post-opératoire de chirurgie du **Ligament Croisé Antérieur (LCA)**.

> 🤖 **Nouveau !** Assistant IA avec génération automatique de bilans HTML professionnels, calculs intelligents et recommandations cliniques.

---

## 🚀 Démarrage Rapide

**Première utilisation ?**
- 📖 [Guide de démarrage rapide (5 min)](./DEMARRAGE_RAPIDE.md)
- 📚 [Guide d'utilisation complet](./GUIDE_UTILISATION.md)

## 💻 Deux versions disponibles

### 🌐 Version Web (Navigateur)
- Fonctionne dans Chrome, Firefox, Edge, Safari
- Pas d'installation requise
- Idéal pour tests et développement

### 🖥️ Version Desktop (Application Windows/Mac/Linux)
- **Application native** installable sur votre PC
- **Fichier .exe pour Windows** inclus
- Meilleure performance et intégration système
- Fonctionne hors ligne
- Raccourcis clavier (Ctrl+S, Ctrl+P, etc.)
- Menu natif Windows

> 📘 **Pour créer l'application Windows (.exe)**, consultez le guide complet : [INSTALLATION-WINDOWS.md](./INSTALLATION-WINDOWS.md)

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

### 🤖 Assistant IA Intégré (NOUVEAU !)

- 🎨 **Charte graphique A2P** : Branding professionnel cohérent
- 📊 **Calculs automatiques avancés** :
  - Score de récupération global (0-100)
  - Score ROM (Range of Motion)
  - Asymétries musculaires et déficits
  - Amyotrophie automatique
  - Moyenne de douleur (EVA)
  - Phase de rééducation automatique
- 🏆 **Badges intelligents** : Excellence, Bonne évolution, Attention, Alerte
- 🩺 **Stroke Test intégré** : Évaluation de l'effusion avec recommandations
- 💡 **Recommandations IA** : Conseils cliniques basés sur les données
- 📄 **Génération HTML** : Bilans professionnels exportables
- 💾 **Sauvegarde locale** : localStorage avec historique complet
- 📱 **Panneau flottant** : Interface interactive 3 onglets (Aperçu/Export/Historique)

### 🎯 Fonctionnalités de base

- ✅ **Calculs automatiques** : Jours post-op, âge, amyotrophie
- ✅ **Validation en temps réel** : Formulaire avec validation complète
- ✅ **Indicateurs visuels** : Codes couleur pour les scores et mesures
- ✅ **Suggestions intelligentes** : Exercices et techniques pré-définis
- ✅ **Export HTML/PDF** : Bilans professionnels avec charte A2P
- ✅ **Interface responsive** : Compatible desktop, tablette et mobile
- ✅ **Design professionnel** : Interface moderne avec Tailwind CSS

## 🚀 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Option 1 : Version Web (Développement/Test)

```bash
# Cloner le repository
git clone <votre-repo>
cd PHYSIO-APP

# Installer les dépendances
npm install

# Lancer l'application en mode développement (navigateur)
npm run dev

# Construire pour la production web
npm run build

# Prévisualiser la version de production
npm run preview
```

### Option 2 : Application de Bureau (.exe Windows)

```bash
# Installer les dépendances (si pas déjà fait)
npm install

# Lancer en mode développement Electron
npm run electron:dev

# Créer le fichier .exe pour Windows
npm run electron:build:win
```

Le fichier `.exe` sera généré dans le dossier `release/`.

> 📘 **Guide complet** avec captures d'écran : [INSTALLATION-WINDOWS.md](./INSTALLATION-WINDOWS.md)

### Option 3 : Autres plateformes

```bash
# macOS (.dmg)
npm run electron:build:mac

# Linux (.AppImage)
npm run electron:build:linux
```

## 🛠️ Technologies utilisées

### Frontend
- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Vite** : Build tool ultra-rapide
- **Tailwind CSS** : Framework CSS utility-first
- **React Hook Form** : Gestion des formulaires
- **Zod** : Validation de schémas
- **date-fns** : Manipulation des dates

### Desktop (Application native)
- **Electron** : Framework pour applications desktop cross-platform
- **electron-builder** : Packaging et distribution
- **Menu natif** : Intégration système Windows/Mac/Linux

## 📖 Structure du projet

```
PHYSIO-APP/
├── src/
│   ├── components/
│   │   ├── AIAssistant.tsx         # 🤖 Assistant IA flottant
│   │   ├── StrokeTest.tsx          # 🩺 Stroke Test interactif
│   │   ├── sections/               # Sections du formulaire
│   │   │   ├── PatientInfoSection.tsx
│   │   │   ├── ChirurgieInfoSection.tsx
│   │   │   ├── DouleurGonflementSection.tsx  # ✨ + Stroke Test
│   │   │   ├── BilanArticulaireSection.tsx
│   │   │   ├── BilanMusculaireSection.tsx
│   │   │   ├── TestsFonctionnelsSection.tsx
│   │   │   ├── ProprioceptionSection.tsx
│   │   │   ├── ScoresSection.tsx
│   │   │   ├── ObjectifsSection.tsx
│   │   │   └── PlanTraitementSection.tsx
│   │   ├── FormInput.tsx           # Composants formulaire
│   │   ├── FormSelect.tsx
│   │   ├── FormTextarea.tsx
│   │   ├── PainScale.tsx
│   │   └── LCAAssessmentForm.tsx
│   ├── services/
│   │   └── localStorage.ts         # 💾 Service de persistance
│   ├── theme/
│   │   └── a2p-theme.ts            # 🎨 Charte graphique A2P
│   ├── utils/
│   │   ├── calculations.ts         # 🧮 Calculs automatiques
│   │   └── bilanGenerator.ts       # 📄 Générateur HTML
│   ├── types/
│   │   └── lca-assessment.ts       # Types TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── GUIDE_UTILISATION.md            # 📖 Guide complet
├── DEMARRAGE_RAPIDE.md             # 🚀 Démarrage 5 min
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
- **🩺 Stroke Test** : Évaluation de l'effusion (Trace/Petit/Modéré/Large)
  - Instructions visuelles interactives
  - Classification automatique avec volume
  - Recommandations cliniques adaptées
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

## 🖨️ Export et Impression

### 📄 Export HTML (Nouveau !)
1. Cliquez sur l'icône 💡 de l'assistant IA
2. Onglet "Export" → Bouton "Export HTML"
3. Téléchargement automatique : `Bilan_NOM_Prenom_Date.html`
4. Document professionnel avec :
   - ✅ Charte graphique A2P complète
   - ✅ Tous les calculs et badges
   - ✅ Score de récupération global
   - ✅ Prêt à partager/imprimer

### 🖨️ Impression
1. Assistant IA → Onglet "Export" → Bouton "Imprimer"
2. Ou utilisez Ctrl+P
3. Format A4 optimisé
4. Éléments non imprimables masqués automatiquement

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

## 📚 Documentation

- 🚀 [Démarrage rapide (5 min)](./DEMARRAGE_RAPIDE.md)
- 📖 [Guide d'utilisation complet](./GUIDE_UTILISATION.md)
- 🖥️ [Installation Windows (.exe)](./INSTALLATION-WINDOWS.md)

## 📊 Captures d'Écran

### Interface Principale
*Formulaire complet avec sections structurées*

### Assistant IA
*Panneau flottant avec score de récupération et recommandations*

### Stroke Test
*Évaluation interactive de l'effusion avec technique détaillée*

### Bilan HTML Exporté
*Document professionnel avec charte graphique A2P*

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Développé avec ❤️ pour A2P Performance**
*Excellence en Kinésithérapie du Sport*
