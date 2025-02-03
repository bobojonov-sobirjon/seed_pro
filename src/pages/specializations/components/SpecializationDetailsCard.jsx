import { useTranslation } from 'react-i18next';
import { Button } from '@material-tailwind/react';

const SpecializationDetailsCard = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    user && user.information && Array.isArray(user.information) && user.information?.length > 0 && user.information.map(item => (
      <div key={Math.random().toString()} className='mx-auto p-4 lg:p-8 bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='flex flex-col gap-4'>
          <h1 className='font-gilroy_bold text-text-main_green text-[18px] lg:text-[20px]'>
            {item.career_objective}
          </h1>

          <ul className='font-gilroy_medium flex lg:flex-row flex-col lg:gap-8 gap-2 text-[14px] lg:text-[15px]'>
            <li className='text-custom-gray'>
              <span className='text-[#939393] mr-1'>
                {t(
                  "dashboard.header.specialists.details.specialCard.job_title"
                )}{" "}
              </span> {item.level}
            </li>
            <li className='text-custom-gray'>
              <span className='text-[#939393] mr-1'>
                {" "}
                {t(
                  "dashboard.header.specialists.details.specialCard.level2"
                )}{" "}
              </span> {item.laguage}
            </li>
            <li className='text-custom-gray'>
              <span className='text-[#939393] mr-1'>
                {" "}
                {t(
                  "dashboard.header.specialists.details.specialCard.level"
                )}{" "}
              </span> {item.laguage_level}
            </li>
          </ul>

          <div className='flex gap-2'>
            {item.skills && item.skills?.length > 0 && item.skills.split(",").map(el => (
              <Button
                key={Math.random().toString()}
                placeholder={<div />}
                variant='filled'
                className={`uppercase rounded-md px-3 bg-custom-gray`}
              >
                {el}
              </Button>
            ))}
          </div>
        </div>
      </div>
    ))
  );
};

export default SpecializationDetailsCard;
