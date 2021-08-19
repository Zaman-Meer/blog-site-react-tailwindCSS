import React, { useState,useEffect,useContext} from "react";
import { Link,useLocation} from "react-router-dom";
import{Logout} from "../../context/Actions";
import PIPlaceholder from "../../assets/images/avatar-placeholder.png";
import { Context } from "../../context/Context";



export default function TopNavBar({showSideBar}) {
  const { user, dispatch } = useContext(Context);
  const [categoryDropShow, setCategoryDropShow] = useState("hidden");
  const [profileDropShow, setProfileDropShow] = useState(false);

  const {pathname}=useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(()=>{
      setActiveTab(pathname.split("/")[1]);
  },[pathname]);
  return (
    <div className="w-full h-12 top-0 fixed font-semibold text-gray-500  z-40 bg-white  flex items-center border-b-2 border-gray-100 shadow-sm ">
      <div className="w-2/3 sm:w-1/5 h-full    flex justify-start items-center pl-3 sm:pr-0 md:pl-12 ">
        <span onClick={showSideBar} className="w-8 h-full mr-9  flex sm:hidden text-2xl text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-full  " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
        </span>
      
        <Link to="/" className="font-bold  text-gray-400 text-xl no-underline   cursor-pointer">
          TechBlog
        </Link>
      </div>
      <div className="w-full hidden sm:w-3/5  h-full bg-white sm:flex sm:justify-center items-center font-nunito text-lg">
        <ul className="w-full h-full flex justify-center items-center ">
          <Link
            onMouseOver={() => {
              setCategoryDropShow("hidden");
            }}
            to="/"
            className={`menu-item ${activeTab===""?"border-gray-700":"border-white"} `}
          >
            HOME
          </Link>
          <div>
            <li
              onMouseOver={() => {
                setCategoryDropShow("block");
              }}
              className={`menu-item ${
               ( categoryDropShow === "block" || activeTab==="posts")
                  ? "border-gray-700"
                  : "border-white"
              }`}
            >
              CATEGORIES
            </li>

            <div
              onMouseOver={() => {
                setCategoryDropShow("block");
              }}
              onMouseOut={() => setCategoryDropShow("hidden")}
              className={`${categoryDropShow} w-36 absolute overflow-hidden bg-white h-auto border-1 shadow-lg border-gray-100 top-12`}
            >
              <Link
                to="/posts/technology" 
                className="menu-dropdown-item"
              >
                Technology
              </Link>
              <Link
                to="/posts/fashion"
                className="menu-dropdown-item"
              >
                Fashion
              </Link>
              <Link
                to="/posts/food"
                className="menu-dropdown-item"
              >
                Food
              </Link>
              <Link
                to="/posts/travel"
                className="menu-dropdown-item"
              >
                Travel
              </Link>
              <Link
                to="/posts/lifestyle"
                className="menu-dropdown-item"
              >
                Lifestyle
              </Link>
            </div>
          </div>
          <Link
            onMouseOver={() => {
              setCategoryDropShow("hidden");
            }}
            to="/about"
            className={`menu-item ${ activeTab==="about"
            ? "border-gray-700"
            : "border-white"
        }` }
          >
            ABOUT
          </Link>
        { user?.accessToken&& <Link
            onMouseOver={() => {
              setCategoryDropShow("hidden");
            }}
            to="/create"
            className={`menu-item ${ activeTab==="create"
            ? "border-gray-700"
            : "border-white"
        }`}
          >
            WRITE
          </Link>}
        </ul>
      </div>
     <div className="w-1/3 sm:w-1/5  h-full flex pr-4 pl-1 md:pr-5 items-center justify-end  ">
       {user?.accessToken ? 
       <div 
       onClick={() => { setProfileDropShow(!profileDropShow) }}
       onMouseOver={()=>setProfileDropShow(true)}
       onMouseOut={() => setProfileDropShow(false)}
       
       className="w-8 h-full md:w-9  flex justify-center items-center cursor-pointer">
       <div

         className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden  border-2 border-gray-200 ">
       <img src={user?.profilePic? user?.profilePic: PIPlaceholder} className="w-full h-full object-cover object-center" alt="profilePicture"  />
       </div>
       <div 
            onMouseOver={() => { setProfileDropShow(true) }}
            onMouseOut={() => setProfileDropShow(false)}
            className={`${profileDropShow?"block":"hidden"} w-20 h-auto pt-1  absolute overflow-hidden right-2 top-11   border-1 shadow-lg border-gray-100 cursor-pointer`}>
            <div
              className="w-20 bg-white h-auto"
            >
              <Link
                to="/profile" 
                className="menu-dropdown-item"
              >
                Profile
              </Link>
              <span
                onClick={()=>{dispatch(Logout())}}
                className="menu-dropdown-item pb-1 cursor-pointer"
              >
                Logout
              </span>
         
           
            </div>
            </div>

       </div>
       
       
       : <span><Link to="/login"  className="  hover:text-gray-800 cursor-pointer ">Login</Link>/<Link to="/register"  className="  hover:text-gray-800 cursor-pointer ">Register</Link></span>}
      
    </div>
    </div>
  );
}
