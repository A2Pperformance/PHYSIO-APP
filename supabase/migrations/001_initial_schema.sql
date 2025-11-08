-- =====================================================
-- Physio App - Schema Initial
-- Migration 001: Tables, RLS, Indexes, Triggers
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: cabinets
-- =====================================================
CREATE TABLE cabinets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  siret TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cabinets_created_at ON cabinets(created_at);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cabinets_updated_at
  BEFORE UPDATE ON cabinets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: users (extension de auth.users)
-- =====================================================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  cabinet_id UUID REFERENCES cabinets(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'praticien', 'assistant')) DEFAULT 'praticien',
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  signature_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_cabinet_id ON users(cabinet_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: patients
-- =====================================================
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cabinet_id UUID NOT NULL REFERENCES cabinets(id) ON DELETE CASCADE,
  owner_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  sex TEXT CHECK (sex IN ('M', 'F', 'Autre')),
  email TEXT,
  phone TEXT,
  pathology_main TEXT,
  sport_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_patients_cabinet_id ON patients(cabinet_id);
CREATE INDEX idx_patients_owner_user_id ON patients(owner_user_id);
CREATE INDEX idx_patients_last_name ON patients(last_name);
CREATE INDEX idx_patients_created_at ON patients(created_at DESC);

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: library_tests
-- =====================================================
CREATE TABLE library_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL CHECK (category IN ('genou', 'épaule', 'cheville', 'rachis', 'hanche', 'autre')),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('quanti', 'quali')),
  unit_default TEXT,
  direction_better TEXT CHECK (direction_better IN ('plus_haut_mieux', 'plus_bas_mieux')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_library_tests_category ON library_tests(category);
CREATE INDEX idx_library_tests_type ON library_tests(type);

CREATE TRIGGER update_library_tests_updated_at
  BEFORE UPDATE ON library_tests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: library_bilan_templates
-- =====================================================
CREATE TABLE library_bilan_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone TEXT NOT NULL CHECK (zone IN ('genou', 'épaule', 'cheville', 'rachis', 'hanche', 'autre')),
  context TEXT NOT NULL CHECK (context IN ('post-op', 'traumatologie', 'douleur-chronique', 'performance', 'autre')),
  default_tests UUID[] DEFAULT '{}',
  default_text_blocks JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_library_bilan_templates_zone ON library_bilan_templates(zone);
CREATE INDEX idx_library_bilan_templates_context ON library_bilan_templates(context);

CREATE TRIGGER update_library_bilan_templates_updated_at
  BEFORE UPDATE ON library_bilan_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: bilans
-- =====================================================
CREATE TABLE bilans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  owner_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cabinet_id UUID NOT NULL REFERENCES cabinets(id) ON DELETE CASCADE,
  bilan_date DATE NOT NULL DEFAULT CURRENT_DATE,
  zone TEXT NOT NULL CHECK (zone IN ('genou', 'épaule', 'cheville', 'rachis', 'hanche', 'autre')),
  context TEXT NOT NULL CHECK (context IN ('post-op', 'traumatologie', 'douleur-chronique', 'performance', 'autre')),
  diagnosis_text TEXT,
  pain_vas INTEGER CHECK (pain_vas >= 0 AND pain_vas <= 10),
  functional_limitations TEXT,
  tests_summary TEXT,
  score_global_a2p NUMERIC(5, 2),
  attachments JSONB DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('brouillon', 'finalisé')) DEFAULT 'brouillon',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bilans_patient_id ON bilans(patient_id);
CREATE INDEX idx_bilans_owner_user_id ON bilans(owner_user_id);
CREATE INDEX idx_bilans_cabinet_id ON bilans(cabinet_id);
CREATE INDEX idx_bilans_bilan_date ON bilans(bilan_date DESC);
CREATE INDEX idx_bilans_status ON bilans(status);
CREATE INDEX idx_bilans_zone ON bilans(zone);

CREATE TRIGGER update_bilans_updated_at
  BEFORE UPDATE ON bilans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: bilan_tests
