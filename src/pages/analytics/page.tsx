
import { useState } from 'react'
import DashboardLayout from '../dashboard/components/DashboardLayout'
import AdvancedChart from '../../components/charts/AdvancedChart'
import AnalyticsCard from '../../components/analytics/AnalyticsCard'
import RealTimeMetrics from '../../components/analytics/RealTimeMetrics'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d')
  const [activeTab, setActiveTab] = useState('overview')

  // Örnek veri seti
  const sampleChartData = {
    labels: ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'],
    datasets: [
      {
        label: 'Gelir',
        data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        fill: false
      },
      {
        label: 'Ziyaretçi',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        fill: false
      }
    ]
  }

  const pieChartData = {
    labels: ['Organik', 'Sosyal Medya', 'E-posta', 'Reklam', 'Diğer'],
    datasets: [
      {
        label: 'Trafik Kaynakları',
        data: [45, 25, 15, 10, 5],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      }
    ]
  }

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: 'ri-dashboard-line' },
    { id: 'traffic', label: 'Trafik', icon: 'ri-road-map-line' },
    { id: 'conversion', label: 'Dönüşüm', icon: 'ri-exchange-line' },
    { id: 'revenue', label: 'Gelir', icon: 'ri-money-dollar-circle-line' },
    { id: 'users', label: 'Kullanıcılar', icon: 'ri-user-3-line' }
  ]

  const analyticsCards = [
    {
      title: 'Toplam Gelir',
      value: '₺124,580',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: 'ri-money-dollar-circle-line',
      color: 'bg-green-500',
      trend: [2400, 1398, 9800, 3908, 4800, 3800, 4300]
    },
    {
      title: 'Toplam Ziyaretçi',
      value: '45,240',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: 'ri-user-3-line',
      color: 'bg-blue-500',
      trend: [1200, 1900, 3000, 5000, 2000, 3000, 4500]
    },
    {
      title: 'Dönüşüm Oranı',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: 'ri-line-chart-line',
      color: 'bg-purple-500',
      trend: [3.8, 3.2, 2.9, 3.5, 3.1, 2.8, 3.24]
    },
    {
      title: 'Sayfa Görüntüleme',
      value: '125,680',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: 'ri-eye-line',
      color: 'bg-orange-500',
      trend: [12000, 15000, 18000, 16000, 19000, 22000, 21000]
    }
  ]

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gelişmiş Analitik</h1>
            <p className="text-gray-600 mt-1">Detaylı performans analizi ve raporları</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className="relative">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Son 7 gün</option>
                <option value="30d">Son 30 gün</option>
                <option value="90d">Son 3 ay</option>
                <option value="1y">Son 1 yıl</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Rapor İndir
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2 w-4 h-4 flex items-center justify-center`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsCards.map((card, index) => (
            <AnalyticsCard key={index} {...card} />
          ))}
        </div>

        {/* Real-time Metrics */}
        <RealTimeMetrics />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdvancedChart
            type="line"
            data={sampleChartData}
            title="Haftalık Performans Trendi"
            height="h-80"
          />
          <AdvancedChart
            type="pie"
            data={pieChartData}
            title="Trafik Kaynakları Dağılımı"
            height="h-80"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdvancedChart
            type="bar"
            data={sampleChartData}
            title="Günlük Karşılaştırma"
            height="h-80"
          />
          <AdvancedChart
            type="area"
            data={{
              labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
              datasets: [{
                label: 'Kullanıcı Büyümesi',
                data: [1200, 1900, 3000, 5000, 7200, 9800],
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: '#3b82f6'
              }]
            }}
            title="Kullanıcı Büyüme Trendi"
            height="h-80"
          />
        </div>

        {/* Advanced Analytics Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Coğrafi Dağılım</h3>
            <div className="space-y-3">
              {[
                { country: 'Türkiye', percentage: 45, flag: '🇹🇷' },
                { country: 'Almanya', percentage: 20, flag: '🇩🇪' },
                { country: 'ABD', percentage: 15, flag: '🇺🇸' },
                { country: 'İngiltere', percentage: 12, flag: '🇬🇧' },
                { country: 'Diğer', percentage: 8, flag: '🌍' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{item.flag}</span>
                    <span className="text-sm font-medium text-gray-700">{item.country}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cihaz Türleri</h3>
            <div className="space-y-4">
              {[
                { device: 'Masaüstü', percentage: 55, icon: 'ri-computer-line', color: 'bg-blue-500' },
                { device: 'Mobil', percentage: 35, icon: 'ri-smartphone-line', color: 'bg-green-500' },
                { device: 'Tablet', percentage: 10, icon: 'ri-tablet-line', color: 'bg-purple-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center mr-3`}>
                    <i className={`${item.icon} text-white text-sm`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.device}</span>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">En Popüler Sayfalar</h3>
            <div className="space-y-3">
              {[
                { page: '/anasayfa', views: 12540, bounce: '25%' },
                { page: '/urunler', views: 8230, bounce: '35%' },
                { page: '/hakkimizda', views: 5670, bounce: '45%' },
                { page: '/iletisim', views: 4120, bounce: '55%' },
                { page: '/blog', views: 3450, bounce: '40%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.page}</p>
                    <p className="text-xs text-gray-500">{item.views.toLocaleString()} görüntüleme</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{item.bounce}</p>
                    <p className="text-xs text-gray-500">çıkış oranı</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
