import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../Store/GlobalValues";
import { toast } from "react-toastify";

function ResetPassword() {
    const navigate = useNavigate();
    const backendUrl = useGlobalStore((state)=> state.backendUrl)
    const [form , setForm] = useState({
        email: "",
        Otp: "",
        password: "",
        confirmPassword: "",
    })
    let getData = async(e)=>{
       const {name, value} = e.target;
       setForm((prev)=>{
         return {
            ...prev,
            [name]:value,
         }
       })
    }
    
    let submitData = async(e)=>{
        e.preventDefault();
        console.log(form);
        try{

            let res = await axios.post(backendUrl + "/api/auth/resetPassword", form );
            if(res.data.success === true){
                toast.success("password changed successfully");
                navigate("/login");
            }
            else{
                toast.error(res.data.message);
            }
        }
        catch(err){
            toast.error("something went wrong, try again !");
        }
        
    }
    let requestOtp = async()=>{
        let res = await axios.post(backendUrl + "/api/auth/resetPasswordOtp", {email: form.email});
        console.log(res.data);
        if(res.data.success === true ){
            toast.success(`Otp sent successfully on email ${form.email}`);
        }
        else{
            toast.error(res.data.message);
        }
    }


    return ( <>
       <div className="flex justify-center items-center min-h-[400px] bg-slate-50 p-4">
  <form 
    onSubmit={submitData} 
    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6"
  >
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>
      <p className="text-slate-500 text-sm mt-1">We'll send a code to your email</p>
    </div>

    {/* Email Section */}
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
        Email Address
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input 
            type="email" 
            name="email" 
            id="email" 
            required
            value={form.email} 
            onChange={getData} 
            placeholder="demo@gmail.com" 
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
          />
        </div>
        <button 
          type="button"
          onClick={requestOtp} 
          className="px-4 py-2.5 bg-orange-50 text-orange-600 font-semibold rounded-xl hover:bg-orange-100 transition-colors whitespace-nowrap text-sm border border-orange-100"
        >
          Send OTP
        </button>
      </div>
    </div>

    {/* OTP Section */}
    <div className="space-y-2">
      <label htmlFor="Otp" className="text-sm font-semibold text-slate-700 ml-1">
        Verification Code
      </label>
      <input 
        type="text" 
        name="Otp" 
        id="Otp" 
        required
        value={form.Otp} 
        onChange={getData} 
        placeholder="Enter 6-digit code" 
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all tracking-widest"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="Otp" className="text-sm font-semibold text-slate-700 ml-1">
        New Password
      </label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        required
        value={form.password} 
        onChange={getData} 
        placeholder="New Password" 
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all tracking-widest"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="Otp" className="text-sm font-semibold text-slate-700 ml-1">
        Confirm Password
      </label>
      <input 
        type="password" 
        name="confirmPassword" 
        id="confirmPassword" 
        required
        value={form.confirmPassword} 
        onChange={getData} 
        placeholder="Confirm Password" 
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all tracking-widest"
      />
    </div>

    {/* Submit Button */}
    <button 
      type="submit" 
      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
    >
      Reset Password
    </button>

    <p className="text-center text-xs text-slate-400">
      Didn't receive the code wait ? <button onClick={requestOtp} type="button" className="text-orange-600 hover:underline">Resend</button>
    </p>
  </form>
</div>
    </> );
}

export default ResetPassword;