
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface MetricData {
  id: string
  label: string
  value: number
  unit: string
  icon: string
  color: string
  status: 'up' | 'down' | 'stable'
}

export default function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [isLive, setIsLive] = useState(true)
  const { user } = useAuth()
  
  useEffect(() => {
    // Gerçek zamanlı veri simülasyonu
    const generateMetrics = (): MetricData[] => [
      {
        id: 'activeUsers',
        label: 'Aktif Kullanıcılar',
        value: Math.floor(Math.random() * 50) + 20,
        unit: '',
        icon: 'ri-user-3-line',
        color: 'bg-blue-500',
        status: Math.random() > 0.5 ? 'up' : 'down'
      },
      {
        id: 'revenue',
        label: 'Günlük Gelir',
        value: Math.floor(Math.random() * 5000) + 1000,
        unit: '₺',
        icon: 'ri-money-dollar-circle-line',
        color: 'bg-green-500',
        status: Math.random() > 0.3 ? 'up' : 'down'
      },
      {
        id: 'conversion',
        label: 'Dönüşüm Oranı',
        value: Math.floor(Math.random() * 15) + 5,
        unit: '%',
        icon: 'ri-line-chart-line',
        color: 'bg-purple-500',
        status: Math.random() > 0.4 ? 'up' : 'stable'
      },
      {
        id: 'pageViews',
        label: 'Sayfa Görüntüleme',
        value: Math.floor(Math.random() * 1000) + 500,
        unit: '',
        icon: 'ri-eye-line',
        color: 'bg-orange-500',
        status: Math.random() > 0.6 ? 'up' : 'down'
      },
      {
        id: 'avgSession',
        label: 'Ort. Oturum Süresi',
        value: Math.floor(Math.random() * 300) + 120,
        unit: 's',
        icon: 'ri-time-line',
        color: 'bg-indigo-500',
        status: 'stable'
      },
      {
        id: 'bounceRate',
        label: 'Çıkış Oranı',
        value: Math.floor(Math.random() * 30) + 20,
        unit: '%',
        icon: 'ri-logout-circle-line',
        color: 'bg-red-500',
        status: Math.random() > 0.7 ? 'down' : 'up'
      }
    ]
    
    setMetrics(generateMetrics())
    
    if (isLive) {
      const interval = setInterval(() => {
        setMetrics(generateMetrics())
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [isLive])
  
  const formatValue = (value: number, unit: string) => {
    if (unit === '₺') {
      return `${unit}${value.toLocaleString()}`
    }
    if (unit === 's') {
      const minutes = Math.floor(value / 60)
      const seconds = value % 60
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
    return `${value.toLocaleString()}${unit}`
  }
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Gerçek Zamanlı Metrikler</h3>
          <p className="text-sm text-gray-600">Canlı performans göstergeleri</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600">{isLive ? 'Canlı' : 'Durduruldu'}</span>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              isLive 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <i className={`${isLive ? 'ri-pause-line' : 'ri-play-line'} mr-1`}></i>
            {isLive ? 'Durdur' : 'Başlat'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="relative p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 ${metric.color} rounded-lg flex items-center justify-center`}>
                <i className={`${metric.icon} text-white text-sm`}></i>
              </div>
              <div className="flex items-center">
                {metric.status === 'up' && (
                  <i className="ri-arrow-up-line text-green-500 text-sm"></i>
                )}
                {metric.status === 'down' && (
                  <i className="ri-arrow-down-line text-red-500 text-sm"></i>
                )}
                {metric.status === 'stable' && (
                  <i className="ri-subtract-line text-gray-500 text-sm"></i>
                )}
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">{metric.label}</p>
              <p className="text-xl font-bold text-gray-900">
                {formatValue(metric.value, metric.unit)}
              </p>
            </div>
            
            {isLive && (
              <div className="absolute top-2 right-2">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}</span>
          <span>Otomatik yenileme: {isLive ? '3 saniye' : 'Kapalı'}</span>
        </div>
      </div>
    </div>
  )
}
