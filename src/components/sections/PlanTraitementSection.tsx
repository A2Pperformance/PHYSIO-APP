import React from 'react'
import { FormTextarea } from '../FormTextarea'
import { PlanTraitement } from '../../types/lca-assessment'

interface PlanTraitementSectionProps {
  data: PlanTraitement
  onChange: (data: PlanTraitement) => void
}

export const PlanTraitementSection: React.FC<PlanTraitementSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PlanTraitement, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const handleArrayChange = (
    field: 'techniquesManuelles' | 'exercicesRenforcement' | 'exercicesProprioception' | 'exercicesMobilite' | 'conseilsPatient',
    value: string
  ) => {
    const items = value.split('\n').map(item => item.trim()).filter(item => item)
    handleChange(field, items)
  }

  const techniquesManuelles = [
    'Mobilisation rotulienne',
    'Massage cicatrice',
    'Drainage lymphatique',
    'Mobilisation passive',
    'Levée de tension'
  ]

  const exercicesRenforcement = [
    'Quadriceps en isométrique',
    'Extension de genou',
    'Flexion de genou',
    'Squats légers',
    'Fentes',
    'Proprioception'
  ]

  const exercicesProprioception = [
    'Équilibre unipodal',
    'Plateau instable',
    'Trampoline',
    'Exercices yeux fermés',
    'Perturbations externes'
  ]

  const exercicesMobilite = [
    'Vélo stationnaire',
    'Étirements ischio-jambiers',
    'Étirements quadriceps',
    'Mobilisation active',
    'Talon-fesse'
  ]

  return (
    <div className="form-section">
      <h2 className="section-title">10. Plan de Traitement</h2>

      <div className="bg-primary-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-3 text-primary-800">
          🔧 Techniques manuelles
        </h3>
        <div className="mb-3">
          <p className="text-sm text-gray-700 mb-2">Suggestions (cliquer pour ajouter):</p>
          <div className="flex flex-wrap gap-2">
            {techniquesManuelles.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => {
                  const current = data.techniquesManuelles.join('\n')
                  handleArrayChange('techniquesManuelles', current + '\n' + tech)
                }}
                className="px-3 py-1 bg-white border border-primary-300 rounded-full text-sm hover:bg-primary-100 transition-colors"
              >
                + {tech}
              </button>
            ))}
          </div>
        </div>
        <FormTextarea
          label="Techniques à appliquer"
          name="techniquesManuelles"
          value={data.techniquesManuelles.join('\n')}
          onChange={(e) => handleArrayChange('techniquesManuelles', e.target.value)}
          placeholder="Lister les techniques manuelles (une par ligne)"
          rows={5}
        />
      </div>

      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-3 text-green-800">
          💪 Exercices de renforcement
        </h3>
        <div className="mb-3">
          <p className="text-sm text-gray-700 mb-2">Suggestions (cliquer pour ajouter):</p>
          <div className="flex flex-wrap gap-2">
            {exercicesRenforcement.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  const current = data.exercicesRenforcement.join('\n')
                  handleArrayChange('exercicesRenforcement', current + '\n' + ex)
                }}
                className="px-3 py-1 bg-white border border-green-300 rounded-full text-sm hover:bg-green-100 transition-colors"
              >
                + {ex}
              </button>
            ))}
          </div>
        </div>
        <FormTextarea
          label="Programme de renforcement"
          name="exercicesRenforcement"
          value={data.exercicesRenforcement.join('\n')}
          onChange={(e) => handleArrayChange('exercicesRenforcement', e.target.value)}
          placeholder="Lister les exercices de renforcement (une par ligne)"
          rows={5}
        />
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-3 text-yellow-800">
          🎯 Exercices de proprioception
        </h3>
        <div className="mb-3">
          <p className="text-sm text-gray-700 mb-2">Suggestions (cliquer pour ajouter):</p>
          <div className="flex flex-wrap gap-2">
            {exercicesProprioception.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  const current = data.exercicesProprioception.join('\n')
                  handleArrayChange('exercicesProprioception', current + '\n' + ex)
                }}
                className="px-3 py-1 bg-white border border-yellow-300 rounded-full text-sm hover:bg-yellow-100 transition-colors"
              >
                + {ex}
              </button>
            ))}
          </div>
        </div>
        <FormTextarea
          label="Programme de proprioception"
          name="exercicesProprioception"
          value={data.exercicesProprioception.join('\n')}
          onChange={(e) => handleArrayChange('exercicesProprioception', e.target.value)}
          placeholder="Lister les exercices de proprioception (une par ligne)"
          rows={5}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-3 text-blue-800">
          🤸 Exercices de mobilité
        </h3>
        <div className="mb-3">
          <p className="text-sm text-gray-700 mb-2">Suggestions (cliquer pour ajouter):</p>
          <div className="flex flex-wrap gap-2">
            {exercicesMobilite.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  const current = data.exercicesMobilite.join('\n')
                  handleArrayChange('exercicesMobilite', current + '\n' + ex)
                }}
                className="px-3 py-1 bg-white border border-blue-300 rounded-full text-sm hover:bg-blue-100 transition-colors"
              >
                + {ex}
              </button>
            ))}
          </div>
        </div>
        <FormTextarea
          label="Programme de mobilité"
          name="exercicesMobilite"
          value={data.exercicesMobilite.join('\n')}
          onChange={(e) => handleArrayChange('exercicesMobilite', e.target.value)}
          placeholder="Lister les exercices de mobilité (une par ligne)"
          rows={5}
        />
      </div>

      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-3 text-purple-800">
          💡 Conseils au patient
        </h3>
        <FormTextarea
          label="Recommandations et conseils"
          name="conseilsPatient"
          value={data.conseilsPatient.join('\n')}
          onChange={(e) => handleArrayChange('conseilsPatient', e.target.value)}
          placeholder="Ex:&#10;- Glaçage 3x/jour 15min&#10;- Éviter station debout prolongée&#10;- Surélever la jambe au repos&#10;- Respecter la douleur"
          rows={6}
        />
      </div>

      <FormTextarea
        label="Critères de progression vers phase suivante"
        name="critereProgression"
        value={data.critereProgression}
        onChange={(e) => handleChange('critereProgression', e.target.value)}
        placeholder="Décrire les critères objectifs pour passer à la phase suivante..."
        rows={4}
        required
      />
    </div>
  )
}
