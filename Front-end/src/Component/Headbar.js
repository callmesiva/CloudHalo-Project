import React, { useRef, useState, useEffect } from "react";
import { Tooltip } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask, addNotific } from "../Redux/TaskInputSlice";
import url from "../Utils/ConstURL";
import io from "socket.io-client";
const socket = io(url);

const Headbar = () => {
  const [showNotification, setshowNotification] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const taskData = useSelector((store) => store.taskInput.tasks);
  const notifi = useSelector((store) => store.taskInput.notific);
  const dispatch = useDispatch();
  const [isDuedate, setIsDuedate] = useState(false);
  const [isPriority, setIsPriority] = useState(null);
  const [isAscend, setIsAscend] = useState(true);
  const notifiContainerRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target)
    ) {
      setshowNotification(false);
    }
  };

  const handleThemeChange = () => {
    let isDark = localStorage.getItem("darkMode");
    if (openTheme == false && isDark !== "true") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", true);
      setOpenTheme(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("darkMode");
      setOpenTheme(false);
    }
  };

  function sortDate(arr, ascending) {
    return arr.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      if (ascending) return dateA - dateB;
      else return dateB - dateA;
    });
  }

  function sortPriority(arr, ascending) {
    return arr.sort((a, b) => {
      const priorityA = parseInt(a.priority.split(" ")[1]);
      const priorityB = parseInt(b.priority.split(" ")[1]);
      if (ascending) return priorityA - priorityB;
      else return priorityB - priorityA;
    });
  }

  const handleDuedate = () => {
    const newArr = [...taskData];
    dispatch(addTask(sortDate(newArr, true)));
    setIsPriority(false);
  };

  const handleSort = () => {
    const newArr = [...taskData];
    if (isPriority) {
      if (isAscend) {
        dispatch(addTask(sortPriority(newArr, isAscend)));
        setIsAscend(!isAscend);
      } else {
        dispatch(addTask(sortPriority(newArr, isAscend)));
        setIsAscend(!isAscend);
      }
    } else {
      if (isAscend) {
        dispatch(addTask(sortDate(newArr, isAscend)));
        setIsAscend(!isAscend);
      } else {
        dispatch(addTask(sortDate(newArr, isAscend)));
        setIsAscend(!isAscend);
      }
      setIsPriority(false);
    }
  };

  const handlePriority = () => {
    const newArr = [...taskData];
    dispatch(addTask(sortPriority(newArr, true)));
    setIsPriority(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    if (notifiContainerRef.current) {
      notifiContainerRef.current.scrollTop =
        notifiContainerRef.current.scrollHeight;
    }
  }, [notifi]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    socket.on("notification", (notification) => {
      let data = {
        header: " Welcome to notification !",
        body: "This notification will be received every 30 second via socket.io",
      };

      dispatch(addNotific(data));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="pt-10 pl-5 pr-16 flex ">
      <div className="flex-none shadow-2xl shadow-slate-500  w-[350px] h-10  dark:border-gray-900  dark:text-white dark:bg-black bg-white rounded-full">
        <div className="flex justify-between my-[6px] px-2  rounded-full">
          <button
            onClick={() => handleDuedate()}
            className={`px-5 ${
              isPriority == false
                ? "bg-blue-400"
                : "hover:bg-gray-300 dark:hover:bg-gray-800"
            } rounded-full`}
          >
            Due Date
          </button>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-7 text-slate-400"
          >
            <path d="M7.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5" />
          </svg>

          <Tooltip
            content="Sort"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="top"
          >
            <button onClick={() => handleSort()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 20V10m0 10l-3-3m3 3l3-3m5-13v10m0-10l3 3m-3-3l-3 3"
                />
              </svg>
            </button>
          </Tooltip>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-7 text-slate-400"
          >
            <path d="M7.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5" />
          </svg>

          <button
            onClick={() => handlePriority()}
            className={`px-5 ${
              isPriority == true
                ? "bg-blue-400"
                : "hover:bg-gray-300 dark:hover:bg-gray-800"
            } rounded-full`}
          >
            Priority
          </button>
        </div>
      </div>

      <div className="flex-none shadow-2xl shadow-slate-500 border-2 w-36 h-10 bg-white rounded-full  dark:border-gray-900  dark:text-white dark:bg-black mx-[445px]">
        <div
          ref={notificationRef}
          className="relative flex justify-between px-1"
        >
          {showNotification && (
            <div
              ref={notifiContainerRef}
              className="absolute w-56 h-48 top-10 right-20 p-2 rounded-xl shadow-md bg-white border-[1px] dark:bg-black dark:text-white border-gray-200 overflow-y-auto"
            >
              {notifi.map((notifi, item) => (
                <div
                  key={item}
                  className="w-full flex flex-col my-2 h-16  p-2 shadow-md dark:shadow-white dark:shadow-sm  border-[0.5px] hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg"
                >
                  <p className="font-semibold text-sm italic">
                    {notifi?.header}
                  </p>
                  <p className="break-words text-[10px]">{notifi?.body}</p>
                </div>
              ))}
            </div>
          )}

          <Tooltip
            content="Notification"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="top"
          >
            <button
              className="flex "
              onClick={() => setshowNotification(!showNotification)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 pt-1"
              >
                <path d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m5 14v-1l-1-1v-2.61c0-1.09-.27-2.05-.79-2.86C14.7 7.72 13.96 7.21 13 7v-.5a1 1 0 0 0-1-1a1 1 0 0 0-1 1V7c-.96.21-1.7.72-2.21 1.53c-.52.81-.79 1.77-.79 2.86V14l-1 1v1zm-3.5 1h-3a1.5 1.5 0 0 0 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5" />
              </svg>
              <span>{notifi.length}</span>
            </button>
          </Tooltip>

          <Tooltip
            content="Theme"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="top"
          >
            <button onClick={() => handleThemeChange()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 pt-1"
              >
                <path d="M12 16a4 4 0 0 0 0-8z" />
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m0 2v4a4 4 0 1 0 0 8v4a8 8 0 1 0 0-16"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Tooltip>

          <Tooltip
            content="Logout"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="top"
          >
            <button onClick={() => handleLogout()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 pt-1"
              >
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m5-6l5-4l-5-4v3H9v2h8z" />
              </svg>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Headbar;
