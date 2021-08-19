import React,{ useState,useLayoutEffect,useContext,useCallback } from "react";
import { useParams,useHistory } from "react-router-dom";
import Select from 'react-select';
import { Context } from "../../context/Context";
import TextEditor from "../../components/textEditor/TextEditor"
import axios from "axios";
import ResponseMessages from "../../components/responseMessages/ResponseMessages";

export default function Create() {
  const {id } = useParams();
  const  history = useHistory();
  const { user} = useContext(Context);
  const [postAuthorId,setPostAuthorId]=useState("");
  const [imgUrl,setImgUrl]=useState("");
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [descriptionOld,setDescriptionOld]=useState("");
  const [categories,setCategories]=useState([]);
  const [imgUrlError,setImgUrlError]=useState(false);
  const [titleError,setTitleError]=useState(false);
  const [catError,setCatError]=useState(false);
  const [desError,setDesError]=useState(false);
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]= useState("");
  const [postFetchError,setPostFetchError]=useState(false);

  const options = [
    { label: "technology", value: "technology" },
    { label: "fashion", value: "fashion" },
    { label: "food", value: "food" },
    { label: "travel", value: "travel" },
    { label: "lifeStyle", value: "lifestyle" }
  ];

const handleImgUrl=(e)=>{
  setImgUrlError(false);
  setImgUrl(e.currentTarget.value);
}

const handleSelect=(selectedOptions)=>{
setCatError(false);
setCategories(selectedOptions)
}

const handleTitle=(e)=>{
  setTitleError(false);
  setTitle(e.currentTarget.value);
}

const handleTextEditor=(text)=>{
  setDesError(false);
  setDescription(text)
}

const handlePost=async (e)=>{
e.preventDefault();

if(imgUrl && title && categories?.length!==0 && description){
  setLoading(true);
  setMessage("");
  setError("");
  const postData={
    authorId:id?postAuthorId:user?.id,
    imgUrl:imgUrl,
    categories:categories.map(category=>category?.value),
    title:title,
    description:description
     }

try {
  const config ={
    headers: { Authorization: "Bearer " + user?.accessToken }  //the token is a variable which holds the token            
                }   
    let response=null;
    setError("");
    if(id){
       response= await axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`,postData,config);
    }
    else{
       response= await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`,postData,config);
    }
  
  if(response){
    setMessage(response?.data?.message);
    setLoading(false);
    setTimeout(()=>{
      history.push(`/post/${response?.data?.id}`)
    },1000)
  }
} catch (err) {
  setMessage("");
  setError(err?.response?.data?.message);
  setLoading(false);
}

}
else{
  !imgUrl?setImgUrlError(true):categories?.length===0?setCatError(true):!title?setTitleError(true):!description?setDesError(true):setDesError(false)
  }
}

const fetchPost=useCallback(
  async  () => {
         try {
             const response =await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);
             if(response?.data){
                 setPostFetchError(false);
                 const postData = response.data;
                 setImgUrl(postData?.imgUrl);
                 setTitle(postData?.title);
                 const prevCategories= postData?.categories?.map(category=>({label:category,value:category}));
                 setCategories(prevCategories);
                 setDescriptionOld(postData?.description);
                 setDescription(postData?.description);
                 setPostAuthorId(postData?.authorId)

             }
         } catch (error) {
          setPostFetchError(true);
         }

    },
    [id],
);


useLayoutEffect(() => {
  window.scrollTo(0, 0);
if(id){
  fetchPost();
}
}, []);

  if(postFetchError) {
    return <div className="w-full min-h-screen-cover bg-gray-50"> </div>;
  }

  return (
  <div className="max-content-width min-h-screen-cover py-8 mx-auto bg-gray-50">
      <div className="w-11/12 sm:w-8/12  mx-auto  p-3 sm:p-8 rounded-sm shadow-sm  bg-white">
        <div className="w-full h-32 md:h-48 lg:h-72 mb-4 rounded-md overflow-hidden">
          {
            imgUrl?<img className="w-full h-full object-cover" src={imgUrl} alt="heroImage" />:<div className="w-full h-full flex justify-center items-center font-nunito text-2xl text-gray-700 bg-gray-100 ">No Image</div>
          }
          
        </div>
        <form  onSubmit={handlePost}>
        <div className=" w-full h-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-normal  mb-2" htmlFor="imgUrl">
            Image URL
             </label>
            <input className={`shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-relaxed outline-none focus:shadow-outline focus:ring-2 ${imgUrlError?"ring-2 ring-red-400":"ring-blue-400"}`} id="imgUrl" type="url" placeholder="Image URL" value={imgUrl} onChange={handleImgUrl} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-normal  mb-2" >
            Categories
             </label>
             <Select
              className={catError?"ring-2 rounded-sm ring-red-400 ":""}
              isMulti
              value={categories}
              onChange={handleSelect}
              options={options}
            />
            </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-normal  mb-2" htmlFor="title">
            Title
             </label>
            <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-xl text-gray-700 leading-relaxed outline-none focus:shadow-outline focus:ring-2 ${titleError?"ring-2 ring-red-400":"ring-blue-400"}`} id="title" type="text" placeholder="Post Title" value={title} onChange={handleTitle} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-normal  mb-2" htmlFor="description">
            Description
             </label>
             <div className={desError?"ring-2 rounded-sm ring-red-400 ":""}>
             <TextEditor value={descriptionOld} onChange={handleTextEditor} />
             </div>

          </div>  
          <div className=" w-full flex justify-end">
          <button
              disabled={loading} 
              type="submit"
              className={`${loading&&"cursor-not-allowed"} inline-flex items-center px-4 py-2 mb-3 border border-transparent text-base leading-6 font-medium rounded-xl text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-indigo active:bg-gray-700 transition ease-in-out duration-150`}
            >
             {loading&&<svg
                className="animate-spin  ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
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
              {id?"Update":"Create"}
            </button>
          </div>
   
    
        </div>
        </form>
    <ResponseMessages error={error} message={message}  />
      </div>
  </div>
  
    );
}
