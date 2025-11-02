# Icônes de l'application

Ce dossier contient les icônes de l'application pour différentes plateformes.

## Fichiers requis

Pour builder l'application, vous aurez besoin des icônes suivantes :

### Windows (.ico)
- **icon.ico** : 256x256 pixels minimum
  - Formats requis : 16x16, 32x32, 48x48, 64x64, 128x128, 256x256

### macOS (.icns)
- **icon.icns** : Fichier icns contenant plusieurs tailles
  - Formats requis : 16x16, 32x32, 64x64, 128x128, 256x256, 512x512, 1024x1024

### Linux (.png)
- **icon.png** : 512x512 pixels minimum

## Comment créer vos icônes

### Option 1 : Outils en ligne (Gratuit)
1. Allez sur https://www.icoconverter.com/ ou https://cloudconvert.com/
2. Uploadez votre logo/image (format PNG recommandé, 1024x1024px)
3. Convertissez en :
   - Windows : .ico
   - macOS : .icns
   - Linux : .png
4. Téléchargez et placez les fichiers dans ce dossier `build/`

### Option 2 : Electron Icon Builder (Automatique)
```bash
npm install --save-dev electron-icon-builder

# Placez votre image source (1024x1024px) dans build/icon.png
# Puis exécutez :
npx electron-icon-builder --input=./build/icon-source.png --output=./build
```

### Option 3 : Créer manuellement avec un outil de design
- **Photoshop / GIMP** : Créez une image 1024x1024, exportez en PNG
- **Figma / Canva** : Créez votre logo, exportez en haute résolution
- Utilisez ensuite Option 1 pour convertir

## Icône par défaut

Si vous n'avez pas d'icône personnalisée, vous pouvez :
1. Utiliser l'icône par défaut d'Electron (l'app fonctionnera quand même)
2. Créer une icône simple avec un outil en ligne comme :
   - https://favicon.io/
   - https://www.canva.com/
   - https://www.designevo.com/

## Suggestion de design pour l'icône

Pour une application médicale de kinésithérapie LCA :
- **Couleurs** : Bleu (confiance), vert (santé), blanc (propreté)
- **Éléments** : Genou stylisé, croix médicale, silhouette en mouvement
- **Style** : Moderne, professionnel, épuré
- **Texte** : Évitez le texte dans l'icône (illisible à petite taille)

## Placement des fichiers

Une fois créés, placez vos fichiers comme suit :
```
build/
  ├── icon.ico      (Windows)
  ├── icon.icns     (macOS)
  ├── icon.png      (Linux)
  └── README.md     (ce fichier)
```

## Note importante

Sans ces icônes, le build fonctionnera quand même mais utilisera l'icône par défaut d'Electron.
Pour une application professionnelle, il est recommandé de créer des icônes personnalisées.
