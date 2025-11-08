export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cabinets: {
        Row: {
          id: string
          name: string
          address: string | null
          phone: string | null
          siret: string | null
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          phone?: string | null
          siret?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          phone?: string | null
          siret?: string | null
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          cabinet_id: string | null
          role: 'admin' | 'praticien' | 'assistant'
          full_name: string
          email: string
          signature_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          cabinet_id?: string | null
          role?: 'admin' | 'praticien' | 'assistant'
          full_name: string
          email: string
          signature_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cabinet_id?: string | null
          role?: 'admin' | 'praticien' | 'assistant'
          full_name?: string
          email?: string
          signature_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          cabinet_id: string
          owner_user_id: string
          first_name: string
          last_name: string
          date_of_birth: string | null
          sex: 'M' | 'F' | 'Autre' | null
          email: string | null
          phone: string | null
          pathology_main: string | null
          sport_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cabinet_id: string
          owner_user_id: string
          first_name: string
          last_name: string
          date_of_birth?: string | null
          sex?: 'M' | 'F' | 'Autre' | null
          email?: string | null
          phone?: string | null
          pathology_main?: string | null
          sport_type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cabinet_id?: string
          owner_user_id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string | null
          sex?: 'M' | 'F' | 'Autre' | null
          email?: string | null
          phone?: string | null
          pathology_main?: string | null
          sport_type?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bilans: {
        Row: {
          id: string
          patient_id: string
          owner_user_id: string
          cabinet_id: string
          bilan_date: string
          zone: 'genou' | 'épaule' | 'cheville' | 'rachis' | 'hanche' | 'autre'
          context: 'post-op' | 'traumatologie' | 'douleur-chronique' | 'performance' | 'autre'
          diagnosis_text: string | null
          pain_vas: number | null
          functional_limitations: string | null
          tests_summary: string | null
          score_global_a2p: number | null
          attachments: Json
          status: 'brouillon' | 'finalisé'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          owner_user_id: string
          cabinet_id: string
          bilan_date?: string
          zone: 'genou' | 'épaule' | 'cheville' | 'rachis' | 'hanche' | 'autre'
          context: 'post-op' | 'traumatologie' | 'douleur-chronique' | 'performance' | 'autre'
          diagnosis_text?: string | null
          pain_vas?: number | null
          functional_limitations?: string | null
          tests_summary?: string | null
          score_global_a2p?: number | null
          attachments?: Json
          status?: 'brouillon' | 'finalisé'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          owner_user_id?: string
          cabinet_id?: string
          bilan_date?: string
          zone?: 'genou' | 'épaule' | 'cheville' | 'rachis' | 'hanche' | 'autre'
          context?: 'post-op' | 'traumatologie' | 'douleur-chronique' | 'performance' | 'autre'
          diagnosis_text?: string | null
          pain_vas?: number | null
          functional_limitations?: string | null
          tests_summary?: string | null
          score_global_a2p?: number | null
          attachments?: Json
          status?: 'brouillon' | 'finalisé'
          created_at?: string
          updated_at?: string
        }
      }
      bilan_tests: {
        Row: {
          id: string
          bilan_id: string
          test_id: string
          side: 'gauche' | 'droite' | 'NA'
          value_numeric: number | null
          value_text: string | null
          unit: string | null
          reference_norm_low: number | null
          reference_norm_high: number | null
          is_flag_out_of_range: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          bilan_id: string
          test_id: string
          side?: 'gauche' | 'droite' | 'NA'
          value_numeric?: number | null
          value_text?: string | null
          unit?: string | null
          reference_norm_low?: number | null
          reference_norm_high?: number | null
          is_flag_out_of_range?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          bilan_id?: string
          test_id?: string
          side?: 'gauche' | 'droite' | 'NA'
          value_numeric?: number | null
          value_text?: string | null
          unit?: string | null
          reference_norm_low?: number | null
          reference_norm_high?: number | null
          is_flag_out_of_range?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          patient_id: string
          owner_user_id: string
          label: string
          type: 'force' | 'mobilité' | 'douleur' | 'endurance' | 'fonctionnel' | 'adhérence'
          baseline_value: string | null
          target_value: string | null
          unit: string | null
          due_date: string | null
          status: 'en_cours' | 'atteint' | 'abandonné'
          progress_percent: number
          last_update_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          owner_user_id: string
          label: string
          type: 'force' | 'mobilité' | 'douleur' | 'endurance' | 'fonctionnel' | 'adhérence'
          baseline_value?: string | null
          target_value?: string | null
          unit?: string | null
          due_date?: string | null
          status?: 'en_cours' | 'atteint' | 'abandonné'
          progress_percent?: number
          last_update_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          owner_user_id?: string
          label?: string
          type?: 'force' | 'mobilité' | 'douleur' | 'endurance' | 'fonctionnel' | 'adhérence'
          baseline_value?: string | null
          target_value?: string | null
          unit?: string | null
          due_date?: string | null
          status?: 'en_cours' | 'atteint' | 'abandonné'
          progress_percent?: number
          last_update_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      library_tests: {
        Row: {
          id: string
          category: 'genou' | 'épaule' | 'cheville' | 'rachis' | 'hanche' | 'autre'
          name: string
          type: 'quanti' | 'quali'
          unit_default: string | null
          direction_better: 'plus_haut_mieux' | 'plus_bas_mieux' | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: 'genou' | 'épaule' | 'cheville' | 'rachis' | 'hanche' | 'autre'
          name: string
          type: 'quanti' | 'quali'
          unit_default?: string | null
          direction_better?: 'plus_haut_mieux' | 'plus_bas_mieux' | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: 'genou' | 'épaule' | 'cheville' | 'rachis' | 'hanche' | 'autre'
          name?: string
          type?: 'quanti' | 'quali'
          unit_default?: string | null
          direction_better?: 'plus_haut_mieux' | 'plus_bas_mieux' | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      library_bilan_templates: {
        Row: {
          id: string
          zone: 'genou' | 'épaule' | 'cheville' | 'rachis' | 'hanche' | 'autre'
          context: 'post-op' | 'traumatologie' | 'douleur-chronique' | 'performance' | 'autre'
          default_tests: string[]
          default_text_blocks: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          zone: 'genou' | 'épaule' | 'cheville' | 'rachis' | 'hanche' | 'autre'
          context: 'post-op' | 'traumatologie' | 'douleur-chronique' | 'performance' | 'autre'
          default_tests?: string[]
          default_text_blocks?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          zone?: 'genou' | 'épaule' | 'cheville' | 'rachis' | 'hanche' | 'autre'
          context?: 'post-op' | 'traumatologie' | 'douleur-chronique' | 'performance' | 'autre'
          default_tests?: string[]
          default_text_blocks?: Json
          created_at?: string
          updated_at?: string
        }
      }
      shares: {
        Row: {
          id: string
          bilan_id: string
          shared_with: 'patient' | 'médecin' | 'autre'
          method: 'email' | 'pdf' | 'download' | 'link'
          timestamp: string
        }
        Insert: {
          id?: string
          bilan_id: string
          shared_with: 'patient' | 'médecin' | 'autre'
          method: 'email' | 'pdf' | 'download' | 'link'
          timestamp?: string
        }
        Update: {
          id?: string
          bilan_id?: string
          shared_with?: 'patient' | 'médecin' | 'autre'
          method?: 'email' | 'pdf' | 'download' | 'link'
          timestamp?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_cabinet_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
