import React from "react";
import OtherIcon from "./OtherIcon";

export default function Club({ name, mem }) {
  return (
    <div>
      <div className="font-poppins h-[4rem] rounded-lg hover:bg-[#4f4c4c] px-4 w-[12rem] pt-4  text-white  ">
        <div className="flex justify-between items-center">
          {/* <OtherIcon profile={profilep} /> */}
          <a>
            <span className="text-[1.2rem]">{name} CLUB</span>
          </a>
          <a href="">{/* <span className=" text-[0.7rem]">join</span> */}</a>
        </div>
        <span className="text-gray-400 text-[0.8rem] font-poppins-thin">
          {mem} members
        </span>
      </div>
    </div>
  );
}
