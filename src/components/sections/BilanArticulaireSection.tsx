import React from 'react'
import { FormInput } from '../FormInput'
import { FormSelect } from '../FormSelect'
import { BilanArticulaire } from '../../types/lca-assessment'

interface BilanArticulaireSectionProps {
  data: BilanArticulaire
  onChange: (data: BilanArticulaire) => void
}

export const BilanArticulaireSection: React.FC<BilanArticulaireSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof BilanArticulaire, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">4. Bilan Articulaire (Amplitudes)</h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-blue-800">
          <strong>Rappel:</strong> Flexion normale: 130-140°, Extension normale: 0° (valeur positive = flexum)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Flexion */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-4 text-primary-700">Flexion</h3>
          <FormInput
            label="Flexion Active (°)"
            name="flexionActive"
            type="number"
            value={data.flexionActive}
            onChange={(e) => handleChange('flexionActive', parseInt(e.target.value))}
            min={0}
            max={180}
            required
          />
          <FormInput
            label="Flexion Passive (°)"
            name="flexionPassive"
            type="number"
            value={data.flexionPassive}
            onChange={(e) => handleChange('flexionPassive', parseInt(e.target.value))}
            min={0}
            max={180}
            required
            className="mt-4"
          />
          <FormSelect
            label="Qualité fin de course"
            name="qualiteFinCourseFlexion"
            value={data.qualiteFinCourseFlexion}
            onChange={(e) => handleChange('qualiteFinCourseFlexion', e.target.value)}
            options={[
              { value: 'Souple', label: 'Souple' },
              { value: 'Ferme', label: 'Ferme' },
              { value: 'Dure', label: 'Dure' },
              { value: 'Vide', label: 'Vide' }
            ]}
            required
            className="mt-4"
          />
        </div>

        {/* Extension */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-4 text-primary-700">Extension</h3>
          <FormInput
            label="Extension Active (°)"
            name="extensionActive"
            type="number"
            value={data.extensionActive}
            onChange={(e) => handleChange('extensionActive', parseInt(e.target.value))}
            min={-10}
            max={30}
            required
          />
          <FormInput
            label="Extension Passive (°)"
            name="extensionPassive"
            type="number"
            value={data.extensionPassive}
            onChange={(e) => handleChange('extensionPassive', parseInt(e.target.value))}
            min={-10}
            max={30}
            required
            className="mt-4"
          />
          <FormSelect
            label="Qualité fin de course"
            name="qualiteFinCourseExtension"
            value={data.qualiteFinCourseExtension}
            onChange={(e) => handleChange('qualiteFinCourseExtension', e.target.value)}
            options={[
              { value: 'Souple', label: 'Souple' },
              { value: 'Ferme', label: 'Ferme' },
              { value: 'Dure', label: 'Dure' },
              { value: 'Vide', label: 'Vide' }
            ]}
            required
            className="mt-4"
          />
        </div>
      </div>

      <FormSelect
        label="Mobilité rotulienne"
        name="mobiliteRotulienne"
        value={data.mobiliteRotulienne}
        onChange={(e) => handleChange('mobiliteRotulienne', e.target.value)}
        options={[
          { value: 'Normale', label: 'Normale' },
          { value: 'Diminuée', label: 'Diminuée' },
          { value: 'Adhérences', label: 'Adhérences' }
        ]}
        required
        className="mt-6"
      />

      {/* Résumé visuel */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg">
        <h4 className="font-semibold mb-2">Résumé des amplitudes:</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Flexion:</span> {data.flexionActive}° (actif) / {data.flexionPassive}° (passif)
          </div>
          <div>
            <span className="font-medium">Extension:</span> {data.extensionActive}° (actif) / {data.extensionPassive}° (passif)
          </div>
        </div>
      </div>
    </div>
  )
}
