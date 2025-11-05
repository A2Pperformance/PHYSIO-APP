// Utilitaires de calcul pour les bilans kinésithérapiques

/**
 * Calcule l'asymétrie entre deux valeurs (côté opéré vs sain)
 * @param operated Valeur du côté opéré
 * @param healthy Valeur du côté sain
 * @returns Pourcentage d'asymétrie (0-100)
 */
export function calculateAsymmetry(operated: number, healthy: number): number {
  if (healthy === 0) return 0;
  const asymmetry = Math.abs(operated - healthy) / healthy * 100;
  return Math.round(asymmetry * 10) / 10; // Arrondi à 1 décimale
}

/**
 * Calcule le déficit en pourcentage
 * @param operated Valeur du côté opéré
 * @param healthy Valeur du côté sain
 * @returns Pourcentage du côté opéré par rapport au côté sain
 */
export function calculateDeficit(operated: number, healthy: number): number {
  if (healthy === 0) return 0;
  const percentage = (operated / healthy) * 100;
  return Math.round(percentage * 10) / 10;
}

/**
 * Calcule l'amyotrophie (différence de périmètre de cuisse)
 * @param operatedPerimeter Périmètre du côté opéré (cm)
 * @param healthyPerimeter Périmètre du côté sain (cm)
 * @returns Différence en cm (valeur positive = atrophie)
 */
export function calculateAtrophy(operatedPerimeter: number, healthyPerimeter: number): number {
  return Math.round((healthyPerimeter - operatedPerimeter) * 10) / 10;
}

/**
 * Calcule le score global de ROM (Range of Motion)
 * @param flexion Flexion en degrés
 * @param extension Extension en degrés (0 = normal, positif = flexum)
 * @returns Score de 0 à 100
 */
export function calculateROMScore(flexion: number, extension: number): number {
  // Référence normale: flexion 135°, extension 0°
  const normalFlexion = 135;
  const flexionScore = Math.min((flexion / normalFlexion) * 100, 100);
  const extensionPenalty = extension * 5; // -5 points par degré de flexum
  const totalScore = Math.max(0, flexionScore - extensionPenalty);
  return Math.round(totalScore);
}

/**
 * Calcule un badge d'évaluation basé sur un score
 * @param score Score de 0 à 100
 * @returns Object avec label et couleur du badge
 */
export function calculateBadge(score: number): { label: string; color: string; bgColor: string } {
  if (score >= 90) {
    return { label: '🏆 Excellence', color: '#059669', bgColor: '#d1fae5' };
  } else if (score >= 70) {
    return { label: '✓ Bonne évolution', color: '#2563eb', bgColor: '#dbeafe' };
  } else if (score >= 50) {
    return { label: '⚠️ Attention requise', color: '#d97706', bgColor: '#fef3c7' };
  } else {
    return { label: '🔴 Alerte', color: '#dc2626', bgColor: '#fee2e2' };
  }
}

/**
 * Calcule le nombre de jours post-opératoires
 * @param surgeryDate Date de la chirurgie (ISO string)
 * @param assessmentDate Date de l'évaluation (ISO string)
 * @returns Nombre de jours
 */
export function calculateDaysPostOp(surgeryDate: string, assessmentDate: string): number {
  const surgery = new Date(surgeryDate);
  const assessment = new Date(assessmentDate);
  const diffTime = Math.abs(assessment.getTime() - surgery.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Détermine la phase de rééducation basée sur les jours post-op
 * @param daysPostOp Nombre de jours post-opératoires
 * @returns Phase de rééducation
 */
export function determinePhase(daysPostOp: number): string {
  if (daysPostOp <= 42) {
    return 'Phase 1 (0-6 sem)';
  } else if (daysPostOp <= 84) {
    return 'Phase 2 (6-12 sem)';
  } else if (daysPostOp <= 180) {
    return 'Phase 3 (3-6 mois)';
  } else if (daysPostOp <= 270) {
    return 'Phase 4 (6-9 mois)';
  } else {
    return 'Phase 5 (9-12 mois)';
  }
}

/**
 * Calcule le score de douleur moyen
 * @param rest Douleur au repos (0-10)
 * @param movement Douleur au mouvement (0-10)
 * @param night Douleur nocturne (0-10)
 * @returns Score moyen
 */
export function calculateAveragePain(rest: number, movement: number, night: number): number {
  return Math.round(((rest + movement + night) / 3) * 10) / 10;
}

/**
 * Évalue le Stroke Test pour l'effusion (épanchement)
 * @param strokeResult Résultat du Stroke Test
 * @returns Classification de l'effusion
 */
export function evaluateStrokeTest(strokeResult: 'Trace' | 'Petit' | 'Modéré' | 'Large'): {
  classification: string;
  severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  recommendation: string;
} {
  const evaluations = {
    'Trace': {
      classification: 'Trace (< 10ml)',
      severity: 'minimal' as const,
      recommendation: 'Épanchement minime. Poursuivre la rééducation normalement.',
    },
    'Petit': {
      classification: 'Petit épanchement (10-30ml)',
      severity: 'mild' as const,
      recommendation: 'Surveillance. Adapter l\'intensité des exercices si nécessaire.',
    },
    'Modéré': {
      classification: 'Épanchement modéré (30-60ml)',
      severity: 'moderate' as const,
      recommendation: 'Attention. Réduire l\'intensité, privilégier travail analytique.',
    },
    'Large': {
      classification: 'Épanchement important (> 60ml)',
      severity: 'severe' as const,
      recommendation: 'Alerte. Contacter le chirurgien. Repos relatif conseillé.',
    },
  };

  return evaluations[strokeResult];
}

/**
 * Calcule un score global de récupération
 * @param params Paramètres de récupération
 * @returns Score de 0 à 100
 */
export function calculateRecoveryScore(params: {
  romScore: number;
  muscleStrength: number;
  painLevel: number;
  functionalScore: number;
}): number {
  const { romScore, muscleStrength, painLevel, functionalScore } = params;

  // Pondération des différents paramètres
  const romWeight = 0.25;
  const strengthWeight = 0.30;
  const painWeight = 0.20; // Inversé (moins de douleur = meilleur)
  const functionalWeight = 0.25;

  const painScore = 100 - (painLevel * 10); // Conversion EVA 0-10 vers score 0-100 inversé

  const totalScore =
    (romScore * romWeight) +
    (muscleStrength * 20 * strengthWeight) + // Conversion 0-5 vers 0-100
    (painScore * painWeight) +
    (functionalScore * functionalWeight);

  return Math.round(totalScore);
}
