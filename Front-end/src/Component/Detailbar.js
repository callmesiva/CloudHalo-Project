import React, { useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addNotes, deleteTask, addDetailsData } from "../Redux/TaskInputSlice";
import axios from "axios";
import url from "../../src/Utils/ConstURL";

const Detailbar = () => {
  const [showBtn, setShowBtn] = useState(false);
  const [inputData, setInputData] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const notesData = useSelector((store) => store.taskInput.notes);
  const dispatch = useDispatch();

  const handleNotesSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/notes/update/${notesData?._id}`,
        { note: inputData },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(addNotes(inputData));
      setInputData("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNoteDelete = async (note) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/notes/delete/${notesData?._id}`,
        { note },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      dispatch(addDetailsData(response?.data?.data));
      setInputData("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/mark/${notesData?._id}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteTask(notesData?._id));
      setIsCompleted(true);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div className="flex-none w-[550px] h-[460px] bg-white dark:bg-black dark:text-white rounded-2xl">
      <div className="flex flex-col h-full justify-between">
        <div className="p-5">
          <div className="w-full h-12 flex justify-end gap-5">
            <div
              className={`${notesData?.marks === true ? "hidden" : ""} ${
                Object.keys(notesData).length ? "" : "hidden"
              }`}
            >
              <button
                onClick={() => handleMarkCompleted()}
                className="text-sm w-32 h-6 shadow-sm border-[0.5px] rounded-full  dark:hover:bg-gray-800 hover:bg-gray-300 text-blue-gray-300"
              >
                {isCompleted ? "Completed" : "Mark as complete"}
              </button>
            </div>
          </div>
          <div className="w-full h-[274px]">
            <p className="text-2xl font-bold line-clamp-2">
              {Object.keys(notesData).length
                ? notesData?.taskName
                : "Your task name"}
            </p>
            <div className="flex gap-6 mt-4">
              <p className=" w-40 text-center shadow-sm border-[0.5px] rounded-full text-blue-gray-300">
                {Object.keys(notesData).length
                  ? notesData?.dueDate
                  : "Due date "}
              </p>
              <p className="w-32 text-center shadow-sm border-[0.5px] rounded-full text-blue-gray-300">
                {Object.keys(notesData).length ? notesData?.list : "My list"}
              </p>
              <p className="w-32 text-center shadow-sm border-[0.5px] rounded-full text-blue-gray-300">
                {Object.keys(notesData).length
                  ? notesData?.priority
                  : "Priority"}
              </p>
            </div>
            <div className="w-full mt-10 ">
              <p className="font-sans text-sm">
                NOTES
                <span className="text-xs text-blue-gray-200 mx-1">
                  {notesData?.notes?.length ? notesData?.notes?.length : 0}/3
                </span>
              </p>

              <div className="mt-5 h-32">
                {notesData?.notes?.map((note, item) => {
                  return (
                    <div
                      key={item}
                      className="flex justify-between px-3 my-3 rounded-lg dark:hover:bg-gray-800 hover:bg-gray-300 "
                    >
                      <p className=" line-clamp-1">
                        <span className="mx-1">•</span>
                        {note}
                      </p>
                      <Tooltip
                        content="Delete"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        placement="top"
                      >
                        <button onClick={() => handleNoteDelete(note)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-[22px]"
                          >
                            <path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9s9-4.038 9-9s-4.037-9-9-9m0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7s7 3.14 7 7s-3.141 7-7 7m.707-7l2.646-2.646a.502.502 0 0 0 0-.707a.502.502 0 0 0-.707 0L12 11.293L9.354 8.646a.5.5 0 0 0-.707.707L11.293 12l-2.646 2.646a.5.5 0 0 0 .707.708L12 12.707l2.646 2.646a.5.5 0 1 0 .708-.706z" />
                          </svg>
                        </button>
                      </Tooltip>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 pt-[40px] h-full dark:bg-blue-gray-900  dark:border-t-gray-400 border-t-2 rounded-b-2xl">
          <form
            className="flex border-2 rounded-lg bg-white dark:bg-blue-gray-900"
            onSubmit={handleNotesSubmit}
          >
            <input
              placeholder="add notes..!!"
              onFocus={() => setShowBtn(true)}
              onBlur={() => setShowBtn(false)}
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              disabled={
                notesData?.notes?.length != 3 && Object.keys(notesData).length
                  ? false
                  : true
              }
              className="h-10  italic pl-3 w-full  dark:bg-blue-gray-900 rounded-lg outline-none"
            />
            {showBtn && (
              <button className="text-white mr-4  mb-2 self-end" type="button">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Detailbar;
