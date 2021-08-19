import React from "react";
import { Link } from "react-router-dom";

export default function PostHighlightsWrapper({
  typeNme,
  posts,
  seeMore = false,
  children,
}) {
  return (
    <div className="block  my-2 relative">
      <div className="w-full flex justify-start items-center py-6 ">
        {<h1 className="text-gray-700 text-2xl capitalize"> {typeNme?typeNme:"Posts"}</h1>}
        <hr className="ml-4 mt-2 mr-6 h-1 w-full opacity-70 bg-gray-600" />
      </div>
      <div className="grid grid-flow-row   mb-3 grid-cols-1  lg:mb-0 md:grid-cols-2 lg:grid-cols-3   gap-4 ">
        {children}
      </div>
      <div className="flex justify-end items-center h-8 mt-1">

      {seeMore && posts >= 3 && (
        <Link
          to={`/posts/${typeNme?.toLowerCase()}`}
          className="block text-center lg:flex justify-start items-center hover:bg-gray-600 h-8 text-white pt-1 bg-gray-900 w-full  lg:w-auto  lg:p-3  lg:hover:opacity-90 shadow-lg "
        >
        See More
        </Link>
      )}
      </div>
      
    </div>
  );
}
