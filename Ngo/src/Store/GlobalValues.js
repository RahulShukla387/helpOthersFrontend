import { create } from "zustand";
import axios from "axios";
import {toast} from "react-toastify"

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGlobalStore = create((set, get) => ({
  loggedIn: false,
  verified: false,
  data: null,
  countVol: 0,
  countReport: 0,

  setLoggedIn: (value) => {
    set({ loggedIn: value });

    if (value === true) {
      get().getUserData();
    }
  },

  setVerified: (value) => set({ verified: value }),
  setData: (value) => set({ data: value }),
  setCountVol: (value) => set({ countVol: value }),
  setCountReport: (value) => set({ countReport: value }),


  getUserData: async () => {
    console.log("calling get User data");
    try {
      const res = await axios.get(
        backendUrl + "/api/auth/getUserData"
      );
       console.log("getUserData is : ", res);
      if (res.data.success === true) {
        set({
          data: res.data.data,
          verified: res.data.data.isAccountVerified,
        });
      }
    } catch (err) {
      console.log("extract data error is ", err.message);
    }
  },

  getNotificationAdmin: async () =>{
    let res = await axios.get(backendUrl + "/api/admin/notificationCountAdmin");
    if(res.data.success === true){
      set({
        countReport: res.data.data.countReport,
        countVol: res.data.data.countVol,
      })
    }
    else {
      toast.error(res.data.message);
    }
  },
  getNotificationVolunteer: async () =>{
     let res = await axios.get(backendUrl + "/api/admin/notificationCountVolunteer");
     if(res.data.success === true){
      set({
        countReport: res.data.data.countReport,
      })
    }
    else {
      toast.error(res.data.message);
    }

  },

  backendUrl,
}));
