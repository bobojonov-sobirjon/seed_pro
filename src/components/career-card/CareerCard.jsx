import leafImage from '../../assets/images/gazon.png';

const CareerCard = ({ number, title, description, image }) => {
  let language = localStorage.getItem("language");

  return (
    <div className='shadow-shadow-bottom rounded-2xl relative h-[320px] lg:h-[280px] p-6 w-full lg:w-[100%]'>
      <div className='font-montserrat'>
        <h1 className={`text-[25px] lg:text-[30px] text-[#B7ED1D] font-bold`}>{number}</h1>
        <h2 className={`${language == "cn" ? "text-[14px] lg:text-[16px]" : "text-[18px] lg:text-[20px]"} text-custom-gray font-bold`}>{title}</h2>
        <p className={`${language == "cn" ? "text-[11px] lg:text-[12px]" : "text-[12px] lg:text-[14px]"} text-[#939393] font-semibold pr-6 lg:pr-22 font-gilroy`}>
          {description}
        </p>
      </div>
      <div
        className='absolute bottom-0 right-0'
        style={{
          backgroundImage: `url(${leafImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <img
          className='lg:w-[220px] lg:h-[150px]'
          src={image}
          alt='error image'
        />
      </div>
    </div>
  );
};

export default CareerCard;
