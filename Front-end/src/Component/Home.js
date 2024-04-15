import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Headbar from "./Headbar";
import Mainbar from "./Mainbar/Mainbar";
import Detailbar from "./Detailbar";

const Home = () => {
  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className=" fixed w-screen h-screen bg-no-repeat bg-cover bg-[url('/image/lightbg.webp')] dark:bg-[url('/image/darkbg.webp')] ">
      <div className="flex justify-between h-screen ">
        <Sidebar />
        <div className="w-full overflow-x-auto ">
          <Headbar />
          <div className="flex pt-3 px-5">
            <Mainbar />
            <Detailbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
