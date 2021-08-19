import React,{useEffect,useState} from 'react'
import { useParams,useHistory } from 'react-router-dom';
import axios from 'axios';

const EmailConfirmPage =()=> {
const [message,setMessage]=useState("");
const [error,setError]=useState("");
const {code } =useParams();
const history =useHistory();
const confirmCode= async ()=>{
    try {

        const response= await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/activation/${code}`);
        if(response.data){
            
            setMessage(response.data.message);
            setError("")
            setTimeout(()=>{
                if(response.status===200){
                    history.push("/login")
                  }
            },2000)
           
            
            
            
        }
    } catch (error) {
        setError(error.response.data?.message);
        setMessage("");
    }
}
useEffect(()=>{
confirmCode();
},[]);
    return (
        <div>
         <div className="max-content-width mx-auto h-12  shadow-sm "> </div>
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
          
        </div>
    )
}


export default EmailConfirmPage;