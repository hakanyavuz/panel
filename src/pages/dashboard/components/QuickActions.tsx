
import { useState } from 'react';

export default function QuickActions() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const actions = [
    { icon: 'ri-file-add-line', label: 'Yeni Rapor', color: 'text-blue-600' },
    { icon: 'ri-user-add-line', label: 'Müşteri Ekle', color: 'text-green-600' },
    { icon: 'ri-product-hunt-line', label: 'Ürün Ekle', color: 'text-purple-600' },
    { icon: 'ri-mail-send-line', label: 'E-posta Gönder', color: 'text-orange-600' },
    { icon: 'ri-settings-3-line', label: 'Ayarlar', color: 'text-gray-600' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer whitespace-nowrap"
      >
        <i className="ri-add-line mr-2"></i>
        Hızlı Eylemler
        <i className="ri-arrow-down-s-line ml-2"></i>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border">
          <div className="py-1">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => setDropdownOpen(false)}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className={`${action.icon} mr-3 ${action.color}`}></i>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
