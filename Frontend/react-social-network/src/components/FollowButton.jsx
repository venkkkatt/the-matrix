import React, { useEffect, useState } from "react";

export default function FollowButton({
  targetUserId,
  currentUserId,
  isFollowing,
  onFollowChange,
}) {
  console.log(isFollowing);
  const token = localStorage.getItem("token");
  const [following, setFollowing] = useState(isFollowing);
  const [profile, setProfile] = useState([]);
  const id = targetUserId;
  console.log(id);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const response = await fetch(
  //       `http://localhost:5000/api/users/profile/${targetUserId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${token}`,
  //         },
  //         // body: JSON.stringify({ userId: currentUserId }),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     // setProfile(data);
  //     setFollowing(data.following.includes(currentUserId));
  //   };
  //   fetchProfile();
  // }, []);

  const handleFollow = async () => {
    console.log("from follow button 1");

    try {
      console.log("from follow button in try");

      const response = await fetch(
        `http://localhost:5000/api/users/follow/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: currentUserId }),
        }
      );

      const data = await response.json();
      console.log("from follow button ", data);

      if (response.ok) {
        setFollowing((prevState) => !prevState);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 hover:bg-matrix-green text-[#282828] font-semibold rounded-lg ${
        following ? "bg-red-500" : "bg-[#7ce755]"
      }`}>
      {following ? "Unfollow" : "Follow"}
    </button>
  );
}
