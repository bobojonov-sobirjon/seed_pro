import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoStarSharp, IoStarOutline } from 'react-icons/io5';
import { errorHandler, getToast, getToastWarn } from '../../../../utils/options';
import { axiosInstances } from '../../../../config/config';

const ProjectDetails = ({ data }) => {
  const { t } = useTranslation();
  const [inData, setInData] = useState(data || {});

  // add favorite
  const addFavorite = async d => {
    try {
      const res = await axiosInstances.post("/favourite/", {
        project: d.id,
      });
      if (res.status === 200 || res.status === 201) {
        getToast(t("toastMessage.projectDetailCardPage.added_success"));
        let d = {
          ...inData,
          favorite: !inData.favorite
        }
        setInData(d);
      } else getToastWarn(
        res.data?.message || t("toastMessage.projectDetailCardPage.try_again")
      );
    } catch (error) {
      // console.log(error);
      errorHandler(error);
    }
  }

  // delete item in favorite
  const deleteFavorite = async d => {
    try {
      const res = await axiosInstances.delete(`/favourite/${d.id}`);
      if (res.status === 200 || res.status === 201) {
        getToast(t("toastMessage.projectDetailCardPage.delete_success"));
        let d = {
          ...inData,
          favorite: !inData.favorite
        }
        setInData(d);
      } else getToastWarn(
        res.data?.message || t("toastMessage.projectDetailCardPage.try_again")
      );
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div className='flex items-center justify-between relative'>
      <div className='flex flex-1 items-center'>
        <Link to={'/admin/projects'}
          className='bg-white p-4 py-6 w-full shadow rounded-lg mb-4 min-h-[100px] flex items-center' >
          <div className='flex items-center justify-center h-[80px] w-[80px] rounded-full text-white mr-4 border'>
            <img src={inData.project_image} alt='no image' className='w-hull h-full rounded-full' />
          </div>
          <div className='flex-1'>
            <h3 className='font-gilroy_bold lg:text-[20px] text-[16px] text-custom-gray'>
              {inData.name}
            </h3>
            <p className='text-[#A7A5A5] font-gilroy_medium text-[13px] lg:text-[14px] line-clamp-2'>
              {inData.description}
            </p>
          </div>
        </Link >
      </div>

      <div className='absolute top-[20%] lg:top-[30%] right-4'>
        {inData.favorite ? (
          <IoStarSharp className='text-3xl text-main-green' onClick={() => deleteFavorite(inData)} />
        ) : (
          <IoStarOutline className='text-3xl text-gray-500' onClick={() => addFavorite(inData)} />
        )}
      </div>
    </div>
  );
};

export default memo(ProjectDetails);
