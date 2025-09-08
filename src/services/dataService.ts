import { supabase } from '../lib/supabase'

export class DataService {
  // Kullanıcı verilerini al
  static async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  }

  // Kullanıcı profilini güncelle
  static async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  }

  // Projeler listesini al
  static async getProjects(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }

  // Yeni proje oluştur
  static async createProject(userId: string, projectData: any) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: userId,
        ...projectData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    return { data, error }
  }

  // Raporları al
  static async getReports(userId: string, projectId?: string) {
    let query = supabase
      .from('reports')
      .select('*')
      .eq('user_id', userId)
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
    
    return { data, error }
  }

  // Yeni rapor oluştur
  static async createReport(userId: string, reportData: any) {
    const { data, error } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        ...reportData,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    return { data, error }
  }

  // Aktiviteleri al
  static async getActivities(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    return { data, error }
  }

  // Yeni aktivite kaydet
  static async logActivity(userId: string, activityData: any) {
    const { data, error } = await supabase
      .from('activities')
      .insert({
        user_id: userId,
        ...activityData,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    return { data, error }
  }

  // Dashboard istatistikleri
  static async getDashboardStats(userId: string) {
    try {
      // Projeler sayısı
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, status, metrics')
        .eq('user_id', userId)

      if (projectsError) throw projectsError

      // Raporlar sayısı
      const { data: reports, error: reportsError } = await supabase
        .from('reports')
        .select('id, type, created_at')
        .eq('user_id', userId)

      if (reportsError) throw reportsError

      // Bu ay oluşturulan raporlar
      const thisMonth = new Date()
      thisMonth.setDate(1)
      thisMonth.setHours(0, 0, 0, 0)
      
      const reportsThisMonth = reports?.filter(report => 
        new Date(report.created_at) >= thisMonth
      ).length || 0

      return {
        data: {
          totalProjects: projects?.length || 0,
          activeProjects: projects?.filter(p => p.status === 'active').length || 0,
          totalReports: reports?.length || 0,
          reportsThisMonth,
          projects: projects || [],
          recentReports: reports?.slice(0, 5) || []
        },
        error: null
      }
    } catch (error) {
      return { data: null, error }
    }
  }
}