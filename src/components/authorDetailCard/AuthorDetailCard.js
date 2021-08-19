import React from 'react';
import ProfilePlaceholder from "../../assets/images/avatar-placeholder.png"
export default function AuthorDetailCard({authorDetails}) {
    return (
        <div  className="w-full  sm:m-4  pl-3 sm:p-3 flex justify-start items-start">

                <img src={authorDetails?.profilePic?authorDetails?.profilePic:ProfilePlaceholder} className="w-14 h-12 sm:w-40 sm:h-32  md:w-44 md:h-36 mt-4 sm:mt-0 object-fill rounded-full  overflow-hidden "  alt="profilePic" />
            <div className= "w-full h-full  flex  flex-col justify-end items-start mt-4 ml-1 md:ml-2  pl-2 pb-3 sm:pl-1 space-y-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 ">{authorDetails?.username}</h3>
                <p className=" sm:text-md font-medium " >{authorDetails?.email}</p>
                <p className="w-full h-12 text-gray-600 text-md line-clamp-2">{authorDetails?.about}</p>
            </div>
        </div>
    )
}
