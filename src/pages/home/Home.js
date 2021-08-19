import React,{useEffect,useCallback, useState,useLayoutEffect} from "react";
import PostCard from "./../../components/postCard/PostCard";
import PostHighlightsWrapper from "./../../components/postHighlightsWrapper/PostHighlightsWrapper";
import RecentPost from "../../components/recentPosts/RecentPost";
import axios from "axios";
import Loading from "../../components/loading/Loading";


export default function Home() {
const [postsData,setPostsData]=useState([]);
const [loading,setLoading]=useState(false);
const [error,setError]=useState(false);
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);



  const fetchPosts=useCallback(
    async () => {
      try {
        const response =await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/home`);
        if(response.data){
          setPostsData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    },
    [],
  )

  useLayoutEffect(()=>{
  setLoading(true);
  fetchPosts();
  },[]);
  return (
    <div className="max-content-width mx-auto   min-h-screen-cover grid grid-flow-col grid-cols-10 grid-rows-1 gap-1 my-2 md:my-8  align-top ">
      <div className=" col-start-1 col-span-9 md:col-span-7 pl-8 flex flex-col space-x-2 ">
        <Loading  isLoading={loading} error={error} >
        {
          postsData?.map((item)=>(
            item?.posts?.length>0 && <PostHighlightsWrapper
            key={item?.category?._id}
            typeNme={item?.category?.name}
            seeMore={true}
            posts={item?.posts?.length}
          >
          {item?.posts.map((post) => (
            <PostCard key={post?._id} post={post} />
          ))}
          </PostHighlightsWrapper>

          ))
          
        }
        </Loading>
        
        
      </div>
      <div className="col-span-3 hidden md:block">
        <RecentPost title="What's the New" />
      </div>
    </div>
  );
}
