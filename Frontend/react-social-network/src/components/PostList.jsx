import React, { useState, useEffect } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import PostDetails from "./PostComponent";
import PostForm from "./PostForm";
import TextEffect from "./TextEffect";
const url = "http://localhost:5000/api/users/profile/explore";

const BACKEND_URL = "http://localhost:5000/api/posts/timeline";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  // console.log("from postlist", targetPost);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    const fetchPosts = async () => {
      try {
        const response = await fetch(BACKEND_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        // console.log(data);

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    fetchPosts();
  }, []);

  if (loading)
    return <div className="text-white text-2xl">Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  // console.log("from postlist", posts._id);
  console.log("in postlist, username", profile.userName);
  return (
    <div>
      <div className="post-list flex flex-col overflow-y-hidden items-center flex-grow ml-[20rem] mt-[5rem]">
        <PostForm />
        {posts &&
          posts.map((post) => (
            <Post
              key={post._id}
              content={post.postInfo}
              author={post.author}
              targetPost={post._id}
              timestamp={post.createdAt}
              profilepic={post.authorId.profilePic}
              likes={post.likes}
              currentUserId={profile.userName}
              isLikedd={post.likes.includes(profile.userName)}
            />
          ))}
        <div className="flex flex-col">
          <h1 className="text-white font-poppins mt-[2rem] tracking-[0.09rem] text-4xl">
            {posts == [""] ? "Follow friends to see their posts" : ""}
          </h1>
          <a href="/explore" className="w-[16rem]">
            <div className="bg-white rounded-xl flex my-1 justify-center items-center h-14 w-[full]">
              <p className="text-[black] font-poppins text-[1.7rem]">
                <TextEffect text={"Explore Users"} />
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
