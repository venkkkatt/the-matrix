import React from "react";
import Club from "./Club";
import OtherIcon from "./OtherIcon";
export default function RightBar() {
  return (
    <div className="h-screen flex justify-center w-[20rem]">
      <div className="fixed flex flex-col items-center font-poppins border-[1px] border-gray-700 rounded-[2rem]  p-6 mt-[15vh]">
        <h3 className="text-white text-3xl ">Popular Clubs</h3>

        <Club name={"CODING"} mem={596} />

        <Club name={"FILM"} mem={340} />
        <Club name={"MUSIC"} mem={237} />
        <Club name={"ANIME"} mem={197} />
      </div>
    </div>
  );
}
