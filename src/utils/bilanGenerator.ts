import { LCAAssessment } from '../types/lca-assessment';
import { a2pTheme } from '../theme/a2p-theme';
import {
  calculateAtrophy,
  calculateROMScore,
  calculateBadge,
  calculateAveragePain,
  calculateRecoveryScore,
} from './calculations';

/**
 * Génère un bilan HTML professionnel avec la charte graphique A2P
 */
export function generateBilanHTML(assessment: LCAAssessment): string {
  const {
    patientInfo,
    chirurgieInfo,
    douleurGonflement,
    bilanArticulaire,
    bilanMusculaire,
    testsFonctionnels,
    scoresEvaluation,
    objectifsTraitement,
    planTraitement,
    observationsCliniques,
    precautionsContrIndications,
    kineNom,
    dateEvaluation,
    joursPostOp,
    phaseReeducation,
  } = assessment;

  // Calculs automatiques
  const amyotrophie = bilanMusculaire.perimetreCuisseOpere && bilanMusculaire.perimetreCuisseSain
    ? calculateAtrophy(bilanMusculaire.perimetreCuisseOpere, bilanMusculaire.perimetreCuisseSain)
    : null;

  const romScore = calculateROMScore(bilanArticulaire.flexionActive, bilanArticulaire.extensionActive);
  const romBadge = calculateBadge(romScore);

  const avgPain = calculateAveragePain(
    douleurGonflement.douleurRepos,
    douleurGonflement.douleurMouvement,
    douleurGonflement.douleurNocturne
  );

  const recoveryScore = calculateRecoveryScore({
    romScore,
    muscleStrength: bilanMusculaire.quadriceps,
    painLevel: avgPain,
    functionalScore: testsFonctionnels.unipodal ? 80 : 50,
  });
  const recoveryBadge = calculateBadge(recoveryScore);

  // HTML Template
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bilan Kinésithérapie - ${patientInfo.prenom} ${patientInfo.nom}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #f9fafb;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, ${a2pTheme.colors.primary[700]} 0%, ${a2pTheme.colors.primary[500]} 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .header h2 {
      font-size: 1.5rem;
      font-weight: 400;
      opacity: 0.95;
    }

    .header .tagline {
      font-size: 1rem;
      opacity: 0.9;
      margin-top: 10px;
      font-style: italic;
    }

    .content {
      padding: 40px;
    }

    .section {
      margin-bottom: 40px;
      border-left: 4px solid ${a2pTheme.colors.primary[500]};
      padding-left: 20px;
    }

    .section-title {
      font-size: 1.75rem;
      color: ${a2pTheme.colors.primary[700]};
      margin-bottom: 20px;
      font-weight: 700;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .info-item {
      background: #f9fafb;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .info-label {
      font-size: 0.875rem;
      color: #4b5563;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }

    .info-value {
      font-size: 1.125rem;
      color: #111827;
      font-weight: 600;
    }

    .badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .badge-excellence {
      background: ${a2pTheme.badges.excellence.color}22;
      color: ${a2pTheme.badges.excellence.color};
      border: 2px solid ${a2pTheme.badges.excellence.color};
    }

    .badge-good {
      background: ${a2pTheme.badges.bonneEvolution.color}22;
      color: ${a2pTheme.badges.bonneEvolution.color};
      border: 2px solid ${a2pTheme.badges.bonneEvolution.color};
    }

    .badge-warning {
      background: ${a2pTheme.badges.attention.color}22;
      color: ${a2pTheme.badges.attention.color};
      border: 2px solid ${a2pTheme.badges.attention.color};
    }

    .badge-alert {
      background: ${a2pTheme.badges.alerte.color}22;
      color: ${a2pTheme.badges.alerte.color};
      border: 2px solid ${a2pTheme.badges.alerte.color};
    }

    .score-card {
      background: linear-gradient(135deg, ${a2pTheme.colors.primary[50]} 0%, white 100%);
      border: 2px solid ${a2pTheme.colors.primary[200]};
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      margin: 20px 0;
    }

    .score-value {
      font-size: 3rem;
      font-weight: 700;
      color: ${a2pTheme.colors.primary[700]};
      margin: 10px 0;
    }

    .score-label {
      font-size: 1rem;
      color: ${a2pTheme.colors.neutral[600]};
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .pain-scale {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
    }

    .pain-indicator {
      flex: 1;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: white;
      margin: 0 5px;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }

    .table th {
      background: ${a2pTheme.colors.primary[700]};
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }

    .table td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .table tr:nth-child(even) {
      background: #f9fafb;
    }

    .highlight {
      background: #ecfdf5;
      border-left: 4px solid ${a2pTheme.colors.secondary.main};
      padding: 15px;
      margin: 20px 0;
      border-radius: 8px;
    }

    .footer {
      background: #f3f4f6;
      padding: 30px;
      text-align: center;
      border-top: 3px solid ${a2pTheme.colors.primary[500]};
    }

    .signature {
      margin-top: 40px;
      text-align: right;
    }

    .signature-line {
      border-top: 2px solid #9ca3af;
      width: 300px;
      margin: 20px 0 10px auto;
    }

    ul {
      list-style: none;
      padding-left: 0;
    }

    ul li::before {
      content: "✓ ";
      color: ${a2pTheme.colors.secondary.main};
      font-weight: bold;
      margin-right: 8px;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${a2pTheme.branding.name}</h1>
      <h2>Bilan Kinésithérapie Post-Chirurgie LCA</h2>
      <div class="tagline">${a2pTheme.branding.tagline}</div>
    </div>

    <div class="content">
      <!-- Score de récupération global -->
      <div class="score-card">
        <div class="score-label">Score de récupération global</div>
        <div class="score-value">${recoveryScore}/100</div>
        <span class="badge ${recoveryScore >= 90 ? 'badge-excellence' : recoveryScore >= 70 ? 'badge-good' : recoveryScore >= 50 ? 'badge-warning' : 'badge-alert'}">
          ${recoveryBadge.label}
        </span>
      </div>

      <!-- Informations patient -->
      <div class="section">
        <h2 class="section-title">Informations Patient</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Patient</div>
            <div class="info-value">${patientInfo.prenom} ${patientInfo.nom}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Date de naissance</div>
            <div class="info-value">${new Date(patientInfo.dateNaissance).toLocaleDateString('fr-FR')} (${patientInfo.age} ans)</div>
          </div>
          <div class="info-item">
            <div class="info-label">Sexe</div>
            <div class="info-value">${patientInfo.sexe}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Date d'évaluation</div>
            <div class="info-value">${new Date(dateEvaluation).toLocaleDateString('fr-FR')}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Jours post-op</div>
            <div class="info-value">${joursPostOp} jours</div>
          </div>
          <div class="info-item">
            <div class="info-label">Phase de rééducation</div>
            <div class="info-value">${phaseReeducation}</div>
          </div>
        </div>
      </div>

      <!-- Informations chirurgicales -->
      <div class="section">
        <h2 class="section-title">Informations Chirurgicales</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Date de chirurgie</div>
            <div class="info-value">${new Date(chirurgieInfo.dateChirurgie).toLocaleDateString('fr-FR')}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Type de ligamentoplastie</div>
            <div class="info-value">${chirurgieInfo.typeLigamentoplastie}${chirurgieInfo.autreType ? ' - ' + chirurgieInfo.autreType : ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Genou opéré</div>
            <div class="info-value">${chirurgieInfo.genouOpere}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Chirurgien</div>
            <div class="info-value">${chirurgieInfo.chirurgien}</div>
          </div>
        </div>
        ${chirurgieInfo.lesionsAssociees && chirurgieInfo.lesionsAssociees.length > 0 ? `
        <div class="highlight">
          <strong>Lésions associées:</strong> ${chirurgieInfo.lesionsAssociees.join(', ')}
        </div>
        ` : ''}
      </div>

      <!-- Douleur et gonflement -->
      <div class="section">
        <h2 class="section-title">Douleur et Gonflement</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Douleur au repos (EVA)</div>
            <div class="info-value">${douleurGonflement.douleurRepos}/10</div>
          </div>
          <div class="info-item">
            <div class="info-label">Douleur au mouvement (EVA)</div>
            <div class="info-value">${douleurGonflement.douleurMouvement}/10</div>
          </div>
          <div class="info-item">
            <div class="info-label">Douleur nocturne (EVA)</div>
            <div class="info-value">${douleurGonflement.douleurNocturne}/10</div>
          </div>
          <div class="info-item">
            <div class="info-label">Douleur moyenne</div>
            <div class="info-value">${avgPain}/10</div>
          </div>
          <div class="info-item">
            <div class="info-label">Épanchement</div>
            <div class="info-value">${douleurGonflement.epanchement}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Gonflement genou</div>
            <div class="info-value">${douleurGonflement.gonflementGenou}/10</div>
          </div>
        </div>
      </div>

      <!-- Bilan articulaire -->
      <div class="section">
        <h2 class="section-title">Bilan Articulaire</h2>
        <div class="score-card">
          <div class="score-label">Score ROM (Mobilité)</div>
          <div class="score-value">${romScore}/100</div>
          <span class="badge ${romScore >= 90 ? 'badge-excellence' : romScore >= 70 ? 'badge-good' : romScore >= 50 ? 'badge-warning' : 'badge-alert'}">
            ${romBadge.label}
          </span>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Mouvement</th>
              <th>Active</th>
              <th>Passive</th>
              <th>Qualité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Flexion</strong></td>
              <td>${bilanArticulaire.flexionActive}°</td>
              <td>${bilanArticulaire.flexionPassive}°</td>
              <td>${bilanArticulaire.qualiteFinCourseFlexion}</td>
            </tr>
            <tr>
              <td><strong>Extension</strong></td>
              <td>${bilanArticulaire.extensionActive}°</td>
              <td>${bilanArticulaire.extensionPassive}°</td>
              <td>${bilanArticulaire.qualiteFinCourseExtension}</td>
            </tr>
          </tbody>
        </table>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Mobilité rotulienne</div>
            <div class="info-value">${bilanArticulaire.mobiliteRotulienne}</div>
          </div>
        </div>
      </div>

      <!-- Bilan musculaire -->
      <div class="section">
        <h2 class="section-title">Bilan Musculaire</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Muscle</th>
              <th>Force (0-5)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Quadriceps</strong></td>
              <td>${bilanMusculaire.quadriceps}/5 (${bilanMusculaire.qualiteContractionQuadriceps})</td>
            </tr>
            <tr>
              <td><strong>Ischio-jambiers</strong></td>
              <td>${bilanMusculaire.ischiojambiers}/5</td>
            </tr>
            <tr>
              <td><strong>Triceps sural</strong></td>
              <td>${bilanMusculaire.tricepsSural}/5</td>
            </tr>
            <tr>
              <td><strong>Moyen fessier</strong></td>
              <td>${bilanMusculaire.moyenFessier}/5</td>
            </tr>
          </tbody>
        </table>
        ${amyotrophie !== null ? `
        <div class="highlight">
          <strong>Amyotrophie:</strong> ${amyotrophie} cm
          <br>
          <small>Périmètre opéré: ${bilanMusculaire.perimetreCuisseOpere} cm | Périmètre sain: ${bilanMusculaire.perimetreCuisseSain} cm</small>
        </div>
        ` : ''}
      </div>

      <!-- Tests fonctionnels -->
      <div class="section">
        <h2 class="section-title">Tests Fonctionnels</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Qualité de la marche</div>
            <div class="info-value">${testsFonctionnels.qualiteMarche}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Périmètre de marche</div>
            <div class="info-value">${testsFonctionnels.perimetreMarche}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Montée escaliers</div>
            <div class="info-value">${testsFonctionnels.monteeEscaliers}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Descente escaliers</div>
            <div class="info-value">${testsFonctionnels.descenteEscaliers}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Unipodal</div>
            <div class="info-value">${testsFonctionnels.unipodal ? '✓ Possible' : '✗ Non'} ${testsFonctionnels.dureeUnipodal ? `(${testsFonctionnels.dureeUnipodal}s)` : ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Accroupissement</div>
            <div class="info-value">${testsFonctionnels.accroupissement}</div>
          </div>
        </div>
      </div>

      <!-- Scores d'évaluation -->
      ${scoresEvaluation.ikdcScore || scoresEvaluation.lysholmScore ? `
      <div class="section">
        <h2 class="section-title">Scores d'Évaluation</h2>
        <div class="info-grid">
          ${scoresEvaluation.ikdcScore ? `
          <div class="info-item">
            <div class="info-label">IKDC Subjectif</div>
            <div class="info-value">${scoresEvaluation.ikdcScore}/100</div>
          </div>
          ` : ''}
          ${scoresEvaluation.lysholmScore ? `
          <div class="info-item">
            <div class="info-label">Lysholm</div>
            <div class="info-value">${scoresEvaluation.lysholmScore}/100</div>
          </div>
          ` : ''}
          ${scoresEvaluation.aclRSI ? `
          <div class="info-item">
            <div class="info-label">ACL-RSI</div>
            <div class="info-value">${scoresEvaluation.aclRSI}/100</div>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}

      <!-- Objectifs de traitement -->
      <div class="section">
        <h2 class="section-title">Objectifs de Traitement</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Court terme (0-6 semaines)</div>
            <ul>
              ${objectifsTraitement.objectifsCourt.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
          </div>
          <div class="info-item">
            <div class="info-label">Moyen terme (6-12 semaines)</div>
            <ul>
              ${objectifsTraitement.objectifsMoyen.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
          </div>
          <div class="info-item">
            <div class="info-label">Long terme (3-12 mois)</div>
            <ul>
              ${objectifsTraitement.objectifsLong.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="info-item" style="margin-top: 20px;">
          <div class="info-label">Fréquence des séances</div>
          <div class="info-value">${objectifsTraitement.nombreSeancesSemaine}x/semaine - ${objectifsTraitement.frequenceSeances}</div>
        </div>
      </div>

      <!-- Plan de traitement -->
      <div class="section">
        <h2 class="section-title">Plan de Traitement</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Techniques manuelles</div>
            <ul>
              ${planTraitement.techniquesManuelles.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
          </div>
          <div class="info-item">
            <div class="info-label">Exercices de renforcement</div>
            <ul>
              ${planTraitement.exercicesRenforcement.map(ex => `<li>${ex}</li>`).join('')}
            </ul>
          </div>
          <div class="info-item">
            <div class="info-label">Exercices de proprioception</div>
            <ul>
              ${planTraitement.exercicesProprioception.map(ex => `<li>${ex}</li>`).join('')}
            </ul>
          </div>
          <div class="info-item">
            <div class="info-label">Exercices de mobilité</div>
            <ul>
              ${planTraitement.exercicesMobilite.map(ex => `<li>${ex}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="highlight" style="margin-top: 20px;">
          <strong>Conseils au patient:</strong>
          <ul style="margin-top: 10px;">
            ${planTraitement.conseilsPatient.map(conseil => `<li>${conseil}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Observations cliniques -->
      ${observationsCliniques ? `
      <div class="section">
        <h2 class="section-title">Observations Cliniques</h2>
        <div class="highlight">
          ${observationsCliniques}
        </div>
      </div>
      ` : ''}

      <!-- Précautions -->
      ${precautionsContrIndications.length > 0 ? `
      <div class="section">
        <h2 class="section-title">Précautions et Contre-Indications</h2>
        <ul>
          ${precautionsContrIndications.map(prec => `<li style="color: ${a2pTheme.colors.danger.main};">${prec}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      <!-- Signature -->
      <div class="signature">
        <div class="info-label">Kinésithérapeute</div>
        <div class="signature-line"></div>
        <div class="info-value">${kineNom}</div>
        <div class="info-label">Date: ${new Date(dateEvaluation).toLocaleDateString('fr-FR')}</div>
      </div>
    </div>

    <div class="footer">
      <div style="font-weight: 600; font-size: 1.125rem; color: ${a2pTheme.colors.primary[700]};">
        ${a2pTheme.branding.name}
      </div>
      <div style="margin-top: 5px; color: ${a2pTheme.colors.neutral[600]};">
        ${a2pTheme.branding.tagline}
      </div>
      <div style="margin-top: 15px; font-size: 0.875rem; color: ${a2pTheme.colors.neutral[500]};">
        Document généré le ${new Date().toLocaleString('fr-FR')}
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Exporte le bilan en fichier HTML téléchargeable
 */
export function exportBilanAsHTML(assessment: LCAAssessment): void {
  const html = generateBilanHTML(assessment);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Bilan_${assessment.patientInfo.nom}_${assessment.patientInfo.prenom}_${assessment.dateEvaluation}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Ouvre le bilan dans une nouvelle fenêtre pour impression
 */
export function printBilan(assessment: LCAAssessment): void {
  const html = generateBilanHTML(assessment);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
