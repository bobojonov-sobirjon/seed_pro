// react core
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Self from './components/Self';
import { getProfile, isLoading } from '../../../redux/reducers/profileReducer';
import ProfessionalInfo from './components/ProfessionalInfo';
import Experience from './components/Experience';
import Education from './components/Education';
import Course from './components/Course';
import About from './components/About';

const Profile = (props) => {

  // get profile
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetProfile({ signal }); // get profile

    return () => controller.abort();
  }, []);

  // get again data
  const getData = () => {
    props.onGetProfile({}); // get profile
  }

  return (
    <main className='h-[90vh] overflow-y-auto'>
      <div className='max-w-5xl mx-auto my-10 p-0 lg:p-8 bg-white shadow-lg rounded-lg'>
        {/* just self */}
        <Self
          profileData={props.profileData}
          getData={getData}
        />
      </div>

      {/* Профессиональная информация */}
      <ProfessionalInfo />

      {/* experience */}
      <Experience />

      {/* education */}
      <Education />

      {/* Курсы и повышение квалификации */}
      <Course />

      {/* about me */}
      <About />
    </main>
  );
};

const mapStateToProps = state => {
  return {
    profileData: state.profileReducer.profileData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoading: value => dispatch(isLoading(value)),
    onGetProfile: (value) => dispatch(getProfile(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
