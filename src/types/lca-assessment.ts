export interface PatientInfo {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  age: number;
  sexe: 'M' | 'F' | 'Autre';
  telephone?: string;
  email?: string;
}

export interface ChirurgieInfo {
  dateChirurgie: string;
  typeLigamentoplastie: 'DT4' | 'DIDT' | 'Kenneth-Jones' | 'Autre';
  autreType?: string;
  chirurgien: string;
  genouOpere: 'Gauche' | 'Droit';
  lesionsAssociees?: string[];
  complicationsPostOp?: string;
}

export interface DouleurGonflement {
  douleurRepos: number; // 0-10 EVA
  douleurMouvement: number; // 0-10 EVA
  douleurNocturne: number; // 0-10 EVA
  localisationDouleur: string[];
  gonflementGenou: number; // 0-10
  epanchement: 'Absent' | 'Minime' | 'Modéré' | 'Important';
  chaleurRouge: boolean;
}

export interface BilanArticulaire {
  // Flexion en degrés
  flexionActive: number;
  flexionPassive: number;
  // Extension en degrés (0 = extension complète, valeur positive = flexum)
  extensionActive: number;
  extensionPassive: number;
  // Qualité de fin de course
  qualiteFinCourseFlexion: 'Souple' | 'Ferme' | 'Dure' | 'Vide';
  qualiteFinCourseExtension: 'Souple' | 'Ferme' | 'Dure' | 'Vide';
  // Mobilité rotulienne
  mobiliteRotulienne: 'Normale' | 'Diminuée' | 'Adhérences';
}

export interface BilanMusculaire {
  // Testing musculaire (échelle 0-5)
  quadriceps: number;
  ischiojambiers: number;
  tricepsSural: number;
  moyenFessier: number;
  // Qualité contraction
  qualiteContractionQuadriceps: 'Bonne' | 'Moyenne' | 'Faible';
  contractionIsolee: boolean;
  // Amyotrophie (cm)
  perimetreCuisseOpere?: number;
  perimetreCuisseSain?: number;
  amyotrophie?: number; // Calculé automatiquement
}

export interface TestsFonctionnels {
  // Marche
  marcheAvecAides: boolean;
  typeAide?: 'Cannes' | 'Béquilles' | 'Attelle';
  qualiteMarche: 'Normale' | 'Boiterie légère' | 'Boiterie importante';
  perimetreMarche: 'Illimité' | '< 30min' | '< 15min' | '< 5min';

  // Escaliers
  monteeEscaliers: 'Normal' | 'Marche par marche' | 'Avec aide' | 'Impossible';
  descenteEscaliers: 'Normal' | 'Marche par marche' | 'Avec aide' | 'Impossible';

  // Tests fonctionnels
  assisDeboût: 'Sans aide' | 'Avec aide mains' | 'Impossible';
  unipodal: boolean;
  dureeUnipodal?: number; // en secondes
  accroupissement: 'Complet' | 'Partiel' | 'Impossible';
}

export interface Proprioception {
  equilibreUnipodal: number; // en secondes
  equilibreYeuxFermes: number; // en secondes
  controleNeuromuscualire: 'Bon' | 'Moyen' | 'Faible';
  qualiteReception: 'Bonne' | 'Moyenne' | 'Faible';
}

export interface ScoresEvaluation {
  // IKDC Subjectif (0-100)
  ikdcScore?: number;
  // Lysholm (0-100)
  lysholmScore?: number;
  // KOOS (0-100 pour chaque sous-section)
  koosSymptomes?: number;
  koosDouleur?: number;
  koosAVQ?: number;
  koosSportLoisirs?: number;
  koosQualiteVie?: number;
  // ACL-RSI (0-100)
  aclRSI?: number;
}

export interface ObjectifsTraitement {
  objectifsCourt: string[];
  objectifsMoyen: string[];
  objectifsLong: string[];
  frequenceSeances: string;
  nombreSeancesSemaine: number;
}

export interface PlanTraitement {
  techniquesManuelles: string[];
  exercicesRenforcement: string[];
  exercicesProprioception: string[];
  exercicesMobilite: string[];
  conseilsPatient: string[];
  critereProgression: string;
}

export interface LCAAssessment {
  id: string;
  dateEvaluation: string;
  joursPostOp: number; // Calculé automatiquement
  phaseReeducation: 'Phase 1 (0-6 sem)' | 'Phase 2 (6-12 sem)' | 'Phase 3 (3-6 mois)' | 'Phase 4 (6-9 mois)' | 'Phase 5 (9-12 mois)';

  // Sections du bilan
  patientInfo: PatientInfo;
  chirurgieInfo: ChirurgieInfo;
  douleurGonflement: DouleurGonflement;
  bilanArticulaire: BilanArticulaire;
  bilanMusculaire: BilanMusculaire;
  testsFonctionnels: TestsFonctionnels;
  proprioception: Proprioception;
  scoresEvaluation: ScoresEvaluation;
  objectifsTraitement: ObjectifsTraitement;
  planTraitement: PlanTraitement;

  // Notes cliniques
  observationsCliniques: string;
  precautionsContrIndications: string[];

  // Infos kinésithérapeute
  kineNom: string;
  kineSignature?: string;

  // Prochaine évaluation
  dateProchainBilan?: string;
}
