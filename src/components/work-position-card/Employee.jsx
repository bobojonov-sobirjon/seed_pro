import { memo } from "react";
import { useTranslation } from "react-i18next";
import { levels } from "../../utils/options";
import noImage from "../../assets/images/no-image.png";

const Employee = ({ item }) => {
  const { t } = useTranslation();

  console.log(item)
  return (
    <div key={item.id} className='p-4 lg:p-6 bg-white shadow-sm shadow-black rounded-lg'>
      <div className='flex items-center justify-between flex-wrap'>
        <div className='flex gap-4 items-center'>
          {(item.owner?.avatar && item.owner?.avatar !== "https://api.startap-seed.ru/media/avatar/404-error.png") ? (
            <img src={item.owner?.avatar} alt="no image" />
          ) : (
            <div className='h-[60px] lg:h-[90px] w-[60px] lg:w-[90px] rounded-full bg-black relative'>
              <img src={noImage} alt="no image" className='absolute inset-0 m-auto w-[30px] h-[30px]' />
            </div>
          )}
          <div>

            <span className='font-gilroy_bold text-[17px] lg:text-[18px]'>{item?.first_name} {item?.last_name}</span>

            <div>
              {item.information.map(elem => (
                <div key={elem.id} className='text-text-main_green text-[14px] font-gilroy_semibold flex gap-1'>
                  <span>{elem.career_objective}</span>
                  <span>{elem.level}</span>
                </div>
              ))}
            </div>
            <div className='mt-[14px] gap-1 flex items-center flex-wrap'>
              {item.information.map(elem => (
                elem.skills && elem.skills.split(",").map(e => (
                  <div key={Math.random().toString()} className='rounded-[5px] bg-custom-gray py-[3px] lg:py-[6px] max-w-max px-[6px] lg:px-[12px] text-white font-gilroy_bold text-[12px] lg:text-[14px]'>
                    {e}
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>

      </div>


    </div>
  );
};

export default memo(Employee);
