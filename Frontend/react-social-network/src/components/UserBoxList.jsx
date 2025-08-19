import React, { useEffect, useRef, useState } from "react";
import UserBox from "./UserBox";
export default function UserBoxList() {
  const url = "http://localhost:5000/api/users/explore/users";
  const url2 = "http://localhost:5000/api/users/profile/explore";
  const [currentProfile, setCurrentProfile] = useState([]);
  const [divState, setDivState] = useState(15);
  const [profiles, setProfiles] = useState([]);
  const divRef = useRef();
  // const [followingState, setFollowingState] = useState(
  //   profiles.reduce((acc, user) => {
  //     acc[user.id] = user.isFollowing;
  //     return acc;
  //   }, {})
  // );

  // const handleFollowChange = (targetUserId) => {
  //   setFollowingState((prevState) => ({
  //     ...prevState,
  //     [targetUserId]: !prevState[targetUserId],
  //   }));
  // };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCurrentProfile = async () => {
      try {
        const response = await fetch(url2, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setCurrentProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchProfile = async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProfiles(data);

      const initialFollowingState = data.reduce((acc, user) => {
        acc[user.userName] = user.followers.includes(currentProfile.userName);
        return acc;
      }, {});
      // setFollowingState(initialFollowingState);

      console.log(data);
      console.log(profiles);
    };
    fetchCurrentProfile();
    fetchProfile();
  }, [token]);

  const handleClick = () => {
    divRef.current.style.height = "15rem";

    setDivState((prevState) => prevState + 15);
    console.log(divState);
    // divRef.current.style.amimation = "smooth";
  };

  // console.log(profiles.userId);
  return (
    <div className="flex flex-col flex-wrap justify-center w-[77vw]">
      <h1 className="text-3xl font-poppins mb-4 text-white static mt-[10vh]">
        Explore Users
      </h1>
      <h3 className="text-1xl font-poppins mb-4 text-white static ">
        Recommended for you
      </h3>
      {/* <div className="grid gap-[4rem] grid-cols-3"> */}

      <div
        className={`profiles  grid gap-[4rem] h-[${divState}rem] overflow-hidden grid-cols-3`}
        ref={divRef}>
        {profiles
          .filter(
            (profile) => !profile.followers.includes(currentProfile.userName)
          )
          .map((profile) => (
            <UserBox
              key={profile._id}
              fullName={profile.fullName}
              userId={profile.userName}
              // handleFollowChange={handleFollowChange}
              currentUserId={currentProfile.userName}
              isFollowing={profile.followers.includes(currentProfile.userName)}
              followers={profile.followers.length}
              profile={profile.profilePic}
              dept={profile.dept}
            />
          ))}
      </div>
      {/* </div> */}
      <button
        onClick={handleClick}
        className="bg-white rounded-md p-1 font-poppins-thin mt-6 hover:bg-slate-300 w-[8rem]">
        Show more
      </button>
    </div>
  );
}
