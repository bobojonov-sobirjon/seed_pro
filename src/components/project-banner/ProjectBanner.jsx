const ProjectBanner = ({ number, title, subtitle }) => {
  return (
    <div className='bg-white shadow flex p-2 rounded items-center'>
      <div className='px-4 flex items-start flex-col p-2 '>
        <div className='bg-main-green rounded p-2 px-4'>
          <h1 className='text-xl font-bold text-white'>0{number}</h1>
        </div>
        <h2 className='text-[16px] lg:text-[18px] font-bold text-custom-gray mt-4'>{title},</h2>
        <p className='w-full lg:w-[70%] text-custom-gray mt-1 text-[14px] lg:text-[15px]'>{subtitle}</p>
      </div>
    </div>
  );
};

export default ProjectBanner;
