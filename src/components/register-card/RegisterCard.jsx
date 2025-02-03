import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterCard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // submit
  const submitHandler = async data => {
    navigate("/register", { state: data });
  }

  return (
    <div className="rounded-md w-full bg-gradient-to-b from-[#66686b] via-[#44474a] to-[#26282c] p-[1px] pt-[1.5px]">
      <div className='py-10 rounded-md bg_gradient_how_work_register'>
        <h1 className='font-bold text-[21px] lg:text-[26px] font-montserrat uppercase'>
          {t("home.registerCard.title")}
        </h1>
        <form onSubmit={handleSubmit(data => submitHandler(data))} className='grid mt-4 lg:mt-8 lg:grid-cols-3 grid-cols-1 lg:px-16 px-4 gap-4'>
          <input
            className={`bg-transparent rounded-md outline-none border border-[#323334] p-6 ${errors.name ? "border-red-700" : "border-[#323334]"}`}
            placeholder={t("home.registerCard.name_input_placeholder")}
            type='text'
            {...register('name', { required: true })}
          />
          <input
            className={`bg-transparent rounded-md outline-none border border-[#323334] p-6 ${errors.email ? "border-red-700" : "border-[#323334]"}`}
            placeholder={t("home.registerCard.email_input_placeholder")}
            type='email'
            {...register('email', { required: true })}
          />
          <button
            type="submit"
            className='lg:bg-text-main_green lg:border-0 border-2 border-text-main_green bg-transparent text-text-main_green lg:text-white rounded-md p-6 font-gilroy-bold'
          >
            {t("home.registerCard.button_text")}
          </button>
        </form>
        <p className='text-sm mt-6 w-full font-gilroy text-center px-4'>
          {t("home.registerCard.form_description")}
        </p>
      </div>
    </div>
  );
};

export default RegisterCard;
