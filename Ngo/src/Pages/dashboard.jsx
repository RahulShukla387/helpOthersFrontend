
import React, { useEffect,} from 'react';
import Dashboard2 from './Dashboard2';
import Gallery from './Gallery';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../Store/GlobalValues';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Sun, 
  Leaf, 
  Bell, 
  Search,
  CalendarCheck,
} from 'lucide-react';

//taking mock data
const STATS = [
  { 
   img:  "/dashboard/prasad.png",
  },
  { 
   img:  "/dashboard/medical.jpg",
  },
  { 
   img:  "/dashboard/vastra.png",
  },
  { 
   img:  "/dashboard/Youth.png",
  },
];

const UPCOMING_SEVA = [
  { id: 1, title: "Forest Village Food Drive", type: "Seva", date: "Oct 24", time: "10:00 AM", status: "Confirmed" },
  { id: 2, title: "Morning Meditation & Gita", type: "Spiritual", date: "Oct 25", time: "06:00 AM", status: "Online" },
  { id: 3, title: "Winter Blanket Drive", type: "Seva", date: "Oct 28", time: "09:00 AM", status: "Planning" },
  { id: 4, title: "Yuvan Mentorship Circle", type: "Empower", date: "Nov 01", time: "02:00 PM", status: "Confirmed" },
];


const StatCard = ({img }) => (
  <div className=" m-0.5 h-60 w-50 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <img className='h-50 w-50' src={img} alt="AdiYuvan" />
  </div>
);


