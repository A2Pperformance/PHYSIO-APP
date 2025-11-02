// Modules Electron
const { app, BrowserWindow, Menu, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow

function createWindow() {
  // Créer la fenêtre du navigateur
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'build/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'electron/preload.js')
    },
    backgroundColor: '#f9fafb',
    show: false, // Ne pas afficher jusqu'au chargement
    autoHideMenuBar: false
  })

  // Charger l'application
  const startUrl = process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, 'dist/index.html')}`

  mainWindow.loadURL(startUrl)

  // Afficher la fenêtre quand prête
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.maximize()
  })

  // Ouvrir DevTools en développement
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  // Créer le menu de l'application
  createMenu()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function createMenu() {
  const template = [
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Nouveau bilan',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            if (mainWindow) {
              mainWindow.reload()
            }
          }
        },
        {
          label: 'Exporter en PDF',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.print()
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Sauvegarder',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            // Trigger save dans l'app
            mainWindow.webContents.executeJavaScript(`
              document.querySelector('button[type="submit"]')?.click()
            `)
          }
        },
        { type: 'separator' },
        {
          label: 'Quitter',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Édition',
      submenu: [
        { role: 'undo', label: 'Annuler' },
        { role: 'redo', label: 'Rétablir' },
        { type: 'separator' },
        { role: 'cut', label: 'Couper' },
        { role: 'copy', label: 'Copier' },
        { role: 'paste', label: 'Coller' },
        { role: 'selectAll', label: 'Tout sélectionner' }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        { role: 'reload', label: 'Recharger' },
        { role: 'forceReload', label: 'Forcer le rechargement' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom normal' },
        { role: 'zoomIn', label: 'Zoomer' },
        { role: 'zoomOut', label: 'Dézoomer' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Plein écran' }
      ]
    },
    {
      label: 'Aide',
      submenu: [
        {
          label: 'À propos',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'À propos de Physio App',
              message: 'Physio App - Fiche Bilan LCA',
              detail: 'Version 1.0.0\n\nApplication de gestion de fiches bilan kinésithérapie\npour la rééducation post-chirurgie du LCA.\n\nDéveloppé avec ❤️ pour les professionnels de la kinésithérapie.',
              buttons: ['OK']
            })
          }
        },
        { type: 'separator' },
        {
          label: 'Documentation',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://github.com/votre-repo/PHYSIO-APP')
          }
        }
      ]
    }
  ]

  // Ajouter le menu Développeur en mode développement
  if (process.env.NODE_ENV === 'development') {
    template.push({
      label: 'Développeur',
      submenu: [
        { role: 'toggleDevTools', label: 'Outils de développement' }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// Quand Electron est prêt
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quitter quand toutes les fenêtres sont fermées
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Gestion des erreurs
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  dialog.showErrorBox('Erreur', `Une erreur est survenue: ${error.message}`)
})
