import React from "react";
import { FaCircle } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateIcon from "./CreateIcon";
export default function ProfileIcon(id) {
  const [profile, setProfile] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/profile/explore`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileIconRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="fixed flex pl-2 text-left">
      <CreateIcon name={profile.userName} />
      <div className="relative pl-2 cursor-pointer">
        <img
          ref={profileIconRef}
          onClick={toggleDropdown}
          src={profile.profilePic}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      {dropdown && (
        <div
          ref={dropdownRef}
          className="dropdown-div flex justify-center items-end rounded-[3rem] h-[4rem] w-[10rem] -translate-x-[] translate-y-[rem] bg-[#636363] z-100 absolute">
          <button
            onClick={handleLogout}
            className="text-black text-[1.4rem] hover:text-2xl hover:animate-pulse font-poppins rounded-[4rem] bg-[#f0efef] mb h-[4rem] w-[10rem]">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
