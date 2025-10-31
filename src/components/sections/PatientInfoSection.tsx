import React from 'react'
import { FormInput } from '../FormInput'
import { FormSelect } from '../FormSelect'
import { PatientInfo } from '../../types/lca-assessment'

interface PatientInfoSectionProps {
  data: PatientInfo
  onChange: (data: PatientInfo) => void
}

export const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PatientInfo, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">1. Informations Patient</h2>

      <div className="grid-cols-3-gap">
        <FormInput
          label="Nom"
          name="nom"
          value={data.nom}
          onChange={(e) => handleChange('nom', e.target.value)}
          required
        />
        <FormInput
          label="Prénom"
          name="prenom"
          value={data.prenom}
          onChange={(e) => handleChange('prenom', e.target.value)}
          required
        />
        <FormSelect
          label="Sexe"
          name="sexe"
          value={data.sexe}
          onChange={(e) => handleChange('sexe', e.target.value)}
          options={[
            { value: 'M', label: 'Masculin' },
            { value: 'F', label: 'Féminin' },
            { value: 'Autre', label: 'Autre' }
          ]}
          required
        />
      </div>

      <div className="grid-cols-3-gap mt-4">
        <FormInput
          label="Date de naissance"
          name="dateNaissance"
          type="date"
          value={data.dateNaissance}
          onChange={(e) => {
            const date = e.target.value
            handleChange('dateNaissance', date)
            // Calcul automatique de l'âge
            if (date) {
              const today = new Date()
              const birthDate = new Date(date)
              let age = today.getFullYear() - birthDate.getFullYear()
              const monthDiff = today.getMonth() - birthDate.getMonth()
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--
              }
              handleChange('age', age)
            }
          }}
          required
        />
        <FormInput
          label="Âge"
          name="age"
          type="number"
          value={data.age}
          onChange={(e) => handleChange('age', parseInt(e.target.value))}
          required
        />
        <FormInput
          label="ID Patient"
          name="id"
          value={data.id}
          onChange={(e) => handleChange('id', e.target.value)}
          required
        />
      </div>

      <div className="grid-cols-2-gap mt-4">
        <FormInput
          label="Téléphone"
          name="telephone"
          type="tel"
          value={data.telephone || ''}
          onChange={(e) => handleChange('telephone', e.target.value)}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
    </div>
  )
}
