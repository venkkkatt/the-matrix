import React from "react";
import { FaCircle } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateIcon from "./CreateIcon";
export default function ProfileIconTwo(id) {
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

  const navigateProfile = () => {};

  return (
    <div className="relative flex pl-2 text-left">
      <div className="relative pl-2 cursor-pointer">
        <img
          ref={profileIconRef}
          src={
            profile.profilePic
            // "https://i.pinimg.com/736x/ae/a7/a9/aea7a9551cda1f88cc5e6e7ea52709f1.jpg"
          }
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
