import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

function ApplyModal({ data, isOpen, onClose }) {
  const { t } = useTranslation();

  return (
    <>
      <Dialog placeholder={<div />} open={isOpen} handler={onClose}>
        <DialogHeader placeholder={<div />}>
          {data.dialogTitle}
          <span className='text-main-green text-sm ml-3'>{data.status}</span>
        </DialogHeader>

        <hr />

        <div className='flex flex-wrap gap-2 p-4'>
          {data.technologies?.length > 0 && data.technologies.map(tech => (
            <Button
              key={tech}
              placeholder={<div />}
              variant='filled'
              className={`uppercase  bg-custom-gray`}
            >
              {tech}
            </Button>
          ))}
        </div>
        <DialogBody placeholder={<div />}>
          <div className='flex flex-col '>
            <label className='text-custom-gray font-gilroy-bold' htmlFor='dialogBodyLabel'>
              {t("extraComponents.allProjectDetails.write_letter")}
            </label>
            <textarea
              placeholder={t(
                "extraComponents.allProjectDetails.write_letter_input_placeholder"
              )}
              className='textarea bg-gray-50 p-2 textarea-bordered'
              rows={4}
            />
          </div>
        </DialogBody>
        <DialogFooter
          className='flex flex-col lg:flex-row items-start gap-2 justify-start w-full'
          placeholder={<div />}
        >
          <Button
            placeholder={<div />}
            color='red'
            variant='text'
            onClick={onClose}
            className='w-full md:w-auto md:mr-1 bg-gray-800 text-white text-sm px-10 py-4 rounded-md hover:bg-gray-700'
          >
            {t("extraComponents.allProjectDetails.cancel_button_text")}
          </Button>
          <Button
            placeholder={<div />}
            onClick={onClose}
            className='w-full md:w-auto bg-main-green text-white text-sm px-9 py-4 rounded-md hover:opacity-55'
          >
            {t("extraComponents.allProjectDetails.send_button_text")}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ApplyModal;
