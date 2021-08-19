import React,{useRef,useState,useEffect,useContext} from 'react';
import { Context } from "../../context/Context";
import {UpdateUserProfilePic, UpdateUserRequest,UpdateUserSuccess,UpdateUserFailure} from "../../context/Actions"
import PIPlaceholder from "../../assets/images/avatar-placeholder.png";
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Profile() {
    const { user,isFetching, dispatch } = useContext(Context);
    const [about,setAbout]=useState("");
    const [profileImage,setProfileImage]=useState("");
    const [profilePicFile,setProfilePicFile]=useState("")
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [message,setMessage]=useState("");
    const [error,setError]= useState("");
    const passwordRef=useRef();
    const passwordAgainRef=useRef();

    const handleProfilePicChange= (e)=>{
        setProfilePicFile(e.target.files[0]);
        setProfileImage(URL.createObjectURL(e.target.files[0]))
    }
    const handleUpdate=async (e)=>{
        e.preventDefault();
         if((passwordRef.current.value||passwordAgainRef.current.value)&&(passwordRef.current.value!==passwordAgainRef.current.value)){
             setError("Password does not match!")
         }
         else{
             const config ={
                    headers: { Authorization: "Bearer " + user?.accessToken }  //the token is a variable which holds the token            
             }
             dispatch(UpdateUserRequest());
             const updatedUser={
                about,
                username,
                email,
             }

            if (profilePicFile) {
                const data = new FormData();
                const filename =`${user?.id}-${profilePicFile.name}`;
                data.append("name", filename);
                data.append("file", profilePicFile);

                updatedUser.profilePic = `${process.env.REACT_APP_UPLOAD_SERVER_URL}${filename}`;
                try {
                   setMessage("");
                   setError("");
                  await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, data,config);
                  dispatch(UpdateUserProfilePic(`${process.env.REACT_APP_UPLOAD_SERVER_URL}${filename}`));
                } catch (error) {
                    setError("Profile Picture could not updated!");

                }
              }
              if(passwordRef.current.value){
                  updatedUser.password=passwordRef.current.value
              }
              try {
                setMessage("");
                  const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/${user?.id}`,updatedUser,config);
                  if(response){
                    setMessage(response.data.message)
                    dispatch(UpdateUserSuccess(username))
                  }
                  
              } catch (error) {

                  setError(error?.response?.data?.message);
                  dispatch(UpdateUserFailure())
              }
         }

    }

    const getUserProfileInfo= async ()=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${user?.id}`);
            const userProfileInfo = response?.data;
            if(userProfileInfo?.profilePic){
                dispatch(UpdateUserProfilePic(userProfileInfo?.profilePic));
                setProfileImage(userProfileInfo?.profilePic);
            }
            setAbout(userProfileInfo?.about);
            setUsername(userProfileInfo?.username);
            setEmail(userProfileInfo?.email);

        } catch (error) {
            
        }
    }

    useEffect(()=>{
            getUserProfileInfo();

    },[]);


    return (
        <div className="max-content-width  min-h-screen-cover md:w-4/5 lg:w-2/5 ml-0 md:ml-6 mb-8  p-6 flex flex-col justify-start items-start space-y-1 ">
            <div className=" overflow-hidden flex flex-col m-3 space-y-3 ">
                <div className="w-28 h-28 rounded-full overflow-hidden  border-2 border-gray-200">
                    <img src={profileImage?profileImage:PIPlaceholder} className="w-full h-full object-cover object-center" alt="profilePicture"  />
                </div>
                
                <label type="file" htmlFor="image" className="px-2 py-1 text-center bg-gray-200  border-gray-400 rounded-md hover:bg-gray-400 hover:text-white cursor-pointer">Change Profile</label>
                <input className="hidden"  accept="image/png" id="image" type="file"  onChange={handleProfilePicChange}  /> 
            </div>
            <form className="w-full p-1 overflow-hidden "   autoComplete="off" onSubmit={handleUpdate}>
            <div className="my-2 w-full sm:w-4/5 md:3/5 ">
            <label className="block text-gray-700 text-lg font-normal  mb-2" htmlFor="bio">
            About
             </label>
            <textarea id="bio" className="shadow appearance-none border rounded w-full h-auto py-1 px-3 text-md text-gray-700 leading-relaxed outline-none focus:shadow-outline focus:ring-2 ring-blue-400"  value={about} onChange={(e)=>setAbout(e.currentTarget.value)} rows="3"   />
            </div>
            <div className=" my-2 w-full  ">
            <label className="block text-gray-700 text-lg font-normal  mb-2" htmlFor="username"  >
            Username
             </label>
            <input type="text" id="username" className="shadow appearance-none border rounded w-full h-auto py-1 px-3 text-md text-gray-700 leading-relaxed outline-none focus:shadow-outline focus:ring-2 ring-blue-400"  autoComplete="off"   value={username} onChange={(e)=>setUsername(e.currentTarget.value)} required />
            </div>
            <div className="my-2 w-full">
            <label className="block text-gray-700 text-lg font-normal  mb-2" htmlFor="email">
            Email
             </label>
            <input type="email" id="email" className="shadow appearance-none border rounded w-full h-auto py-1 px-3 text-md text-gray-700 leading-relaxed outline-none focus:shadow-outline focus:ring-2 ring-blue-400" autoComplete="off"  value={email} onChange={(e)=>setEmail(e.currentTarget.value)} disabled/>
            </div>
            <div className="my-2 w-full">
            <label className="block text-gray-700 text-lg font-normal  mb-2" htmlFor="password">
            Password
             </label>
             <input type="password" minLength="8"  id="password" className="shadow appearance-none border rounded w-full  py-1 px-3 text-md text-gray-700 leading-relaxed outline-none focus:shadow-outline focus:ring-2 ring-blue-400" autoComplete="new-password" ref={passwordRef} />
            
            </div>
            <label className="block text-gray-700 text-lg font-normal  mb-2" htmlFor="passwordConfirm">
            Confirm Password 
             </label>
             <input type="password" id="passwordConfirm"  minLength="8"  className="shadow appearance-none border rounded w-full  py-1 px-3 text-md text-gray-700 leading-relaxed outline-none focus:shadow-outline focus:ring-2 ring-blue-400" autoComplete="off" ref={passwordAgainRef}  />
             
            
            {
                 error&&<div className="p-2 mb-2 mt-4 rounded-sm bg-red-200 border-2 border-red-300 text-center text-red-800 ">
                     {error}
                 </div>
             }
              {
                 message&&<div className="p-2 mt-4 mb-2 rounded-sm bg-green-200 border-2 border-green-300 text-center text-green-800 ">
                     {message}
                 </div>
             }
            <div className="w-full flex justify-between items-center px-1 py-4 mt-7 mb-3">
                <Link to={`/posts/author/${user?.id}`}  className="underline ml-3 cursor-pointer text-yellow-600 hover:text-yellow-700 text-lg">My Posts</Link>

            <button
              disabled={isFetching} 
              type="submit"
              className={`${isFetching&&"cursor-not-allowed"} inline-flex items-center px-4 py-2 border border-transparent  text-base leading-6 font-medium rounded-xl text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-indigo active:bg-gray-700 transition ease-in-out duration-150`}
            >
             {isFetching&&<svg
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
              update
            </button>
          
            </div>
           
            </form>
        </div>
    )
}
