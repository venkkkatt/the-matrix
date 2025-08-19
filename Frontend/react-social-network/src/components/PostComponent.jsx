import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000/api/posts/";

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch post details");
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) return <div>Loading post details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-details mt-2 p-4">
      <h2 className="text-2xl font-bold mb-2">{post.postInfo}</h2>
      <p className="text-gray-500 mb-4">Author: {post.author.userName}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" className="mb-4" />}
      <div className="comments-section mt-6">
        <h3 className="text-xl font-bold mb-2">Comments</h3>
        {post.comments.map((comment) => (
          <div
            key={comment._id}
            className="comment bg-gray-100 p-2 rounded mb-2">
            <strong>{comment.userId.userName}:</strong> {comment.commentText}
          </div>
        ))}
      </div>
    </div>
  );
}
