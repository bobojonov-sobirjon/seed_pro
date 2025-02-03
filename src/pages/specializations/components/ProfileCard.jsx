import { useTranslation } from "react-i18next";

const ProfileCard = (props) => {
  const { t } = useTranslation();
  const { user } = props;

  return (
    <div className='mx-auto p-4 lg:p-8 bg-white rounded-lg shadow-md overflow-hidden flex flex-col gap-4'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4 lg:gap-6'>
          <div>
            <img
              className='block h-[85px] w-[85px] rounded-full object-cover'
              src='https://via.placeholder.com/150'
              alt='Profile'
            />
          </div>
          <div>
            <div>
              <div className='uppercase font-gunterz text-custom-gray'>
                {user && user.first_name} {user && user.last_name}
              </div>
              <div className='text-[#939393] text-[13px] lg:text-[14px]'>
                {user?.active ? (
                  <span className="flex items-center gap-2">
                    {t(
                      "dashboard.header.specialists.details.profileCard.not_look_for_project"
                    )}{" "}
                    <div className="animate-pulse w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-red-700" ></div></span>
                ) : (
                  <span className="flex items-center gap-2">
                    {t(
                      "dashboard.header.specialists.details.profileCard.look_for_project"
                    )}{" "}
                    <div className="animate-pulse w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-700"></div></span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* {isFavorite && <IoStarSharp className='text-3xl text-main-green' />} */}
        </div>
      </div>
      <div className='flex px-2 items-center mt-4 flex-wrap font-gilroy_medium text-[14px] lg:text-[15px]'>
        <div className='flex lg:flex-row flex-col lg:gap-12 gap-4 justify-between'>
          <div className='text-custom-gray flex gap-3'>
            <span className='text-[#939393]'>
              {t("dashboard.header.specialists.details.profileCard.sex_label")}{" "}
            </span>
            <span className="">{user && user.sex == 1 ? t("dashboard.header.specialists.details.profileCard.man") : 'Женский'}</span>
          </div>

          <div className='text-custom-gray font-gilroy_medium flex gap-3'>
            <span className='text-[#939393]'>
              {t("dashboard.header.specialists.details.profileCard.birthday")}{" "}
            </span>
            <span className="">{user && user.birth_date}</span>
          </div>

          <div className='text-custom-gray font-gilroy_medium flex gap-3'>
            <span className='text-[#939393]'>
              {t("dashboard.header.specialists.details.profileCard.country")}{" "}
            </span>
            <span className="">{user && user.counrty}</span>
          </div>

          <div className='text-custom-gray font-gilroy_medium flex gap-3'>
            <span className='text-[#939393]'>
              {t("dashboard.header.specialists.details.profileCard.city")}{" "}
            </span>
            <span className="">{user && user.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
