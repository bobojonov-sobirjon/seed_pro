import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoStarSharp } from 'react-icons/io5';
import ApplyModal from '../../../../components/apply-modal/ApplyModal';

const AllProjectDetailCard = ({
  title = 'Front-End', // default title if none provided
  position = 'Medium',
  description = 'Разработка пользовательских интерфейсов. Навыки: разработка продукции приложений', // default description
  isFavorite = true, // default to favorite for demonstration
  link = '#', // default link
  skills = 'текст навыков',
}) => {
  const { t } = useTranslation();
  const [openApplyModal, setOpenApplyModal] = useState(false);

  const handleApply = () => setOpenApplyModal(true);
  const handleClose = () => setOpenApplyModal(false);

  // Example JSON data
  const data = {
    id: 1,
    company: {
      name: 'RegExp-IT',
    },
    technologies: ['React', 'TS', 'Redux', 'JS', 'CSS', 'HTML', 'SCSS'],
    dialogTitle: 'Front-End',
    description:
      'Компания занимается разработкой своего продукта, в том числе разработка цифровых систем для оплаты услуг',
    status: 'Middle',
  };

  return (
    <Link
      to={link}
      className='bg-white p-4 shadow-md rounded-lg mb-4 transition duration-150 ease-in-out hover:shadow-lg'
    >
      <div className='flex p-3 justify-between items-center'>
        <div className='flex items-center gap-3'>
          <h3 className='text-lg font-bold text-gray-800'>{title}</h3>
          <span className='text-main-green font-gilroy-bold'>{position}</span>
        </div>

        <div>
          {isFavorite && <IoStarSharp className='text-main-green text-2xl' />}
        </div>
      </div>
      <hr />
      <div className='p-3 flex lg:flex-row md:flex-col flex-col justify-between'>
        <div>
          {' '}
          <p className='font-gilroy-bold'>
            {t("extraComponents.allProjectDetails.tasks_and_acheiv")}{" "}
            <span className='text-gray-600 text-sm'>{description}</span>
          </p>
          <p className='font-gilroy-bold'>
            {t("extraComponents.allProjectDetails.skills")}{" "} <span className='text-gray-600 text-sm'>{skills}</span>
          </p>
        </div>

        <div className='mt-12 flex items-end'>
          <button
            onClick={handleApply}
            className='bg-gray-800 text-white w-full text-sm px-6 py-4 rounded-md hover:bg-gray-700'
          >
            {t("extraComponents.allProjectDetails.reply")}
          </button>
        </div>
      </div>
      <ApplyModal isOpen={openApplyModal} onClose={handleClose} data={data} />
    </Link>
  );
};

export default AllProjectDetailCard;
