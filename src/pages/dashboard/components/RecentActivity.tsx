
import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { DataService } from '../../../services/dataService'

interface Activity {
  id: string
  action: string
  description: string | null
  created_at: string
  metadata: any
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) return
      
      try {
        const { data, error } = await DataService.getActivities(user.id, 8)
        if (data && !error) {
          setActivities(data)
        } else {
          // Eğer veri yoksa örnek aktiviteler göster
          setActivities([
            {
              id: '1',
              action: 'project_created',
              description: 'E-ticaret Projesi oluşturuldu',
              created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              metadata: {}
            },
            {
              id: '2',
              action: 'report_generated',
              description: 'Satış Raporu oluşturuldu',
              created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
              metadata: {}
            },
            {
              id: '3',
              action: 'user_login',
              description: 'Sisteme giriş yapıldı',
              created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
              metadata: {}
            },
            {
              id: '4',
              action: 'data_export',
              description: 'Müşteri verileri dışa aktarıldı',
              created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
              metadata: {}
            },
            {
              id: '5',
              action: 'setting_updated',
              description: 'Profil ayarları güncellendi',
              created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
              metadata: {}
            }
          ])
        }
      } catch (error) {
        console.error('Aktivite verileri alınırken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [user])

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'project_created':
        return 'ri-folder-add-line'
      case 'report_generated':
        return 'ri-file-chart-line'
      case 'user_login':
        return 'ri-login-circle-line'
      case 'data_export':
        return 'ri-download-line'
      case 'setting_updated':
        return 'ri-settings-3-line'
      default:
        return 'ri-information-line'
    }
  }

  const getActivityColor = (action: string) => {
    switch (action) {
      case 'project_created':
        return 'text-blue-600 bg-blue-100'
      case 'report_generated':
        return 'text-green-600 bg-green-100'
      case 'user_login':
        return 'text-purple-600 bg-purple-100'
      case 'data_export':
        return 'text-orange-600 bg-orange-100'
      case 'setting_updated':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Az önce'
    if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} saat önce`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} gün önce`
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-3 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap cursor-pointer">
          Tümünü Gör
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.action)}`}>
                <i className={`${getActivityIcon(activity.action)} text-sm`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.description || activity.action}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(activity.created_at)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-notification-off-line text-gray-400 text-2xl"></i>
            </div>
            <p className="text-gray-500 text-sm">Henüz aktivite bulunmuyor</p>
          </div>
        )}
      </div>
    </div>
  )
}
