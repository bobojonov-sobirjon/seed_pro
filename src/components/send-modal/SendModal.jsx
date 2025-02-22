import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useAuth } from "../../services/useAuth";
import { axiosInstances } from "../../config/config";

function SendModal({ data, isOpen, onClose = true }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let { user_id } = useAuth();
  const text_ref = useRef();
  const [projectId, setProjectId] = useState(null);
  const [projects, setData] = useState([]);
  const params = useParams();
  // reply handler
  const replyHandler = async () => {
    if (text_ref.current.value.trim()?.length > 0) {
      let obj = {
        receiver: data,
        senderId: user_id,
        text: text_ref.current.value,
        project: null,
      };
      localStorage.setItem("user_data", JSON.stringify(obj));
      navigate("/admin/messages");
      await axiosInstances.post(`/add-group-of-project/`, {
        project: projectId,
        employee: data.id,
      });
    }
  };

  const getEmployer = async () => {
    try {
      const { data } = await axiosInstances.get("/employer/");
      setData(data);
      setProjectId(data[0]?.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployer();
  }, []);

  return (
    <>
      <Dialog
        placeholder={<div />}
        open={isOpen}
        handler={onClose}
        className="lg:p-8 w-[96%] lg:w-[500px]"
        size="lg"
      >
        <DialogHeader
          placeholder={<div />}
          className="uppercase flex items-center lg:gap-2 flex-wrap text-[16px] lg:text-[26px]"
        >
          <span className="pr-2">
            {t("dashboard.header.specialists.details.modalCard.invitation")}
          </span>
          <span className="text-main-green pr-2">{data.first_name}</span>{" "}
          <span className="text-main-green">{data.last_name}</span>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 p-4 w-[300px]">
          <div className="bg-white shadow rounded w-full">
            <select
              id="countries"
              className="bg-gray-50 w-full text-gray-900 text-sm rounded-lg border border-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500 block p-3.5"
              placeholder="Проект"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option disabled>Проект</option>
              {projects.map((tech) => {
                return (
                  <option key={Math.random().toString()} value={tech?.id}>
                    {tech?.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <DialogBody placeholder={<div />} className="pt-0">
          <div className="flex flex-col ">
            <span className="text-custom-gray font-gilroy-bold">
              {t("dashboard.header.specialists.details.modalCard.write_letter")}
            </span>
            <textarea
              placeholder={t(
                "dashboard.header.specialists.details.modalCard.input_placeholder"
              )}
              className={`bg-gray-50 text-gray-900 text-sm rounded-lg border border-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
              rows={4}
              ref={text_ref}
            />
          </div>
        </DialogBody>
        <DialogFooter
          className="flex flex-col lg:flex-row items-start gap-2 justify-start w-full pt-0"
          placeholder={<div />}
        >
          <Button
            placeholder={<div />}
            color="red"
            variant="text"
            onClick={onClose}
            className="w-full md:w-auto md:mr-1 bg-gray-800 text-white text-xs py-4 lg:py-5 px-8 lg:px-10 rounded-md hover:bg-gray-700 "
          >
            {t(
              "dashboard.header.specialists.details.modalCard.cancel_button_text"
            )}
          </Button>
          <Button
            placeholder={<div />}
            onClick={replyHandler}
            className="w-full md:w-auto bg-main-green text-white text-xs py-4 lg:py-5 px-8 lg:px-10 rounded-md hover:opacity-55"
          >
            {t(
              "dashboard.header.specialists.details.modalCard.send_button_text"
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default SendModal;
