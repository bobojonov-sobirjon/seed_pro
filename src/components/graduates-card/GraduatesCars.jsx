const GraduatesCars = ({ image, title, description }) => {
  return (
    <div className='p-2 pb-0 h-[250px] overflow-y-scroll sm:min-h-[250px] mb-4 mx-1 shadow-shadow-bottom rounded-2xl'>
      <div className='flex flex-col items-start gap-2 mt-2 p-4 pb-6 rounded-md'>
        <img className='bg-white-300 h-[57px]' src={image} alt={image} />
        <p className='text-custom-gray font-gilroy-bold font-bold text-[14px] lg:text-[15px] uppercase'>
          {title}
        </p>

        <p className='text-[#939393] font-gilroy-bold text-[12px] lg:text-[14px] transition-all'>{description}</p>
      </div>
    </div>
  );
};

export default GraduatesCars;
