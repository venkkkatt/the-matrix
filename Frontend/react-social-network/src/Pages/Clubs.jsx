import React, { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

export default function Clubs() {
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
    </div>
  );
}
