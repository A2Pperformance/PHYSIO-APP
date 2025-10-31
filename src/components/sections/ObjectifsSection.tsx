import React from 'react'
import { FormInput } from '../FormInput'
import { FormTextarea } from '../FormTextarea'
import { ObjectifsTraitement } from '../../types/lca-assessment'

interface ObjectifsSectionProps {
  data: ObjectifsTraitement
  onChange: (data: ObjectifsTraitement) => void
}

export const ObjectifsSection: React.FC<ObjectifsSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ObjectifsTraitement, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const handleArrayChange = (field: 'objectifsCourt' | 'objectifsMoyen' | 'objectifsLong', value: string) => {
    const items = value.split('\n').map(item => item.trim()).filter(item => item)
    handleChange(field, items)
  }

  return (
    <div className="form-section">
      <h2 className="section-title">9. Objectifs de Traitement</h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-blue-800">
          <strong>Objectifs SMART:</strong> Spécifiques, Mesurables, Atteignables, Réalistes, Temporellement définis.
          Séparez chaque objectif par une nouvelle ligne.
        </p>
      </div>

      {/* Court terme */}
      <div className="bg-green-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-lg mb-3 text-green-800">
          📅 Court terme (0-6 semaines)
        </h3>
        <FormTextarea
          label="Objectifs"
          name="objectifsCourt"
          value={data.objectifsCourt.join('\n')}
          onChange={(e) => handleArrayChange('objectifsCourt', e.target.value)}
          placeholder="Ex:&#10;- Diminuer la douleur à 3/10&#10;- Récupérer extension complète&#10;- Obtenir flexion à 90°&#10;- Marcher sans boiterie"
          rows={6}
        />
        {data.objectifsCourt.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium text-green-700">Objectifs définis:</p>
            <ul className="list-disc list-inside text-sm text-green-800 mt-1">
              {data.objectifsCourt.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Moyen terme */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-lg mb-3 text-yellow-800">
          📅 Moyen terme (6 semaines - 3 mois)
        </h3>
        <FormTextarea
          label="Objectifs"
          name="objectifsMoyen"
          value={data.objectifsMoyen.join('\n')}
          onChange={(e) => handleArrayChange('objectifsMoyen', e.target.value)}
          placeholder="Ex:&#10;- Flexion complète (130°)&#10;- Force quadriceps 4/5&#10;- Marche normale sans aides&#10;- Vélo sans douleur"
          rows={6}
        />
        {data.objectifsMoyen.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium text-yellow-700">Objectifs définis:</p>
            <ul className="list-disc list-inside text-sm text-yellow-800 mt-1">
              {data.objectifsMoyen.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Long terme */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-lg mb-3 text-blue-800">
          📅 Long terme (3-9 mois)
        </h3>
        <FormTextarea
          label="Objectifs"
          name="objectifsLong"
          value={data.objectifsLong.join('\n')}
          onChange={(e) => handleArrayChange('objectifsLong', e.target.value)}
          placeholder="Ex:&#10;- Retour aux activités sportives&#10;- Force symétrique > 90%&#10;- Tests fonctionnels validés&#10;- ACL-RSI > 56"
          rows={6}
        />
        {data.objectifsLong.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium text-blue-700">Objectifs définis:</p>
            <ul className="list-disc list-inside text-sm text-blue-800 mt-1">
              {data.objectifsLong.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Fréquence */}
      <div className="grid-cols-2-gap mt-6">
        <FormInput
          label="Nombre de séances par semaine"
          name="nombreSeancesSemaine"
          type="number"
          value={data.nombreSeancesSemaine}
          onChange={(e) => handleChange('nombreSeancesSemaine', parseInt(e.target.value))}
          min={1}
          max={7}
          required
        />
        <FormInput
          label="Fréquence recommandée"
          name="frequenceSeances"
          value={data.frequenceSeances}
          onChange={(e) => handleChange('frequenceSeances', e.target.value)}
          placeholder="Ex: 3x/semaine pendant 2 mois"
          required
        />
      </div>
    </div>
  )
}
