import React from "react";
import { Link } from "react-router-dom";
import NoImage from "../../assets/images/noImage.png";
export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post?._id}`}>
    <div  className="w-full h-64    flex flex-col justify-start align-middle overflow-hidden  shadow-sm hover:shadow-lg cursor-pointer ">
      <div className="w-full h-48">
      <img
        className="object-fill w-full h-48 hover:opacity-95 "
        src={post?.imgUrl ? post?.imgUrl : NoImage}
        alt="postImage" 
      />
      </div>

      <p className=" font-lora font-medium h-full text-xl overflow-hidden flex-wrap text-gray-800 px-2 py-1 flex flex-wrap text-left line-clamp-2">
        {post?.title}
      </p>
    </div>
    </Link>
  );
}