-- =====================================================
CREATE TABLE bilan_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bilan_id UUID NOT NULL REFERENCES bilans(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES library_tests(id) ON DELETE RESTRICT,
  side TEXT CHECK (side IN ('gauche', 'droite', 'NA')) DEFAULT 'NA',
  value_numeric NUMERIC,
  value_text TEXT,
  unit TEXT,
  reference_norm_low NUMERIC,
  reference_norm_high NUMERIC,
  is_flag_out_of_range BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bilan_tests_bilan_id ON bilan_tests(bilan_id);
CREATE INDEX idx_bilan_tests_test_id ON bilan_tests(test_id);
CREATE INDEX idx_bilan_tests_is_flag_out_of_range ON bilan_tests(is_flag_out_of_range);

CREATE TRIGGER update_bilan_tests_updated_at
  BEFORE UPDATE ON bilan_tests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: goals
-- =====================================================
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  owner_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('force', 'mobilité', 'douleur', 'endurance', 'fonctionnel', 'adhérence')),
  baseline_value TEXT,
  target_value TEXT,
  unit TEXT,
  due_date DATE,
  status TEXT NOT NULL CHECK (status IN ('en_cours', 'atteint', 'abandonné')) DEFAULT 'en_cours',
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  last_update_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_goals_patient_id ON goals(patient_id);
CREATE INDEX idx_goals_owner_user_id ON goals(owner_user_id);
CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_goals_due_date ON goals(due_date);

CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE: shares
-- =====================================================
CREATE TABLE shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bilan_id UUID NOT NULL REFERENCES bilans(id) ON DELETE CASCADE,
  shared_with TEXT NOT NULL CHECK (shared_with IN ('patient', 'médecin', 'autre')),
  method TEXT NOT NULL CHECK (method IN ('email', 'pdf', 'download', 'link')),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shares_bilan_id ON shares(bilan_id);
CREATE INDEX idx_shares_timestamp ON shares(timestamp DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE cabinets ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE bilans ENABLE ROW LEVEL SECURITY;
ALTER TABLE bilan_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_bilan_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES: cabinets
-- =====================================================
CREATE POLICY "Users can view their own cabinet"
  ON cabinets FOR SELECT
  USING (
    id IN (
      SELECT cabinet_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update their cabinet"
  ON cabinets FOR UPDATE
  USING (
    id IN (
      SELECT cabinet_id FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES: users
-- =====================================================
CREATE POLICY "Users can view users in their cabinet"
  ON users FOR SELECT
  USING (
    cabinet_id IN (
      SELECT cabinet_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Admins can manage users in their cabinet"
  ON users FOR ALL
  USING (
    cabinet_id IN (
      SELECT cabinet_id FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES: patients
-- =====================================================
CREATE POLICY "Users can view patients in their cabinet"
  ON patients FOR SELECT
  USING (
    cabinet_id IN (
      SELECT cabinet_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Praticiens can only see their own patients"
  ON patients FOR SELECT
  USING (
    owner_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND cabinet_id = patients.cabinet_id
    )
  );

CREATE POLICY "Users can create patients in their cabinet"
  ON patients FOR INSERT
  WITH CHECK (
    cabinet_id IN (
      SELECT cabinet_id FROM users WHERE id = auth.uid()
    )
    AND owner_user_id = auth.uid()
  );

CREATE POLICY "Users can update their own patients"
  ON patients FOR UPDATE
  USING (
    owner_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND cabinet_id = patients.cabinet_id
    )
  );

CREATE POLICY "Users can delete their own patients"
  ON patients FOR DELETE
  USING (
    owner_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND cabinet_id = patients.cabinet_id
    )
  );

-- =====================================================
-- RLS POLICIES: bilans
-- =====================================================
CREATE POLICY "Users can view bilans in their cabinet"
  ON bilans FOR SELECT
  USING (
    cabinet_id IN (
      SELECT cabinet_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Praticiens can only see their own bilans"
  ON bilans FOR SELECT
  USING (
    owner_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND cabinet_id = bilans.cabinet_id
    )
  );

CREATE POLICY "Users can create bilans in their cabinet"
  ON bilans FOR INSERT
  WITH CHECK (
    cabinet_id IN (
      SELECT cabinet_id FROM users WHERE id = auth.uid()
    )
    AND owner_user_id = auth.uid()
  );

CREATE POLICY "Users can update their own bilans"
  ON bilans FOR UPDATE
  USING (
    owner_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND cabinet_id = bilans.cabinet_id
    )
  );

CREATE POLICY "Only praticiens and admins can finalize bilans"
  ON bilans FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('praticien', 'admin')
    )
  );

CREATE POLICY "Users can delete their own bilans"
  ON bilans FOR DELETE
  USING (
    owner_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND cabinet_id = bilans.cabinet_id
    )
  );

-- =====================================================
-- RLS POLICIES: bilan_tests
-- =====================================================
CREATE POLICY "Users can view bilan_tests via bilan ownership"
  ON bilan_tests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bilans
      WHERE bilans.id = bilan_tests.bilan_id
      AND (
        bilans.owner_user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM users
          WHERE id = auth.uid()
          AND role = 'admin'
          AND cabinet_id = bilans.cabinet_id
        )
      )
    )
  );

CREATE POLICY "Users can manage tests for their bilans"
  ON bilan_tests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM bilans
      WHERE bilans.id = bilan_tests.bilan_id
      AND (
        bilans.owner_user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM users
          WHERE id = auth.uid()
          AND role = 'admin'
          AND cabinet_id = bilans.cabinet_id
        )
      )
    )
  );

