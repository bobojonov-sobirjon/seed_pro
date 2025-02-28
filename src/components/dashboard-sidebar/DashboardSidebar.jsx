import { useEffect, useState } from "react";
// react router
import { Link, NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
// import { Switch } from '@material-tailwind/react';
//react icons
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidHomeCircle } from "react-icons/bi";
// material tailwind
import { onExit } from "../../redux/reducers/rootReducer";
import { getProfile } from "../../redux/reducers/profileReducer";
// import { axiosInstances } from '../../config/config';
// import { errorHandler, getToastWarn } from '../../utils/options';
// images
import pagesIcon from "../../assets/images/pages-icon.svg";
import userIcon from "../../assets/images/user-icon.svg";
import projectIcon from "../../assets/images/projects-icon.svg";
import messageIcon from "../../assets/images/message.svg";
import starIcon from "../../assets/images/star-icon.svg";
import settingsIcon from "../../assets/images/settings-icon.svg";
import doorIcon from "../../assets/images/door-icon.svg";
import pen from "../../assets/pen.svg";
import LanguageSelector from "../language-dropdown/Language";

const DashboardSidebar = (props) => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const { t } = useTranslation();
  const [isMobileNavVisible, setMobileNavVisibility] = useState(false);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const toggleDropdown = () => setDropdownVisibility(!isDropdownVisible);

  // get profile
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetProfile({ signal }); // get profile

    return () => controller.abort();
  }, []);

  // swicth checked
  // const switchCheckedHandler = async event => {
  //   if (props.profileData && props.profileData.hasOwnProperty("id")) {
  //     let data = props.profileData;
  //     try {
  //       let obj = {
  //         active: event.target.checked,
  //         email: data.email,
  //         id: data.id,
  //         phone: data.phone,
  //         username: data.username,
  //         first_name: data.first_name,
  //         last_name: data.last_name,
  //         counrty: data.counrty,
  //         city: data.city,
  //         sex: data.sex,
  //         birth_date: data.birth_date,
  //       };
  //       const res = await axiosInstances.put("/profile/", obj);
  //       if (res.status === 200 || res.status === 201) {
  //         props.onGetProfile({}); // get profile
  //       } else getToastWarn(res.data || res.data?.message);
  //     } catch (error) {
  //       // console.log(error);
  //       errorHandler(error);
  //     }
  //   }
  // }

  // on exit site
  const onExitHandlerr = () => {
    props.onExitHandler(null);
    cookie.remove("user", { path: "/" });
    navigate("/");
  };
  return (
    <>
      {!isMobileNavVisible && (
        <div className="bg-white shadow-sm right-0 z-30 flex items-center justify-between lg:hidden">
          <button
            className="p-4 text-gray-600 hover:text-gray-700 lg:hidden"
            onClick={() => setMobileNavVisibility(!isMobileNavVisible)}
          >
            <GiHamburgerMenu
              className={`w-6 h-6 ${
                isMobileNavVisible ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <Link to="/admin/pages">
            <h1 className="font-montserrat text-text-main_green text-[22px] pr-4 cursor-pointer">
              STARTUP SEED
            </h1>
          </Link>
        </div>
      )}
      <div
        className={`bg-white shadow-lg z-20 transition-all duration-300 ease-in-out ${
          isMobileNavVisible ? "block" : "hidden"
        } lg:block`}
      >
        {/* Sidebar Content */}
        <div className="flex items-center justify-between gap-2 mt-6 pl-4 pr-8">
          <Link to="/admin/pages">
            <h1 className="font-montserrat text-text-main_green text-[22px] cursor-pointer">
              STARTUP SEED
            </h1>
          </Link>
          <span
            className="text-3xl block lg:hidden cursor-pointer"
            onClick={() => setMobileNavVisibility(!isMobileNavVisible)}
          >
            &times;
          </span>
        </div>

        {/* Navigation and other content goes here */}
        <nav
          className={`mt-3 ${
            isMobileNavVisible ? "block" : "hidden"
          } lg:flex flex-col gap-2 font-gilroy_medium text-custom-gray text-[15px] lg:text-[16px]`}
        >
          <span className="flex items-center py-2 gap-4 pl-4">
            <div
              className={`w-3 h-3 rounded-full animate-pulse ${
                props.profileData?.active ? "bg-green-700" : "bg-red-700"
              }`}
            ></div>
            <p
              className={`font-gilroy_semibold text-[14px] ${
                props.profileData?.active ? "text-green-700" : "text-red-700"
              }`}
            >
              {props.profileData?.groups &&
              props.profileData?.groups.length > 0 &&
              props.profileData?.groups[0] === 1
                ? t("dashboard.sidebarItems.user_type_one")
                : t("dashboard.sidebarItems.user_type_two")}
            </p>
          </span>
          <NavLink
            to="/admin/pages"
            onClick={() => setMobileNavVisibility(false)}
            className={({ isActive }) =>
              isActive
                ? "active-link flex hover:bg-gray-100 hover:text-gray-800 pl-3.5"
                : "flex hover:bg-gray-100 hover:text-gray-800 pl-3.5"
            }
          >
            <span className="flex items-center py-2">
              <BiSolidHomeCircle className="w-6 h-6 mr-3" />
              <p className="">{t("dashboard.sidebarItems.home_link")}</p>
            </span>
          </NavLink>
          <div
            className="flex items-center py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer px-4"
            onClick={toggleDropdown}
          >
            <div className={"flex items-center justify-between w-full"}>
              <div className="flex items-center">
                <img className="w-5 h-5 mr-3" src={pagesIcon} alt="" />
                <span>{t("dashboard.sidebarItems.pages_link")}</span>
              </div>
              <MdOutlineKeyboardArrowDown
                className={`w-4 h-4 ml-5 ${
                  isDropdownVisible ? "transform rotate-180" : ""
                }`}
              />
            </div>
          </div>
          {isDropdownVisible && (
            <div className="flex flex-col ">
              {props.profileData?.active &&
                props.profileData?.groups[0] === 1 && (
                  <Link
                    onClick={() => setMobileNavVisibility(false)}
                    to={"/admin/create-project"}
                    className={`flex items-center py-2 hover:bg-gray-200 px-4`}
                  >
                    <MdOutlineKeyboardArrowRight className="w-4 h-4 mr-2" />
                    {t("dashboard.sidebarItems.add_project_link")}
                  </Link>
                )}
              <Link
                onClick={() => setMobileNavVisibility(false)}
                to="all-projects"
                className="flex items-center py-2 hover:bg-gray-200 px-4"
              >
                <MdOutlineKeyboardArrowRight className="w-4 h-4 mr-2" />
                {t("dashboard.sidebarItems.search_project_link")}
              </Link>
            </div>
          )}

          <NavLink
            to="/admin/profile"
            onClick={() => setMobileNavVisibility(false)}
            className={({ isActive }) =>
              isActive
                ? "active-link flex hover:bg-gray-100 hover:text-gray-800 px-4"
                : "flex hover:bg-gray-100 hover:text-gray-800 px-4"
            }
          >
            <span className="flex items-center py-2 relative">
              <img className="w-5 h-5 mr-3" src={userIcon} alt="no image" />
              <p className="">{t("dashboard.sidebarItems.profile_link")}</p>
              <img
                src={pen}
                alt="no image"
                className="absolute top-2 -right-5"
              />
            </span>
          </NavLink>
          {props.profileData?.active && (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "active-link flex hover:bg-gray-100 hover:text-gray-800 px-4"
                  : "flex hover:bg-gray-100 hover:text-gray-800 px-4"
              }
              onClick={() => setMobileNavVisibility(false)}
              to="/admin/projects"
            >
              <span className="flex items-center py-2">
                <img className="w-5 h-5 mr-3" src={projectIcon} alt="" />
                <p className="">
                  {t("dashboard.sidebarItems.my_project_link")}
                </p>
              </span>
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "active-link flex hover:bg-gray-100 hover:text-gray-800 px-4"
                : "flex hover:bg-gray-100 hover:text-gray-800 px-4"
            }
            onClick={() => setMobileNavVisibility(false)}
            to="/admin/messages"
          >
            <span className="flex items-center py-2">
              <img className="w-5 h-5 mr-3" src={messageIcon} />
              <p className="">{t("dashboard.sidebarItems.messages_link")}</p>
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "active-link flex hover:bg-gray-100 hover:text-gray-800 px-4"
                : "flex hover:bg-gray-100 hover:text-gray-800 px-4"
            }
            onClick={() => setMobileNavVisibility(false)}
            to="/admin/favorites"
          >
            <span className="flex items-center py-2">
              <img src={starIcon} className="w-5 h-5 mr-3" />
              {t("dashboard.sidebarItems.favorites_link")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "active-link flex hover:bg-gray-100 hover:text-gray-800 px-4"
                : "flex hover:bg-gray-100 hover:text-gray-800 px-4"
            }
            onClick={() => setMobileNavVisibility(false)}
            to="/admin/settings"
          >
            <span className="flex items-center py-2">
              <img src={settingsIcon} className="w-5 h-5 mr-3" />
              {t("dashboard.sidebarItems.settings_link")}
            </span>
          </NavLink>
        </nav>

        <div
          className="flex flex-col items-center justify-center w-full gap-4 mt-6 lg:mt-16 cursor-pointer px-4"
          onClick={onExitHandlerr}
        >
          <span className="mt-auto bg-custom-gray w-full justify-center hover:bg-gray-500 text-white py-4 px-8 rounded-lg flex items-center">
            <img src={doorIcon} className="w-5 h-5 mr-3" />
            {t("dashboard.sidebarItems.logout_link")}
          </span>
        </div>

        <div className="flex items-center justify-center my-4">
          <LanguageSelector classes="w-[91%]" classesOption="" />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profileData: state.profileReducer.profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExitHandler: (value) => dispatch(onExit(value)),
    onGetProfile: (value) => dispatch(getProfile(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSidebar);
