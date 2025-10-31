import React from 'react'
import { FormInput } from '../FormInput'
import { ScoresEvaluation } from '../../types/lca-assessment'

interface ScoresSectionProps {
  data: ScoresEvaluation
  onChange: (data: ScoresEvaluation) => void
}

export const ScoresSection: React.FC<ScoresSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ScoresEvaluation, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const getScoreColor = (score: number | undefined, max: number = 100) => {
    if (!score) return 'gray'
    const percentage = (score / max) * 100
    if (percentage >= 80) return 'green'
    if (percentage >= 60) return 'orange'
    return 'red'
  }

  return (
    <div className="form-section">
      <h2 className="section-title">8. Scores d'Évaluation Standardisés</h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-blue-800">
          <strong>Questionnaires validés:</strong> Ces scores permettent une évaluation objective
          et un suivi longitudinal de la progression du patient.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IKDC */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <FormInput
            label="IKDC Subjectif (0-100)"
            name="ikdcScore"
            type="number"
            value={data.ikdcScore || ''}
            onChange={(e) => handleChange('ikdcScore', parseInt(e.target.value))}
            min={0}
            max={100}
            placeholder="Score IKDC"
          />
          {data.ikdcScore !== undefined && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`bg-${getScoreColor(data.ikdcScore)}-600 h-3 rounded-full transition-all`}
                  style={{ width: `${data.ikdcScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                International Knee Documentation Committee
              </p>
            </div>
          )}
        </div>

        {/* Lysholm */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <FormInput
            label="Score de Lysholm (0-100)"
            name="lysholmScore"
            type="number"
            value={data.lysholmScore || ''}
            onChange={(e) => handleChange('lysholmScore', parseInt(e.target.value))}
            min={0}
            max={100}
            placeholder="Score Lysholm"
          />
          {data.lysholmScore !== undefined && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`bg-${getScoreColor(data.lysholmScore)}-600 h-3 rounded-full transition-all`}
                  style={{ width: `${data.lysholmScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Évaluation globale du genou
              </p>
            </div>
          )}
        </div>
      </div>

      {/* KOOS */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-4 text-primary-700">
          KOOS (Knee injury and Osteoarthritis Outcome Score)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormInput
            label="Symptômes (0-100)"
            name="koosSymptomes"
            type="number"
            value={data.koosSymptomes || ''}
            onChange={(e) => handleChange('koosSymptomes', parseInt(e.target.value))}
            min={0}
            max={100}
          />
          <FormInput
            label="Douleur (0-100)"
            name="koosDouleur"
            type="number"
            value={data.koosDouleur || ''}
            onChange={(e) => handleChange('koosDouleur', parseInt(e.target.value))}
            min={0}
            max={100}
          />
          <FormInput
            label="AVQ (0-100)"
            name="koosAVQ"
            type="number"
            value={data.koosAVQ || ''}
            onChange={(e) => handleChange('koosAVQ', parseInt(e.target.value))}
            min={0}
            max={100}
          />
          <FormInput
            label="Sport et Loisirs (0-100)"
            name="koosSportLoisirs"
            type="number"
            value={data.koosSportLoisirs || ''}
            onChange={(e) => handleChange('koosSportLoisirs', parseInt(e.target.value))}
            min={0}
            max={100}
          />
          <FormInput
            label="Qualité de vie (0-100)"
            name="koosQualiteVie"
            type="number"
            value={data.koosQualiteVie || ''}
            onChange={(e) => handleChange('koosQualiteVie', parseInt(e.target.value))}
            min={0}
            max={100}
          />
        </div>
      </div>

      {/* ACL-RSI */}
      <div className="mt-6 bg-gradient-to-r from-primary-50 to-blue-50 p-4 rounded-lg">
        <FormInput
          label="ACL-RSI (0-100) - Return to Sport after Injury"
          name="aclRSI"
          type="number"
          value={data.aclRSI || ''}
          onChange={(e) => handleChange('aclRSI', parseInt(e.target.value))}
          min={0}
          max={100}
          placeholder="Score de confiance pour le retour au sport"
        />
        {data.aclRSI !== undefined && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`bg-${getScoreColor(data.aclRSI)}-600 h-4 rounded-full transition-all flex items-center justify-center text-xs text-white font-semibold`}
                style={{ width: `${data.aclRSI}%` }}
              >
                {data.aclRSI}%
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Interprétation:</strong> Score ≥ 56 est associé à un retour au sport réussi
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
