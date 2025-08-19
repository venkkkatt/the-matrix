import React, { useState } from "react";
import { FaComment as CommentIcon } from "react-icons/fa";

export default function CommentButton({ comments }) {
  //   const [comment, openComment] = useState("");
  const handleClick = () => {};
  return (
    <div>
      <div onClick={handleClick} className="flex">
        <span className="text-[] font-poppins text-white pr-2">{comments}</span>
        <CommentIcon className="text-2xl hover:text-gray-500 text-[#dfdfdf]" />
      </div>
    </div>
  );
}
