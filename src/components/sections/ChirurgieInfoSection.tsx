import React from 'react'
import { FormInput } from '../FormInput'
import { FormSelect } from '../FormSelect'
import { FormTextarea } from '../FormTextarea'
import { ChirurgieInfo } from '../../types/lca-assessment'

interface ChirurgieInfoSectionProps {
  data: ChirurgieInfo
  onChange: (data: ChirurgieInfo) => void
}

export const ChirurgieInfoSection: React.FC<ChirurgieInfoSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ChirurgieInfo, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const handleLesionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const lesions = value.split(',').map(l => l.trim()).filter(l => l)
    handleChange('lesionsAssociees', lesions)
  }

  return (
    <div className="form-section">
      <h2 className="section-title">2. Informations Chirurgicales</h2>

      <div className="grid-cols-2-gap">
        <FormInput
          label="Date de chirurgie"
          name="dateChirurgie"
          type="date"
          value={data.dateChirurgie}
          onChange={(e) => handleChange('dateChirurgie', e.target.value)}
          required
        />
        <FormInput
          label="Chirurgien"
          name="chirurgien"
          value={data.chirurgien}
          onChange={(e) => handleChange('chirurgien', e.target.value)}
          required
        />
      </div>

      <div className="grid-cols-3-gap mt-4">
        <FormSelect
          label="Type de ligamentoplastie"
          name="typeLigamentoplastie"
          value={data.typeLigamentoplastie}
          onChange={(e) => handleChange('typeLigamentoplastie', e.target.value)}
          options={[
            { value: 'DT4', label: 'DT4 (Droit Interne)' },
            { value: 'DIDT', label: 'DIDT (Droit Interne + Demi-Tendineux)' },
            { value: 'Kenneth-Jones', label: 'Kenneth-Jones (Tendon rotulien)' },
            { value: 'Autre', label: 'Autre' }
          ]}
          required
        />

        {data.typeLigamentoplastie === 'Autre' && (
          <FormInput
            label="Préciser le type"
            name="autreType"
            value={data.autreType || ''}
            onChange={(e) => handleChange('autreType', e.target.value)}
          />
        )}

        <FormSelect
          label="Genou opéré"
          name="genouOpere"
          value={data.genouOpere}
          onChange={(e) => handleChange('genouOpere', e.target.value)}
          options={[
            { value: 'Gauche', label: 'Gauche' },
            { value: 'Droit', label: 'Droit' }
          ]}
          required
        />
      </div>

      <div className="mt-4">
        <label className="form-label">
          Lésions associées (séparer par des virgules)
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Ex: Ménisque interne, LLI, lésion cartilagineuse..."
          value={data.lesionsAssociees?.join(', ') || ''}
          onChange={handleLesionsChange}
        />
      </div>

      <FormTextarea
        label="Complications post-opératoires"
        name="complicationsPostOp"
        value={data.complicationsPostOp || ''}
        onChange={(e) => handleChange('complicationsPostOp', e.target.value)}
        placeholder="Décrire toute complication..."
        className="mt-4"
      />
    </div>
  )
}
