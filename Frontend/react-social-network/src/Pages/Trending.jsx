import React, { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import PostList from "../components/PostList";
import RightBar from "../components/RightBar";
import { useNavigate } from "react-router-dom";
import PostListTwo from "../components/PostListTwo";

export default function Trending() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);
  return (
    <div className="flex justify-between">
      <div>
        <Header />
        <SideBar />
      </div>

      <div className="flex">
        <PostListTwo />
        {/* <RightBar /> */}
      </div>

      <div className="">
        <RightBar />
      </div>
    </div>
  );
}
