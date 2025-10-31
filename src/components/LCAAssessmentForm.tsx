import React, { useState, useEffect } from 'react'
import { LCAAssessment } from '../types/lca-assessment'
import { PatientInfoSection } from './sections/PatientInfoSection'
import { ChirurgieInfoSection } from './sections/ChirurgieInfoSection'
import { DouleurGonflementSection } from './sections/DouleurGonflementSection'
import { BilanArticulaireSection } from './sections/BilanArticulaireSection'
import { BilanMusculaireSection } from './sections/BilanMusculaireSection'
import { TestsFonctionnelsSection } from './sections/TestsFonctionnelsSection'
import { ProprioceptionSection } from './sections/ProprioceptionSection'
import { ScoresSection } from './sections/ScoresSection'
import { ObjectifsSection } from './sections/ObjectifsSection'
import { PlanTraitementSection } from './sections/PlanTraitementSection'
import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'
import { FormTextarea } from './FormTextarea'

interface LCAAssessmentFormProps {
  onSave: (assessment: LCAAssessment) => void
  onPrint: () => void
  initialData?: LCAAssessment
}

const LCAAssessmentForm: React.FC<LCAAssessmentFormProps> = ({ onSave, onPrint, initialData }) => {
  const getInitialFormData = (): LCAAssessment => {
    if (initialData) return initialData

    return {
      id: `LCA-${Date.now()}`,
      dateEvaluation: new Date().toISOString().split('T')[0],
      joursPostOp: 0,
      phaseReeducation: 'Phase 1 (0-6 sem)',
      patientInfo: {
        id: '',
        nom: '',
        prenom: '',
        dateNaissance: '',
        age: 0,
        sexe: 'M',
        telephone: '',
        email: ''
      },
      chirurgieInfo: {
        dateChirurgie: '',
        typeLigamentoplastie: 'DT4',
        chirurgien: '',
        genouOpere: 'Gauche',
        lesionsAssociees: [],
        complicationsPostOp: ''
      },
      douleurGonflement: {
        douleurRepos: 0,
        douleurMouvement: 0,
        douleurNocturne: 0,
        localisationDouleur: [],
        gonflementGenou: 0,
        epanchement: 'Absent',
        chaleurRouge: false
      },
      bilanArticulaire: {
        flexionActive: 0,
        flexionPassive: 0,
        extensionActive: 0,
        extensionPassive: 0,
        qualiteFinCourseFlexion: 'Ferme',
        qualiteFinCourseExtension: 'Ferme',
        mobiliteRotulienne: 'Normale'
      },
      bilanMusculaire: {
        quadriceps: 0,
        ischiojambiers: 0,
        tricepsSural: 0,
        moyenFessier: 0,
        qualiteContractionQuadriceps: 'Moyenne',
        contractionIsolee: false,
        perimetreCuisseOpere: undefined,
        perimetreCuisseSain: undefined,
        amyotrophie: undefined
      },
      testsFonctionnels: {
        marcheAvecAides: false,
        qualiteMarche: 'Normale',
        perimetreMarche: 'Illimité',
        monteeEscaliers: 'Normal',
        descenteEscaliers: 'Normal',
        assisDeboût: 'Sans aide',
        unipodal: false,
        accroupissement: 'Impossible'
      },
      proprioception: {
        equilibreUnipodal: 0,
        equilibreYeuxFermes: 0,
        controleNeuromuscualire: 'Moyen',
        qualiteReception: 'Moyenne'
      },
      scoresEvaluation: {},
      objectifsTraitement: {
        objectifsCourt: [],
        objectifsMoyen: [],
        objectifsLong: [],
        frequenceSeances: '',
        nombreSeancesSemaine: 3
      },
      planTraitement: {
        techniquesManuelles: [],
        exercicesRenforcement: [],
        exercicesProprioception: [],
        exercicesMobilite: [],
        conseilsPatient: [],
        critereProgression: ''
      },
      observationsCliniques: '',
      precautionsContrIndications: [],
      kineNom: '',
      kineSignature: ''
    }
  }

  const [formData, setFormData] = useState<LCAAssessment>(getInitialFormData())

  // Calcul automatique des jours post-op
  useEffect(() => {
    if (formData.chirurgieInfo.dateChirurgie && formData.dateEvaluation) {
      const dateChir = new Date(formData.chirurgieInfo.dateChirurgie)
      const dateEval = new Date(formData.dateEvaluation)
      const diffTime = Math.abs(dateEval.getTime() - dateChir.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setFormData(prev => ({ ...prev, joursPostOp: diffDays }))
    }
  }, [formData.chirurgieInfo.dateChirurgie, formData.dateEvaluation])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handlePrecautionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const precautions = value.split(',').map(p => p.trim()).filter(p => p)
    setFormData(prev => ({ ...prev, precautionsContrIndications: precautions }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* En-tête de l'évaluation */}
      <div className="form-section">
        <h2 className="section-title">Informations de l'évaluation</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormInput
            label="Date d'évaluation"
            name="dateEvaluation"
            type="date"
            value={formData.dateEvaluation}
            onChange={(e) => setFormData({ ...formData, dateEvaluation: e.target.value })}
            required
          />

          <div>
            <label className="form-label">Jours post-opératoire</label>
            <div className="form-input bg-gray-100 font-bold text-primary-700 text-center text-lg">
              {formData.joursPostOp} jours
            </div>
          </div>

          <FormSelect
            label="Phase de rééducation"
            name="phaseReeducation"
            value={formData.phaseReeducation}
            onChange={(e) => setFormData({ ...formData, phaseReeducation: e.target.value as any })}
            options={[
              { value: 'Phase 1 (0-6 sem)', label: 'Phase 1 (0-6 semaines)' },
              { value: 'Phase 2 (6-12 sem)', label: 'Phase 2 (6-12 semaines)' },
              { value: 'Phase 3 (3-6 mois)', label: 'Phase 3 (3-6 mois)' },
              { value: 'Phase 4 (6-9 mois)', label: 'Phase 4 (6-9 mois)' },
              { value: 'Phase 5 (9-12 mois)', label: 'Phase 5 (9-12 mois)' }
            ]}
            required
          />

          <FormInput
            label="ID de l'évaluation"
            name="id"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Sections du formulaire */}
      <PatientInfoSection
        data={formData.patientInfo}
        onChange={(data) => setFormData({ ...formData, patientInfo: data })}
      />

      <ChirurgieInfoSection
        data={formData.chirurgieInfo}
        onChange={(data) => setFormData({ ...formData, chirurgieInfo: data })}
      />

      <DouleurGonflementSection
        data={formData.douleurGonflement}
        onChange={(data) => setFormData({ ...formData, douleurGonflement: data })}
      />

      <BilanArticulaireSection
        data={formData.bilanArticulaire}
        onChange={(data) => setFormData({ ...formData, bilanArticulaire: data })}
      />

      <BilanMusculaireSection
        data={formData.bilanMusculaire}
        onChange={(data) => setFormData({ ...formData, bilanMusculaire: data })}
      />

      <TestsFonctionnelsSection
        data={formData.testsFonctionnels}
        onChange={(data) => setFormData({ ...formData, testsFonctionnels: data })}
      />

      <ProprioceptionSection
        data={formData.proprioception}
        onChange={(data) => setFormData({ ...formData, proprioception: data })}
      />

      <ScoresSection
        data={formData.scoresEvaluation}
        onChange={(data) => setFormData({ ...formData, scoresEvaluation: data })}
      />

      <ObjectifsSection
        data={formData.objectifsTraitement}
        onChange={(data) => setFormData({ ...formData, objectifsTraitement: data })}
      />

      <PlanTraitementSection
        data={formData.planTraitement}
        onChange={(data) => setFormData({ ...formData, planTraitement: data })}
      />

      {/* Observations cliniques */}
      <div className="form-section">
        <h2 className="section-title">11. Observations Cliniques et Précautions</h2>

        <FormTextarea
          label="Observations cliniques"
          name="observationsCliniques"
          value={formData.observationsCliniques}
          onChange={(e) => setFormData({ ...formData, observationsCliniques: e.target.value })}
          placeholder="Notes cliniques, particularités, éléments importants à noter..."
          rows={6}
        />

        <div className="mt-4">
          <label className="form-label">
            Précautions et contre-indications (séparer par des virgules)
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Ex: Pas de pivot, Éviter flexion > 90° sous charge, Pas de course..."
            value={formData.precautionsContrIndications.join(', ')}
            onChange={handlePrecautionsChange}
          />
        </div>
      </div>

      {/* Informations kinésithérapeute */}
      <div className="form-section">
        <h2 className="section-title">Kinésithérapeute</h2>

        <div className="grid-cols-2-gap">
          <FormInput
            label="Nom du kinésithérapeute"
            name="kineNom"
            value={formData.kineNom}
            onChange={(e) => setFormData({ ...formData, kineNom: e.target.value })}
            required
          />

          <FormInput
            label="Date du prochain bilan"
            name="dateProchainBilan"
            type="date"
            value={formData.dateProchainBilan || ''}
            onChange={(e) => setFormData({ ...formData, dateProchainBilan: e.target.value })}
          />
        </div>

        <FormTextarea
          label="Signature / Notes"
          name="kineSignature"
          value={formData.kineSignature || ''}
          onChange={(e) => setFormData({ ...formData, kineSignature: e.target.value })}
          placeholder="Signature électronique, cachet, ou notes complémentaires..."
          rows={3}
          className="mt-4"
        />
      </div>

      {/* Boutons d'action */}
      <div className="form-section no-print">
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            type="button"
            onClick={onPrint}
            className="btn-secondary"
          >
            🖨️ Imprimer / Exporter PDF
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            💾 Sauvegarder la fiche bilan
          </button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 Conseil:</strong> Pensez à sauvegarder régulièrement votre travail.
            Utilisez l'impression pour générer un PDF de la fiche bilan.
          </p>
        </div>
      </div>
    </form>
  )
}

export default LCAAssessmentForm
