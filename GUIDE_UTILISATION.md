# 📖 Guide d'Utilisation - Assistant IA Kinésithérapique A2P

## 🚀 Démarrage de l'Application

### Option 1 : Version Web (Développement)
```bash
cd /home/user/PHYSIO-APP
npm run dev
```
➡️ Ouvrez votre navigateur à l'adresse : **http://localhost:5173**

### Option 2 : Version Web (Production)
```bash
npm run build
npm run preview
```
➡️ Ouvrez votre navigateur à l'adresse : **http://localhost:4173**

### Option 3 : Application Desktop (Windows .exe)
```bash
npm run electron:build:win
```
➡️ Le fichier `.exe` sera dans le dossier `release/`

---

## 📋 Guide Pas à Pas

### **Étape 1 : Informations Patient**

1. Remplissez les informations du patient :
   - **Nom** et **Prénom**
   - **Date de naissance** (l'âge se calcule automatiquement)
   - **Sexe** (M/F/Autre)
   - **Téléphone** et **Email** (optionnel)

2. Sélectionnez la **date d'évaluation** (aujourd'hui par défaut)

---

### **Étape 2 : Informations Chirurgicales**

1. **Date de chirurgie** : La sélectionner dans le calendrier
   - ✨ Le système calcule automatiquement :
     - Les **jours post-opératoires**
     - La **phase de rééducation** (Phase 1 à 5)

2. **Type de ligamentoplastie** :
   - DT4 (Droit interne Tendineux 4 faisceaux)
   - DIDT (Droit Interne + Demi-Tendineux)
   - Kenneth-Jones
   - Autre (à préciser)

3. **Genou opéré** : Gauche ou Droit

4. **Chirurgien** : Nom du chirurgien

5. **Lésions associées** (optionnel) :
   - Ménisque médial
   - Ménisque latéral
   - Lésion cartilagineuse
   - Autre

6. **Complications post-opératoires** (optionnel)

---

### **Étape 3 : Douleur et Gonflement**

#### 🎚️ Échelles de Douleur (EVA 0-10)
Cliquez sur les boutons pour noter :
- **Douleur au repos**
- **Douleur au mouvement**
- **Douleur nocturne**
- **Gonflement du genou**

✨ **Calcul automatique** : La moyenne de douleur est calculée en temps réel

#### 📍 Localisation de la Douleur
Cochez toutes les zones concernées :
- Face antérieure
- Face médiale
- Face latérale
- Face postérieure
- Pli du genou
- Rotule
- Cicatrice

#### 🩺 **STROKE TEST** (Nouveau !)

1. Cliquez sur **"Comment faire ?"** pour voir la technique :

   ```
   📌 Technique du Stroke Test :
   1. Patient en décubitus dorsal, genou en extension
   2. Vidange : 2-3 mouvements ascendants face médiale
   3. Test : Pression descendante face latérale
   4. Observation : Retour du liquide face médiale
   ```

2. Sélectionnez le résultat observé :
   - **Trace** : Onde après plusieurs caresses (< 10ml)
   - **Petit** : Onde immédiate (10-30ml)
   - **Modéré** : Bombement latéral sans onde (30-60ml)
   - **Large** : Pas de mouvement possible (> 60ml)

3. 💡 Le système affiche automatiquement :
   - La **classification** de l'effusion
   - Des **recommandations cliniques** adaptées

#### ✅ Signes Inflammatoires
Cochez si présent : Chaleur / Rougeur

---

### **Étape 4 : Bilan Articulaire**

Mesurez et entrez les amplitudes articulaires :

#### Flexion
- **Active** (en degrés, ex: 120°)
- **Passive** (en degrés, ex: 130°)
- **Qualité de fin de course** : Souple / Ferme / Dure / Vide

#### Extension
- **Active** (0 = normal, valeur positive = flexum)
- **Passive**
- **Qualité de fin de course**

#### Mobilité Rotulienne
- Normale / Diminuée / Adhérences

✨ **Calcul automatique** : Le **Score ROM (0-100)** est calculé automatiquement !

