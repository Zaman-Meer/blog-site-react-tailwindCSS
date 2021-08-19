import React,{useRef,useEffect,useState,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom';
import { Context } from "../../context/Context";
import {LoginRequest,LoginSuccess,LoginFailure} from "../../context/Actions"
import axios from 'axios';
import ResponseMessages from '../../components/responseMessages/ResponseMessages';

const Login=()=> {
    const { dispatch, isFetching } = useContext(Context);
    const [error,setError]=useState("")
    const emailRef=useRef();
    const passwordRef=useRef();
    const history =useHistory();
    const login= async (data)=>{
        dispatch(LoginRequest());
        try {
            setError("")
            const response=await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`,data);
            if(response.status===200){
                dispatch(LoginSuccess(response.data));
                history.push("/profile")                
            }
        } catch (error) {
            setError(error.response?.data?.message)
            dispatch(LoginFailure());
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
       const data={
           email:emailRef.current.value,
           password:passwordRef.current.value
       }
       login(data);


    }

    useEffect(()=>{
        window.scrollTo(0, 0);
      },[])
    return (
        <div className="max-content-width mx-auto min-h-screen flex flex-col">       
            <div className="flex flex-1 items-start justify-center">
                
                <div className="rounded-lg sm:border-2 mt-12 px-4 lg:px-10 py-12 lg:max-w-xl sm:max-w-md w-full text-center">
                    <form className="text-center" onSubmit={handleSubmit}>
                        <h2 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">TechBlog</h2>
                        <h1 className="font-bold tracking-wider text-2xl mb-8 w-full text-gray-600">
                            Sign in
                        </h1>
                        <div className="py-2 text-left">
                            <input type="email" className="bg-white border-2 border-gray-100 focus:outline-none  block w-full py-2 px-2 rounded-lg focus:border-gray-700 " placeholder="Email"ref={emailRef} />
                        </div>
                        <div className="py-2 text-left">
                            <input type="password" className="bg-white  border-2 border-gray-100 focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 " required placeholder="Password" ref={passwordRef} />
                        </div>
                        <div className="py-2">
                            <button
                                disabled={isFetching}
                                type="submit" className={`${isFetching&&"cursor-not-allowed"} border-2 border-gray-700 focus:outline-none bg-gray-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-900 hover:bg-gray-600`}>
                               <span className="inline-flex justify-center items-center">
                               Sign In 
                                {isFetching&&<svg
                                className="animate-spin ml-3 mr-3 h-5 w-5  text-white"
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
                               </span>
                                
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link to="/password-forgot" className="hover:underline">Forgot password?</Link>
                    </div>
                    <ResponseMessages error={error}  />
                    <div className="text-center mt-12">
                        <span>
                            Don't have an account?
                        </span>
                        <Link to="/register" className=" text-md text-indigo-600 underline font-semibold hover:text-indigo-800">Create One</Link>
                    </div>
                </div>
            </div>
        </div>
            
    )
}

export default Login;