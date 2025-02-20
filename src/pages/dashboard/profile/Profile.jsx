// react core
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Self from "./components/Self";
import { getProfile, isLoading } from "../../../redux/reducers/profileReducer";
import ProfessionalInfo from "./components/ProfessionalInfo";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Course from "./components/Course";
import About from "./components/About";
import { axiosInstances } from "../../../config/config";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const Profile = (props) => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState({});
  const user_id = searchParams.get("user_id");
  console.log(user_id);

  const getUserById = async () => {
    try {
      const res = await axiosInstances.get(`/user/profile/${user_id}`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // get profile
  useEffect(() => {
    if (user_id) {
      getUserById();
    } else {
      const controller = new AbortController();
      const signal = controller.signal;

      props.onGetProfile({ signal }); // get profile
      return () => controller.abort();
    }
  }, [user_id]);
  // get again data
  const getData = () => {
    props.onGetProfile({}); // get profile
  };

  return (
    <main className="h-[90vh] overflow-y-auto overflow-x-hidden">
      <div className="max-w-5xl mx-auto w-full my-10 p-0 lg:p-8 bg-white shadow-lg rounded-lg">
        {/* just self */}
        <Self
          profileData={user_id ? user : props.profileData}
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

const mapStateToProps = (state) => {
  return {
    profileData: state.profileReducer.profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoading: (value) => dispatch(isLoading(value)),
    onGetProfile: (value) => dispatch(getProfile(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
