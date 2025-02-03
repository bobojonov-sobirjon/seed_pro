import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const Layout = () => {
  return (
    <div>
      <a name="main">
        <Navbar />
      </a>
      <main className='w-100'>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
