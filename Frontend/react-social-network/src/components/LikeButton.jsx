import React, { useEffect, useState } from "react";
import { GoHeartFill as LikeBtn } from "react-icons/go";
export default function LikeButton({
  targetPost,
  currentUserId,
  initialLikes,
  isLiked,
}) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(isLiked);
  const token = localStorage.getItem("token");

  console.log("post id is", targetPost);
  console.log("initial likes", initialLikes);
  const id = targetPost;
  const url = `http://localhost:5000/api/posts/${id}/like`;
  const url2 = `http://localhost:5000/api/posts/${id}/isLiked`;

  useEffect(() => {
    const fetchIsliked = async () => {
      const response = await fetch(url2, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        setLiked(data);
      }
    };
    fetchIsliked();
  }, [url2, token]);

  const handleLike = async () => {
    console.log("inside like");

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(likes),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setLikes(data.length);
        setLiked(data.includes(currentUserId));
        // console.log(data);
      }
    } catch {
      console.log("eroooooorr");
    }
  };
  console.log("likes isss", liked);
  // const handleUnlike = async () => {
  //   console.log("inside unlike");

  //   const response = await fetch(url2, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(likes),
  //   });

  //   const data = response.json();
  //   console.log("data is", data);
  //   if (response.ok) {
  //     setLikes(data);
  //   }
  // };

  return (
    <div className="flex justify-between p-1">
      {/* <span className="text-white pr-2 font-poppins">{likes.length}</span> */}
      <LikeBtn
        onClick={handleLike}
        className={`cursor-pointer text-2xl transition-colors duration-50 ${
          liked ? "text-[#f92f2fe0]" : "text-white "
        }`}
      />
      <span className="text-white pl-2 font-poppins">{likes}</span>
    </div>
  );
}
