import { useState } from 'react';
import { LCAAssessment } from '../types/lca-assessment';
import { LocalStorageService } from '../services/localStorage';
import { exportBilanAsHTML, printBilan } from '../utils/bilanGenerator';
import {
  calculateDaysPostOp,
  determinePhase,
  calculateRecoveryScore,
  calculateROMScore,
  calculateAveragePain,
  calculateBadge,
} from '../utils/calculations';

interface AIAssistantProps {
  assessment: LCAAssessment;
  onUpdate: (assessment: LCAAssessment) => void;
}

const AIAssistant = ({ assessment, onUpdate }: AIAssistantProps) => {
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'export' | 'history'>('overview');

  // Calculs automatiques
  const joursPostOp = calculateDaysPostOp(
    assessment.chirurgieInfo.dateChirurgie,
    assessment.dateEvaluation
  );

  const phase = determinePhase(joursPostOp);

  const romScore = calculateROMScore(
    assessment.bilanArticulaire.flexionActive,
    assessment.bilanArticulaire.extensionActive
  );

  const avgPain = calculateAveragePain(
    assessment.douleurGonflement.douleurRepos,
    assessment.douleurGonflement.douleurMouvement,
    assessment.douleurGonflement.douleurNocturne
  );

  const recoveryScore = calculateRecoveryScore({
    romScore,
    muscleStrength: assessment.bilanMusculaire.quadriceps,
    painLevel: avgPain,
    functionalScore: assessment.testsFonctionnels.unipodal ? 80 : 50,
  });

  const recoveryBadge = calculateBadge(recoveryScore);
  const romBadge = calculateBadge(romScore);

  const handleSave = () => {
    const updatedAssessment = {
      ...assessment,
      joursPostOp,
      phaseReeducation: phase as any,
    };
    LocalStorageService.saveAssessment(updatedAssessment);
    onUpdate(updatedAssessment);
    alert('✓ Bilan sauvegardé avec succès !');
  };

  const handleExportHTML = () => {
    exportBilanAsHTML(assessment);
  };

  const handlePrint = () => {
    printBilan(assessment);
  };

  const savedAssessments = LocalStorageService.getAllAssessments();
  const stats = LocalStorageService.getStorageStats();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bouton flottant */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
        title="Assistant IA A2P"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </button>

      {/* Panneau d'édition */}
      {showPanel && (
        <div className="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-[600px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Assistant IA A2P</h3>
              <button
                onClick={() => setShowPanel(false)}
                className="text-white hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm mt-1 opacity-90">Excellence en Kinésithérapie</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Aperçu
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'export'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Export
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'history'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Historique
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Score de récupération */}
                <div className="bg-gradient-to-br from-primary-50 to-white p-4 rounded-lg border border-primary-200">
                  <div className="text-sm text-gray-600 mb-1">Score de récupération</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold text-primary-700">
                      {recoveryScore}
                      <span className="text-lg text-gray-500">/100</span>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: recoveryBadge.bgColor,
                        color: recoveryBadge.color,
                      }}
                    >
                      {recoveryBadge.label}
                    </span>
                  </div>
                </div>

                {/* Informations clés */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Jours post-op</span>
                    <span className="font-semibold">{joursPostOp} jours</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Phase</span>
                    <span className="font-semibold text-sm">{phase}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">ROM Score</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{romScore}/100</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: romBadge.bgColor,
                          color: romBadge.color,
                        }}
                      >
                        {romBadge.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Douleur moy.</span>
                    <span className="font-semibold">{avgPain}/10</span>
                  </div>
                </div>

                {/* Recommandations IA */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <div className="text-blue-600 mt-0.5">💡</div>
                    <div>
                      <div className="font-semibold text-blue-900 text-sm mb-1">
                        Recommandations
                      </div>
                      <ul className="text-xs text-blue-800 space-y-1">
                        {recoveryScore < 50 && (
                          <li>• Score faible : intensifier la rééducation</li>
                        )}
                        {avgPain > 5 && (
                          <li>• Douleur élevée : adapter l'intensité des exercices</li>
                        )}
                        {romScore < 70 && (
                          <li>• Mobilité limitée : privilégier les exercices de ROM</li>
                        )}
                        {assessment.bilanMusculaire.quadriceps < 3 && (
                          <li>• Renforcer le quadriceps (force &lt; 3/5)</li>
                        )}
                        {!assessment.testsFonctionnels.unipodal && (
                          <li>• Travailler l'équilibre unipodal</li>
                        )}
                        {recoveryScore >= 70 && avgPain <= 3 && (
                          <li>• Excellente progression ! Continuer le travail</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  <span>Sauvegarder</span>
                </button>

                <button
                  onClick={handleExportHTML}
                  className="w-full btn-secondary py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Export HTML</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  <span>Imprimer</span>
                </button>

                <div className="border-t pt-3 mt-4">
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>✓ Charte graphique A2P intégrée</p>
                    <p>✓ Calculs automatiques des scores</p>
                    <p>✓ Badges de performance inclus</p>
                    <p>✓ Format professionnel prêt à imprimer</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Statistiques</div>
                  <div className="text-sm">
                    <p>
                      <strong>{stats.totalAssessments}</strong> bilans sauvegardés
                    </p>
                    <p>
                      <strong>{Math.round(stats.storageSize / 1024)} Ko</strong> utilisés
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {savedAssessments.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Aucun bilan sauvegardé
                    </p>
                  ) : (
                    savedAssessments
                      .slice()
                      .reverse()
                      .slice(0, 5)
                      .map((saved) => (
                        <div
                          key={saved.id}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="font-semibold text-sm">
                            {saved.patientInfo.prenom} {saved.patientInfo.nom}
                          </div>
                          <div className="text-xs text-gray-600">
                            {new Date(saved.dateEvaluation).toLocaleDateString('fr-FR')} -{' '}
                            J+{saved.joursPostOp}
                          </div>
                        </div>
                      ))
                  )}
                </div>

                {savedAssessments.length > 5 && (
                  <p className="text-xs text-gray-500 text-center">
                    +{savedAssessments.length - 5} autres bilans
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
