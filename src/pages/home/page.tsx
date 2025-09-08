import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <i className="ri-dashboard-line text-white text-lg"></i>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: '"Pacifico", serif' }}>
                  logo
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/auth/login"
                className="text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap cursor-pointer"
              >
                Giriş Yap
              </Link>
              <Link 
                to="/auth/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Başlayın
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(67, 56, 202, 0.1), rgba(79, 70, 229, 0.1)), url('https://readdy.ai/api/search-image?query=Modern%20business%20dashboard%20interface%20with%20data%20analytics%20charts%20graphs%20and%20statistics%20displayed%20on%20computer%20screens%20in%20a%20clean%20professional%20office%20environment%20with%20soft%20lighting%20and%20minimalist%20design%20elements&width=1200&height=600&seq=hero-bg&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Tüm Sektörler İçin
                <span className="block text-indigo-600">Akıllı Yönetim</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Esnek ve modüler yapısı ile her sektöre uyarlanabilen güçlü kontrol paneli. 
                Gerçek zamanlı raporlama, analitik ve proje yönetimi ile işinizi bir adım öne taşıyın.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/auth/register')}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
                >
                  Ücretsiz Başla
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Demo İncele
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20business%20analytics%20dashboard%20interface%20showing%20colorful%20charts%20graphs%20KPI%20metrics%20and%20data%20visualization%20elements%20on%20modern%20computer%20screen%20with%20clean%20UI%20design%20and%20vibrant%20data%20representations&width=600&height=500&seq=hero-dashboard&orientation=landscape"
                alt="Dashboard Preview"
                className="w-full h-auto rounded-2xl shadow-2xl object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Her Sektör İçin Özelleştirilmiş Çözümler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modüler yapımız sayesinde E-ticaret'ten Sağlık'a, Eğitim'den Finans'a kadar her sektörün ihtiyaçlarına uygun özellikler sunar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-bar-chart-box-line',
                title: 'Gerçek Zamanlı Analitik',
                description: 'Canlı veriler ve görsel raporlarla işinizi takip edin'
              },
              {
                icon: 'ri-settings-3-line',
                title: 'Modüler Yapı',
                description: 'İhtiyacınıza göre özelleştirilebilir modüller'
              },
              {
                icon: 'ri-team-line',
                title: 'Çoklu Kullanıcı',
                description: 'Takım yönetimi ve yetkilendirme sistemi'
              },
              {
                icon: 'ri-file-chart-line',
                title: 'Detaylı Raporlama',
                description: 'Özelleştirilebilir raporlar ve dışa aktarma'
              },
              {
                icon: 'ri-smartphone-line',
                title: 'Mobil Uyumlu',
                description: 'Her cihazdan erişilebilir responsive tasarım'
              },
              {
                icon: 'ri-shield-check-line',
                title: 'Güvenli Altyapı',
                description: 'Kurumsal seviye güvenlik ve veri koruması'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${feature.icon} text-indigo-600 text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sektörler */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hangi Sektörden Olursanız Olun
            </h2>
            <p className="text-xl text-gray-600">
              Sistemimiz her sektörün özel ihtiyaçlarına uyarlanabilir
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'E-ticaret', icon: 'ri-shopping-cart-line' },
              { name: 'Restoran', icon: 'ri-restaurant-line' },
              { name: 'Sağlık', icon: 'ri-heart-pulse-line' },
              { name: 'Eğitim', icon: 'ri-graduation-cap-line' },
              { name: 'Finans', icon: 'ri-bank-line' },
              { name: 'Lojistik', icon: 'ri-truck-line' }
            ].map((sector, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${sector.icon} text-indigo-600 text-xl`}></i>
                </div>
                <h3 className="font-semibold text-gray-900">{sector.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            İşinizi Dijitalleştirmeye Hazır mısınız?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Ücretsiz hesap oluşturun ve tüm özellikleri keşfedin
          </p>
          <button 
            onClick={() => navigate('/auth/register')}
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap cursor-pointer"
          >
            Hemen Başla
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-dashboard-line text-white text-lg"></i>
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: '"Pacifico", serif' }}>logo</h3>
              </div>
              <p className="text-gray-400">
                Tüm sektörler için esnek ve güçlü yönetim sistemi
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">Özellikler</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Fiyatlandırma</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Entegrasyonlar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">Dokümantasyon</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hızlı Bağlantılar</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://readdy.ai/?origin=logo" className="hover:text-white cursor-pointer">Make with Readdy</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Gizlilik</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Şartlar</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
