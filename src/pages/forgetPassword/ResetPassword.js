import React,{useRef,useEffect,useState,useCallback} from 'react'
import { useParams,useHistory } from 'react-router-dom';
import axios from 'axios';
import ResponseMessages from '../../components/responseMessages/ResponseMessages';

const ResetPassword =()=>{

    const {code } =useParams();
    const  history =useHistory();
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState("");
    const [error,setError]=useState("");
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const [showResetPassword,setShowResetPassword]=useState(false);


    const confirmCodeUI=()=>(
        <div className="w-2/3  h-16 mt-12 p-5 text-center bg-gray-400 border-2 rounded-sm mx-auto ">
            {(!message&&!error)&&<div className="w-96   mx-auto space-x-2 flex items-center text-lg text-white"  ><p >Please wait to verify the email. </p>
            <span className="animate-spin">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    </span>
            </div> }
            {
                message&&<p className="text-green-700">{message}</p>
            }
            {
                error&&<p className="text-red-700" >{error}</p>
            }

         </div>
    );

const passwordResetUI=()=>(
<div className="max-content-width mx-auto min-h-screen flex flex-col">       
            <div className="flex flex-1 items-start justify-center">
                
                <div className="rounded-lg sm:border-2 mt-12 px-4 lg:px-10 py-12 lg:max-w-xl sm:max-w-md w-full text-center">
                    <form className="text-center" onSubmit={handleSubmit}>
                        
                    <div className="py-2 text-left">
                        <input type="password" minLength="8"   className="bg-white  border-2 border-gray-100 focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 " defaultValue="" placeholder="Password" ref={passwordRef} required />
                    </div>
                    <div className="py-2 text-left">
                        <input type="password"  minLength="8"  className="bg-white  border-2 border-gray-100 focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 "  defaultValue="" placeholder="Password again" ref={passwordConfirmRef} required />
                    </div>
                        <div className="py-2">
                            <button
                                disabled={loading}
                                type="submit" className={`${loading&&"cursor-not-allowed"} border-2 border-gray-700 focus:outline-none bg-gray-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-900 hover:bg-gray-600`}>
                               <span className="inline-flex justify-center items-center">
                               Change
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
                    <ResponseMessages error={error} />
                </div>
            </div>
        </div>
);

const confirmCode= useCallback(
    async ()=>{
        try {
    
            const response= await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/reset/${code}`);
            if(response.data){  
                setError("")           
                setMessage(response.data.message);
                setTimeout(() => {
                    setMessage("");
                    setError("") 
                    setShowResetPassword(true);
                }, 1000);
                           
            }
        } catch (error) {
            
            setMessage("");
            setError(error.response.data?.message);
           
        }
    },
    [],
)


const changePassword= useCallback(
    async (data)=>{
        try {
            setError("")
            const response= await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/password-reset`,data);
            if(response.data){  
                setError("")           
                setMessage(response.data.message);
                setShowResetPassword(false);
                setTimeout(() => {
                    history.push("/login")
                }, 1000);
                           
            }
        } catch (error) {    
            setError(error.response.data?.message);
           
        }
    },
    [],
)
const handleSubmit=(e)=>{
    e.preventDefault();
    if(passwordRef.current.value!==passwordConfirmRef.current.value){
        setError("Password does not match!");
        setLoading(false);
    }
    else{
        setLoading(true);
        const data={
            password:passwordRef.current.value,
            confirmationCode:code
        }

        changePassword(data);

    }

}
    useEffect(()=>{
    confirmCode();
    },[]);

    return(
        <div>
         <div className="max-content-width mx-auto h-12  shadow-sm "> </div>
         {!showResetPassword&& confirmCodeUI()}
         {showResetPassword && passwordResetUI()}
        </div>
    )
}

export default ResetPassword;