---

### **Étape 5 : Bilan Musculaire**

#### Testing Musculaire (Échelle 0-5)
Entrez la force pour chaque groupe :
- **Quadriceps** (+ qualité : Bonne/Moyenne/Faible)
- **Ischio-jambiers**
- **Triceps sural**
- **Moyen fessier**

#### Périmètres de Cuisse
- **Côté opéré** (en cm)
- **Côté sain** (en cm)

✨ **Calcul automatique** : L'**amyotrophie** (différence) est calculée automatiquement !

---

### **Étape 6 : Tests Fonctionnels**

#### Marche
- Aides utilisées ? (Oui/Non)
- Type d'aide : Cannes / Béquilles / Attelle
- Qualité : Normale / Boiterie légère / Boiterie importante
- Périmètre : Illimité / < 30min / < 15min / < 5min

#### Escaliers
- **Montée** : Normal / Marche par marche / Avec aide / Impossible
- **Descente** : Normal / Marche par marche / Avec aide / Impossible

#### Tests Spécifiques
- **Assis-debout** : Sans aide / Avec aide mains / Impossible
- **Unipodal** : Possible (Oui/Non) + Durée en secondes
- **Accroupissement** : Complet / Partiel / Impossible

---

### **Étape 7 : Proprioception et Équilibre**

- Équilibre unipodal (secondes)
- Équilibre yeux fermés (secondes)
- Contrôle neuromusculaire : Bon / Moyen / Faible
- Qualité de réception : Bonne / Moyenne / Faible

---

### **Étape 8 : Scores d'Évaluation Validés**

Entrez les scores si disponibles (optionnel) :
- **IKDC Subjectif** (0-100)
- **Lysholm** (0-100)
- **KOOS** : Symptômes, Douleur, AVQ, Sport/Loisirs, Qualité de vie
- **ACL-RSI** (0-100)

---

### **Étape 9 : Objectifs de Traitement**

Définissez les objectifs par période :

#### Court Terme (0-6 semaines)
Ajoutez autant d'objectifs que nécessaire, ex:
- Diminuer la douleur et l'œdème
- Récupérer l'extension complète
- Initier le renforcement quadriceps

#### Moyen Terme (6-12 semaines)
Ex:
- Récupérer flexion > 120°
- Force quadriceps 4/5
- Marche sans boiterie

#### Long Terme (3-12 mois)
Ex:
- Reprise course à pied
- Retour au sport
- Symétrie force > 90%

#### Fréquence des Séances
- Nombre de séances/semaine : 2-3
- Durée : Ex: "45 minutes par séance"

---

### **Étape 10 : Plan de Traitement**

Listez les interventions prévues :

- **Techniques manuelles** : Massage cicatrice, mobilisations...
- **Exercices de renforcement** : Quadriceps, ischio...
- **Exercices de proprioception** : Plateau instable, yeux fermés...
- **Exercices de mobilité** : Flexion passive, étirements...
- **Conseils au patient** : Glaçage, auto-mobilisation...
- **Critères de progression** : Ex: "Passage phase suivante si..."

---

### **Étape 11 : Observations et Précautions**

- **Observations cliniques** : Notes libres sur l'évolution
- **Précautions/Contre-indications** : Alertes importantes

---

### **Étape 12 : Informations Kinésithérapeute**

- **Nom du kinésithérapeute**
- Date du prochain bilan (optionnel)

---

## 🤖 Utiliser l'Assistant IA

### 📍 Localisation
L'assistant IA apparaît sous forme d'**icône flottante** 💡 en bas à droite de l'écran (après avoir sauvegardé un bilan).

### 🔘 Ouverture du Panneau
Cliquez sur l'icône pour ouvrir le panneau de l'assistant.

### 📊 Onglet "Aperçu"

Vous verrez en temps réel :

1. **Score de Récupération Global** (0-100)
   - 🏆 Excellence (≥90)
   - ✓ Bonne évolution (70-89)
   - ⚠️ Attention requise (50-69)
   - 🔴 Alerte (<50)

