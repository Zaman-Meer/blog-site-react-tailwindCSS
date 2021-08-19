import React,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function SideNavBar({closeSideBar}) {
    const [showCategoriesDrop,setShowCategoriesDrop]=useState(false);
    return (
        <div className="top-0 fixed w-full h-screen bg-black opacity-95 z-50 flex flex-col justify-start items-start" >

           <div className="block text-left ">
               <div className="w-9 h-9 ml-2 mt-2 text-white"  onClick={closeSideBar} >
               <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
               </div>
               
            </div>
            <div className="w-full flex flex-col justify-start items-start my-4 py-4 text-white" >
                    <ul className="w-full">
                        <Link  onClick={closeSideBar}  to="/" className="side-menu-item">
                            Home
                        </Link>
                        <li className="side-menu-item" onClick={()=>setShowCategoriesDrop(!showCategoriesDrop)}>
                                <span className="flex justify-between items-center text-white" >
                                     Categories 
                                   { showCategoriesDrop?
                                       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                       <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                                     </svg>
                                       :
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>}
                                </span> 
                        </li>
                                <ul className={` w-full flex flex-col ${!showCategoriesDrop&&"hidden"} justify-start items-start border-b-2 border-white border-opacity-50`}>
                                <Link  onClick={closeSideBar}  to="/posts/technology" className="side-menu-sub-item">
                                       Technology  
                                </Link>
                                <Link  onClick={closeSideBar}  to="/posts/fashion" className="side-menu-sub-item">
                                    Fashion
                                </Link>
                                <Link  onClick={closeSideBar}  to="/posts/fashion" className="side-menu-sub-item">
                                    Food
                                </Link>
                                <Link  onClick={closeSideBar}  to="/posts/travel" className="side-menu-sub-item">
                                    Travel
                                </Link>
                                <Link  onClick={closeSideBar}  to="/posts/lifestyle" className="side-menu-sub-item">
                                    Lifestyle
                                </Link>

                                </ul>
                        <Link  onClick={closeSideBar}  to="/about" className="side-menu-item">
                            About
                        </Link>
                        <Link  onClick={closeSideBar}  to="/create" className="side-menu-item">
                            Write
                        </Link>

                    </ul>

               </div>
        </div> 
    )
}
