import React, { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import TextEffect from "../components/TextEffect";

export default function Popular() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);
  return (
    <div>
      <div>
        <Header />
        <SideBar />
      </div>

      <div className="flex flex-col ml-[20vw] w-[60vw] justify-center items-center">
        <span className="text-5xl mt-[42vh] text-[red] font-poppins mb-4">
          <TextEffect text={"Under Development!!"} />
        </span>
        <p className="text-white text-[1.3rem] font-poppins ">
          Soon you can see the popular <br /> stuffs in college
        </p>
      </div>
    </div>
  );
}
