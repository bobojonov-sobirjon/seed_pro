import { memo } from "react";
import { useTranslation } from "react-i18next";
import { levels } from "../../utils/options";

const WorkPositionCard = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex gap-4 items-center mb-4'>
        <span className='text-[18px] lg:text-[20px] font-gilroy_bold text-custom-gray'>
          {item?.position}
        </span>
        <span className='text-text-main_green py-1 px-3 font-gilroy_semibold text-[14px] lg:text-[15px]'>
          {levels.find(el => el.value == item.level)?.name}
        </span>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-2'>
        <div className='col-span-1'>
          <h3 className='text-custom-gray text-sm'>
            <span className="block font-gilroy_semibold">
              {t("extraComponents.workPositionCard.tasks_and_acheiv")} &nbsp;
            </span>
            <span className='font-gilroy_medium text-[#A7A5A5]'>
              {item.tasks}
            </span>
          </h3>
        </div>
        <div className='col-span-1'>
          <h3 className='font-gilroy-bold text-sm text-custom-gray'>
            <span className="block font-gilroy_semibold">
              {t("extraComponents.workPositionCard.skills")} &nbsp;
            </span>
            <div className="flex items-center flex-wrap gap-1">
              {item.tags?.length > 0 && item.tags.map(el => (
                <span key={el.id} className='font-gilroy_medium text-[#fff] bg-gray-800 p-0.5 px-2 rounded-md'>{el.name}</span>
              ))}
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default memo(WorkPositionCard);
