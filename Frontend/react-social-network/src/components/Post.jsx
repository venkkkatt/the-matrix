import React from "react";
import "./sidebar.css";
import { FaCommentAlt, FaShare, FaBookmark } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import LikeButton from "./LikeButton";
import ProfileIcon from "./ProfileIcon";
import { FaComment as CommentIcon } from "react-icons/fa6";
import CommentButton from "./commentButton";
import OtherIcon from "./OtherIcon";
import DeleteButton from "./DeleteButton";

export default function Post({
  content,
  author,
  likes,
  targetPost,
  currentUserId,
  image,
  profilepic,
  isProfileTrue,
  timestamp,
  isLikedd,
  commentsCount,
}) {
  // console.log("from postjsx", targetPost);
  // console.log(likes);

  return (
    <div>
      <div className="post flex m-3 flex-col font-poppins  border-w border-b-[#59585891] justify-between items-start hover:bg-[#7a7a7a3b]   min-h-[18rem] w-[47rem] rounded-3xl shadow p-4  bg-[#black]">
        {/* <h2 className="text-xl font-bold mb-2">{title}</h2> */}
        <div className="flex items-center">
          <OtherIcon authorr={profilepic} />
          <span className="px-4 text-[1.2rem] text-white">{author}</span>
          <span className="text-[0.7rem] text-white">
            {new Date(timestamp).toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>
        <div>
          <span></span>
        </div>
        <div className="min-h-[65%] w-[99%] mt-2 flex-grow flex flex-col font-poppins-thin text-[1rem] bg-[#111113] rounded-3xl">
          <p className="p-4 text-white mb-4">{content}</p>
          {/* <img src={url} alt="" width={300} height={300} /> */}
        </div>
        <div></div>
        <div className="flex justify-start pr-4 font-poppins items-center text-sm text-gray-500">
          <span className="mt-2">
            <LikeButton
              initialLikes={likes.length}
              currentUserId={currentUserId}
              targetPost={targetPost}
              isLiked={isLikedd}
            />
          </span>
          <span className="pl-8 mt-2">
            <CommentButton comments={0} />
          </span>
          <span className="text-white">
            {isProfileTrue ? <DeleteButton /> : ""}
          </span>
        </div>
      </div>
      <hr className="h-[1px]  bg-[#101010] border-0 dark:bg-[#2b2a2a]" />
    </div>
  );
}
