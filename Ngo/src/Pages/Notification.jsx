import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../Store/GlobalValues";
import { useEffect } from "react";

function Notification() {
const navigate = useNavigate();
const countReport = useGlobalStore((state) => state.countReport);
const countVol = useGlobalStore((state) => state.countVol);
const data = useGlobalStore((state) => state.data);
const adminNotification = useGlobalStore((state) => state.getNotificationAdmin);
const volunteerNotification = useGlobalStore((state) => state.getNotificationVolunteer);
   
  useEffect(()=>{
    if(data && data.role === "admin") {
      adminNotification();
    }
    else if (data && data.role === "volunteer"){
      volunteerNotification();
    }
  }, [])
   
    return ( <>
  {data && (data.role === "admin" || data.role === "volunteer") && (
  <div className="flex flex-col sm:flex-row gap-4 my-6">
    
    {/* Admin Specific: Volunteer Requests */}
    {data.role === "admin" && (
      <button
        onClick={() => navigate("/volunteerFile")}
        className="flex items-center justify-between px-6 py-4 bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
      >
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Volunteer Requests</span>
          <span className="text-2xl font-bold text-blue-600">{countVol}</span>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
      </button>
    )}

    {/* Both Admin and Volunteer: Reported Issues */}
    <button
      onClick={() => navigate("/reportIssueFile")}
      className="flex items-center justify-between px-6 py-4 bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md hover:border-red-300 transition-all group"
    >
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Issues Reported</span>
        <span className="text-2xl font-bold text-red-600">{countReport}</span>
      </div>
      <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    </button>
    
  </div>
)}
      

    </> );
}

export default Notification;