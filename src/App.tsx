import { useState, useEffect } from 'react'
import LCAAssessmentForm from './components/LCAAssessmentForm'
import AIAssistant from './components/AIAssistant'
import { LCAAssessment } from './types/lca-assessment'
import { LocalStorageService } from './services/localStorage'
import { a2pTheme } from './theme/a2p-theme'

function App() {
  const [savedAssessment, setSavedAssessment] = useState<LCAAssessment | null>(null)
  const [currentAssessment, setCurrentAssessment] = useState<LCAAssessment | null>(null)

  // Charger le brouillon au démarrage
  useEffect(() => {
    const draft = LocalStorageService.getCurrentAssessment()
    if (draft) {
      console.log('Brouillon chargé depuis localStorage')
    }
  }, [])

  const handleSaveAssessment = (assessment: LCAAssessment) => {
    setSavedAssessment(assessment)
    setCurrentAssessment(assessment)
    LocalStorageService.saveAssessment(assessment)
    LocalStorageService.saveCurrentAssessment(assessment)
    console.log('Évaluation sauvegardée:', assessment)
    alert('✓ Fiche bilan sauvegardée avec succès!')
  }

  const handleUpdateAssessment = (assessment: LCAAssessment) => {
    setCurrentAssessment(assessment)
    setSavedAssessment(assessment)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec branding A2P */}
        <header className="text-center mb-8 bg-white rounded-lg shadow-sm p-6 border-t-4 border-primary-600">
          <div className="inline-block bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
            {a2pTheme.branding.name}
          </div>
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            Assistant IA - Bilans Kinésithérapiques
          </h1>
          <h2 className="text-2xl text-gray-600">
            Post-Chirurgie LCA (Ligament Croisé Antérieur)
          </h2>
          <p className="mt-2 text-gray-500 italic">
            {a2pTheme.branding.tagline}
          </p>

          {/* Features badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              ✓ Génération HTML automatique
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              ✓ Calculs automatiques
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
              ✓ Stroke Test intégré
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
              ✓ Sauvegarde locale
            </span>
          </div>
        </header>

        <LCAAssessmentForm
          onSave={handleSaveAssessment}
          onPrint={handlePrint}
        />

        {savedAssessment && (
          <div className="mt-8 p-4 bg-green-50 border-2 border-green-300 rounded-lg shadow-sm no-print">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-semibold">
                  Bilan sauvegardé avec succès
                </p>
                <p className="text-green-600 text-sm">
                  {savedAssessment.patientInfo.prenom} {savedAssessment.patientInfo.nom} - {new Date(savedAssessment.dateEvaluation).toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Assistant IA flottant */}
      {currentAssessment && (
        <AIAssistant
          assessment={currentAssessment}
          onUpdate={handleUpdateAssessment}
        />
      )}
    </div>
  )
}

export default App
