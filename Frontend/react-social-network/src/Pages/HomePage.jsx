import Header from "../components/Header";
import SideBar from "../components/SideBar";
import PostList from "../components/PostList";
import RightBar from "../components/RightBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col ">
        <Header />
      </div>

      <div className="flex flex-row flex-grow justify-start overflow-hidden">
        <SideBar />
        <PostList />
        <RightBar />
      </div>
    </div>
  );
}
