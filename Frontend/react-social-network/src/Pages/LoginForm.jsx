import React from "react";

import { useState } from "react";
import TextEffect from "../components/TextEffect";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:5000/api/users/login";

export default function LoginForm() {
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(false);
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    try {
      if (response.ok) {
        console.log("login successful", data);
        if (typeof localStorage !== "undefined") {
          console.log("localStorage is available");
        } else {
          console.log("localStorage is not available");
        }
        console.log(localStorage.setItem("token", data.token));
        console.log(data.token);
        navigate("/home");
      } else {
        console.log("check your username or password", data);
        setIsCorrect(true);
      }
    } catch (error) {
      console.error("Errorrrrr");
    }
  };

  return (
    <div className="font-poppins h-[100vh] bg-black gap-8 grid grid-cols-2 justify-center justify-items-center items-center">
      <div>
        {/* <h1 className="text-9xl mt-4 text-matrix-green">matrix</h1>
         */}
        <span className="text-8xl mt-4 text-matrix-green">
          <TextEffect text={"matrix"} />
        </span>
        <p className="text-[1.5rem] text-white text-start">
          Sign in to connect with your friends <br /> and other students
        </p>
      </div>
      <form
        className="shadow-md  shadow-[#464343] pt-8 text-black flex flex-col justify-start items-center w-[28rem] rounded-[1.2rem] bg-[#bfc0c0] min-h-[20rem] "
        onSubmit={handleSubmit}>
        <label
          className="text-sm/6 font-medium text-gray-900"
          htmlFor="userName"></label>
        <input
          className="w-[24rem] my-4  px-3 py-5 h-[1.9rem] rounded-lg"
          onChange={handleChange}
          type="text"
          name="userName"
          placeholder="username?"
          id="userName"
          required
        />
        <label htmlFor="password"></label>
        <input
          className="w-[24rem] my-4 px-3 py-5 h-[1.9rem] rounded-lg"
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          placeholder="password?"
          required
        />
        <div>{isCorrect ? "Password or Username is incorrect" : ""}</div>
        <div className="flex bg- flex-col pb-4 justify-center items-center">
          <button
            className="h-12 mb-2 w-20 hover:bg-[#339c33] bg-matrix-green p-3 mt-2 rounded-md"
            type="submit">
            Login
          </button>
          <span className=" w-[9.9rem] h-[3.5rem] text-center text-white py-1  rounded-lg px-11 bg-[#000000]">
            <a href="/register">New Student?</a>
          </span>
        </div>
      </form>
    </div>
  );
}
