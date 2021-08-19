import React,{useRef,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ResponseMessages from "../../components/responseMessages/ResponseMessages";

export default function Register() {
    const [loading,setLoading]=useState(false)
    const[message,setMessage]=useState("");
    const[error,setError]=useState("");
    const usernameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordAgainRef=useRef();

    const signUp= async (data)=>{
        try {
            setError("");
            setMessage("");
            const response= await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`,data);
            if(response.data){
                setMessage(response.data?.message);
                setLoading(false);
            }
        } catch (error) {
            setError(error.response.data?.message);
            setLoading(false);
 
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        if(passwordRef.current.value!==passwordAgainRef.current.value){
            setError("Password does not match!");
            setLoading(false);
        }
        else{
            setError("")
            const data={
                username:usernameRef.current.value,
                email:emailRef.current.value,
                password:passwordRef.current.value,
                password2:passwordAgainRef.current.value
            }
            signUp(data)
        }
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
      },[])
    return (
        <div className="max-content-width mx-auto min-h-screen flex flex-col">       
        <div className="flex flex-1 items-start justify-center">
            <div className="rounded-lg sm:border-2 px-4 mt-12 lg:px-10 py-12 lg:max-w-xl sm:max-w-md w-full text-center">
                <form className="text-center" onSubmit={handleSubmit} autoComplete="off">
                <h2 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">TechBlog</h2>
                    <h1 className="font-bold tracking-wider text-2xl mb-8 w-full text-gray-600">
                        Sign Up
                    </h1>
                    <div className="py-2 text-left">
                        <input type="text" maxLength="20" minLength="5" className="bg-white border-2 border-gray-100 focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700" defaultValue="" name="Username" placeholder="Username"ref={usernameRef} autoComplete="off"  required />
                    </div>
                    <div className="py-2 text-left">
                        <input type="email" className="bg-white border-2 border-gray-100 focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Email" defaultValue=""  ref={emailRef}  required/>
                    </div>
                    <div className="py-2 text-left">
                        <input type="password" minLength="8"   className="bg-white  border-2 border-gray-100 focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 " defaultValue="" placeholder="Password" ref={passwordRef} required />
                    </div>
                    <div className="py-2 text-left">
                        <input type="password"  minLength="8"  className="bg-white  border-2 border-gray-100 focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 "  defaultValue="" placeholder="Password again" ref={passwordAgainRef} required />
                    </div>
                    <div className="py-2">
                    <button
                                disabled={loading}
                                type="submit" className={`${loading&&"cursor-not-allowed"} border-2 border-gray-700 focus:outline-none bg-gray-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-900 hover:bg-gray-600`}>
                               <span className="inline-flex justify-center items-center">
                               Sign Up 
                                {loading&&<svg
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
                <ResponseMessages error={error} message={message} />
                <div className="text-center mt-12">
                    <span>
                        Already have an account?
                    </span>
                    <Link to="/login" className="text-md text-indigo-600 underline font-semibold hover:text-indigo-800">Login</Link>
                </div>
            </div>
        </div>
    </div>
    )
}
