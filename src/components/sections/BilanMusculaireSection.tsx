import React, { useEffect } from 'react'
import { FormInput } from '../FormInput'
import { FormSelect } from '../FormSelect'
import { BilanMusculaire } from '../../types/lca-assessment'

interface BilanMusculaireSectionProps {
  data: BilanMusculaire
  onChange: (data: BilanMusculaire) => void
}

export const BilanMusculaireSection: React.FC<BilanMusculaireSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof BilanMusculaire, value: any) => {
    onChange({ ...data, [field]: value })
  }

  // Calcul automatique de l'amyotrophie
  useEffect(() => {
    if (data.perimetreCuisseOpere && data.perimetreCuisseSain) {
      const amyotrophie = data.perimetreCuisseSain - data.perimetreCuisseOpere
      handleChange('amyotrophie', parseFloat(amyotrophie.toFixed(1)))
    }
  }, [data.perimetreCuisseOpere, data.perimetreCuisseSain])

  const muscleGroups = [
    { name: 'Quadriceps', field: 'quadriceps' as keyof BilanMusculaire },
    { name: 'Ischio-jambiers', field: 'ischiojambiers' as keyof BilanMusculaire },
    { name: 'Triceps sural', field: 'tricepsSural' as keyof BilanMusculaire },
    { name: 'Moyen fessier', field: 'moyenFessier' as keyof BilanMusculaire }
  ]

  return (
    <div className="form-section">
      <h2 className="section-title">5. Bilan Musculaire</h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-blue-800">
          <strong>Échelle de testing musculaire (0-5):</strong><br/>
          0: Aucune contraction | 1: Contraction sans mouvement | 2: Mouvement sans pesanteur |
          3: Mouvement contre pesanteur | 4: Mouvement avec résistance | 5: Force normale
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {muscleGroups.map(({ name, field }) => {
          const fieldValue = data[field] as number
          return (
            <div key={field} className="bg-gray-50 p-4 rounded-lg">
              <FormInput
                label={`${name} (0-5)`}
                name={field}
                type="number"
                value={fieldValue}
                onChange={(e) => handleChange(field, parseInt(e.target.value))}
                min={0}
                max={5}
                step={0.5}
                required
              />
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${(fieldValue / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-4">Qualité de contraction du quadriceps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="Qualité de la contraction"
            name="qualiteContractionQuadriceps"
            value={data.qualiteContractionQuadriceps}
            onChange={(e) => handleChange('qualiteContractionQuadriceps', e.target.value)}
            options={[
              { value: 'Bonne', label: 'Bonne' },
              { value: 'Moyenne', label: 'Moyenne' },
              { value: 'Faible', label: 'Faible' }
            ]}
            required
          />

          <div>
            <label className="form-label">Contraction isolée possible</label>
            <label className="flex items-center space-x-2 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.contractionIsolee}
                onChange={(e) => handleChange('contractionIsolee', e.target.checked)}
                className="form-checkbox"
              />
              <span>Oui, contraction isolée possible</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-4">Mesures périmètriques (Amyotrophie)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Périmètre cuisse opérée (cm)"
            name="perimetreCuisseOpere"
            type="number"
            value={data.perimetreCuisseOpere || ''}
            onChange={(e) => handleChange('perimetreCuisseOpere', parseFloat(e.target.value))}
            step={0.1}
            placeholder="Ex: 45.5"
          />

          <FormInput
            label="Périmètre cuisse saine (cm)"
            name="perimetreCuisseSain"
            type="number"
            value={data.perimetreCuisseSain || ''}
            onChange={(e) => handleChange('perimetreCuisseSain', parseFloat(e.target.value))}
            step={0.1}
            placeholder="Ex: 48.0"
          />

          {data.amyotrophie !== undefined && (
            <div className="flex flex-col">
              <label className="form-label">Amyotrophie (calculée)</label>
              <div className="flex-1 flex items-center">
                <span className={`text-2xl font-bold ${
                  data.amyotrophie > 2 ? 'text-red-600' :
                  data.amyotrophie > 1 ? 'text-orange-600' :
                  'text-green-600'
                }`}>
                  {data.amyotrophie.toFixed(1)} cm
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
