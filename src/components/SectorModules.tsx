import { useState } from 'react'

interface SectorModule {
  id: string
  name: string
  icon: string
  description: string
  features: string[]
  color: string
}

const sectorModules: SectorModule[] = [
  {
    id: 'ecommerce',
    name: 'E-ticaret',
    icon: 'ri-shopping-cart-line',
    description: 'Online mağaza yönetimi ve satış analizi',
    features: ['Ürün Yönetimi', 'Sipariş Takibi', 'Stok Kontrolü', 'Müşteri Analizi'],
    color: 'bg-blue-500'
  },
  {
    id: 'restaurant',
    name: 'Restoran',
    icon: 'ri-restaurant-line',
    description: 'Restoran operasyonları ve menü yönetimi',
    features: ['Menü Yönetimi', 'Sipariş Sistemi', 'Masa Takibi', 'Personel Yönetimi'],
    color: 'bg-orange-500'
  },
  {
    id: 'healthcare',
    name: 'Sağlık',
    icon: 'ri-heart-pulse-line',
    description: 'Hasta takibi ve sağlık kayıtları',
    features: ['Hasta Kayıtları', 'Randevu Sistemi', 'Tedavi Takibi', 'Raporlama'],
    color: 'bg-green-500'
  },
  {
    id: 'education',
    name: 'Eğitim',
    icon: 'ri-graduation-cap-line',
    description: 'Öğrenci ve kurs yönetimi sistemi',
    features: ['Öğrenci Takibi', 'Ders Programı', 'Not Sistemi', 'İletişim'],
    color: 'bg-purple-500'
  },
  {
    id: 'finance',
    name: 'Finans',
    icon: 'ri-bank-line',
    description: 'Mali işlemler ve bütçe yönetimi',
    features: ['Bütçe Takibi', 'Gelir-Gider', 'Yatırım Analizi', 'Risk Yönetimi'],
    color: 'bg-indigo-500'
  },
  {
    id: 'logistics',
    name: 'Lojistik',
    icon: 'ri-truck-line',
    description: 'Kargo ve sevkiyat operasyonları',
    features: ['Sevkiyat Takibi', 'Depo Yönetimi', 'Rota Optimizasyonu', 'Araç Takibi'],
    color: 'bg-red-500'
  }
]

interface SectorModulesProps {
  selectedSector?: string
  onSectorSelect?: (sectorId: string) => void
}

export default function SectorModules({ selectedSector, onSectorSelect }: SectorModulesProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sectorModules.map((module) => (
        <div
          key={module.id}
          className={`bg-white rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${
            selectedSector === module.id
              ? 'border-indigo-500 shadow-lg'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => {
            onSectorSelect?.(module.id)
            setExpandedModule(expandedModule === module.id ? null : module.id)
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center`}>
                <i className={`${module.icon} text-white text-xl`}></i>
              </div>
              <i className={`ri-arrow-${expandedModule === module.id ? 'up' : 'down'}-s-line text-gray-400`}></i>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{module.description}</p>
            
            {expandedModule === module.id && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Özellikler:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {module.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      {feature}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
                  Modülü Etkinleştir
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}