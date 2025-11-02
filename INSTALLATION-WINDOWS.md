# 🖥️ Guide d'Installation - Application Windows (.exe)

Ce guide vous explique comment transformer l'application web Physio App en une **application de bureau Windows (.exe)** que vous pouvez installer sur votre PC.

---

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir :

### 1. Node.js installé
- Télécharger depuis : https://nodejs.org/
- Version recommandée : **LTS (20.x ou supérieur)**
- Vérifiez l'installation :
  ```bash
  node --version
  npm --version
  ```

### 2. Git installé (si vous clonez le repository)
- Télécharger depuis : https://git-scm.com/
- Ou téléchargez directement le code source en ZIP

---

## 📦 Étape 1 : Récupérer le code

### Option A : Cloner avec Git
```bash
git clone <votre-repo-url>
cd PHYSIO-APP
```

### Option B : Télécharger en ZIP
1. Téléchargez le code depuis GitHub
2. Extrayez le ZIP
3. Ouvrez un terminal dans le dossier extrait

---

## 🔧 Étape 2 : Installer les dépendances

Ouvrez un terminal (PowerShell ou CMD) dans le dossier du projet et exécutez :

```bash
npm install
```

⏳ **Cela peut prendre 5-10 minutes** pour télécharger toutes les dépendances (environ 500 Mo).

### ⚠️ Si vous avez des erreurs :

**Erreur : "npm not found"**
→ Node.js n'est pas installé ou pas dans le PATH. Réinstallez Node.js.

**Erreur de permissions**
→ Lancez le terminal en tant qu'administrateur.

**Erreur réseau / timeout**
→ Vérifiez votre connexion internet ou réessayez plus tard.

---

## 🎨 Étape 3 : (Optionnel) Ajouter votre icône personnalisée

Pour avoir une belle icône au lieu de l'icône par défaut :

1. Créez ou trouvez une image pour votre icône (PNG, 1024x1024 pixels recommandé)

2. Convertissez-la en .ico :
   - Allez sur https://www.icoconverter.com/
   - Uploadez votre image
   - Téléchargez le fichier .ico généré

3. Placez le fichier dans le dossier :
   ```
   PHYSIO-APP/build/icon.ico
   ```

4. (Optionnel pour macOS) Créez aussi un .icns
5. (Optionnel pour Linux) Ajoutez un icon.png 512x512

> 💡 **Voir le fichier `build/README.md` pour plus de détails sur les icônes**

---

## 🏗️ Étape 4 : Tester l'application en mode développement

Avant de créer le .exe, testez que tout fonctionne :

```bash
npm run electron:dev
```

Une fenêtre devrait s'ouvrir avec votre application.

**Testez :**
- ✅ Remplir le formulaire
- ✅ Sauvegarder
- ✅ Imprimer (Ctrl+P)
- ✅ Menu Fichier → Nouveau bilan

Si tout fonctionne, passez à l'étape suivante ! 🎉

---

## 🚀 Étape 5 : Créer le fichier .exe

### Commande pour Windows (64-bit) :

```bash
npm run electron:build:win
```

⏳ **Cette étape peut prendre 5-15 minutes** selon votre PC.

### Ce qui se passe :
1. Compilation de l'application React
2. Packaging avec Electron
3. Création de l'installateur Windows (.exe)
4. Signature et compression

### Résultat :

Le fichier .exe sera créé dans le dossier :
```
PHYSIO-APP/release/
```

Vous trouverez :
- `Physio-App-LCA-1.0.0-Setup.exe` → **L'installateur** (à distribuer)
- Autres fichiers de build (dossiers temporaires)

---

## 💾 Étape 6 : Installer l'application

1. **Double-cliquez** sur `Physio-App-LCA-1.0.0-Setup.exe`

2. Suivez l'assistant d'installation :
   - Choisissez le dossier d'installation
   - Créer un raccourci sur le bureau (recommandé)
   - Créer un raccourci dans le menu Démarrer

3. Cliquez sur **Installer**

4. Une fois installée, lancez **Physio App LCA** depuis :
   - Le raccourci sur le bureau
   - Le menu Démarrer
   - `C:\Program Files\Physio App LCA\Physio App LCA.exe`

---

## 🎯 Étape 7 : Utiliser l'application

### Fonctionnalités disponibles :

✅ **Formulaire complet** : Toutes les 11 sections du bilan LCA
✅ **Sauvegarde automatique** : Données stockées localement sur votre PC
✅ **Export PDF** : Imprimez ou exportez en PDF (Ctrl+P)
✅ **Raccourcis clavier** :
   - `Ctrl+N` : Nouveau bilan
   - `Ctrl+S` : Sauvegarder
   - `Ctrl+P` : Imprimer
   - `F11` : Plein écran

