import DashboardLayout from './components/DashboardLayout'
import SectorModules from '../../components/SectorModules'
import { useState } from 'react'

export default function ModulesPage() {
  const [selectedSector, setSelectedSector] = useState<string>('')
  const [showCustomization, setShowCustomization] = useState(false)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sektör Modülleri</h1>
            <p className="text-gray-600 mt-1">İşinize uygun modülleri seçin ve özelleştirin</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button 
              onClick={() => setShowCustomization(!showCustomization)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-settings-3-line mr-2"></i>
              Özelleştir
            </button>
          </div>
        </div>

        {/* Customization Panel */}
        {showCustomization && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Modül Özelleştirme</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ana Sektörünüz
                </label>
                <div className="relative">
                  <select className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Sektör seçin</option>
                    <option value="ecommerce">E-ticaret</option>
                    <option value="restaurant">Restoran</option>
                    <option value="healthcare">Sağlık</option>
                    <option value="education">Eğitim</option>
                    <option value="finance">Finans</option>
                    <option value="logistics">Lojistik</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şirket Büyüklüğü
                </label>
                <div className="relative">
                  <select className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Büyüklük seçin</option>
                    <option value="small">Küçük (1-10 kişi)</option>
                    <option value="medium">Orta (11-50 kişi)</option>
                    <option value="large">Büyük (50+ kişi)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sector Modules */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Mevcut Modüller</h2>
          <SectorModules 
            selectedSector={selectedSector} 
            onSectorSelect={setSelectedSector} 
          />
        </div>

        {/* Integration Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Entegrasyon Durumu</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <i className="ri-database-2-line text-green-600 mr-3"></i>
                <span className="font-medium text-green-900">Supabase</span>
              </div>
              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Aktif</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <i className="ri-shopping-bag-line text-gray-600 mr-3"></i>
                <span className="font-medium text-gray-900">Shopify</span>
              </div>
              <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full">Pasif</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <i className="ri-bank-card-line text-gray-600 mr-3"></i>
                <span className="font-medium text-gray-900">Stripe</span>
              </div>
              <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full">Pasif</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}