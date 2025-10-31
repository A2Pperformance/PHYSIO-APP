import React from 'react'
import { FormInput } from '../FormInput'
import { FormSelect } from '../FormSelect'
import { TestsFonctionnels } from '../../types/lca-assessment'

interface TestsFonctionnelsSectionProps {
  data: TestsFonctionnels
  onChange: (data: TestsFonctionnels) => void
}

export const TestsFonctionnelsSection: React.FC<TestsFonctionnelsSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof TestsFonctionnels, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">6. Tests Fonctionnels</h2>

      {/* Marche */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4 text-primary-700">Marche</h3>

        <div className="mb-4">
          <label className="form-label">Aides techniques</label>
          <label className="flex items-center space-x-2 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.marcheAvecAides}
              onChange={(e) => handleChange('marcheAvecAides', e.target.checked)}
              className="form-checkbox"
            />
            <span>Utilise des aides à la marche</span>
          </label>
        </div>

        {data.marcheAvecAides && (
          <FormSelect
            label="Type d'aide"
            name="typeAide"
            value={data.typeAide || ''}
            onChange={(e) => handleChange('typeAide', e.target.value)}
            options={[
              { value: 'Cannes', label: 'Cannes' },
              { value: 'Béquilles', label: 'Béquilles' },
              { value: 'Attelle', label: 'Attelle' }
            ]}
          />
        )}

        <div className="grid-cols-2-gap mt-4">
          <FormSelect
            label="Qualité de la marche"
            name="qualiteMarche"
            value={data.qualiteMarche}
            onChange={(e) => handleChange('qualiteMarche', e.target.value)}
            options={[
              { value: 'Normale', label: 'Normale' },
              { value: 'Boiterie légère', label: 'Boiterie légère' },
              { value: 'Boiterie importante', label: 'Boiterie importante' }
            ]}
            required
          />

          <FormSelect
            label="Périmètre de marche"
            name="perimetreMarche"
            value={data.perimetreMarche}
            onChange={(e) => handleChange('perimetreMarche', e.target.value)}
            options={[
              { value: 'Illimité', label: 'Illimité' },
              { value: '< 30min', label: 'Moins de 30 minutes' },
              { value: '< 15min', label: 'Moins de 15 minutes' },
              { value: '< 5min', label: 'Moins de 5 minutes' }
            ]}
            required
          />
        </div>
      </div>

      {/* Escaliers */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4 text-primary-700">Escaliers</h3>
        <div className="grid-cols-2-gap">
          <FormSelect
            label="Montée d'escaliers"
            name="monteeEscaliers"
            value={data.monteeEscaliers}
            onChange={(e) => handleChange('monteeEscaliers', e.target.value)}
            options={[
              { value: 'Normal', label: 'Normal (alterné)' },
              { value: 'Marche par marche', label: 'Marche par marche' },
              { value: 'Avec aide', label: 'Avec aide (rampe/canne)' },
              { value: 'Impossible', label: 'Impossible' }
            ]}
            required
          />

          <FormSelect
            label="Descente d'escaliers"
            name="descenteEscaliers"
            value={data.descenteEscaliers}
            onChange={(e) => handleChange('descenteEscaliers', e.target.value)}
            options={[
              { value: 'Normal', label: 'Normal (alterné)' },
              { value: 'Marche par marche', label: 'Marche par marche' },
              { value: 'Avec aide', label: 'Avec aide (rampe/canne)' },
              { value: 'Impossible', label: 'Impossible' }
            ]}
            required
          />
        </div>
      </div>

      {/* Tests spécifiques */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-4 text-primary-700">Tests spécifiques</h3>

        <FormSelect
          label="Assis-Debout"
          name="assisDeboût"
          value={data.assisDeboût}
          onChange={(e) => handleChange('assisDeboût', e.target.value)}
          options={[
            { value: 'Sans aide', label: 'Sans aide des mains' },
            { value: 'Avec aide mains', label: 'Avec aide des mains' },
            { value: 'Impossible', label: 'Impossible' }
          ]}
          required
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Appui unipodal possible</label>
            <label className="flex items-center space-x-2 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.unipodal}
                onChange={(e) => handleChange('unipodal', e.target.checked)}
                className="form-checkbox"
              />
              <span>Oui, tient en appui unipodal</span>
            </label>
          </div>

          {data.unipodal && (
            <FormInput
              label="Durée appui unipodal (secondes)"
              name="dureeUnipodal"
              type="number"
              value={data.dureeUnipodal || ''}
              onChange={(e) => handleChange('dureeUnipodal', parseInt(e.target.value))}
              min={0}
              placeholder="Ex: 30"
            />
          )}
        </div>

        <FormSelect
          label="Accroupissement"
          name="accroupissement"
          value={data.accroupissement}
          onChange={(e) => handleChange('accroupissement', e.target.value)}
          options={[
            { value: 'Complet', label: 'Complet' },
            { value: 'Partiel', label: 'Partiel' },
            { value: 'Impossible', label: 'Impossible' }
          ]}
          required
          className="mt-4"
        />
      </div>
    </div>
  )
}
