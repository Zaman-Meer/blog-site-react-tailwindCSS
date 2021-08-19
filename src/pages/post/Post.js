import React,{useState,useLayoutEffect,useCallback,useContext} from 'react';
import { Link,useParams,useHistory } from 'react-router-dom';
import { Context } from "../../context/Context";
import { Markup } from 'interweave';
import RecentPost from "../../components/recentPosts/RecentPost";
import PIPlaceholder from "../../assets/images/avatar-placeholder.png";
import axios from 'axios';
import Loading from "../../components/loading/Loading";


const Post = () => {
    const { user } = useContext(Context);
   const {id} =useParams();
   const history =useHistory();
   const [postData,setPostData]=useState([]);
   const [recentPostsData,setRecentPostsData]=useState([]);
   const [loading,setLoading]=useState(false);
   const [isDelete,setIsDelete]=useState(false);
   const [error,setError]=useState(false);
   const [showModal,setShowModel]=useState(false);

   const fetchPost=useCallback(
     async  () => {
            try {
                const response =await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);
                if(response?.data){
                    setPostData(response.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setError(true);
            }

       },
       [id],
   )

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


const deletePost =useCallback(
   async () => {
    try {
        setIsDelete(true);
        const config ={
            headers: { Authorization: "Bearer " + user?.accessToken }  //the token is a variable which holds the token            
                        } 
        const response =await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${postData?._id}`, config);
        if(response.data){
            setIsDelete(false);
            history.push(`/posts/author/${postData?.authorId}`)
        }
      } catch (error) {
        setIsDelete(false);
      }
    },
    [],
)

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        fetchRecentPosts(); 
    }, [])
   useLayoutEffect(() => {
    setLoading(true);
    fetchPost();
    
   }, [id])


    return (
        <div className="max-content-width mx-auto min-h-screen-cover grid grid-flow-col grid-cols-10 grid-rows-1 gap-1  my-8 align-top ">
            <div className="col-start-1 col-span-10 md:col-span-7 p-3 text-gray-600  flex  flex-col ">
            
            <Loading  isLoading={loading} error={error}>
                
                    {postData?.imgUrl&&<div className="w-full h-32 md:h-56 lg:h-80 mb-4 ml-3 pr-3 md:pr-0 shadow-sm overflow-hidden">          
                    <img className="w-full h-full object-cover rounded-md " src={postData?.imgUrl} alt="heroImage" />
                    </div>}
                    <h1 className="text-2xl md:text-4xl text-center font-nunito font-semibold px-3 my-5 flc ">{postData?.title?.trim()}</h1>
                    <div className="text- w-full flex justify-between items-center text-gray-700 font-nunito  font-semibold  sm:px-4 py-2  ">
    
                        <Link to={`/posts/author/${postData?.authorId}`} className="hover:underline flex justify-start items-center text-yellow-600 text-lg ">
                            <img className="w-12 h-12 object-cover rounded-full shadow-sm border-2 border-gray-300 mr-2 " alt="authorPic" src={postData?.authorPic?postData?.authorPic:PIPlaceholder}   />
                            {postData?.authorName}
                        </Link>

                        <div className="flex justify-end items-center space-x-3">
                        {(postData?.authorId===user?.id || user?.role === "admin") && <Link to={`/edit/${postData?._id}`} className="no-underline"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-5 w-6 md:w-5 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg></Link>}
                        {(postData?.authorId===user?.id || user?.role === "admin") && <svg onClick={()=>setShowModel(!showModal)} xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-5 w-6 md:w-5 text-red-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>}
                           <p className="text-base text-yellow-600">{postData?.createdAt?.slice(0,10)}</p>
                        </div>
                        
                    </div>
                    
                    <div className=" w-full font-nunito text-lg whitespace-pre-wrap text-justify  px-3 sm:px-16 my-1 post-data">
                    <Markup content={postData?.description} /> </div>
                
            </Loading>
                
               
            </div>

            <div className="col-span-3 hidden md:block">
                <RecentPost title="You May Like That" recentPosts={recentPostsData} />
            </div>

   {showModal && <div className="min-w-screen h-screen  px-6 md:px-0  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-30"  >
    <div className="w-96 md:w-auto p-3 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
      <div className="">
        <div className="text-center flex-auto justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                        <p className="text-sm text-gray-500 px-8">Do you really want to delete this post?
                This process cannot be undone</p>    
        </div>

        <div className="p-3  mt-2 text-center space-x-4 md:block">
            
            <button 
            disabled={isDelete}
             onClick={()=>setShowModel(!showModal)} className={`${isDelete && "cursor-not-allowed"} mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100`}>
                Cancel
            </button>
            <button 
            onClick={deletePost}
            disabled={isDelete}
            className={`${isDelete && "cursor-not-allowed"} inline-flex items-center  mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600`}>
                {isDelete&&<svg
                className="animate-spin  ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  classNames="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>}
                Delete</button>
        </div>
      </div>
    </div>
  </div>}
 </div>   
    )
}


export default Post;