import React, { useEffect, useState } from "react";
import ProfileImg from "../../image/user.png";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../Redux/TaskInputSlice";

const Sidebar = () => {
  const [activeBtn, setActiveBtn] = useState(3);
  const backedTask = useSelector((store) => store.taskInput.backupTasks);
  const dispatch = useDispatch();

  const handleCategory = (id) => {
    setActiveBtn(id);
    if (id === 1) filterMyday();
    if (id === 2) next7Day();
    if (id === 3) allTask();
    if (id === 4) completedTask();
    if (id === 5) personalList();
    if (id === 6) financeList();
    if (id === 7) workList();
  };

  function filterMyday() {
    const newArr = [...backedTask];

    const today = new Date();
    const todayDateString = today.toDateString();
    const MydayData = newArr.filter((task) => todayDateString == task.dueDate);

    dispatch(addTask(MydayData));
  }

  function next7Day() {
    const newArr = [...backedTask];

    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    const nextSevenDaysData = newArr.filter((task) => {
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate >= today && taskDueDate <= sevenDaysLater;
    });

    dispatch(addTask(nextSevenDaysData));
  }

  function allTask() {
    const newArr = [...backedTask];
    dispatch(addTask(newArr));
  }

  function completedTask() {
    const newArr = [...backedTask];
    const completedTask = newArr.filter((task) => task.marks == true);
    dispatch(addTask(["okay", completedTask]));
  }

  function personalList() {
    const newArr = [...backedTask];
    const personalList = newArr.filter((task) => task.list == "Personal");
    dispatch(addTask(personalList));
  }

  function financeList() {
    const newArr = [...backedTask];
    const financeList = newArr.filter((task) => task.list == "Finance");
    dispatch(addTask(financeList));
  }

  function workList() {
    const newArr = [...backedTask];
    const workList = newArr.filter((task) => task.list == "Work");
    dispatch(addTask(workList));
  }

  return (
    <div className="w-80 bg-white dark:bg-black dark:text-white border-2 dark:border-gray-900 overflow-y-auto">
      <div className="p-4">
        <div className="flex mt-4 p-2">
          <img
            src={ProfileImg}
            alt="profile photo"
            className="size-12 my-auto"
          />

          <h4 className="m-auto ml-2 line-clamp-2 break-words italic">
            Hello Buddy!
          </h4>
        </div>

        <div className="mt-3">
          <button
            onClick={() => handleCategory(1)}
            className={`p-2 flex w-full rounded-lg ${
              activeBtn == 1
                ? "bg-blue-400 hover:bg-blue-400 dark:hover:bg-blue-400"
                : "hover:bg-gray-300  dark:hover:bg-gray-800"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="my-auto mr-3 w-6"
            >
              <path d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-2q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18m0-2q1.65 0 2.825-1.175T16 12t-1.175-2.825T12 8T9.175 9.175T8 12t1.175 2.825T12 16m0-2q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14" />
            </svg>
            <span className="my-auto">My day</span>
          </button>

          <button
            onClick={() => handleCategory(2)}
            className={`mt-3 p-2 flex w-full rounded-lg ${
              activeBtn == 2
                ? "bg-blue-400 hover:bg-blue-400 dark:hover:bg-blue-400"
                : "hover:bg-gray-300  dark:hover:bg-gray-800"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="my-auto mr-3 w-6 "
            >
              <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8.01 8.01 0 0 1-8 8m0-14a1 1 0 0 0-1 1v4.749l-1.382 2.578a1 1 0 0 0 1.764.944l1.5-2.799A1.006 1.006 0 0 0 13 12V7a1 1 0 0 0-1-1" />
            </svg>
            <span className="my-auto">Next 7 days </span>
          </button>

          <button
            onClick={() => handleCategory(3)}
            className={`mt-3 p-2 flex w-full rounded-lg ${
              activeBtn == 3
                ? "bg-blue-400 hover:bg-blue-400 dark:hover:bg-blue-400"
                : "hover:bg-gray-300  dark:hover:bg-gray-800"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="my-auto mr-3 w-6 "
            >
              <path d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2q1.625 0 3.075.475T17.75 3.8L16.3 5.275q-.95-.6-2.025-.937T12 4Q8.675 4 6.337 6.338T4 12t2.338 5.663T12 20t5.663-2.337T20 12q0-.45-.05-.9t-.15-.875L21.425 8.6q.275.8.425 1.65T22 12q0 2.075-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m-1.4-5.4l-4.25-4.25l1.4-1.4l2.85 2.85l10-10.025l1.4 1.4z" />
            </svg>
            <span className="my-auto">All my tasks </span>
          </button>

          <button
            onClick={() => handleCategory(4)}
            className={`mt-3 p-2 flex w-full rounded-lg ${
              activeBtn == 4
                ? "bg-blue-400 hover:bg-blue-400 dark:hover:bg-blue-400"
                : "hover:bg-gray-300  dark:hover:bg-gray-800"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="my-auto mr-3 w-6 "
            >
              <path d="M8 18h1.5v-5H12l1 2h5V9h-3l-1-2H8zm5.925-4.5l-1-2H9.5v-3h3.575l1 2H16.5v3zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
            </svg>
            <span className="my-auto">Completed tasks </span>
          </button>
        </div>

        <div className="mt-8 pl-1">
          <h1 className="font-bold text-xl p-2">My lists</h1>
          <button
            onClick={() => handleCategory(5)}
            className={`mt-3 p-2 flex w-full rounded-lg ${
              activeBtn == 5
                ? "bg-blue-400 hover:bg-blue-400 dark:hover:bg-blue-400"
                : "hover:bg-gray-300  dark:hover:bg-gray-800"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="my-auto mr-3 w-6 "
            >
              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m6-2h.01M15 10h.01" />
                <path d="M9.5 15a3.5 3.5 0 0 0 5 0M12 3a2 2 0 0 0 0 4" />
              </g>
            </svg>
            <span className="my-auto">Personal </span>
          </button>

          <button
            onClick={() => handleCategory(6)}
            className={`mt-3 p-2 flex w-full  rounded-lg ${
              activeBtn == 6
                ? "bg-blue-400 hover:bg-blue-400 dark:hover:bg-blue-400"
                : "hover:bg-gray-300  dark:hover:bg-gray-800"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="my-auto mr-3 w-6 "
            >
              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
                <path d="M15 8H9h1a3 3 0 0 1 0 6H9l3 3m-3-6h6" />
              </g>
            </svg>
            <span className="my-auto">Finance</span>
          </button>

          <button
            onClick={() => handleCategory(7)}
            className={`mt-3 p-2 flex w-full rounded-lg ${
              activeBtn == 7
                ? "bg-blue-400 hover:bg-blue-400 dark:hover:bg-blue-400"
                : "hover:bg-gray-300  dark:hover:bg-gray-800"
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="my-auto mr-[14px] ml-[1px] w-[21px] p-[1px] border-[2px] border-black dark:border-white rounded-full"
            >
              <path d="M4.615 20q-.69 0-1.152-.462T3 18.385v-9.77q0-.69.463-1.152T4.615 7H9V5.615q0-.69.463-1.152T10.615 4h2.77q.69 0 1.153.463T15 5.615V7h4.385q.69 0 1.152.463T21 8.615v9.77q0 .69-.462 1.152T19.385 20zm0-1h14.77q.23 0 .423-.192t.192-.423v-9.77q0-.23-.192-.423T19.385 8H4.615q-.23 0-.423.192T4 8.615v9.77q0 .23.192.423t.423.192M10 7h4V5.615q0-.23-.192-.423T13.385 5h-2.77q-.23 0-.423.192T10 5.615zM4 19V8z" />
            </svg>
            <span className="my-auto">Work</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
