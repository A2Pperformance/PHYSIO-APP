import { useState } from 'react'
import LCAAssessmentForm from './components/LCAAssessmentForm'
import { LCAAssessment } from './types/lca-assessment'

function App() {
  const [savedAssessment, setSavedAssessment] = useState<LCAAssessment | null>(null)

  const handleSaveAssessment = (assessment: LCAAssessment) => {
    setSavedAssessment(assessment)
    console.log('Évaluation sauvegardée:', assessment)
    // Ici, vous pouvez ajouter la logique pour sauvegarder dans une base de données
    alert('Fiche bilan sauvegardée avec succès!')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            Fiche Bilan Kinésithérapie
          </h1>
          <h2 className="text-2xl text-gray-600">
            Post-Chirurgie LCA (Ligament Croisé Antérieur)
          </h2>
          <p className="mt-2 text-gray-500">
            Évaluation complète et suivi de rééducation
          </p>
        </header>

        <LCAAssessmentForm
          onSave={handleSaveAssessment}
          onPrint={handlePrint}
        />

        {savedAssessment && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg no-print">
            <p className="text-green-800">
              ✓ Dernière sauvegarde: {new Date(savedAssessment.dateEvaluation).toLocaleString('fr-FR')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
