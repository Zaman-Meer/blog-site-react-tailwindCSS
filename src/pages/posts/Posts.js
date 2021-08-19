import React,{useLayoutEffect,useEffect,useState,useCallback} from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import RecentPost from "../../components/recentPosts/RecentPost";
import PostCard from "./../../components/postCard/PostCard";
import PostHighlightsWrapper from "./../../components/postHighlightsWrapper/PostHighlightsWrapper";

import AuthorDetailCard from './../../components/authorDetailCard/AuthorDetailCard';
import axios from "axios";
import Loading from "../../components/loading/Loading";

export default function Posts() {
  const [postsData,setPostData]=useState([]);
  const [authorData,setAuthorData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [offset,setOffset]=useState(0);
  const { category,id } = useParams();
const handlePageChange=(pageNumber,startIndex)=>{
setOffset(prevState=>startIndex);
};

const fetchPosts=useCallback(
  async () => {
   try {
    setLoading(true);
    const response= await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts?category=${category?category:""}&limit=12,&offset=${offset}&authorId=${id?id:""}`);
    if(response.data){
      setPostData(response.data);
      setLoading(false);
    }
   } catch (error) {
    setLoading(false);
    setError(true);
   }
  },
  [offset,category,id],
)

const fetchAuthorData=useCallback(
  async () => {
     try {
       setLoading(true);
       const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`);
       if(response.data){
         setAuthorData(response.data);
         setLoading(false);
       }
     } catch (error) {
      setLoading(false);
      setError(true);
     }
    },
    [id],
)

 
useLayoutEffect(()=>{
  if(id){
    fetchAuthorData();
  }
},[]);

useLayoutEffect(() => {
  window.scrollTo(0, 0);
  fetchPosts();
}, [category,id,offset]);

useEffect(() => {
setOffset(0);
}, [category,id]);

  return (
    <div className="max-content-width mx-auto min-h-screen-cover grid grid-flow-col grid-cols-10 grid-rows-1 gap-1  my-8 align-top ">
      <div className="col-start-1 col-span-9 md:col-span-7 flex flex-col pl-8 space-x-2 ">
        <Loading dataLength={postsData?.posts?.length} isLoading={loading} error={error}>
        {id&&<AuthorDetailCard authorDetails={authorData} />}
        <PostHighlightsWrapper typeNme={category} posts={postsData?.posts?.length}>
          {postsData?.posts?.map((post) => (
            <PostCard key={post?._id} post={post} />
          ))}
        </PostHighlightsWrapper>
        </Loading>
        <Pagination totalPosts={postsData.totalPosts} onChange={handlePageChange} />
        
      </div>
      <div className="col-span-3 hidden md:block">
        <RecentPost title="You May Like That" />
      </div>
    </div>
  );
}
