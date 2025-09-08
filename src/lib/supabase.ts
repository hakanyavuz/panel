import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string
          sector: string | null
          company_name: string | null
          avatar_url: string | null
          settings: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          role?: string
          sector?: string | null
          company_name?: string | null
          avatar_url?: string | null
          settings?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string
          sector?: string | null
          company_name?: string | null
          avatar_url?: string | null
          settings?: any
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          sector: string | null
          status: string
          settings: any
          metrics: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          sector?: string | null
          status?: string
          settings?: any
          metrics?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          sector?: string | null
          status?: string
          settings?: any
          metrics?: any
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          title: string
          type: string
          data: any
          filters: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id?: string | null
          title: string
          type: string
          data?: any
          filters?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string | null
          title?: string
          type?: string
          data?: any
          filters?: any
          created_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          action: string
          description: string | null
          metadata: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id?: string | null
          action: string
          description?: string | null
          metadata?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string | null
          action?: string
          description?: string | null
          metadata?: any
          created_at?: string
        }
      }
    }
  }
}