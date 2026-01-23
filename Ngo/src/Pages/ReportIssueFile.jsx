 import axios from "axios";
 import { useGlobalStore } from "../Store/GlobalValues";
 import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { BookmarkCheck, Check } from "lucide-react";
import Map from "../map/Map";
function ReportIssueFile() {
    const backendUrl = useGlobalStore((state) => state.backendUrl );
    const data = useGlobalStore((state) => state.data );
    const [values, setValues] = useState([]);
   const getData = async()=>{
    try{
        let res = await axios.get(backendUrl + "/api/admin/upload/getReportData" );
        if(res.data.success === true){
           setValues(res.data.data);
           console.log("Report data is ", res);
           return toast.success("Reports in detail");
        }
        else{
            return toast.error(res.data.message);
        }

    }
    catch(err){
      return  toast.error("Error in getting report data", err.message );

    }

  }

  useEffect(()=>{
    getData();
  },[])

  const solvedReport = async(id) =>{
      try{
     let res = await axios.post(backendUrl + `/api/admin/solvedReport/${id}`);
     if(res.data.success === true){
        return toast.success(res.data.message);
     }
     else {
        return toast.error(res.data.message);
     }
       
     }
     catch(err){
        return toast.error("Error had occurd", err.message);
     }
  }   
  const markReadReport = async(id) =>{
    try{
     let res = await axios.post(backendUrl + `/api/admin/markReadReport/${id}`);
     if(res.data.success === true){
        return toast.success(res.data.message);
     }
     else {
        return toast.error(res.data.message);
     }
       
     }
     catch(err){
        return toast.error("Error had occurd", err.message);
     }

  }

    return ( <>
    <div>
   {values.map((val, index) => (
  <div 
    key={index} 
    className="max-w-5xl mx-auto mb-12 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl transition-all hover:shadow-md"
  >
    <div className="flex flex-col md:flex-row items-stretch min-h-[300px]">
      
      {/* Text Content Section */}
      <div className="flex flex-col flex-1 p-8 md:w-1/2">
        <div className="mb-4">
          <h2 className="mt-1 text-2xl font-bold text-gray-900">
           Title:  {val.title}
          </h2>
        </div>
        
        <p className="flex-grow leading-relaxed text-gray-600 italic">
          <span className="font-semibold text-gray-800 not-italic">Description:</span> {val.description}
        </p>
       
       {
         (data && data.role === "admin")?(
            <div className="flex space-x-5 justify-center" >
            <button 
      onClick={()=>{
        solvedReport(val._id);
      }} 

      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-all active:scale-95"
    >
      <Check size={16} /> Accept
    </button>
      
        <button 
      onClick={()=>{
        markReadReport(val._id);
      }} 
      className="flex items-center active:scale-95 justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-600 py-2 px-4 rounded-lg font-medium transition-all"
    >
      <BookmarkCheck size={16} /> Mark Read
    </button>
      
         </div>

         ):(null)
       }

      </div>

      {/* Map Section */}
      <div className="relative w-full min-h-[250px] md:w-1/2 bg-gray-50 border-l border-gray-100">
        {!val?.latitude ? (
          <div className="flex items-center justify-center h-full text-gray-400 animate-pulse">
            <p className="text-sm font-medium">Loading map interactive...</p>
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <Map position={[val.latitude, val.longitude]} />
          </div>
        )}
      </div>

    </div>
  </div>
))}
    </div>       
     </> );
}

export default ReportIssueFile;