
import  { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Home, 
  LayoutGrid, 
  Image,  
   Heart, 
  Menu, 
  X,
  ArrowRight,
  Upload
} from 'lucide-react';

import { useGlobalStore } from './Store/GlobalValues';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);
  const loggedIn = useGlobalStore((state)=>state.loggedIn);
  const backendUrl = useGlobalStore((state)=>state.backendUrl);
  const setLoggedIn = useGlobalStore((state)=>state.setLoggedIn);
  const setVerified = useGlobalStore((state)=>state.setVerified);  
  const data = useGlobalStore((state)=>state.data);  
const menuItems = loggedIn
  ? ( data && data.role === "admin"? [
      { label: "Home", to: "/", icon: <Home size={18} /> },
      { label: "Gallery", to: "/showAll", icon: <Image size={18} /> },
      { label: "Donate Us", to: "/donate", icon: <Heart size={18} /> },
      { label: "Upload", to: "/upload", icon: <Upload size={18} /> },
      { label: "Logout", action: "logout", icon: <ArrowRight size={18} /> },
    ]:[
       { label: "Home", to: "/", icon: <Home size={18} /> },
      { label: "Programs", to: "/about", icon: <LayoutGrid size={18} /> },
      { label: "Gallery", to: "/showAll", icon: <Image size={18} /> },
      { label: "Donate Us", to: "/donate", icon: <Heart size={18} /> },
      { label: "Logout", action: "logout", icon: <ArrowRight size={18} /> },
    ])
  : ([
      { label: "Home", to: "/", icon: <Home size={18} /> },
      { label: "Programs", to: "/about", icon: <LayoutGrid size={18} /> },
      { label: "Gallery", to: "/showAll", icon: <Image size={18} /> },
      { label: "Donate Us", to: "/donate", icon: <Heart size={18} /> },
      { label: "Login", to: "/login", icon: <ArrowRight size={18} /> },
    ]);

  const handleLogout = async () => {
  try {
   let res = await axios.get(`${backendUrl}/api/auth/logout`);
   if(res.data.success === true){
     setLoggedIn(false);
     setVerified(false);
     navigate("/login");
     toast.success(res.data.message)
   }
   else{
     toast.error(res.data.message);
    return;
   }
  } catch (err) {
    console.error("Logout failed", err.message);
  }
};

  const Logo = () => (
    <div className="flex items-center pr-2 space-x-2">
      <div className="h-8 w-8 bg-orange-600 rounded flex items-center justify-center overflow-hidden">
        <img src="/dashboard/logo.png" alt="Logo" className="h-full w-full object-cover" />
      </div>
      <span className="text-xl font-bold text-slate-900">
        Adi<span className="text-orange-600">Yuvan</span>
      </span>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      {/* Desktop Navbar */}
      <div className="max-w-10xl mx-auto px-4 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16 items-center">
          <Logo />
          
          <div className="hidden md:flex space-x-8">
           {menuItems.map((item, index) =>
  item.action === "logout" ? (
    <button
      key={index}
      onClick={handleLogout}
      className="flex items-center space-x-2 text-slate-600 hover:text-orange-600"
    >
      {item.icon}
      <span>{item.label}</span>
    </button>
  ) : (
    <Link
      key={index}
      to={item.to}
      className="flex items-center space-x-2 text-slate-600 hover:text-orange-600"
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  )
)}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-slate-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-[60]`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-orange-600">Menu</span>
            <button onClick={toggleMenu}><X size={24} /></button>
          </div>
          <nav className="flex flex-col space-y-4">
          {menuItems.map((item, index) =>
  item.action === "logout" ? (
    <button
      key={index}
      onClick={handleLogout}
      className="flex items-center space-x-2 text-slate-600 hover:text-orange-600"
    >
      {item.icon}
      <span>{item.label}</span>
    </button>
  ) : (
    <Link
      key={index}
      to={item.to}
      className="flex items-center space-x-2 text-slate-600 hover:text-orange-600"
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  )
)}
          </nav>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-[50]" 
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
}