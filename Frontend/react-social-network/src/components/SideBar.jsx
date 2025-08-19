import React from "react";
import { useState } from "react";
import "./sidebar.css";
import ProfileIcon from "./ProfileIcon";
import { MdHomeFilled as HomeIcon } from "react-icons/md";
import { MdOutlineExplore as ExploreIcon } from "react-icons/md";
import { HiTrendingUp as TrendingIcon } from "react-icons/hi";
import { RiMessage3Fill as MessageIcon } from "react-icons/ri";
import { FaStar as StarIcon } from "react-icons/fa";
import { FaCalendarCheck as EventIcon } from "react-icons/fa6";
import TextEffect from "./TextEffect";
import ProfileIconTwo from "./ProfileIconTwo";

export default function SideBar() {
  const [selectedItem, setSelectedItem] = useState("home");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  //specify routes
  //make function for changing colour when selected
  //make it more stylish, add matrix effect

  return (
    <div className="flex overflow-x fixed flex-col justify-between sidebar-divmain bg-[] border-r mt-[8vh] border-r-gray-700 h-[92vh] w-[full]">
      <div
        className=" flex flex-col justify-start items-center text-[1.2rem] "
        pl-4>
        <a href="/home" className="w-[16rem]">
          <div
            onClick={() => handleItemClick("home")}
            className={`sidebar-div rounded-xl flex my-1 justify-start items-center h-16 w-[full]`}>
            <HomeIcon style={{ color: "white", marginLeft: "1.5rem" }} />
            <p className="text-[#5d5e76] pl-4">
              <TextEffect text={"Home"} />
            </p>
          </div>
        </a>
        <a href="/explore" className="w-[16rem]">
          <div className="sidebar-div rounded-xl flex my-1 justify-start items-center h-16 w-[full]">
            <ExploreIcon style={{ color: "white", marginLeft: "1.5rem" }} />
            <p className="text-[#5d5e76] pl-4">
              <TextEffect text={"Explore"} />
            </p>
          </div>
        </a>
        <a href="/trending" className="w-[16rem]">
          <div className="sidebar-div rounded-xl flex my-1 justify-start items-center h-16 w-[full]">
            <TrendingIcon style={{ color: "white", marginLeft: "1.5rem" }} />
            <p className="text-[#5d5e76] pl-4">
              <TextEffect text={"Trending"} />
            </p>
          </div>
        </a>
        <a href="/popular" className="w-[16rem]">
          <div className="sidebar-div rounded-xl  flex my-1 justify-start items-center h-16 w-[full]">
            <StarIcon style={{ color: "white", marginLeft: "1.5rem" }} />
            <p className="text-[#5d5e76] pl-4">
              <TextEffect text={"Popular"} />
            </p>
          </div>
        </a>
        <a href="/chats" className="w-[16rem]">
          <div className="sidebar-div rounded-xl flex my-1 justify-start items-center h-16 w-[full]">
            <MessageIcon style={{ color: "white", marginLeft: "1.5rem" }} />
            <p className="text-[#5d5e76] pl-4">
              <TextEffect text={"Chats"} />
            </p>
          </div>
        </a>
        <a href="/events" className="w-[16rem]">
          <div className="sidebar-div rounded-xl flex my-1 justify-start items-center h-16 w-[full]">
            <EventIcon style={{ color: "white", marginLeft: "1.5rem" }} />
            <p className="text-[#5d5e76] pl-4">
              <TextEffect text={"Events"} />
            </p>
          </div>
        </a>
      </div>

      <div className="">
        <a href="/profile" className="w-[16rem]">
          <div className="sidebar-div rounded-xl flex my-1 justify-start  items-center h-16 w-[full]">
            <span className="ml-[0.8rem] -translate-x-1">
              <ProfileIconTwo />
            </span>
            <p className="pl-2 text-[#c4cfc3] text-[1.4rem]">
              <TextEffect text={"Profile"} />
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
