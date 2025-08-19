import React, { useState } from "react";
import ProfileIcon from "./ProfileIcon";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import ProfileComponent from "./ProfileComponent";

// export default function UserBox({ userName, followers, bio, profile }) {
//   return (
//     <div>
//       <div className="grid grid-cols-2 h-[8rem] w-[15rem] text-white font-poppins rounded-lg shadow-md backdrop-blur-[6.1px] border border-[rgba(162,158,158,0.12)]">
//         <span>
//           <ProfileIcon />
//         </span>
//         <span>{userName}</span>
//         <span>followers:{followers}</span>
//         <span>bio:{bio}</span>
//         <span>profile:{profile}</span>
//       </div>
//     </div>
//   );
// }

const UserBox = ({
  key,
  userId,
  fullName,
  currentUserId,
  isFollowing,
  handleFollowChange,
  profile,
  followers,
  dept,
}) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(0);
  // console.log(userId);

  let handleClick = (e) => {
    // setClicked(<ProfileComponent userId={userId} />);
    // navigate(`/users/${userId}`);
  };
  console.log(clicked);
  return (
    <div className="flex justify-between font-poppins-thin w-[19.5rem] h-[5.5rem] items-center bg-[#ffffffc4] p-4 rounded-lg shadow-md hover:bg-[#ffffffd5] transition">
      <img
        src={profile}
        // onMouseOver={handleClick}
        alt={``}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <a href={`/users/${userId}`}>
          <h3 className="font-semibold hover:underline text-black">
            {fullName}
          </h3>
        </a>
        <p className="text-sm text-gray-600">{followers} followers</p>
        <p className="text-[1rem] font-poppins-thin text-gray-900">{dept}</p>
      </div>
      <FollowButton
        targetUserId={userId}
        currentUserId={currentUserId}
        isFollowing={isFollowing}
        // onFollowChange={handleFollowChange}
      />
      {/* <button
        onClick={handleClick}
        className={`ml-2 px-4 py-1 text-sm ${
          setFollowed ? "bg-[#1eb61e] text-white" : "bg-gray-200 text-gray-800"
        } text-white  rounded-lg hover:bg-[#329132]`}>
        {setFollowed ? "Follow" : "Followed"}
      </button> */}
    </div>
  );
};
export default UserBox;
