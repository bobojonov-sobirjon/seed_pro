// components
import { useTranslation } from 'react-i18next';
import { ProjectBanner } from '../../../components';
import { bannerData } from '../../../mock';

const Pages = () => {
  const { t } = useTranslation();

  return (
    <div className='max-w-5xl mx-auto my-10 lg:my-20'>
      <h1 className='font-gunterz text-custom-gray text-xl lg:text-2xl text-center lg:text-left'>
        {t("dashboard.home.title")}
      </h1>

      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-10'>
        {bannerData?.length > 0 && bannerData.map((item, index) => {
          return (
            <ProjectBanner
              key={item.id}
              number={index + 1}
              title={t(`dashboard.home.items.${index}.content`)}
              subtitle={t(`dashboard.home.items.${index}.description`)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Pages;
