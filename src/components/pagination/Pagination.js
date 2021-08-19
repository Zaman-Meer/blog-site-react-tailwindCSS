import React,{useState,useEffect,useCallback} from "react";
import _ from "lodash";


const Pagination=({ totalPosts,onChange,pageSize=12,currentPage=1 })=> {
  const [pageNumber,setPageNumber]=useState(currentPage);
  const [pages,setPages]=useState([]);
  const [totalPages,setTotalPages]=useState(1);

const pager=useCallback(
    ()=>{
      let pageCount = Math.ceil(totalPosts / pageSize)
      
      if (pageCount === 1) return null;
      let startPage,endPage;

        if(pageCount<=5){
          // Show all if total pages less than equal to 5 
          startPage=1;
          endPage=pageCount;
        }
        else{
          // Calculate start and end pages if total pages  more than 5 
          if(pageNumber<=3){
            startPage = 1;
            endPage = 5;
          }
          else if(pageNumber + 2 >= pageCount){
            startPage = pageCount - 4;
            endPage = pageCount;
          }
          else{
            startPage = pageNumber - 2;
            endPage = pageNumber + 2;
          }
        }
        const pages = _.range(startPage, endPage + 1);
      setTotalPages(prevState=>pageCount);
      setPages(prevState=>pages);
    
  },
  [totalPosts,pageSize,pageNumber],
)

  useEffect(()=>{
      pager();
      
  },[totalPosts ,pager,pageNumber])


const handlePageChange= useCallback(
  (pageNum)=>{
    const startIndex = (pageNum -1) * pageSize;
    setPageNumber(prevState=>pageNum);
    onChange(pageNumber,startIndex);
    
  },
  [pageNumber],
)

  return (
    totalPages>1&&<div className="w-full px-4 block text-center py-2 mt-4 ">
      <ul className="w-full h-full flex justify-center items-center text-xl text-white ">
        <li onClick={()=>handlePageChange(1)} className={` ${pageNumber===1?"text-gray-300 bg-gray-100 tab-disabled":"text-gray-600 bg-gray-100 "} pagination-item hidden sm:flex`} >First</li>
        <li onClick={()=>handlePageChange(pageNumber-1)} className={` ${pageNumber===1?"text-gray-300 bg-gray-100 tab-disabled":"text-gray-600 bg-gray-100 "} pagination-item flex`}  >Previous</li>
        {pages?.map((page) => (
          <li
            key={page}
            onClick={()=>handlePageChange(page)}
            className={`pagination-item hidden sm:flex ${pageNumber===page?"text-white bg-gray-400" :"text-gray-600 bg-gray-100"}`}
          >
            {page}
          </li>
        ))}
        <li
            className="pagination-item flex sm:hidden   text-white bg-gray-400"
          >
            {pageNumber}
          </li>
       
        <li onClick={()=>handlePageChange(pageNumber+1)} className={` ${pageNumber===totalPages?"text-gray-300 bg-gray-100 tab-disabled":"text-gray-600 bg-gray-100 "} pagination-item flex`}  >Next</li>
        <li onClick={()=>handlePageChange(totalPages)} className={` ${pageNumber===totalPages?"text-gray-300 bg-gray-100 tab-disabled":"text-gray-600 bg-gray-100 "} pagination-item hidden sm:flex`} >Last</li>
      </ul>
    </div>
  );
}


export  default Pagination;