export default  function AdiYuvanDashboard() {

   const loggedIn = useGlobalStore((state) =>state.loggedIn);
   const data = useGlobalStore((state) =>state.data);
   const countVol = useGlobalStore((state) =>state.countVol);
   const countReport = useGlobalStore((state) =>state.countReport);
   const getUserData = useGlobalStore((s)=> s.getUserData);
  const navigate = useNavigate();

  const adminNotification = useGlobalStore((state) => state.getNotificationAdmin);
const volunteerNotification = useGlobalStore((state) => state.getNotificationVolunteer);
   
  useEffect(()=>{
    if( data && data.role === "admin") {
      adminNotification();
    }
    else if ( data && data.role === "volunteer"){
      volunteerNotification();
    }
  }, [])

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800">

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <header className="  h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-around px-8 sticky top-0 z-10">
        <div className="flex items-center justify-around text-slate-400 bg-slate-100 px-4 rounded-lg w-[100%]" >
          <div className="flex items-center text-slate-400 bg-slate-100 px-4 rounded-lg w-96">
            <Search size={18}  />
            <input 
              type="text" 
              placeholder="Search donor, village, or service..." 
              className="ml-3 outline-none text-slate-600 placeholder:text-slate-400 bg-transparent w-full text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Notification  */}
            
        {data && (data.role === "admin" || data.role === "volunteer") && (
  <button 
    onClick={() => navigate("/notifications")} 
    className="group relative p-3 text-gray-500 hover:text-orange-700 hover:bg-orange-50 rounded-full transition-all duration-300"
    aria-label="View notifications"
  >
    {/* The Bell Icon */}
    <Bell 
      size={24} 
      className="group-hover:rotate-12 transition-transform duration-300" 
    />

    {/* The Notification Badge */}
    {(countReport + countVol > 0) && (
      <span className="absolute top-1.5 right-1.5 flex h-5 w-5">
        {/* Animated Ping Effect */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        
        {/* Actual Number Badge */}
        <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-red-600 text-[10px] font-bold text-white shadow-sm">
          {countReport + countVol > 9 ? '9+' : countReport + countVol}
        </span>
      </span>
    )}
  </button>
)}
          
<Link
  to="/donate"
  className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
>
  + New Donation
</Link>
          </div>
        </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">

                  {/* Volunteer and Issue Section */}

    <div className="my-8 px-6 py-10 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm text-center">
  {/* Welcome Header */}
  <div className="mb-4">
    <h1 className="text-2xl font-light text-slate-600 tracking-tight">
      Welcome, 
      <span className="block sm:inline text-3xl md:text-4xl font-black text-red-500 ml-2 drop-shadow-sm">
        {(loggedIn && data) ? data.name : "User"}!
      </span>
    </h1>
    <h3 className="mt-4 text-lg font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
      Help us by reporting areas where support is needed and make a difference today.
    </h3>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mt-8">
    <button
      // onClick={() => navigate("/volunteer")}
       onClick={() =>{
        if(loggedIn){
          navigate("/volunteer");
        }
        else {
          toast.warn("Loggin first then try");
          navigate("/login");
         
        }
      }}
      className="group flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 hover:-translate-y-1 transition-all duration-200"
    >
      <span>Request for Volunteer </span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>

    <button
      // onClick={() => navigate("/reportIssue")}
      onClick={() =>{
        if(loggedIn){
          navigate("/reportIssue");
        }
        else{
          toast.warn("Loggin first then try");
          navigate("/login");
          
        }
      }}
      className="group flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm transition-all duration-200"
    >
      <span>Report an Issue Around You</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  </div>
</div>
            
            {/* Welcome Section */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">ADI-YUVAAN FOUNDATION</h1>
                <p className="text-slate-500 mt-1">आशाओं की उड़ान, उम्मीदों की पहचान</p>
              </div>
               
              <div className="text-right hidden sm:block">
                <p className=" blur-[3px]  text-sm font-bold text-slate-700">October 24, 2023</p>
                <p className=" blur-[2px] text-xs text-orange-600 font-medium">Spiritual Calendar: Day 12</p>
              </div>
            </div>

          <div className="grid  grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8  px-2 sm:px-0" >
  {STATS.map((stat, index) => (
    <StatCard key={index} {...stat} />
  ))}
</div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-6">
             
       
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center">
                      <CalendarCheck className="mr-2 text-orange-500" size={20}/> 
                      Upcoming Seva & Sessions
                    </h2>
                    <button className="text-sm text-slate-400 hover:text-slate-600">View All</button>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-xs uppercase text-slate-400 font-semibold">
                      <tr>
                        <th className="px-6 py-4">Event</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Date/Time</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className=" blur-[2px] divide-y divide-slate-50">
                      {UPCOMING_SEVA.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-700">{item.title}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                              item.type === 'Spiritual' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                              item.type === 'Seva' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              'bg-purple-50 text-purple-600 border-purple-100'
                            }`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">
                            {item.date} • <span className="text-slate-400">{item.time}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-xs font-bold text-slate-600">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                              {item.status}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Resource Allocation Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-white p-6 rounded-2xl border border-slate-100">
                      <h3 className="font-bold text-slate-800 mb-4">Relief Fund Allocation</h3>
                      <div className="flex items-end space-x-2 h-32">
                        <div className="w-1/3 bg-emerald-100 rounded-t-lg h-[60%] relative group">
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Food</div>
                        </div>
                        <div className="w-1/3 bg-blue-100 rounded-t-lg h-[40%] relative group">
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Clothes</div>
                        </div>
                        <div className="w-1/3 bg-orange-100 rounded-t-lg h-[80%] relative group">
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Education</div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>Food</span>
                        <span>Clothes</span>
                        <span>Education</span>
                      </div>
                   </div>

                   <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                           <Leaf className="text-emerald-400" />
                           <span className="bg-white/10 text-xs px-2 py-1 rounded">Daily Goal</span>
                        </div>
                        <h3 className="mt-4 text-2xl font-bold">108 Households</h3>
                        <p className="text-slate-400 text-sm">Target for winter clothes distribution today.</p>
                      </div>
                      <div className="w-full bg-slate-700 h-1.5 rounded-full mt-4">
                         <div className="bg-emerald-400 h-1.5 rounded-full w-[65%]"></div>
                      </div>
                   </div>
                </div>

              </div>

              {/* Right Column: Empowerment & Activity */}
              <div className="space-y-6">
                
                {/* Spiritual Quote Card */}
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-200 rounded-full opacity-50 blur-xl"></div>
                  <Sun className="text-orange-500 mb-3" />
                  <h3 className="text-lg font-bold text-orange-900">"Empower the Spirit"</h3>
                  <p className="text-orange-800/80 text-sm mt-2 leading-relaxed italic">
                    "True service is not just feeding the hunger of the stomach, but also the hunger of the soul."
                  </p>
                  <button className="mt-4 w-full py-2 bg-white text-orange-600 text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition-all">
                    Schedule Meditation
                  </button>
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4">Live Updates</h3>
                  <div className="space-y-6 border-l-2 border-slate-100 ml-2 pl-6">
                    
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-white bg-blue-500 ring-1 ring-slate-100"></div>
                      <p className="text-sm font-medium text-slate-800">New Donation Received</p>
                      <p className="text-xs text-slate-500 mt-0.5">₹5,000 from Ravi Kumar for Food Drive.</p>
                      <span className="text-[10px] text-slate-400">10 mins ago</span>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-white bg-orange-500 ring-1 ring-slate-100"></div>
                      <p className="text-sm font-medium text-slate-800">Geeta Session Started</p>
                      <p className="text-xs text-slate-500 mt-0.5">Batch B • 24 Attendees</p>
                      <span className="text-[10px] text-slate-400">45 mins ago</span>
                    </div>

                    <div className="relative">
                       <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 ring-1 ring-slate-100"></div>
                      <p className="text-sm font-medium text-slate-800">Chance for Seva</p>
                      <p className="text-xs text-slate-500 mt-0.5"> find needy </p>
                      <span className="text-[10px] text-slate-400"> update us </span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
            <Gallery/>
            <Dashboard2/>
          </div>
        </main>
      </div>
    </div>

  );
}