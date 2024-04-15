import React, { useRef, useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import { Tooltip } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import {
  editTask,
  addTask,
  deleteTask,
  addDetailsData,
  backedTask,
} from "../../Redux/TaskInputSlice";
import axios from "axios";
import url from "../../Utils/ConstURL";

const Mainbar = () => {
  const taskData = useSelector((store) => store.taskInput.tasks);
  const taskContainerRef = useRef(null);
  const dispatch = useDispatch();

  const handleMarkCompleted = async (task) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/mark/${task._id}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteTask(task._id));
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleEdit = async (task) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${url}/delete/${task._id}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteTask(task._id));
      dispatch(editTask(task));
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleDelete = async (task) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${url}/delete/${task._id}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteTask(task._id));
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleTaskClick = (task) => {
    dispatch(addDetailsData(task));
  };

  useEffect(() => {
    if (taskContainerRef.current) {
      taskContainerRef.current.scrollTop =
        taskContainerRef.current.scrollHeight;
    }
  }, [taskData]);

  async function getData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/get`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(addTask(response?.data?.data));
      dispatch(backedTask(response?.data?.data));
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex-none w-[350px] h-[460px]  dark:bg-black dark:text-white  bg-white rounded-2xl mr-10">
      <div className="flex flex-col h-full justify-between">
        <div ref={taskContainerRef} className="h-full overflow-y-auto">
          {taskData.length !== 0
            ? taskData.map((task) => (
                <div
                  key={task?._id}
                  className="w-auto h-12 shadow-md dark:shadow-white dark:shadow-sm dark:border-0 border-[0.5px] hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg flex justify-between px-3 m-4 py-1"
                >
                  <div onClick={() => handleTaskClick(task)} className="w-2/3">
                    <p className="text-sm line-clamp-1">{task?.taskName}</p>

                    <p className="text-xs font-light">
                      <span>
                        {task?.priority == "Priority 1"
                          ? "P1"
                          : task?.priority == "Priority 2"
                          ? "P2"
                          : task?.priority == "Priority 3"
                          ? "P3"
                          : null}
                      </span>
                      <span className="text-slate-400 mx-2">|</span>
                      <span>{task?.dueDate}</span>
                    </p>
                  </div>

                  <div className={`flex  justify-around w-1/3`}>
                    <Tooltip
                      content="Mark as complete"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                      placement="top"
                    >
                      <button
                        className={`${task?.marks == true ? " hidden" : ""}`}
                        onClick={() => handleMarkCompleted(task)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-5"
                        >
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8z" />
                        </svg>
                      </button>
                    </Tooltip>

                    <Tooltip
                      content="Edit"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                      placement="top"
                    >
                      <button onClick={() => handleEdit(task)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-5"
                        >
                          <path d="m7 14.94l6.06-6.06l2.06 2.06L9.06 17H7zM12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m4.7-10.65l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2" />
                        </svg>
                      </button>
                    </Tooltip>

                    <Tooltip
                      content="Delete"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                      placement="top"
                    >
                      <button onClick={() => handleDelete(task)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-[22px]"
                        >
                          <path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9s9-4.038 9-9s-4.037-9-9-9m0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7s7 3.14 7 7s-3.141 7-7 7m.707-7l2.646-2.646a.502.502 0 0 0 0-.707a.502.502 0 0 0-.707 0L12 11.293L9.354 8.646a.5.5 0 0 0-.707.707L11.293 12l-2.646 2.646a.5.5 0 0 0 .707.708L12 12.707l2.646 2.646a.5.5 0 1 0 .708-.706z" />
                        </svg>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ))
            : Array.from({ length: 5 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="w-auto animate-pulse h-12 shadow-md dark:shadow-white dark:shadow-sm dark:border-0 border-[0.5px] hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg justify-between px-3 m-4 py-1"
                  >
                    <div className="bg-gray-400 my-2 w-full h-[10px] rounded-full"></div>
                    <div className="bg-gray-400 w-2/3 h-[10px] rounded-full"></div>
                  </div>
                );
              })}
        </div>
        <TaskInput />
      </div>
    </div>
  );
};

export default Mainbar;
