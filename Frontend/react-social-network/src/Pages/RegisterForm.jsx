import React from "react";
import "../App.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextEffect from "../components/TextEffect";

const url = "http://localhost:5000/api/users/register";
import Matrix from "../assets/images/MatrixVideo.mp4";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    gender: "",
    email: "",
    password: "",
    dept: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("just before response.ok");
      if (response.ok) {
        console.log("registration successful", data);
        localStorage.setItem("token", data.token);
        console.log("after saving token");
        navigate("/home");
        console.log("After navigating");
      } else {
        console.log("error registering", data);
      }
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <div className="font-poppins grid grid-cols-2 h-[100vh] justify-center justify-items-center items-center">
      {/* <div className="matrix-video inset-0 -z-10 h-screen w-screen fixed overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2">
          <source src={Matrix} type="video/mp4" />
        </video>
      </div> */}
      <div className="">
        <span className=" text-8xl mt-8 text-matrix-green">
          <TextEffect text={"matrix"} />
        </span>
      </div>

      <form
        className="shadow-md shadow-[#464343] text-black flex flex-col justify-center items-center w-[27rem] rounded-[1.2rem] bg-[#bfc0c0] py-2 min-h-[35rem] "
        onSubmit={handleSubmit}>
        <div>
          <h2 className="text-[1.4rem] text-center text-[#143714]">
            Sign up to take your entire college <br /> experience online
          </h2>
        </div>
        <label htmlFor="fullName"></label>
        <input
          className="darkinput w-[24rem] my-4  px-3 py-5 h-[1.9rem] rounded-lg"
          onChange={handleChange}
          value={formData.fullName}
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Your Name?"
          required
        />
        <label htmlFor="userName"></label>
        <input
          className="w-[24rem] my-4 text-black px-3 py-5 h-[2rem] rounded-lg text-1xl"
          onChange={handleChange}
          value={formData.userName}
          type="text"
          id="userName"
          name="userName"
          placeholder="username?"
          required
        />

        <div className="flex justify-between items-center px-[2rem] w-[inherit]">
          <label
            htmlFor="gender1"
            className="w-[10rem] flex mr-5 justify-between items-center bg-white  px-3 py-5 h-[2rem] rounded-lg text-[gray] text-1xl">
            Female
            <input
              name="gender"
              id="gender1"
              value={formData.gender}
              type="radio"
            />
          </label>
          <label
            htmlFor="gender2"
            className="w-[10rem] flex mr-3 justify-between items-center my-4 bg-white  px-3 py-5 h-[2rem] rounded-lg text-[gray] text-1xl">
            Male
            <input
              className=""
              name="gender"
              id="gender2"
              value={formData.gender}
              type="radio"
            />
          </label>
          <label
            htmlFor="gender3"
            className="w-[10rem] flex ml-2 justify-between items-center my-4 bg-white  px-3 py-5 h-[2rem] rounded-lg text-[gray] text-1xl">
            Other
            <input
              className=""
              name="gender"
              id="gender3"
              value={formData.gender}
              type="radio"
            />
          </label>
        </div>

        <label htmlFor="email"></label>
        <input
          className="w-[24rem] my-4  px-3 py-5 h-[1.9rem] rounded-lg"
          onChange={handleChange}
          value={formData.email}
          type="text"
          id="email"
          name="email"
          placeholder="Email id?"
          required
        />
        <label htmlFor="password"></label>
        <input
          className="w-[24rem] my-4 text-[1rem] px-3 py-5 h-[1.9rem] rounded-lg"
          onChange={handleChange}
          value={formData.password}
          type="password"
          id="password"
          name="password"
          placeholder="Password?"
          required
        />
        <label htmlFor="dept">
          <input
            className="text-black w-[24rem] my-4  px-3 py-5 h-[1.9rem] rounded-lg"
            onChange={handleChange}
            value={formData.dept}
            type="text"
            list="data"
            name="dept"
            placeholder="Which department?"
            id="dept"
            required
          />
        </label>

        <datalist className="w-[20rem] " id="data">
          <option value="ISE" />
          <option value="CSE" />
          <option value="ECE" />
          <option value="IOT" />
          <option value="EEE" />
          <option value="MECH" />
          <option value="CIVIL" />
        </datalist>
        <button className="bg-matrix-green p-3 mt-2 rounded-md" type="submit">
          Enter the Matrix
        </button>
        <span className="text-[#143714] pt-4">
          <a href="/login">Already existing in matrix?</a>
        </span>
      </form>
    </div>
  );
}
