import React, { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RightBar from "../components/RightBar";
import PostList from "../components/PostList";
import TextEffect from "../components/TextEffect";
import { useNavigate } from "react-router-dom";

export default function Chats() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);
  return (
    <div className="flex justify-betwee">
      <div className="flex">
        <Header />
        <SideBar />
      </div>

      <div className="flex flex-col ml-[20vw] w-[60vw] justify-center items-center">
        <span className="text-5xl text-[red] font-poppins mb-4">
          <TextEffect text={"Under Development!!"} />
        </span>
        <p className="text-white text-[1.5rem] font-poppins ">
          Soon you can chat with <br /> other members
        </p>
      </div>

      <div>
        <RightBar />
      </div>
    </div>
  );
}