### Où sont stockées mes données ?

Les données sont stockées localement sur votre PC dans :
```
C:\Users\VotreNom\AppData\Roaming\physio-app-lca-assessment\
```

> ⚠️ **Important** : Faites des sauvegardes régulières de ce dossier !

---

## 🔄 Mise à jour de l'application

Pour mettre à jour l'application :

1. Récupérez la nouvelle version du code
2. Réexécutez : `npm install` puis `npm run electron:build:win`
3. Installez le nouveau .exe (il remplacera l'ancien)

---

## 🛠️ Résolution de problèmes

### L'application ne se lance pas

**Problème** : Double-clic sur .exe, rien ne se passe
**Solution** :
1. Vérifiez que l'antivirus ne bloque pas l'application
2. Lancez en tant qu'administrateur
3. Vérifiez les logs dans `%APPDATA%\physio-app-lca-assessment\logs\`

### Écran blanc au démarrage

**Problème** : L'application s'ouvre mais affiche un écran blanc
**Solution** :
1. Ouvrez les DevTools : `Ctrl+Shift+I`
2. Regardez les erreurs dans la console
3. Essayez de recharger : `Ctrl+R`

### Erreur "app.asar not found"

**Problème** : Erreur au lancement
**Solution** :
1. Réinstallez l'application
2. Si le problème persiste, re-buildez avec `npm run electron:build:win`

### Les données ne se sauvegardent pas

**Problème** : Les données disparaissent après fermeture
**Solution** :
1. Vérifiez les permissions du dossier AppData
2. Lancez l'application en administrateur
3. Vérifiez qu'aucun antivirus ne bloque l'écriture

### Erreur pendant le build

**Erreur** : "electron-builder failed"
**Solution** :
```bash
# Supprimez node_modules et recommencez
rm -rf node_modules package-lock.json
npm install
npm run electron:build:win
```

---

## 📊 Taille de l'application

- **Installateur** : ~80-120 Mo
- **Application installée** : ~200-250 Mo
- **Données utilisateur** : Variable selon utilisation

---

## 🔐 Sécurité et Confidentialité

### ✅ Données stockées localement
- Aucune donnée n'est envoyée sur internet
- Pas de télémétrie
- Pas de tracking

### ⚠️ Recommandations RGPD

Pour une utilisation professionnelle avec données patients réelles :

1. **Sauvegardes régulières** : Planifiez des backups automatiques
2. **Chiffrement** : Utilisez BitLocker ou VeraCrypt pour chiffrer le disque
3. **Contrôle d'accès** : Protégez votre PC par mot de passe
4. **Conformité** : Assurez-vous que le stockage local est conforme à vos obligations RGPD

---

## 📋 Commandes disponibles

Voici toutes les commandes npm disponibles :

```bash
# Mode développement web (navigateur)
npm run dev

# Mode développement Electron (application de bureau)
npm run electron:dev

# Build web uniquement
npm run build

# Build application Windows .exe
npm run electron:build:win

# Build application macOS .dmg
npm run electron:build:mac

# Build application Linux .AppImage
npm run electron:build:linux

# Lint (vérification du code)
npm run lint
```

---

## 🎓 Pour aller plus loin

### Personnalisation avancée

**Changer le nom de l'application** :
Éditez `package.json` → `"productName": "Votre Nom"`

**Changer la version** :
Éditez `package.json` → `"version": "1.0.0"`

**Modifier le menu** :
Éditez `electron.js` → fonction `createMenu()`

**Ajouter des raccourcis clavier** :
Éditez `electron.js` → section `accelerator`

### Distribution de l'application

**Pour distribuer à d'autres utilisateurs** :

1. Partagez le fichier `Physio-App-LCA-1.0.0-Setup.exe`
2. L'utilisateur double-clique pour installer
3. Aucune configuration supplémentaire nécessaire

**Note** : Windows Defender peut afficher un avertissement pour les applications non signées. C'est normal. Pour éviter cela, vous pouvez signer l'application avec un certificat de signature de code (coût : ~400-600€/an).

---

## 📞 Support

Pour toute question ou problème :

1. Vérifiez d'abord cette documentation
2. Consultez le fichier `README.md` principal
3. Ouvrez une issue sur GitHub
4. Consultez la documentation Electron : https://www.electronjs.org/docs

---

## ✨ Félicitations !

Vous avez maintenant une **application Windows professionnelle** pour vos fiches bilan LCA ! 🎉

**Profitez de votre nouvelle application de bureau !** 💙

---

*Développé avec ❤️ pour les professionnels de la kinésithérapie*
