import { useState } from "react";
import axios from "axios";
import { useGlobalStore } from "../Store/GlobalValues";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Volunteer() {
   
    const [form , setForm] = useState({
        contactNo: "",
        reason: "",
        Otp: "",
    })
   
    const backendUrl = useGlobalStore((state) => state.backendUrl );
    const loggedIn = useGlobalStore((state) => state.loggedIn );
    const data = useGlobalStore((state) => state.data );
    const verified = useGlobalStore((state) => state.verified );
    const setVerified = useGlobalStore((state) => state.setVerified );
    const navigate = useNavigate();

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

            let res = await axios.post(backendUrl + "/api/admin/requestVolunteer", {reason: form.reason, contactNo: form.contactNo} );
               console.log("f0");
            if(res.data.success === true){
               console.log("f1");
                toast.success(res.data.message);
               console.log("f2");
                navigate("/login");
               console.log("f3");
            }
            else{
                toast.error(res.data.message);
                console.log("f4");
                return;
            }
        }
        catch(err){
            toast.error(`The request volunteer error is => ${err.message} `);
        }
        
    }
    let requestOtp = async()=>{
        if(!loggedIn){
            toast.error("login first to verify email");
            navigate("/login");
            return;
        }
        if(data && data.isAccountVerified == true ){
            toast.warning("You are already verified, please proceed further");
            return;
        }
        let res = await axios.get(backendUrl + "/api/auth/sendVerifyOtp", {email: form.email});
        console.log(res.data);
        if(res.data.success === true ){
            toast.success(`${res.data.message}`);
        }
        else{
            toast.error(res.data.message);
        }
    }
    let verifyEmail = async()=>{
        if(data && data.isAccountVerified == true ){
            toast.warning("You are already verified, please proceed further");
            return;
        }
        try{
        let res = await axios.post(backendUrl + "/api/auth/verifyEmail", { Otp: form.Otp});
        console.log(res.data);
        if(res.data.success === true ){
            toast.success(`You Email verified Successfully, Please proceed further`);
            setVerified(true);
        }
        else{
            toast.error(res.data.message);
        }
        }
        catch(err){
            toast.error("some error occured in verification try again");
        }      
    }


    return ( <>
        <div className="flex justify-center items-center min-h-[400px] bg-slate-50 p-4">
  <form 
    onSubmit={submitData} 
    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6"
  >
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800">Request Volunteer </h2>
   {(!verified ) &&  <p className="text-slate-500 text-sm mt-1">We'll send a email Verification code to your email</p>    }
     </div>
     {(!verified ) && 
       <div>
      <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
       Request Otp for Email Verification
      </label>
      <div className="flex gap-2 justify-center text-center">
        <button 
          type="button"
          onClick={requestOtp} 
          className=" w-[50%] active:bg-slate-700  px-4 py-2.5 bg-orange-50 text-orange-600 font-semibold rounded-xl hover:bg-orange-100 transition-colors whitespace-nowrap text-sm border border-orange-100"
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

         <button 
          type="button"
          onClick={verifyEmail} 
          className=" active:bg-slate-700  px-4 py-2.5 bg-orange-50 text-orange-600 font-semibold rounded-xl hover:bg-orange-100 transition-colors whitespace-nowrap text-sm border border-orange-100"
        >
          Verify Email
        </button>

   <hr />
   </div>
}
  
    <div className="space-y-2">
      <label htmlFor="Otp" className="text-sm font-semibold text-slate-700 ml-1">
        Contact Number: 
      </label>
      <input 

        type="tel"
        name="contactNo"
        pattern="[0-9]{10}"
        maxLength={10}
        placeholder="10-digit mobile number"
        required
        value={form.contactNo} 
        onChange={getData} 
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all tracking-widest"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="Otp" className="text-sm font-semibold text-slate-700 ml-1">
        Why you want to join us ? (Optional)
      </label>
      <textarea
        type="text" 
        name="reason" 
        id="reason" 
        value={form.reason} 
        onChange={getData} 
        placeholder="Reason of Service" 
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all tracking-widest"
      />
    </div>

    {/* Submit Button */}
    <button 
      type="submit" 
      disabled = {!verified }
      className={  `w-full ${ verified? " bg-slate-900 hover:bg-slate-800 active:bg-slate-700  ":"bg-white" }  text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98]`}
    >
      Request Volunteer
    </button>
  </form>
</div>

    </> );
}

export default Volunteer;