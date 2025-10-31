import React from 'react'
import { FormSelect } from '../FormSelect'
import { PainScale } from '../PainScale'
import { DouleurGonflement } from '../../types/lca-assessment'

interface DouleurGonflementSectionProps {
  data: DouleurGonflement
  onChange: (data: DouleurGonflement) => void
}

export const DouleurGonflementSection: React.FC<DouleurGonflementSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof DouleurGonflement, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const handleLocalisationChange = (localisation: string) => {
    const current = data.localisationDouleur || []
    const updated = current.includes(localisation)
      ? current.filter(l => l !== localisation)
      : [...current, localisation]
    handleChange('localisationDouleur', updated)
  }

  const localisations = [
    'Face antérieure',
    'Face médiale',
    'Face latérale',
    'Face postérieure',
    'Pli du genou',
    'Rotule',
    'Cicatrice'
  ]

  return (
    <div className="form-section">
      <h2 className="section-title">3. Douleur et Gonflement</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PainScale
          label="Douleur au repos"
          value={data.douleurRepos}
          onChange={(value) => handleChange('douleurRepos', value)}
        />
        <PainScale
          label="Douleur au mouvement"
          value={data.douleurMouvement}
          onChange={(value) => handleChange('douleurMouvement', value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <PainScale
          label="Douleur nocturne"
          value={data.douleurNocturne}
          onChange={(value) => handleChange('douleurNocturne', value)}
        />
        <PainScale
          label="Gonflement du genou"
          value={data.gonflementGenou}
          onChange={(value) => handleChange('gonflementGenou', value)}
        />
      </div>

      <div className="mt-6">
        <label className="form-label">Localisation de la douleur</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          {localisations.map(loc => (
            <label key={loc} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.localisationDouleur?.includes(loc) || false}
                onChange={() => handleLocalisationChange(loc)}
                className="form-checkbox"
              />
              <span className="text-sm">{loc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid-cols-2-gap mt-6">
        <FormSelect
          label="Épanchement"
          name="epanchement"
          value={data.epanchement}
          onChange={(e) => handleChange('epanchement', e.target.value)}
          options={[
            { value: 'Absent', label: 'Absent' },
            { value: 'Minime', label: 'Minime' },
            { value: 'Modéré', label: 'Modéré' },
            { value: 'Important', label: 'Important' }
          ]}
          required
        />

        <div>
          <label className="form-label">Signes inflammatoires</label>
          <label className="flex items-center space-x-2 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.chaleurRouge}
              onChange={(e) => handleChange('chaleurRouge', e.target.checked)}
              className="form-checkbox"
            />
            <span>Chaleur / Rougeur</span>
          </label>
        </div>
      </div>
    </div>
  )
}
