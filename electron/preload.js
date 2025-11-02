// Preload script - Interface sécurisée entre Electron et le renderer
const { contextBridge, ipcRenderer } = require('electron')

// Exposer des APIs sécurisées au renderer process
contextBridge.exposeInMainWorld('electron', {
  // Version de l'app
  appVersion: process.env.npm_package_version || '1.0.0',

  // Platform info
  platform: process.platform,

  // Fonction pour sauvegarder des données localement
  saveData: async (data) => {
    return await ipcRenderer.invoke('save-data', data)
  },

  // Fonction pour charger des données
  loadData: async () => {
    return await ipcRenderer.invoke('load-data')
  },

  // Notification système
  notify: (title, body) => {
    new Notification(title, { body })
  }
})

// Log pour debug
console.log('Preload script chargé - Electron est prêt!')
