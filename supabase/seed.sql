-- =====================================================
-- Physio App - Seed Data
-- Données de test et démo
-- =====================================================

-- =====================================================
-- SEED: library_tests (Tests par zone anatomique)
-- =====================================================

-- GENOU
INSERT INTO library_tests (category, name, type, unit_default, direction_better, notes) VALUES
('genou', 'Force isométrique quadriceps', 'quanti', 'N', 'plus_haut_mieux', 'Test au dynamomètre'),
('genou', 'Force isométrique ischio-jambiers', 'quanti', 'N', 'plus_haut_mieux', 'Test au dynamomètre'),
('genou', 'Ratio IJ/Q (%)', 'quanti', '%', 'plus_haut_mieux', 'Ratio de force ischio-jambiers / quadriceps'),
('genou', 'Flexion active', 'quanti', '°', 'plus_haut_mieux', 'Amplitude en degrés'),
('genou', 'Extension active', 'quanti', '°', 'plus_bas_mieux', 'Déficit d''extension (0° = normal)'),
('genou', 'Single Leg Hop Test', 'quanti', 'cm', 'plus_haut_mieux', 'Distance en cm'),
('genou', 'Triple Hop Test', 'quanti', 'cm', 'plus_haut_mieux', 'Distance cumulée en cm'),
('genou', 'Crossover Hop Test', 'quanti', 'cm', 'plus_haut_mieux', 'Distance en cm'),
('genou', 'Lachman Test', 'quali', NULL, NULL, 'Grade 0 à 3 (0 = normal)'),
('genou', 'Pivot Shift Test', 'quali', NULL, NULL, 'Négatif / Positif grade 1-3'),
('genou', 'Test cajón anterior', 'quali', NULL, NULL, 'Grade 0 à 3'),
('genou', 'Appui monopodal (yeux ouverts)', 'quanti', 's', 'plus_haut_mieux', 'Durée en secondes'),
('genou', 'Y-Balance Test (antérieur)', 'quanti', 'cm', 'plus_haut_mieux', 'Distance normalisée'),
('genou', 'Périmètre cuisse 15cm', 'quanti', 'cm', 'plus_haut_mieux', 'Mesure périmétrique'),
('genou', 'Drop Jump (hauteur)', 'quanti', 'cm', 'plus_haut_mieux', 'Hauteur de saut vertical');

-- ÉPAULE
INSERT INTO library_tests (category, name, type, unit_default, direction_better, notes) VALUES
('épaule', 'Flexion active', 'quanti', '°', 'plus_haut_mieux', 'Amplitude en degrés'),
('épaule', 'Abduction active', 'quanti', '°', 'plus_haut_mieux', 'Amplitude en degrés'),
('épaule', 'Rotation externe à 0°', 'quanti', '°', 'plus_haut_mieux', 'Amplitude en degrés'),
('épaule', 'Rotation interne (main dans le dos)', 'quali', NULL, NULL, 'Niveau vertébral atteint'),
('épaule', 'Force rotation externe (dynamomètre)', 'quanti', 'N', 'plus_haut_mieux', 'Test isométrique'),
('épaule', 'Force rotation interne (dynamomètre)', 'quanti', 'N', 'plus_haut_mieux', 'Test isométrique'),
('épaule', 'Test de Neer', 'quali', NULL, NULL, 'Négatif / Positif'),
('épaule', 'Test de Hawkins-Kennedy', 'quali', NULL, NULL, 'Négatif / Positif'),
('épaule', 'Test de Jobe (can test)', 'quali', NULL, NULL, 'Douleur 0-10'),
('épaule', 'Appréhension antérieure', 'quali', NULL, NULL, 'Négatif / Positif'),
('épaule', 'DASH Score', 'quanti', '/100', 'plus_bas_mieux', 'Score fonctionnel (0 = pas d''incapacité)');

-- CHEVILLE
INSERT INTO library_tests (category, name, type, unit_default, direction_better, notes) VALUES
('cheville', 'Dorsiflexion active', 'quanti', '°', 'plus_haut_mieux', 'Genou fléchi'),
('cheville', 'Flexion plantaire active', 'quanti', '°', 'plus_haut_mieux', 'Amplitude en degrés'),
('cheville', 'Force triceps sural (dynamomètre)', 'quanti', 'N', 'plus_haut_mieux', 'Test isométrique'),
('cheville', 'Test tiroir antérieur', 'quali', NULL, NULL, 'Grade 0 à 3'),
('cheville', 'Single Leg Heel Raise (répétitions)', 'quanti', 'rép', 'plus_haut_mieux', 'Nombre de répétitions'),
('cheville', 'Star Excursion Balance Test', 'quanti', 'cm', 'plus_haut_mieux', 'Distance moyenne 8 directions'),
('cheville', 'Appui monopodal (yeux fermés)', 'quanti', 's', 'plus_haut_mieux', 'Durée en secondes');

