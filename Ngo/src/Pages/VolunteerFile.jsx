import axios from "axios";
import { useGlobalStore } from "../Store/GlobalValues";
import { Phone, FileText, Check, X, Eye, BookmarkCheck, User , Lock } from 'lucide-react';
import { useState, useEffect } from "react";
import {toast} from "react-toastify"

function VolunteerFile() {
     const backendUrl = useGlobalStore((state)=> state.backendUrl);
    //  console.log("volunteer data is =>", volunteerData);
    const [data, setData] = useState(null);
    const [haveData, setHaveData] = useState(false);
    const[volunteerData, setVolunteerData] = useState(null);
   
     const getVolunteerData = async()=>{
           try{
          let res = await axios.get(backendUrl + "/api/admin/getVolunteerData");
          console.log("getVolunteerData is =>", res);
           if(res.data.success === true){
            setVolunteerData(res.data.data);           
           }
      }
      catch(err){
        console.log("extract data error is ", err.message);
      }
     }
      
     useEffect(()=>{
      //  if(data && data.role ==="admin"){
        getVolunteerData();
      //  }
     }, [])
      
     const acceptRequest = async(volId, id)=>{
      try{
        let result = await axios.post(backendUrl + `/api/admin/acceptVolunteer/${id}`, {volunteerId: volId} )
        if(result.data.success == true ){
         toast.success("User is Promoted to Volunteer and email sent successfully");
        }    
        else {
          toast.error(result.data.message);
        }
        
      }
      catch(err){
         toast.error(err.message);
         return;
      }
     }

     const rejectRequest = async(volId, id)=>{

       try{
        let result = await axios.post(backendUrl + `/api/admin/rejectVolunteer/${id}`, {volunteerId: volId} )
        // console.log("reslut is =>",result);
        // console.log(volId, " -> ", id);
        if(result.data.success == true ){
         toast.success("User is rejected for Volunteer and email sent successfully");
        }    
        else {
          toast.error(result.data.message);
        }
        
      }
      catch(err){
         toast.error(err.message);
         return;
      }

     }
     const viewRequest = async(id)=>{
    
     try{
        let result = await axios.post(backendUrl + `/api/admin/viewVolunteer/${id}` )
        console.log("reslut is =>",result);
        console.log(id);
        if(result.data.success == true ){
          setData(result.data.data);
          setHaveData(true);
          return toast.success("view user detail") ;
        }    
        else {
          toast.error(result.data.message);
        }
        
      }
      catch(err){
         toast.error(err.message);
         return;
      }


     }
     const markReadRequest = async(volunteerId)=>{

       try{
        let result = await axios.post(backendUrl + `/api/admin/markReadVolunteer/${volunteerId}` )
        console.log("reslut is =>",result);
        console.log( " -> ", volunteerId);
        if(result.data.success == true ){
          return toast.success("user marked as read");
        }    
        else {
          toast.error(result.data.message);
        }
        
      }
      catch(err){
         toast.error(err.message);
         return;
      }


     }

    return ( <>  
        

         <div className="flex flex-wrap justify-evenly content-start   " >
     {
         (haveData)?(
           <div className="flex flex-col space-y-3 mb-6">
              <button className="text-3xl text-red-600 mr-2 " onClick={()=>{
                setHaveData(false);
              }} > X </button>
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-orange-50 rounded-lg">
        <User size={18} className="text-orange-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</p>
        <h1 className="text-lg font-bold text-slate-800">{data.name}</h1>
      </div>
    </div>

    <div className="flex items-start space-x-3 bg-slate-50 p-3 rounded-xl">
      <FileText size={18} className="text-slate-400 mt-1" />
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</p>
        <p className="text-slate-700 text-sm leading-relaxed">{data.email}</p>
      </div>
    </div>
    <div className="flex items-start space-x-3 bg-slate-50 p-3 rounded-xl">
      <Lock size={18} className="text-slate-400 mt-1" />
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Verified</p>
        <p className="text-slate-700 text-sm leading-relaxed">{data.isAccountVerified ? "user account is verified": "user account is not verified" } </p>
      </div>
    </div>
  </div>
            
         ):(
       (volunteerData && volunteerData.length>0)? (  
        

      volunteerData.map((data)=>{
    return <div
     key={data._id}
     className="max-w-md max-sm:justify-center max-sm:w-full sm:w-[40%]  m-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
  {/* Header & Details */}
  <div className="flex flex-col space-y-3 mb-6">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-orange-50 rounded-lg">
        <Phone size={18} className="text-orange-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact Number</p>
        <h1 className="text-lg font-bold text-slate-800">{data.contactNo}</h1>
      </div>
    </div>

    <div className="flex items-start space-x-3 bg-slate-50 p-3 rounded-xl">
      <FileText size={18} className="text-slate-400 mt-1" />
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reason</p>
        <p className="text-slate-700 text-sm leading-relaxed">{data.reason}</p>
      </div>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="grid grid-cols-2 gap-2">
    <button 
      onClick={()=>{
        acceptRequest(data._id, data.relatedId);
      }} 

      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-all active:scale-95"
    >
      <Check size={16} /> Accept
    </button>
    
    <button 
      onClick={()=>{
        rejectRequest(data._id, data.relatedId)

      }} 
      className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 px-4 rounded-lg font-medium transition-all active:scale-95"
    >
      <X size={16} /> Reject
    </button>

    <button 
      onClick={()=>{
        viewRequest(data.relatedId);
      }} 
      className="flex items-center justify-center gap-2 active:scale-95 border border-slate-200 hover:bg-slate-50 text-slate-600 py-2 px-4 rounded-lg font-medium transition-all"
    >
      <Eye size={16} /> View
    </button>

    <button 
      onClick={()=>{
        markReadRequest(data._id);
      }} 
      className="flex items-center active:scale-95 justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-600 py-2 px-4 rounded-lg font-medium transition-all"
    >
      <BookmarkCheck size={16} /> Mark Read
    </button>
  </div>
</div>

        })): null

      )

    }
     
    </div>

    </> );
}

export default VolunteerFile;