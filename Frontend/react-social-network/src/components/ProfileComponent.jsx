import React from "react";
import Post from "./Post";
import Header from "./Header";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";

export default function ProfileComponent({ userId }) {
    
  const [profile, setProfile] = useState([]);
  const [profileTrue, setProfileTrue] = useState(true);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const url = `http://localhost:5000/api/users/${userId}`;
  const url2 = `http://localhost:5000/api/posts/${userId}`;
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

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    setProfileTrue(false);

    const fetchPosts = async () => {
      try {
        const res = await fetch(url2, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchProfile();
    fetchPosts();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  // console.log("from profile section", data.profilePic);
  console.log("from profile section", profile.profilePic);
  const source = profile.profilePic;

  return (
    <div className="flex flex-col bg-black">
      <div>
        <div>
          <Header />
          <SideBar />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-transparent flex flex-col font-poppins  w-[40rem] ml-[20vw] mt-[10vh] shadow-lg rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <img
              src={source}
              alt={`${profile.userName}'s avatar`}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="ml-6">
              <h1 className="text-2xl text-white font-bold">
                {profile.fullName}
              </h1>
              <p className="text-white">@{profile.userName}</p>
              <p className="mt-2 text-white">{profile.bio || ""}</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-8">
            <div>
              <span className="text-white font-semibold">
                {profile.followers?.length || 0}
              </span>
              <span className="text-white"> Followers</span>
            </div>
            <div>
              <span className="text-white font-semibold">
                {profile.following?.length || 0}
              </span>
              <span className="text-white"> Following</span>
            </div>
          </div>
          <p className="mt-4 text-white">{profile.dept || ""}</p>
        </div>

        <div className=" ml-[20vw] w-[50rem] shadow-lg rounded-lg p-6">
          <h2 className="text-xl text-white font-bold mb-4">Your Posts</h2>
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <Post
                  key={post._id}
                  content={post.postInfo}
                  author={post.author}
                  targetPost={post._id}
                  timestamp={post.createdAt}
                  profilepic={source}
                  likes={post.likes}
                  isLikedd={post.likes.includes(profile.userName)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
