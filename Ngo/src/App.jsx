import './App.css'
import AdiYuvanDashboard from './Pages/dashboard'
import Events from './Pages/Events'
import Navbar from './Navbar'
 import { Routes, Route } from 'react-router-dom'
 import Donate from './Pages/Donate'
import ShowAll from './Pages/ShowAll'
import Login from './Pages/Login'
import axios from 'axios'
import { useGlobalStore } from './Store/GlobalValues.js'
import ResetPassword from './Pages/ResetPassword.jsx'
import ReportIssue from './Pages/ReportIssue.jsx'
import ReportIssueFile from './Pages/ReportIssueFile.jsx'
import Volunteer from './Pages/Volunteer.jsx'
import VolunteerFile from './Pages/VolunteerFile.jsx'
import Notification from './Pages/Notification.jsx'
import { ToastContainer , toast } from 'react-toastify';
import Upload from './Pages/Upload.jsx'


axios.defaults.withCredentials = true;
 function App() {
     const loggedIn = useGlobalStore((state) => state.loggedIn);

    console.log( loggedIn);
   return (
     <>
        <div className='bg-slate-100' >
        <Navbar/>
      {/* <Notification/> */}
       <Routes>
        <Route path='/' element = { <AdiYuvanDashboard/> } />
        <Route path='/about' element = { <Events/> } />
        <Route path='/donate' element = { <Donate/> } />
        <Route path='/login' element = { <Login/> } />
        <Route path='/showAll' element = { <ShowAll/> } />
        <Route path='/resetPassword' element = { <ResetPassword/> } />
        <Route path='/volunteer' element = { <Volunteer/> } />
        <Route path='/reportIssue' element = { <ReportIssue/> } />
        <Route path='/volunteerFile' element = { <VolunteerFile/> } />
        <Route path='/reportIssueFile' element = { <ReportIssueFile/> } />
        <Route path='/notifications' element = { <Notification/> } />
        <Route path='/upload' element = { <Upload/> } />

      </Routes>

        <ToastContainer/>
        </div>
    

    </>
  )
}

export default App
