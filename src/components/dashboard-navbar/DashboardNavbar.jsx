import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BiTrash } from 'react-icons/bi';
import { getProfile } from '../../redux/reducers/profileReducer';
import { deleteOneNotification, getAllNotifications } from '../../redux/reducers/notificationsReducer';
import { useAuth } from '../../services/useAuth';
import settings from '../../assets/settings.svg';
import notification from '../../assets/notification.svg';
import ImageIcon from '../../assets/images/user.png';
import noImage from '../../assets/images/no-image.png';
import { Bell, BellRing, Settings } from 'lucide-react';

const DashboardNavbar = (props) => {
  const { t } = useTranslation();
  const { user_id } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);


  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false); // Tashqariga bosilganda yopiladi
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // get user
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetProfile({ signal }); // get profile data
    props.onGetAllNotifications({ signal }); // get all notifications data

    return () => controller.abort();
  }, []);

  // delete item
  const deleteItem = async item => {
    if (item && item.hasOwnProperty("id")) {
      props.onDeleteOneNotification(item);
    }
  }

  // navigate
  const navigateHandler = item => {
    if (item && item.hasOwnProperty("id")) {
      let obj = {
        receiver: item.favorite?.sender,
        senderId: user_id,
        text: "",
        project: {}
      }
      navigate("/admin/messages", { state: obj });
      // setIsOpen(false);
    }
  }

  return (
    <>
      <nav className='flex justify-between items-center mx-auto rounded-full p-4 px-10 bg-white shadow-md lg:mt-2 font-gilroy'>
        <div className='flex gap-4'>
          <Link
            to='all-projects'
            className='hover:text-gray-500 font-gilroy-bold text-custom-gray transition-all'
          >
            {t("dashboard.header.link_one")}
          </Link>
          <Link
            to='specializations'
            className='hover:text-gray-500 font-gilroy-bold text-custom-gray transition-all'
          >
            {t("dashboard.header.link_two")}
          </Link>
        </div>
        <div className='hidden lg:flex items-center gap-4'>
          <Link to={'settings'}>
            <Settings className='text-black hover:rotate-90 transition-all' />
          </Link>
          <div className='relative cursor-pointer text-left mt-1'>
            <div onClick={() => setIsOpen(!isOpen)} className=''>
              <BellRing className='text-black hover:rotate-[12deg] transition-all' />
              {/* count */}
              {/* <div className='absolute -top-[6px] -right-[3px] w-[15px] text-[11.5px] h-[15px] flex items-center justify-center rounded-full bg-[#000] text-white'>
                <p className='p-0'>{props.allNotifications && Array.isArray(props.allNotifications) ? props.allNotifications?.length : 0}</p>
              </div> */}
              <div className='w-4 h-4 bg-black rounded-full absolute -top-1 -right-1 flex items-center justify-center text-white text-[10px] font-gilroy_bold'>
                <p className='p-0'>{props.allNotifications && Array.isArray(props.allNotifications) ? (props.allNotifications?.length > 9 ? "9+" : props.allNotifications?.length) : 0}</p>
              </div>
            </div>

            {isOpen && (
              <div
                ref={menuRef}
                // transition
                className="absolute right-0 z-10 pl-[4px] mt-2 w-[98%] lg:w-[400px] origin-top-right rounded-[10px] bg-white shadow-lg max-h-[400px] overflow-y-scroll scrollClassname py-2"
              >
                {props.allNotifications && Array.isArray(props.allNotifications) && props.allNotifications?.length > 0 && props.allNotifications.map(item => {
                  let d = item?.favorite;
                  return (
                    <>
                      <div
                        key={item.id}
                        onClick={() => {
                          navigateHandler(item)
                        }}>
                        <div
                          className="px-3 text-[12px] text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText] flex items-start justify-between hover:bg-gray-100 transition-all rounded-md py-1 cursor-default"
                        >
                          <div className='flex items-start gap-4'>
                            <img src={d.sender?.avatar ? d.sender?.avatar : noImage} className='w-[48px] h-[48px] rounded-full object-cover' alt="no image" />
                            <div className='flex flex-col'>
                              <span className='font-gilroy_medium text-[15px] text-custom-gray lg:text-[16px] flex items-center gap-1'>
                                <span>{d.sender?.first_name} {d.sender?.last_name}</span>
                                <span className='flex items-center p-0 text-red-700 cursor-pointer' title="Удалить" onClick={() => deleteItem(item)}>[<BiTrash />]</span>
                              </span>
                              <span className='text-[#A7A5A5] text-[12px] lg:text-[13px] font-gilroy_medium line-clamp-1 break-words'>{d?.text}</span>
                            </div>
                          </div>
                          <span className='text-[12px] text-[#A7A5A5] font-gilroy_medium'>{new Date(d.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <hr className='w-[94%] m-auto my-2' />
                    </>
                  )
                })}
              </div>
            )}
          </div>
          <Link to="/admin/profile" className={`flex items-center justify-center h-10 w-10 rounded-full ${props.profileData && props.profileData?.avatar ? 'p-0' : 'p-2'} bg-custom-gray text-white`} >
            <img
              className={`${(props.profileData && props.profileData?.avatar) ? 'w-full h-full' : 'w-100 h-100'} rounded-full object-cover`}
              src={(props.profileData?.avatar && props.profileData?.avatar !== "https://api.startap-seed.ru/media/avatar/404-error.png") ? props.profileData?.avatar : "https://github.com/shadcn.png"} alt='error image' />
          </Link>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = state => {
  return {
    profileData: state.profileReducer.profileData,
    allNotifications: state.notificationsReducer.allNotifications,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetProfile: value => dispatch(getProfile(value)),
    onGetAllNotifications: value => dispatch(getAllNotifications(value)),
    onDeleteOneNotification: value => dispatch(deleteOneNotification(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavbar);