-- RACHIS
INSERT INTO library_tests (category, name, type, unit_default, direction_better, notes) VALUES
('rachis', 'Distance doigts-sol', 'quanti', 'cm', 'plus_bas_mieux', 'Flexion antérieure (0 = touche le sol)'),
('rachis', 'Test de Schober', 'quanti', 'cm', 'plus_haut_mieux', 'Mobilité lombaire (>15cm = normal)'),
('rachis', 'Rotation cervicale D/G', 'quanti', '°', 'plus_haut_mieux', 'Amplitude rotation'),
('rachis', 'Endurance extenseurs (Sorensen)', 'quanti', 's', 'plus_haut_mieux', 'Durée de maintien'),
('rachis', 'McGill Core Endurance (planche)', 'quanti', 's', 'plus_haut_mieux', 'Durée de maintien');

-- HANCHE
INSERT INTO library_tests (category, name, type, unit_default, direction_better, notes) VALUES
('hanche', 'Flexion active', 'quanti', '°', 'plus_haut_mieux', 'Amplitude en degrés'),
('hanche', 'Extension active', 'quanti', '°', 'plus_haut_mieux', 'Amplitude en degrés'),
('hanche', 'Abduction active', 'quanti', '°', 'plus_haut_mieux', 'Amplitude en degrés'),
('hanche', 'Rotation interne', 'quanti', '°', 'plus_haut_mieux', 'Hanche à 90° de flexion'),
('hanche', 'Rotation externe', 'quanti', '°', 'plus_haut_mieux', 'Hanche à 90° de flexion'),
('hanche', 'Force abducteurs (dynamomètre)', 'quanti', 'N', 'plus_haut_mieux', 'Test isométrique'),
('hanche', 'Test de Thomas', 'quali', NULL, NULL, 'Flexum de hanche (Négatif/Positif)'),
('hanche', 'Test FABER (Patrick)', 'quali', NULL, NULL, 'Douleur antérieure (Négatif/Positif)');

-- =====================================================
-- SEED: library_bilan_templates
-- =====================================================

-- Template 1: Genou Post-Op LCA
INSERT INTO library_bilan_templates (zone, context, default_tests, default_text_blocks)
SELECT
  'genou',
  'post-op',
  ARRAY(
    SELECT id FROM library_tests
    WHERE category = 'genou'
    AND name IN (
      'Force isométrique quadriceps',
      'Force isométrique ischio-jambiers',
      'Ratio IJ/Q (%)',
      'Flexion active',
      'Extension active',
      'Single Leg Hop Test',
      'Appui monopodal (yeux ouverts)',
      'Lachman Test'
    )
  ),
  '{
    "diagnosis": "Reconstruction LCA (DT4 ou DIDT). Protocole de rééducation post-opératoire.",
    "limitations": "Limitations fonctionnelles : marche, escaliers, course, sport.",
    "objectives": "Récupération amplitude complète, renforcement musculaire progressif, proprioception."
  }'::jsonb;

-- Template 2: Épaule Conflit sous-acromial
INSERT INTO library_bilan_templates (zone, context, default_tests, default_text_blocks)
SELECT
  'épaule',
  'douleur-chronique',
  ARRAY(
    SELECT id FROM library_tests
    WHERE category = 'épaule'
    AND name IN (
      'Flexion active',
      'Abduction active',
      'Rotation externe à 0°',
      'Force rotation externe (dynamomètre)',
      'Test de Neer',
      'Test de Hawkins-Kennedy',
      'DASH Score'
    )
  ),
  '{
    "diagnosis": "Conflit sous-acromial. Douleurs à l''élévation antérieure et latérale.",
    "limitations": "Limitations dans les gestes en élévation, port de charges, activités overhead.",
    "objectives": "Diminution douleur, récupération amplitudes, renforcement coiffe des rotateurs."
  }'::jsonb;

