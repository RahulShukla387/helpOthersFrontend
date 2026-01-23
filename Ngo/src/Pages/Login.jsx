import { toast } from "react-toastify";
 import { useState } from "react";
 import { Lock, Mail, User } from "lucide-react";
import axios from "axios";
import { useGlobalStore } from "../Store/GlobalValues";
import { useNavigate } from "react-router-dom";
function Login() {
      const [state, setState] = useState("SignUp");
      const [form , setForm] = useState({
        name: "",
        email: "",
        password: "",
      })
      const navigate = useNavigate();
      const setLoggedIn = useGlobalStore((state)=> state.setLoggedIn );
      const backendUrl = useGlobalStore((state)=> state.backendUrl );
      let changeData = async(e)=>{
        const {name, value} = e.target;
         setForm((prev) =>{
            return {
                ...prev,
                [name]: value,
            }
         })
      }
      let submitData = async(e)=>{
        e.preventDefault();
        console.log(form);
        axios.defaults.withCredentials = true;
        if(state === "Login"){
         await submitLoginData()
          console.log( "login triggered" );
        }
        else {
         await submitRegisterData()
          console.log( "register triggered" );
        }
      }
     
      let submitLoginData = async()=>{
 try{
  
        const result = await axios.post(backendUrl + "/api/auth/login", form);
        console.log(result);
        if(result.data.success === true){
           setLoggedIn(true);
           setState("Login");
           setForm({
             name: "",
             email: "",
             password: "",
           })
           toast.success(result.data.message);
           navigate("/");
        }
        else{
           toast.error(result.data.message);
           return;
        }

        }
        catch(err){
          console.log("Login error ", err);
        }
        
      }
      let submitRegisterData = async()=>{
        try{
  
        const result = await axios.post(backendUrl + "/api/auth/register", form);
        console.log(result);
        if(result.data.success === true){
           setLoggedIn(true);
           setState("Login");
           setForm({
             name: "",
             email: "",
             password: "",
           })
           toast.success(result.data.message);
           navigate("/");

        }
        else{
           toast.error(result.data.message);
        }

        }
        catch(err){
          console.log("register error ", err);
        }
       
      }

      let googleLogin = async()=>{
       
      }
    return ( <>
{(state == "SignUp")?(
  <div className="flex justify-center items-center min-h-screen bg-slate-50 px-4">
  <form onSubmit={submitData} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-5">
    <div className="text-center mb-2">
      <h1 className="text-2xl font-bold text-slate-800">Register</h1>
      <p className="text-slate-500 text-sm">Join our community </p>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-semibold text-slate-700">Full Name</label>
      <div className="relative flex items-center">
        <User className="absolute left-3 text-slate-400" size={20} />
        <input 
          type="text" name="name" placeholder="Enter your name" required
          value={form.name} onChange={changeData}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
        />
      </div>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-semibold text-slate-700">Email Address</label>
      <div className="relative flex items-center">
        <Mail className="absolute left-3 text-slate-400" size={20} />
        <input 
          type="email" name="email" placeholder="email@example.com"  required
          value={form.email} onChange={changeData}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
        />
      </div>
    </div>
    
    <div className="space-y-1">
      <label className="text-sm font-semibold text-slate-700">Password</label> 
      <div className="relative flex items-center">
        <Lock className="absolute left-3 text-slate-400" size={20} />
        <input 
          type="password" name="password" placeholder="••••••••"  required
          value={form.password} onChange={changeData}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
        />
      </div>
    </div>

    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-md shadow-orange-100 transition-all active:scale-[0.98]">
      Register
    </button>
 

    <div className="flex items-center gap-4 text-slate-400 text-xs font-medium uppercase">
      <div className="h-[1px] flex-1 bg-slate-200"></div>
      OR
      <div className="h-[1px] flex-1 bg-slate-200"></div>
    </div>

    {/* Google Button */}
    <button 
      type="button" 
      onClick={googleLogin} 
      className="w-full flex items-center justify-center gap-3 border border-slate-200 py-2.5 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-all active:scale-[0.98]"
    >
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
      Sign in with Google
    </button>
  <div className="flex items-center gap-2 text-sm text-gray-600">
  <p>Already have an account?</p>

  <button
    onClick={() => setState("Login")}
    className="
      font-medium text-blue-600
      hover:text-blue-800
      transition-colors duration-200
      underline underline-offset-4
    "
  >
    Login now
  </button>
</div>

  </form>
  

</div>

): (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 px-4">
  <form onSubmit={submitData} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-5">
    <div className="text-center mb-2">
      <h1 className="text-2xl font-bold text-slate-800">Login</h1>
      <p className="text-slate-500 text-sm">Join our community </p>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-semibold text-slate-700">Email Address</label>
      <div className="relative flex items-center">
        <Mail className="absolute left-3 text-slate-400" size={20} />
        <input 
          type="email" name="email" placeholder="email@example.com"  required
          value={form.email} onChange={changeData}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
        />
      </div>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-semibold text-slate-700">Password</label>
      <div className="relative flex items-center">
        <Lock className="absolute left-3 text-slate-400" size={20} />
        <input 
          type="password" name="password" placeholder="••••••••"  required
          value={form.password} onChange={changeData}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
        />
      </div>
    </div>

    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-md shadow-orange-100 transition-all active:scale-[0.98]">
      Login
    </button>

    <div className="flex items-center gap-4 text-slate-400 text-xs font-medium uppercase">
      <div className="h-[1px] flex-1 bg-slate-200"></div>
      OR
      <div className="h-[1px] flex-1 bg-slate-200"></div>
    </div>

    {/* Google Button */}
    <button 
      type="button" 
      onClick={googleLogin} 
      className="w-full flex items-center justify-center gap-3 border border-slate-200 py-2.5 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-all active:scale-[0.98]"
    >
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
      Sign in with Google
    </button>
     <div className="mt-6 space-y-4 text-sm">
  {/* Forget Password Section */}
  <div className="flex items-center justify-center gap-2">
    <p className="text-gray-600">Forgot Password?</p>
    <button 
      onClick={() => navigate("/resetPassword")} 
      className="font-semibold text-blue-600 hover:text-blue-800 transition-colors underline-offset-4 hover:underline"
    >
      Reset Password
    </button>
  </div>

  {/* Sign Up Section */}
  <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-100">
    <p className="text-gray-600">Don't have an account?</p>
    <button 
      onClick={() => setState("SignUp")} 
      className="font-semibold text-blue-600 hover:text-blue-800 transition-colors underline-offset-4 hover:underline"
    >
      Register now!
    </button>
  </div>
</div>
  </form>
</div>
)   } 
   
    

    </> );
}

export default Login;