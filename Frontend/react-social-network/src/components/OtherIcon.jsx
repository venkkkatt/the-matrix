import React, { useEffect, useState } from "react";

export default function OtherIcon({ authorr }) {
  const [profile, setProfile] = useState();
  const token = localStorage.getItem("token");
  // const authorr = JSON.stringify(author).substring(11).length() - 2;

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/api/users/profile/${authorr}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log(author);

  //       const data = await response.json();

  //       setProfile(data);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

  //   fetchProfile();
  // }, []);
  // console.log(authorr);
  return (
    <div className="relative inline-block text-left">
      <div className="cursor-pointer">
        <img
          src={authorr}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
