import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../Redux/TaskInputSlice";
import axios from "axios";
import url from "../../Utils/ConstURL";

const TaskInput = () => {
  const editData = useSelector((store) => store.taskInput.edit);
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [priOpen, setPriOpen] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [listSelect, setListSelect] = useState(null);
  const [calSelect, setCalSelect] = useState(null);
  const [priSelect, setPriSelect] = useState(null);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    if (editData[0] != null) {
      setInputData(editData[0]?.taskName);
      setListSelect(editData[0]?.list);
      setCalSelect(editData[0]?.dueDate);
      setPriSelect(editData[0]?.priority);
      dispatch(editTask(true));
    }
  }, [editData]);

  const dropdownRef = useRef(null);
  const today = new Date();

  const handleListClick = (list) => {
    setListSelect(list);
    setListOpen(false);
  };
  const handleDateChange = (date) => {
    setCalSelect(date.toDateString());
  };

  const handlePriorityClick = (pri) => {
    setPriSelect(pri);
    setPriOpen(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (listSelect && calSelect && priSelect && inputData) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const data = {
        userId,
        taskName: inputData,
        dueDate: calSelect,
        list: listSelect,
        priority: priSelect,
      };

      try {
        const response = await axios.post(`${url}/post`, data, {
          headers: {
            Authorization: token,
          },
        });

        dispatch(addTask(response?.data?.data));
        setListSelect(null);
        setCalSelect(null);
        setPriSelect(null);
        setInputData("");
        setInputError(false);
      } catch (error) {
        setListSelect(null);
        setCalSelect(null);
        setPriSelect(null);
        setInputData("");
        setInputError(false);
        console.error("Error:", error);
      }
    } else {
      setInputError(true);
    }
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setListOpen(false);
      setPriOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full mt-3 dark:bg-blue-gray-900 dark:text-white dark:border-t-gray-400 rounded-b-2xl border-t-2">
      {inputError && (
        <p className="mx-auto text-sm text-red-300 italic text-center">
          Please Enter All Four Fields!
        </p>
      )}
      <div ref={dropdownRef} className="relative flex h-10 justify-around p-1">
        {listOpen && (
          <ul className="absolute w-24 py-2 bottom-10 left-8 dark:text-black bg-white rounded-lg shadow-xl">
            <li
              onClick={() => handleListClick("Personal")}
              className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Personal
            </li>
            <li
              onClick={() => handleListClick("Work")}
              className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Work
            </li>
            <li
              onClick={() => handleListClick("Finance")}
              className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Finance
            </li>
          </ul>
        )}

        {priOpen && (
          <ul className="absolute w-24 py-2 dark:text-black bg-white bottom-10 right-8 rounded-lg shadow-xl">
            <li
              onClick={() => handlePriorityClick("Priority 1")}
              className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Priority 1
            </li>
            <li
              onClick={() => handlePriorityClick("Priority 2")}
              className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Priority 2
            </li>
            <li
              onClick={() => handlePriorityClick("Priority 3")}
              className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Priority 3
            </li>
          </ul>
        )}

        <div className="flex justify-center w-1/3">
          <Tooltip
            content="My lists"
            className="text-xs p-[6px]"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="bottom"
          >
            <button
              onClick={() => setListOpen(!listOpen)}
              className="flex items-center"
            >
              <span className="mr-4">
                {listSelect ? (
                  <p className="text-xs text-blue-600">{listSelect}</p>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 26 26"
                    fill="currentColor"
                    className="w-5"
                  >
                    <g>
                      <path d="M9.5 9a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0 4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0 4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0" />
                      <path
                        fillRule="evenodd"
                        d="M10.5 9a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M13 24c6.075 0 11-4.925 11-11S19.075 2 13 2S2 6.925 2 13s4.925 11 11 11m0 2c7.18 0 13-5.82 13-13S20.18 0 13 0S0 5.82 0 13s5.82 13 13 13"
                        clipRule="evenodd"
                      />
                    </g>
                  </svg>
                )}
              </span>
            </button>
          </Tooltip>
        </div>

        <div className="flex justify-center w-1/3">
          <div className="flex items-center">
            <span className="mr-4">
              {calSelect ? (
                <DatePicker
                  selected={calSelect}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  minDate={today}
                  customInput={
                    <p className="text-xs text-blue-600">
                      <Tooltip
                        content="Due date"
                        className="text-xs p-[6px]"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        placement="bottom"
                      >
                        {calSelect}
                      </Tooltip>
                    </p>
                  }
                />
              ) : (
                <DatePicker
                  selected={calSelect}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  minDate={today}
                  customInput={
                    <div className="mt-[6px]">
                      <Tooltip
                        content="Due date"
                        className="text-xs p-[6px]"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        placement="bottom"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 56 56"
                          fill="currentColor"
                          className="w-6"
                        >
                          <path d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906m0-3.984C16.937 47.922 8.1 39.062 8.1 28c0-11.04 8.813-19.922 19.876-19.922c11.039 0 19.921 8.883 19.945 19.922c.023 11.063-8.883 19.922-19.922 19.922m-8.578-8.344h17.156c2.625 0 3.938-1.289 3.938-3.89V20.336c0-2.602-1.313-3.89-3.938-3.89H19.422c-2.625 0-3.938 1.288-3.938 3.89v15.352c0 2.601 1.313 3.89 3.938 3.89m-.164-2.133c-1.078 0-1.617-.539-1.617-1.64v-11.86c0-1.172.609-1.758 1.71-1.758h17.25c1.126 0 1.758.586 1.758 1.758v11.86c0 1.101-.562 1.64-1.664 1.64Zm6.21-10.547h.868c.539 0 .703-.164.703-.68v-.89c0-.539-.164-.703-.703-.703h-.867c-.54 0-.704.164-.704.703v.89c0 .516.165.68.704.68m4.196 0h.867c.54 0 .703-.164.703-.68v-.89c0-.539-.164-.703-.703-.703h-.867c-.563 0-.727.164-.727.703v.89c0 .516.164.68.727.68m4.148 0h.868c.539 0 .726-.164.726-.68v-.89c0-.539-.187-.703-.726-.703h-.868c-.539 0-.726.164-.726.703v.89c0 .516.187.68.726.68M21.297 31h.867c.539 0 .726-.164.726-.68v-.89c0-.54-.187-.703-.726-.703h-.867c-.54 0-.703.164-.703.703v.89c0 .516.164.68.703.68m4.172 0h.867c.539 0 .703-.164.703-.68v-.89c0-.54-.164-.703-.703-.703h-.867c-.54 0-.704.164-.704.703v.89c0 .516.165.68.704.68m4.195 0h.867c.54 0 .703-.164.703-.68v-.89c0-.54-.164-.703-.703-.703h-.867c-.563 0-.727.164-.727.703v.89c0 .516.164.68.727.68m4.148 0h.868c.539 0 .726-.164.726-.68v-.89c0-.54-.187-.703-.726-.703h-.868c-.539 0-.726.164-.726.703v.89c0 .516.187.68.726.68m-12.515 4.125h.867c.539 0 .726-.187.726-.727v-.867c0-.539-.187-.68-.726-.68h-.867c-.54 0-.703.141-.703.68v.867c0 .54.164.727.703.727m4.172 0h.867c.539 0 .703-.187.703-.727v-.867c0-.539-.164-.68-.703-.68h-.867c-.54 0-.704.141-.704.68v.867c0 .54.165.727.704.727m4.195 0h.867c.54 0 .703-.187.703-.727v-.867c0-.539-.164-.68-.703-.68h-.867c-.563 0-.727.141-.727.68v.867c0 .54.164.727.727.727" />
                        </svg>
                      </Tooltip>
                    </div>
                  }
                />
              )}
            </span>
          </div>
        </div>

        <div className="flex justify-center w-1/3">
          <Tooltip
            content="Priority"
            className="text-xs p-[6px]"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="bottom"
          >
            <button
              onClick={() => setPriOpen(!priOpen)}
              className="flex items-center"
            >
              <span className="mr-4">
                {priSelect ? (
                  <p className="text-xs text-blue-600">{priSelect}</p>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[22px]"
                  >
                    <g fillRule="evenodd" clipRule="evenodd">
                      <path d="M11.216 6.282a.75.75 0 0 1 .502.934l-.61 2.034h3.434l.74-2.466a.75.75 0 0 1 1.436.432l-.61 2.034H18a.75.75 0 0 1 0 1.5h-2.342l-.75 2.5H17a.75.75 0 0 1 0 1.5h-2.542l-.74 2.465a.75.75 0 0 1-1.436-.43l.61-2.035H9.458l-.74 2.465a.75.75 0 1 1-1.436-.43l.61-2.035H6a.75.75 0 0 1 0-1.5h2.342l.75-2.5H7a.75.75 0 0 1 0-1.5h2.542l.74-2.466a.75.75 0 0 1 .934-.502m-.558 4.468h3.434l-.75 2.5H9.908z" />
                      <path d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0" />
                    </g>
                  </svg>
                )}
              </span>
            </button>
          </Tooltip>
        </div>
      </div>

      <form className="px-3 pb-3" onSubmit={handleOnSubmit}>
        <div className="border-2 bg-white dark:bg-blue-gray-900 rounded-lg flex justify-between">
          <input
            placeholder="add tasks..!!"
            className="h-10 w-full  italic pl-3 rounded-lg outline-none dark:bg-blue-gray-900"
            onFocus={() => setShowBtn(true)}
            onBlur={() => setShowBtn(false)}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {showBtn && (
            <button type="button" className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 text-gray-500"
              >
                <path d="M8.796 2.236a.75.75 0 0 0-1.092 0l-4 4.25a.75.75 0 1 0 1.092 1.028L7.5 4.641V14.75A3.25 3.25 0 0 0 10.75 18h4.5a.75.75 0 0 0 0-1.5h-4.5A1.75 1.75 0 0 1 9 14.75V4.641l2.704 2.873a.75.75 0 1 0 1.092-1.028z" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
