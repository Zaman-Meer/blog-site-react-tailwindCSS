import React,{useState,useLayoutEffect,useCallback} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const RecentPost =({ title })=> {
  const [recentPostsData,setRecentPostsData]=useState([]);

  const fetchRecentPosts=useCallback(
    async () => {
     try {
       const response =await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/latest`);
       if(response.data){
         setRecentPostsData(response.data);
       }
     } catch (error) {
 
     }
     },
     [],
   )

   useLayoutEffect(() => {
     fetchRecentPosts();
  
   }, [])

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center p-5 mt-3  ">
        {recentPostsData?.length!==0&& <h1 className="font-nunito text-2xl font-bold  text-gray-600 text-center">
        {title}
      </h1>}
      {recentPostsData?.length!==0&&recentPostsData?.map((post) => (
        <Link
          to={`/post/${post?._id}`}
          key={post?._id}
          className="w-full  flex justify-start items-center pt-3 border-b-2 border-gray-300 no-underline"
        >
          <div className="w-20   overflow-hidden p-1">
            <img className="w-16 h-16 object-fill"  src={ post?.imgUrl} alt="postPic" />
          </div>
          <h4
            className="w-5/6 font-lora font-medium text-lg text-gray-900 pl-3 py-1 flex flex-wrap text-left hover:underline line-clamp-2"
          >
            {post?.title}
          </h4> 
        </Link>
      ))}
     
    </div>
  );
}


export default RecentPost;