-- Template 3: Cheville Entorse
INSERT INTO library_bilan_templates (zone, context, default_tests, default_text_blocks)
SELECT
  'cheville',
  'traumatologie',
  ARRAY(
    SELECT id FROM library_tests
    WHERE category = 'cheville'
    AND name IN (
      'Dorsiflexion active',
      'Flexion plantaire active',
      'Force triceps sural (dynamomètre)',
      'Test tiroir antérieur',
      'Single Leg Heel Raise (répétitions)',
      'Star Excursion Balance Test',
      'Appui monopodal (yeux fermés)'
    )
  ),
  '{
    "diagnosis": "Entorse latérale de cheville (grade I/II/III). Lésion ligamentaire.",
    "limitations": "Boiterie, instabilité, limitations marche prolongée et terrain irrégulier.",
    "objectives": "Récupération stabilité, proprioception, renforcement, retour sport progressif."
  }'::jsonb;

-- =====================================================
-- SEED: Cabinet démo
-- =====================================================
INSERT INTO cabinets (id, name, address, phone, siret, logo_url)
VALUES (
  'aaaaaaaa-bbbb-cccc-dddd-000000000001',
  'Cabinet Kiné Santé',
  '12 Rue de la République, 75001 Paris',
  '01 23 45 67 89',
  '123 456 789 00012',
  NULL
);

-- =====================================================
-- SEED: Utilisateurs démo
-- Note: Ces utilisateurs doivent être créés dans Supabase Auth d'abord
-- Ici on crée seulement les entrées dans la table users
-- =====================================================

-- Admin démo (à créer manuellement dans Supabase Auth avec email admin@physio-app.fr)
-- INSERT INTO users (id, cabinet_id, role, full_name, email)
-- VALUES (
--   'auth-uid-admin',
--   'aaaaaaaa-bbbb-cccc-dddd-000000000001',
--   'admin',
--   'Dr. Sophie Martin',
--   'admin@physio-app.fr'
-- );

-- Praticien démo
-- INSERT INTO users (id, cabinet_id, role, full_name, email)
-- VALUES (
--   'auth-uid-praticien',
--   'aaaaaaaa-bbbb-cccc-dddd-000000000001',
--   'praticien',
--   'Thomas Dubois',
--   'thomas@physio-app.fr'
-- );

-- =====================================================
-- SEED: Patients démo
-- Note: Décommenter après avoir créé les utilisateurs
-- =====================================================

-- Patient 1: Post-op LCA
-- INSERT INTO patients (id, cabinet_id, owner_user_id, first_name, last_name, date_of_birth, sex, email, phone, pathology_main, sport_type)
-- VALUES (
--   'bbbbbbbb-cccc-dddd-eeee-000000000001',
--   'aaaaaaaa-bbbb-cccc-dddd-000000000001',
--   'auth-uid-praticien',
--   'Marc',
--   'Lefebvre',
--   '1985-03-15',
--   'M',
--   'marc.lefebvre@email.fr',
--   '06 12 34 56 78',
--   'Rupture LCA (reconstruction DT4)',
--   'Football'
-- );

-- Patient 2: Douleur épaule
-- INSERT INTO patients (id, cabinet_id, owner_user_id, first_name, last_name, date_of_birth, sex, email, phone, pathology_main, sport_type)
-- VALUES (
--   'cccccccc-dddd-eeee-ffff-000000000002',
--   'aaaaaaaa-bbbb-cccc-dddd-000000000001',
--   'auth-uid-praticien',
--   'Julie',
--   'Moreau',
--   '1990-07-22',
--   'F',
--   'julie.moreau@email.fr',
--   '06 98 76 54 32',
--   'Conflit sous-acromial',
--   'Natation'
-- );

-- =====================================================
-- COMMENTAIRES
-- =====================================================

-- Pour seed complet en local :
-- 1. Créer les utilisateurs dans Supabase Auth UI
-- 2. Récupérer leurs UIDs
-- 3. Décommenter et adapter les INSERT users et patients
-- 4. Exécuter ce fichier SQL dans l'éditeur Supabase

COMMENT ON TABLE library_tests IS 'Seed: 40+ tests par zones anatomiques (genou, épaule, cheville, rachis, hanche)';
COMMENT ON TABLE library_bilan_templates IS 'Seed: 3 templates prédéfinis (Genou Post-Op LCA, Épaule Conflit, Cheville Entorse)';
