import Banner from './components/Banner';
import Project from './components/Project';
import Footer from '../../components/footer/Footer';
import HowWork from './components/HowWork';
import Career from './components/Career';
import ForWho from './components/ForWho';
import Graduates from './components/Graduates';
import Speaker from './components/Speaker';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {

  return (
    <>
      <scroll-container>
        <Banner />

        <Project />

        <HowWork />

        <Career />

        <ForWho />

        <Graduates />

        <Speaker />

        {/* footer section */}
        <div className='bg-black pt-8 lg:pb-8 pb-0 relative'>
          <Footer />
        </div>
      </scroll-container>
    </>
  );
};

export default Home;
