
import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { DataService } from '../../../services/dataService'

interface StatsData {
  totalProjects: number
  activeProjects: number
  totalReports: number
  reportsThisMonth: number
}

export default function StatsOverview() {
  const [stats, setStats] = useState<StatsData>({
    totalProjects: 0,
    activeProjects: 0,
    totalReports: 0,
    reportsThisMonth: 0
  })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return
      
      try {
        const { data, error } = await DataService.getDashboardStats(user.id)
        if (data && !error) {
          setStats({
            totalProjects: data.totalProjects,
            activeProjects: data.activeProjects,
            totalReports: data.totalReports,
            reportsThisMonth: data.reportsThisMonth
          })
        }
      } catch (error) {
        console.error('İstatistik verileri alınırken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user])

  const statsItems = [
    {
      title: 'Toplam Projeler',
      value: stats.totalProjects,
      icon: 'ri-folder-line',
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Aktif Projeler',
      value: stats.activeProjects,
      icon: 'ri-play-circle-line',
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Toplam Raporlar',
      value: stats.totalReports,
      icon: 'ri-file-chart-line',
      color: 'bg-purple-500',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Bu Ay Raporlar',
      value: stats.reportsThisMonth,
      icon: 'ri-calendar-line',
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'positive'
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsItems.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <span className={`text-xs font-medium ${
                  item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">son aya göre</span>
              </div>
            </div>
            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
              <i className={`${item.icon} text-white text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