2. **Indicateurs Clés**
   - Jours post-opératoires
   - Phase de rééducation automatique
   - Score ROM avec badge
   - Douleur moyenne

3. **💡 Recommandations IA**
   Le système analyse automatiquement et propose :
   - Alertes si douleur > 5/10
   - Conseils si mobilité < 70%
   - Renforcement ciblé si force faible
   - Travail proprioceptif si unipodal impossible
   - Encouragements si bonne progression

### 💾 Onglet "Export"

#### Bouton "Sauvegarder"
- Enregistre le bilan dans le **localStorage** du navigateur
- Permet de retrouver le bilan plus tard
- Confirmation visuelle en haut de page

#### Bouton "Export HTML"
- Génère un fichier HTML professionnel
- Téléchargement automatique : `Bilan_NOM_Prenom_Date.html`
- Contient :
  - ✅ Charte graphique A2P complète
  - ✅ Tous les calculs automatiques
  - ✅ Badges de performance
  - ✅ Tableaux et graphiques
  - ✅ Logo et branding A2P
- **Utilisable sans connexion internet** (CSS inline)
- Partageable par email avec le patient/médecin

#### Bouton "Imprimer"
- Ouvre une nouvelle fenêtre avec le bilan formaté
- Lance automatiquement la boîte de dialogue d'impression
- Optimisé pour format A4
- Suppression automatique des éléments non imprimables

#### ℹ️ Checklist des Fonctionnalités
- ✓ Charte graphique A2P intégrée
- ✓ Calculs automatiques des scores
- ✓ Badges de performance inclus
- ✓ Format professionnel prêt à imprimer

### 📚 Onglet "Historique"

#### Statistiques
- **Nombre total de bilans** sauvegardés
- **Espace utilisé** (en Ko)
- **Date de dernière modification**

#### Liste des Bilans
- Affiche les **5 derniers bilans** sauvegardés
- Pour chaque bilan :
  - Nom du patient
  - Date d'évaluation
  - Jours post-opératoires (J+XX)
- Cliquez pour charger un ancien bilan (fonctionnalité future)

---

## 🎯 Cas d'Usage Typiques

### 📌 **Cas 1 : Premier Bilan J+15**

1. Créer un nouveau bilan
2. Remplir informations patient + chirurgie
3. Le système affiche automatiquement : **"J+15 - Phase 1 (0-6 sem)"**
4. Évaluer douleur, ROM, force
5. Utiliser le **Stroke Test** pour évaluer l'effusion
6. Consulter l'assistant IA pour voir le score de récupération
7. **Exporter en HTML** et envoyer au chirurgien
8. **Sauvegarder** pour suivi ultérieur

### 📌 **Cas 2 : Suivi à J+45**

1. Ouvrir l'historique dans l'assistant IA
2. Retrouver le bilan précédent du patient
3. Créer un nouveau bilan avec date actuelle
4. Le système affiche : **"J+45 - Phase 2 (6-12 sem)"**
5. Comparer les scores :
   - ROM : 90° → 115° ✅
   - Force quadriceps : 2/5 → 3/5 ✅
   - Douleur : 6/10 → 3/10 ✅
6. L'IA affiche : **"✓ Excellente progression ! Continuer le travail"**
7. Exporter et archiver

### 📌 **Cas 3 : Bilan pour Retour au Sport (J+180)**

1. Nouveau bilan à 6 mois
2. Le système affiche : **"J+180 - Phase 3 (3-6 mois)"**
3. Évaluation complète avec scores validés :
   - IKDC : 85/100
   - Lysholm : 92/100
   - ACL-RSI : 78/100
4. Tests fonctionnels avancés : Unipodal 30s, Accroupissement complet
5. **Score de récupération global : 88/100** 🏆
6. Badge : **"✓ Bonne évolution"**
7. L'IA recommande : "Excellente progression ! Continuer le travail"
8. Export HTML pour dossier médical + autorisation retour sport

---

## 💡 Astuces et Bonnes Pratiques

### ✅ **DO - À Faire**

