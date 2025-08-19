import React from "react";
import ProfileIcon from "./ProfileIcon";
import CreateIcon from "./CreateIcon";
import SearchBar from "./SearchBar";
import TextEffect from "./TextEffect";
export default function Header() {
  return (
    <div className="fixed z-10 w-[100%] bg-[black] opacity-[0.9]">
      <img src="" alt="" />

      <div className="flex h-[8vh] items-center justify-between">
        <div className="flex">
          <a
            href="/home"
            className="ml-[4rem] text-[#29bf12] text-4xl header-logo">
            <TextEffect text={"matrix"} />
          </a>
        </div>

        <div>
          <SearchBar />
        </div>

        <div className="w-40 h-[rem] pl-1 pr-1 items-center bg-black flex justify-between flex-row-reverse mr-2">
          <ProfileIcon />
          {/* <CreateIcon /> */}
        </div>
      </div>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}
