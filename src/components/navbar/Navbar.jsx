import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BiMenuAltLeft } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import Language from "../language-dropdown/Language";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-white shadow-md px-2'>
      <div className={`container mx-auto flex items-center justify-between ${isOpen && 'flex-col'} relative`}>
        <div className={`flex items-center lg:items-center h-[70px] px-2 py-1 ${isOpen && 'flex-row-reverse'}`}>
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className={`text-black focus:outline-none h-full`}
            >
              {!isOpen && (
                <BiMenuAltLeft className='text-[29px]' />
              )}
            </button>
          </div>
          <div className={`font-bold text-[23px] text-main-green ml-2 md:ml-0 w-[200px] h-[37px] ${isOpen && 'flex justify-center'}`}>
            <Link to="/">
              STARTUP SEED
            </Link>
          </div>
        </div>
        <div className="block md:hidden">
          {/* <Language /> */}
        </div>

        {isOpen && (
          <MdClose className='text-[22px] text-black absolute top-3 right-1 cursor-pointer transition-all' onClick={toggleMenu} />
        )}

        <div className={`flex flex-col transition-all md:flex-row ${isOpen ? 'block' : 'hidden'} md:block md:items-center md:justify-center md:flex-row gap-2 ${isOpen && 'text-center'} text-[15px] lg:text-[16px]`}>
          <a href='#main'
            className='text-gray-600 hover:text-main-color px-4 py-2 block md:inline'
          >
            {t("home.header.home")}
          </a>
          <a href='#about'
            className='text-gray-600 hover:text-main-color px-4 py-2 block md:inline'
          >
            {t("home.header.about")}
          </a>
          <Link
            to='/reviews'
            className='text-gray-600 hover:text-main-color px-4 py-2 block md:inline'
          >
            {t("home.header.reviews")}
          </Link>
          <a href='#forwho'
            className='text-gray-600 hover:text-main-color px-4 py-2 block md:inline'
          >
            {t("home.header.questions")}
          </a>
          <a href='#contact'
            className='text-gray-600 hover:text-main-color px-4 py-2 block md:inline'
          >
            {t("home.header.contacts")}
          </a>
          <div className='w-full pb-2 lg:hidden'>
            <Language />
          </div>
          <div className='grid grid-cols-2 gap-2 w-full pb-2 lg:hidden'>
            <Link
              to='/login'
              className='text-gray-600 bg-black rounded-md hover:text-main-color px-4 py-2 col-span-1 w-full'
            >
              <span className="text-white">{t("home.header.login")}</span>
            </Link>
            <Link
              to='/register'
              className='bg-text-main_green text-white hover:bg-main-green-dark px-4 py-2 rounded-md transition-colors col-span-1 w-full'
            >
              {t("home.header.registration")}
            </Link>
          </div>
        </div>
        <div className='hidden lg:flex gap-5 lg:items-center text-[14px] lg:text-[15px]'>
          <Language />
          <Link
            to='/login'
            className='text-gray-600 bg-black rounded-[5px] hover:text-main-color px-6 lg:px-8 py-2'
          >
            <span className="text-white">{t("home.header.entrance")}</span>
          </Link>
          <Link
            to='/register'
            className='bg-text-main_green text-white hover:bg-main-green-dark px-[6] lg:px-8 py-2 rounded-[5px] transition-colors'
          >
            {t("home.header.registration")}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
