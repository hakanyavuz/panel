
import { useState } from 'react';

export default function ChartSection() {
  const [activeChart, setActiveChart] = useState('revenue');

  const chartTypes = [
    { id: 'revenue', label: 'Gelir', icon: 'ri-money-dollar-circle-line' },
    { id: 'users', label: 'Kullanıcılar', icon: 'ri-user-3-line' },
    { id: 'orders', label: 'Siparişler', icon: 'ri-shopping-cart-line' },
    { id: 'conversion', label: 'Dönüşüm', icon: 'ri-line-chart-line' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performans Analizi</h3>
          <div className="flex items-center space-x-2">
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
              <option>Son 7 gün</option>
              <option>Son 30 gün</option>
              <option>Son 3 ay</option>
              <option>Son 12 ay</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          {chartTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveChart(type.id)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeChart === type.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className={`${type.icon} mr-2 w-4 h-4 flex items-center justify-center`}></i>
              {type.label}
            </button>
          ))}
        </div>

        <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <i className="ri-bar-chart-line text-4xl text-blue-500 mb-4"></i>
            <p className="text-gray-600">Grafik verisi yükleniyor...</p>
            <p className="text-sm text-gray-500 mt-2">Gerçek zamanlı {chartTypes.find(t => t.id === activeChart)?.label.toLowerCase()} verileri</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">En İyi Performans</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-product-hunt-line text-green-600 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Premium Paket</p>
                  <p className="text-xs text-gray-500">En çok satan</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">₺24,350</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-3-line text-blue-600 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Kurumsal Müşteri</p>
                  <p className="text-xs text-gray-500">En yüksek değer</p>
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600">₺15,750</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="ri-megaphone-line text-purple-600 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Sosyal Medya</p>
                  <p className="text-xs text-gray-500">En iyi kanal</p>
                </div>
              </div>
              <span className="text-sm font-medium text-purple-600">%34.2</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Eylemler</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <i className="ri-file-add-line text-blue-600 mr-3"></i>
                <span className="text-sm font-medium text-gray-900">Yeni Rapor</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <i className="ri-user-add-line text-green-600 mr-3"></i>
                <span className="text-sm font-medium text-gray-900">Müşteri Ekle</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <i className="ri-settings-3-line text-purple-600 mr-3"></i>
                <span className="text-sm font-medium text-gray-900">Ayarları Düzenle</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
