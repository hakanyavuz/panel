
import DashboardLayout from './components/DashboardLayout';
import StatsOverview from './components/StatsOverview';
import ChartSection from './components/ChartSection';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kontrol Paneli</h1>
            <p className="text-gray-600">İşletmenizin genel durumunu görüntüleyin</p>
          </div>
          <QuickActions />
        </div>
        
        <StatsOverview />
        <ChartSection />
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}
