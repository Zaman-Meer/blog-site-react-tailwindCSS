import React,{ Fragment } from "react";


const ResponseMessages=({error,message})=>{

    return(
        <Fragment>
             {
            error && <div className="p-2 mb-2 mt-3 rounded-sm bg-red-200 border-2 border-red-300 text-center text-red-800 text-sm">
                {error}
            </div>
                }
                              {
            message&&<div className="p-2  mb-2 rounded-sm bg-green-200 border-2 border-green-300 text-center text-green-800 text-sm">
                {message}
            </div>
        }
        </Fragment>
    )
}

export  default ResponseMessages;