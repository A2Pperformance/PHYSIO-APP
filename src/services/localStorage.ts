import { LCAAssessment } from '../types/lca-assessment';

const STORAGE_KEY = 'a2p-physio-assessments';
const CURRENT_ASSESSMENT_KEY = 'a2p-current-assessment';

/**
 * Service de gestion du stockage local des bilans
 */
export class LocalStorageService {
  /**
   * Sauvegarde un bilan dans le localStorage
   */
  static saveAssessment(assessment: LCAAssessment): void {
    try {
      const assessments = this.getAllAssessments();
      const existingIndex = assessments.findIndex((a) => a.id === assessment.id);

      if (existingIndex >= 0) {
        assessments[existingIndex] = assessment;
      } else {
        assessments.push(assessment);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
      console.log('✓ Bilan sauvegardé avec succès:', assessment.id);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw new Error('Impossible de sauvegarder le bilan');
    }
  }

  /**
   * Récupère tous les bilans sauvegardés
   */
  static getAllAssessments(): LCAAssessment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des bilans:', error);
      return [];
    }
  }

  /**
   * Récupère un bilan par son ID
   */
  static getAssessmentById(id: string): LCAAssessment | null {
    const assessments = this.getAllAssessments();
    return assessments.find((a) => a.id === id) || null;
  }

  /**
   * Supprime un bilan
   */
  static deleteAssessment(id: string): void {
    try {
      const assessments = this.getAllAssessments();
      const filtered = assessments.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      console.log('✓ Bilan supprimé:', id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw new Error('Impossible de supprimer le bilan');
    }
  }

  /**
   * Sauvegarde le bilan en cours (brouillon)
   */
  static saveCurrentAssessment(assessment: Partial<LCAAssessment>): void {
    try {
      localStorage.setItem(CURRENT_ASSESSMENT_KEY, JSON.stringify(assessment));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du brouillon:', error);
    }
  }

  /**
   * Récupère le bilan en cours
   */
  static getCurrentAssessment(): Partial<LCAAssessment> | null {
    try {
      const data = localStorage.getItem(CURRENT_ASSESSMENT_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération du brouillon:', error);
      return null;
    }
  }

  /**
   * Efface le bilan en cours
   */
  static clearCurrentAssessment(): void {
    localStorage.removeItem(CURRENT_ASSESSMENT_KEY);
  }

  /**
   * Exporte tous les bilans en JSON
   */
  static exportAllAssessments(): string {
    const assessments = this.getAllAssessments();
    return JSON.stringify(assessments, null, 2);
  }

  /**
   * Importe des bilans depuis un JSON
   */
  static importAssessments(jsonData: string): number {
    try {
      const imported = JSON.parse(jsonData) as LCAAssessment[];
      const existing = this.getAllAssessments();

      // Fusion des bilans (évite les doublons)
      const merged = [...existing];
      let count = 0;

      imported.forEach((newAssessment) => {
        const existingIndex = merged.findIndex((a) => a.id === newAssessment.id);
        if (existingIndex >= 0) {
          merged[existingIndex] = newAssessment;
        } else {
          merged.push(newAssessment);
          count++;
        }
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return count;
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      throw new Error('Format de données invalide');
    }
  }

  /**
   * Efface tous les bilans (avec confirmation)
   */
  static clearAllAssessments(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_ASSESSMENT_KEY);
  }

  /**
   * Récupère les statistiques de stockage
   */
  static getStorageStats(): {
    totalAssessments: number;
    storageSize: number;
    lastModified: string | null;
  } {
    const assessments = this.getAllAssessments();
    const data = localStorage.getItem(STORAGE_KEY) || '';
    const size = new Blob([data]).size;

    let lastModified: string | null = null;
    if (assessments.length > 0) {
      const dates = assessments.map((a) => new Date(a.dateEvaluation).getTime());
      lastModified = new Date(Math.max(...dates)).toISOString();
    }

    return {
      totalAssessments: assessments.length,
      storageSize: size,
      lastModified,
    };
  }
}