1. **Sauvegarder régulièrement** pendant la saisie (localStorage)
2. **Utiliser le Stroke Test** à chaque bilan pour suivre l'effusion
3. **Consulter les recommandations IA** avant de définir les objectifs
4. **Exporter en HTML** pour archivage et partage
5. **Comparer les scores** entre les bilans successifs
6. **Noter les observations cliniques** importantes
7. **Préciser les contre-indications** si présentes

### ❌ **DON'T - À Éviter**

1. ❌ Ne pas fermer le navigateur sans sauvegarder
2. ❌ Ne pas ignorer les alertes de l'IA (douleur élevée, etc.)
3. ❌ Ne pas oublier de remplir la date de chirurgie (calculs automatiques)
4. ❌ Ne pas négliger le Stroke Test (indicateur clé d'effusion)
5. ❌ Ne pas exporter sans relire le bilan généré

---

## 🔧 Dépannage

### ❓ **"L'assistant IA ne s'affiche pas"**
➡️ Vous devez d'abord **sauvegarder** un bilan (bouton en bas du formulaire)

### ❓ **"Mes bilans ont disparu"**
➡️ Vérifiez que vous utilisez le **même navigateur** (données en localStorage)
➡️ Évitez le mode "Navigation privée" qui efface les données

### ❓ **"Le Score ROM est à 0"**
➡️ Vérifiez que vous avez bien saisi les valeurs de **flexion** et **extension**

### ❓ **"Le calcul de jours post-op est incorrect"**
➡️ Vérifiez la **date de chirurgie** et la **date d'évaluation**

### ❓ **"L'export HTML ne fonctionne pas"**
➡️ Vérifiez les autorisations de téléchargement du navigateur
➡️ Essayez avec un autre navigateur (Chrome, Firefox, Edge)

### ❓ **"Le Stroke Test ne s'affiche pas"**
➡️ Rechargez la page (Ctrl+F5)
➡️ Vérifiez que vous êtes dans la section "Douleur et Gonflement"

---

## 📱 Compatibilité

### Navigateurs Supportés
- ✅ Google Chrome (recommandé)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari (macOS/iOS)
- ⚠️ Internet Explorer : Non supporté

### Appareils
- ✅ **Desktop** : Optimisé pour écrans larges
- ✅ **Tablette** : Interface responsive
- ✅ **Mobile** : Utilisable (version desktop recommandée)

---

## 📞 Support

Pour toute question ou problème :

1. Consultez d'abord ce guide
2. Vérifiez les messages d'erreur dans la console (F12)
3. Contactez le support technique A2P

---

## 🎓 Formation

### Vidéos Tutoriels (à venir)
- [ ] Introduction à l'interface
- [ ] Réaliser un bilan complet
- [ ] Utiliser le Stroke Test
- [ ] Interpréter les scores de l'IA
- [ ] Exporter et partager les bilans

---

## 📊 Indicateurs de Qualité

### Scores Normaux par Phase

| Phase | ROM Flexion | Extension | Force Quad | Douleur |
|-------|-------------|-----------|-------------|---------|
| **Phase 1** (0-6 sem) | 90-110° | 0-5° | 2-3/5 | 3-6/10 |
| **Phase 2** (6-12 sem) | 110-130° | 0° | 3-4/5 | 1-3/10 |
| **Phase 3** (3-6 mois) | 130-135° | 0° | 4-5/5 | 0-2/10 |
| **Phase 4** (6-9 mois) | 135° | 0° | 5/5 | 0-1/10 |
| **Phase 5** (9-12 mois) | 135°+ | 0° | 5/5 | 0/10 |

---

## 🚀 Raccourcis Clavier

- **Ctrl + S** : Sauvegarder le bilan
- **Ctrl + P** : Imprimer
- **Ctrl + E** : Exporter HTML (si implémenté)
- **Échap** : Fermer le panneau de l'assistant IA

---

**Bonne utilisation ! 🎉**

*Guide créé pour A2P Performance - Excellence en Kinésithérapie du Sport*
