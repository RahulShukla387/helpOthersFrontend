import { useGoogleLogin } from "@react-oauth/google";
import { useGlobalStore } from "../Store/GlobalValues";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

 function useGoogleAuth() {
  const backendUrl = useGlobalStore((state)=>state.backendUrl);
  const setLoggedIn = useGlobalStore((state) => state.setLoggedIn);
  const getUserData = useGlobalStore((s) => s.getUserData);
  const navigate = useNavigate();
  
  const responseGoogle = async (authResult)=>{
    try{
      console.log(" Auth Result is => ", authResult);
      if(authResult.code){
        const res = await axios.post(backendUrl + '/api/auth/google/login', {code: authResult.code});
        console.log(res);
        if(res.data.success === true ){
          const {email, name} = res.data.user;
         await setLoggedIn(true);
        //  await getUserData();
          navigate("/");
          toast.success(res.data.message);
        }
      }
    }
    catch(err){
      console.log("error in authResult", err);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return googleLogin;
}
export {useGoogleAuth};