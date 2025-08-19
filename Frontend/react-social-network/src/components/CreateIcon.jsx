import React from "react";

export default function ({ name }) {
  const name2 = name;
  return (
    <div className="flex items-center">
      <a href="">
        <div className="h-10 min-w-[3rem] px-2 flex items-center font-poppins justify-center rounded-full bg-[#e7e4e4]">
          @{name2}
        </div>
      </a>
    </div>
  );
}
