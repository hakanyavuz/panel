
import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Ana Sayfa', icon: 'ri-dashboard-line', path: '/dashboard' },
    { id: 'modules', label: 'Sektör Modülleri', icon: 'ri-apps-line', path: '/dashboard/modules' },
    { id: 'projects', label: 'Projelerim', icon: 'ri-folder-line', path: '/dashboard/projects' },
    { id: 'reports', label: 'Raporlar', icon: 'ri-file-chart-line', path: '/dashboard/reports' },
    { id: 'analytics', label: 'Analitik', icon: 'ri-bar-chart-line', path: '/dashboard/analytics' },
    { id: 'customers', label: 'Müşteriler', icon: 'ri-user-line', path: '/dashboard/customers' },
    { id: 'settings', label: 'Ayarlar', icon: 'ri-settings-3-line', path: '/dashboard/settings' },
  ]

  const navigate = useNavigate()

  const handleItemClick = (item: typeof menuItems[0]) => {
    setActiveItem(item.id)
    navigate(item.path)
  }

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="ri-dashboard-line text-white text-lg"></i>
          </div>
          <h1 className="ml-3 text-xl font-bold text-gray-900" style={{ fontFamily: '"Pacifico", serif' }}>
            logo
          </h1>
        </div>
      </div>

      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeItem === item.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <i className={`${item.icon} mr-3 text-lg`}></i>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center">
            <i className="ri-star-line text-indigo-600 text-lg mr-3"></i>
            <div>
              <p className="text-sm font-medium text-indigo-900">Pro Sürüm</p>
              <p className="text-xs text-indigo-600">Tüm özellikleri açın</p>
            </div>
          </div>
          <button className="w-full mt-3 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer">
            Yükselt
          </button>
        </div>
      </div>
    </aside>
  )
}
