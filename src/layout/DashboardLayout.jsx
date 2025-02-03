import { Outlet } from 'react-router-dom';

// components
import DashboardSidebar from '../components/dashboard-sidebar/DashboardSidebar';
import Footer from '../components/footer/Footer';
import { DashboardNavbar } from '../components';

const DashboardLayout = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col lg:flex-row min-h-screen'>
        {/* @ts-ignore */}
        <DashboardSidebar className='w-full lg:w-1/6 xl:w-1/5 2xl:w-1/6 ' />
        <main className='flex-1 lg:p-2 p-4'>
          <div className='max-w-5xl mx-auto py-2'>
            <DashboardNavbar />
          </div>
          <Outlet />
        </main>
      </div>

      <div className='relative bg-black p-8 pb-4'>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
