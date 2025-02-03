const HowWorkCard = (props) => {
  const { isTrue = true, image, content, description } = props;
  return (
    <div className="rounded-md w-full bg-gradient-to-b from-[#66686b] via-[#44474a] to-[#26282c] p-[1px] pt-[1.5px]">
      <div className='py-4 px-6 h-full bg_gradient_how_work' >
        <img className='bg-white-300 p-0 w-30 -ml-7' src={image} alt={image} />
        <p className='text-white font-gilroy-bold text-[16px] lg:text-[16px] -mt-2'>
          {content}{isTrue && ","}
        </p>
        <p className='text-white mt-2 break-words whitespace-pre-wrap font-gilroy font-medium text-[14px] lg:text-[15px]'>{description}</p>
      </div>
    </div>
  );
};

export default HowWorkCard;
