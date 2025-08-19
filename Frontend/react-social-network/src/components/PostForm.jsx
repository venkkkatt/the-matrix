import React, { useEffect, useRef, useState } from "react";
import ProfileIcon from "./ProfileIcon";
import ProfileIconTwo from "./ProfileIconTwo";
const BACKEND_URL = "http://localhost:5000/api/posts/newPost";

export default function PostForm() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [contentSize, setContentSize] = useState("");
  const token = localStorage.getItem("token");
  const textAreaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ postInfo: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      setText("");
      setMessage("Posted!");
    } catch (error) {
      console.error("Error creating post:", error.message);
      setMessage("Error creating post!");
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
    setContentSize(e.target.value);
    expandHeight();
  };

  const expandHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      (textArea.style.height = "auto"),
        (textArea.style.height = `${textArea.scrollHeight}px`);
    }
  };

  useEffect(() => {
    expandHeight();
  }, []);

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-start p-2 rounded-3xl mb-2 bg-[#1b1b1b]  border-gray-600 min-h-[6.9rem] w-[47rem]">
          <div>
            <span className="pr-2 ">
              <ProfileIconTwo />
            </span>
          </div>
          <textarea
            ref={textAreaRef}
            className="w-[45rem] text-lg resize-none overflow-hidden min-h-[5.9rem] focus:outline-none text-white font-poppins-thin p-2 rounded-md bg-transparent"
            value={text}
            onChange={handleInput}
            rows={1}
            placeholder="Post Something"
            name=""
            id=""></textarea>
          <button
            type="submit"
            disabled={!text.trim()}
            className={`w-[6rem] rounded-3xl h-[2.9rem] font-poppins bg-slate-200 ${
              !text.trim() ? "bg-[#9b9a9a]" : "bg-white"
            } `}>
            Post
          </button>
        </form>
        {message && (
          // {message == "" ? "" : ""}
          <p
            className={`mt-2 text-center font-poppins text-lg ${
              message === "Posted!" ? "text-matrix-green" : "text-[#ef2f2f]"
            }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
