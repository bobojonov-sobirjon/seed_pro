import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaCamera } from "react-icons/fa";
import { BiCamera } from "react-icons/bi";
import Projectform from "./components/Projectform";
import { errorHandler, getToast, getToastWarn } from "../../../utils/options";
import { axiosInstances } from "../../../config/config";
import { levels } from "../../../utils/options";
import { getProfile } from "../../../redux/reducers/profileReducer";
import { toast } from "react-toastify";

const CreateProject = (props) => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState(state ? state.komanda : []);
  const [file, setFile] = useState(null);
  const [extraData, setExtraData] = useState(state ? state.employees : []);
  const [isChecked, setIsChecked] = useState(state.is_active);
  const name_ref = useRef();
  const desc_ref = useRef();
  const tag_ref = useRef();
  // get profile
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetProfile({ signal });

    return () => controller.abort();
  }, []);

  // chnage file
  const changeFile = (e) => {
    let img = new Image();
    img.src = window.URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      // console.log(img.width + "x" + img.height);
      if (true) {
        document.querySelector(".fishka").textContent = "";
        setFile(e.target.files[0]);
      } else {
        document.querySelector(".fishka").textContent = t(
          "home.project.error_image"
        );
        setFile(null);
      }
    };
  };
  // change checkbox
  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // add new row
  const addTeamForm = useCallback(() => {
    setData([
      ...data,
      [
        {
          id: Math.random().toString(),
          position: "",
          level: levels[0].value,
          tasks: "",
          tags: [],
        },
      ],
    ]);
    setExtraData([
      ...extraData,
      [
        {
          id: Math.random().toString(),
          specialist: "",
          people_needed: "",
          people_now: 0,
        },
      ],
    ]);
  }, [data, extraData]);

  // change input
  const changeInputHandler = useCallback(
    (value, index, idx, name) => {
      let arr = [];
      console.log(data);

      data.forEach((item, i) => {
        if (i == index) {
          let r = [];
          item.forEach((elem, i2) => {
            if (i2 == idx) r.push({ ...elem, [name]: value });
            else r.push(elem);
          });
          arr.push(r);
        } else arr.push(item);
      });
      setData(arr);
    },
    [data]
  );

  // change extra input handler
  const changeExtraInputHandler = useCallback(
    (value, index, idx, name) => {
      let arr = [];
      extraData.forEach((item, i) => {
        if (i == index) {
          let r = [];
          item.forEach((elem, i2) => {
            if (i2 == idx) r.push({ ...elem, [name]: value });
            else r.push(elem);
          });
          arr.push(r);
        } else arr.push(item);
      });
      setExtraData(arr);
    },
    [extraData]
  );

  // add item in extraData
  const addItemHandler = useCallback(
    (index, idx) => {
      let arr = [];
      extraData.forEach((item, i) => {
        if (i == index) {
          item.push({
            id: Math.random().toString(),
            specialist: "",
            people_needed: "",
            people_now: 0,
          });
        }
        arr.push(item);
      });
      setExtraData(arr);
    },
    [extraData]
  );

  // delete item in extraData
  const deleteItemHandler = useCallback(
    (index, idx) => {
      let arr = [];
      extraData.forEach((item, i) => {
        if (i == index) {
          let a = [];
          item.forEach((el, i2) => {
            if (i2 != idx) a.push(el);
          });
          arr.push(a);
        } else arr.push(item);
      });
      setExtraData(arr);
    },
    [extraData]
  );

  // delete item
  const deleteItem = useCallback(
    (index) => {
      let arr = [];
      data.forEach((item, i) => {
        if (i != index) arr.push(item);
      });
      setData(arr);
    },
    [data]
  );

  // change tags
  const changeTagsInputHandler = useCallback(
    (value, index, idx) => {
      let arr = [];
      data.forEach((item, i) => {
        if (i == index) {
          item.forEach((elem, i2) => {
            if (i2 == idx) elem.tags = [...elem.tags, value];
          });
        }
        arr.push(item);
      });
      setData(arr);
    },
    [data]
  );

  // delete tags
  const deleteTags = useCallback(
    (index, idx, tag_id) => {
      let arr = [];
      data.forEach((item, i) => {
        if (i == index) {
          item.forEach((elem, i2) => {
            if (i2 == idx)
              elem.tags = elem.tags.filter((el) => el.id != tag_id);
          });
        }
        arr.push(item);
      });
      setData(arr);
    },
    [data]
  );

  // submit handler
  const submitHandler = async () => {
    try {
      data?.filter((item) => {
        item?.filter((c) => {
          if (c?.tags?.length == 0) {
            toast.warning("Введите Навыки и нажмите ENTER", {
              position: "bottom-right",
            });
          }
        });
      });

      if (name_ref.current?.value && desc_ref.current.value) {
        if (data?.length > 0) {
          // checking all tags
          for (let i = 0; i < data?.length; i++) {
            if (!(data[i][0].tags?.length > 0)) {
              isBool = false;
              getToastWarn(t("toastMessage.createProjectPage.skills_missing"));
              return;
            }
          }

          for (let i = 0; i < extraData?.length; i++) {
            if (
              extraData[i]?.length > 0 &&
              extraData[i].every(
                (el) =>
                  !el.specialist &&
                  (!el.people_needed || el.people_needed <= 0) &&
                  el.people_now < 0
              )
            ) {
              getToastWarn(t("toastMessage.createProjectPage.required_number"));
              return;
            }
          }

          let obj = {
            name: name_ref.current?.value,
            description: desc_ref.current?.value,
            is_active: isChecked,
            number_programmers: 0,
            number_of_people: 0,
            komanda: JSON.stringify(data),
            employees: JSON.stringify(extraData),
          };
          // console.log(obj);
          let res;
          if (!state) {
            if (file) {
              res = await axiosInstances.post(
                "/project/",
                {
                  ...obj,
                  project_image: file,
                },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
            } else getToastWarn(t("toastMessage.createProjectPage.not_images"));
          } else {
            if (file) obj.project_image = file;
            res = await axiosInstances.put(`/project/${state.id}/`, obj, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          }
          if (res.status == 201 || res.status == 200) {
            if (!state) {
              getToast(t("toastMessage.createProjectPage.project_send_review"));
              setData([]);
              setFile(null);
              name_ref.current.value = "";
              desc_ref.current.value = "";
            } else {
              getToast(t("toastMessage.createProjectPage.edit_success"));
              navigate("/admin/projects");
            }
          }
        } else getToastWarn(t("toastMessage.createProjectPage.not_position"));
      } else getToastWarn(t("toastMessage.createProjectPage.project_name"));
    } catch (error) {
      // console.log(error);
      errorHandler(error);
    }
  };
  return (
    <div className="max-w-5xl mx-auto my-10">
      <h1 className="font-gunterz lg:text-2xl text-lg text-custom-gray text-center lg:text-left">
        {state
          ? t("dashboard.myProjects.create.edit_project")
          : t("dashboard.myProjects.create.create_project")}
      </h1>

      <div className="bg-white shadow-md rounded px-2 lg:px-8 pt-6 pb-4 lg:pb-8 mb-4 flex flex-col">
        <div className="flex lg:flex-row flex-col items-start py-4">
          <div className="rounded-full bg-gray-200 relative flex items-center justify-center lg:justify-start">
            <div className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px]">
              <div className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px]">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="no image"
                    className="w-full h-full p-0 rounded-full"
                  />
                ) : state ? (
                  <img
                    src={state.project_image}
                    alt=""
                    className="w-full h-full p-0 rounded-full"
                  />
                ) : (
                  <FaCamera className="text-custom-gray w-full h-full p-4" />
                )}
              </div>
              <label htmlFor="selectFiles">
                <BiCamera
                  className="absolute bottom-0 right-0 text-gray-700 bg-white rounded-full p-0.5 cursor-pointer hover:bg-gray-200 transition-all"
                  size={24}
                />
                <input
                  type="file"
                  name="selectFiles"
                  id="selectFiles"
                  className="hidden"
                  onClick={(event) => (event.target.value = null)}
                  onChange={(event) => changeFile(event)}
                  required
                />
              </label>
              <div className="fishka text-red-700 text-[12px] text-center"></div>
            </div>
          </div>
          <div className="w-full lg:px-6 p-0 flex flex-col gap-4 mt-2">
            <div>
              <span className="text-custom-gray text-sm font-gilroy-bold">
                {t("dashboard.myProjects.create.name_input_label")}{" "}
                <span className="text-red-500"> *</span>
              </span>
              <input
                className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                id="username"
                type="text"
                placeholder={t(
                  "dashboard.myProjects.create.name_input_placeholder"
                )}
                defaultValue={state ? state.name : ""}
                ref={name_ref}
              />
            </div>
            <div>
              <span className="text-custom-gray text-sm font-gilroy-bold">
                {t("dashboard.myProjects.create.description_input_label")}{" "}
                <span className="text-red-500"> *</span>
              </span>
              <textarea
                className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                id="description"
                rows={4}
                placeholder={t(
                  "dashboard.myProjects.create.description_input_placeholder"
                )}
                defaultValue={state ? state.description : ""}
                ref={desc_ref}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="check"
                className="flex items-center gap-1 cursor-pointer text-custom-gray text-sm font-gilroy-bold accent-black select-none"
              >
                <input
                  type="checkbox"
                  name="check"
                  id="check"
                  // defaultChecked={checked}
                  checked={isChecked}
                  onChange={(e) => handleChange(e)}
                  className="w-4 h-4"
                />
                Показывать проект в разделк проектов
              </label>
            </div>
          </div>
        </div>
      </div>

      {data.length > 0 && (
        <>
          <h1 className="font-gunterz text-xl lg:text-2xl mt-12 text-custom-gray text-center lg:text-left">
            {t("dashboard.myProjects.create.project_team")}
          </h1>

          <Projectform
            tag_ref={tag_ref}
            data={data}
            changeInputHandler={changeInputHandler}
            deleteItem={deleteItem}
            changeTagsInputHandler={changeTagsInputHandler}
            deleteTags={deleteTags}
            levels={levels}
            state={state}
            extraData={extraData}
            changeExtraInputHandler={changeExtraInputHandler}
            addItemHandler={addItemHandler}
            deleteItemHandler={deleteItemHandler}
          />
        </>
      )}

      {/* buttons save and create */}
      <div className="flex gap-2 md:gap-4 items-center justify-between flex-wrap md:flex-nowrap">
        <div className="flex gap-2 flex-wrap w-full">
          <button
            type="button"
            onClick={addTeamForm}
            className="bg-custom-gray hover:bg-gray-600 transition-all text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-custom-gray font-gilroy-bold w-full md:w-auto"
          >
            {t("dashboard.myProjects.create.add_position_button_text")}
          </button>
          {/* <button
            className='text-text-main_green font-gilroy-bold hover:text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-text-main_green hover:bg-text-main_green transition-all w-full md:w-auto'
            type='button'
            onClick={submitHandler}
          >
            {state ? "Изменить" : "Сохранить"}
          </button> */}
        </div>
        {props.profileData?.active && (
          <div className="w-full flex justify-end">
            <button
              // className='text-custom-gray font-gilroy-bold hover:text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-gray-400 hover:bg-custom-gray transition-all w-full md:w-auto'
              className="text-text-main_green font-gilroy-bold hover:text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-text-main_green hover:bg-text-main_green transition-all w-full md:w-auto"
              type="button"
              onClick={submitHandler}
            >
              {state
                ? t("dashboard.myProjects.create.edit_button_text")
                : t("dashboard.myProjects.create.send_to_check_button_text")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profileData: state.profileReducer.profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProfile: (value) => dispatch(getProfile(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
