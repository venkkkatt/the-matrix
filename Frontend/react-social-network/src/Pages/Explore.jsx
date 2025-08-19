import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import UserBoxList from "../components/UserBoxList";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);
  return (
    <div className="flex">
      <div className="">
        <Header />
        <SideBar />
      </div>

      {/* explore users in your department*/}
      <div className="ml-[22vw]">
        <UserBoxList />
      </div>

      {/* explore clubs */}

      {/* explore events */}
    </div>
  );
}
