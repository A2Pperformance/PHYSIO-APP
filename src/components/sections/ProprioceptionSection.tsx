import React from 'react'
import { FormInput } from '../FormInput'
import { FormSelect } from '../FormSelect'
import { Proprioception } from '../../types/lca-assessment'

interface ProprioceptionSectionProps {
  data: Proprioception
  onChange: (data: Proprioception) => void
}

export const ProprioceptionSection: React.FC<ProprioceptionSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof Proprioception, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">7. Proprioception et Contrôle Neuromusculaire</h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> La proprioception est essentielle pour la prévention des récidives.
          Ces tests évaluent la capacité du patient à contrôler son genou dans l'espace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <FormInput
            label="Équilibre unipodal yeux ouverts (secondes)"
            name="equilibreUnipodal"
            type="number"
            value={data.equilibreUnipodal}
            onChange={(e) => handleChange('equilibreUnipodal', parseInt(e.target.value))}
            min={0}
            placeholder="Ex: 30"
            required
          />
          <div className="mt-2 text-sm text-gray-600">
            <span className={`font-semibold ${
              data.equilibreUnipodal >= 30 ? 'text-green-600' :
              data.equilibreUnipodal >= 15 ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {data.equilibreUnipodal >= 30 ? '✓ Bon' :
               data.equilibreUnipodal >= 15 ? '⚠ Moyen' :
               '✗ Faible'}
            </span>
            {' '}(Normal: ≥ 30 sec)
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <FormInput
            label="Équilibre unipodal yeux fermés (secondes)"
            name="equilibreYeuxFermes"
            type="number"
            value={data.equilibreYeuxFermes}
            onChange={(e) => handleChange('equilibreYeuxFermes', parseInt(e.target.value))}
            min={0}
            placeholder="Ex: 15"
            required
          />
          <div className="mt-2 text-sm text-gray-600">
            <span className={`font-semibold ${
              data.equilibreYeuxFermes >= 15 ? 'text-green-600' :
              data.equilibreYeuxFermes >= 8 ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {data.equilibreYeuxFermes >= 15 ? '✓ Bon' :
               data.equilibreYeuxFermes >= 8 ? '⚠ Moyen' :
               '✗ Faible'}
            </span>
            {' '}(Normal: ≥ 15 sec)
          </div>
        </div>
      </div>

      <div className="grid-cols-2-gap mt-6">
        <FormSelect
          label="Contrôle neuromusculaire"
          name="controleNeuromuscualire"
          value={data.controleNeuromuscualire}
          onChange={(e) => handleChange('controleNeuromuscualire', e.target.value)}
          options={[
            { value: 'Bon', label: 'Bon - Contrôle stable et précis' },
            { value: 'Moyen', label: 'Moyen - Quelques compensations' },
            { value: 'Faible', label: 'Faible - Instabilité marquée' }
          ]}
          required
        />

        <FormSelect
          label="Qualité de réception (saut)"
          name="qualiteReception"
          value={data.qualiteReception}
          onChange={(e) => handleChange('qualiteReception', e.target.value)}
          options={[
            { value: 'Bonne', label: 'Bonne - Réception contrôlée' },
            { value: 'Moyenne', label: 'Moyenne - Légère instabilité' },
            { value: 'Faible', label: 'Faible - Réception non contrôlée' }
          ]}
          required
        />
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
        <h4 className="font-semibold mb-2 text-orange-800">Note clinique:</h4>
        <p className="text-sm text-gray-700">
          La rééducation proprioceptive doit être progressive, du stable vers l'instable,
          du statique vers le dynamique. Ne pas négliger cette composante essentielle
          pour un retour au sport sécurisé.
        </p>
      </div>
    </div>
  )
}