-- =====================================================
-- RLS POLICIES: goals
-- =====================================================
CREATE POLICY "Users can view goals for their patients"
  ON goals FOR SELECT
  USING (
    owner_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM patients
      JOIN users ON users.id = auth.uid()
      WHERE patients.id = goals.patient_id
      AND users.role = 'admin'
      AND patients.cabinet_id = users.cabinet_id
    )
  );

CREATE POLICY "Users can create goals for their patients"
  ON goals FOR INSERT
  WITH CHECK (
    owner_user_id = auth.uid()
  );

CREATE POLICY "Users can update their own goals"
  ON goals FOR UPDATE
  USING (
    owner_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM patients
      JOIN users ON users.id = auth.uid()
      WHERE patients.id = goals.patient_id
      AND users.role = 'admin'
      AND patients.cabinet_id = users.cabinet_id
    )
  );

CREATE POLICY "Users can delete their own goals"
  ON goals FOR DELETE
  USING (
    owner_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM patients
      JOIN users ON users.id = auth.uid()
      WHERE patients.id = goals.patient_id
      AND users.role = 'admin'
      AND patients.cabinet_id = users.cabinet_id
    )
  );

-- =====================================================
-- RLS POLICIES: library_tests (lecture publique, CRUD admin)
-- =====================================================
CREATE POLICY "Anyone can view library_tests"
  ON library_tests FOR SELECT
  USING (true);

CREATE POLICY "Admins with Cabinet plan can manage library_tests"
  ON library_tests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES: library_bilan_templates
-- =====================================================
CREATE POLICY "Anyone can view templates"
  ON library_bilan_templates FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage templates"
  ON library_bilan_templates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES: shares
-- =====================================================
CREATE POLICY "Users can view shares for their bilans"
  ON shares FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bilans
      WHERE bilans.id = shares.bilan_id
      AND (
        bilans.owner_user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM users
          WHERE id = auth.uid()
          AND role = 'admin'
          AND cabinet_id = bilans.cabinet_id
        )
      )
    )
  );

CREATE POLICY "Users can create shares for their bilans"
  ON shares FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bilans
      WHERE bilans.id = shares.bilan_id
      AND bilans.owner_user_id = auth.uid()
    )
  );

-- =====================================================
-- FUNCTIONS UTILITAIRES
-- =====================================================

-- Fonction pour obtenir le cabinet_id de l'utilisateur connecté
CREATE OR REPLACE FUNCTION get_user_cabinet_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT cabinet_id FROM users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour vérifier si l'utilisateur est admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (SELECT role = 'admin' FROM users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour obtenir le rôle de l'utilisateur
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- COMMENTAIRES
-- =====================================================
COMMENT ON TABLE cabinets IS 'Cabinets de kinésithérapie';
COMMENT ON TABLE users IS 'Utilisateurs (extension de auth.users)';
COMMENT ON TABLE patients IS 'Dossiers patients';
COMMENT ON TABLE bilans IS 'Bilans de rééducation';
COMMENT ON TABLE bilan_tests IS 'Résultats de tests individuels pour chaque bilan';
COMMENT ON TABLE goals IS 'Objectifs de rééducation pour les patients';
COMMENT ON TABLE library_tests IS 'Bibliothèque de tests standardisés';
COMMENT ON TABLE library_bilan_templates IS 'Templates de bilans prédéfinis';
COMMENT ON TABLE shares IS 'Logs de partage de documents';
