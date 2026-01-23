import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"; 
import { useGlobalStore } from "../Store/GlobalValues";


function ReportIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    latitude: null,
    longitude: null,
    accuracy: null,
    locationTime: null,
    imageTime: null,
  });

  const [locationAllowed, setLocationAllowed] = useState(false);
  const backendUrl = useGlobalStore((state) => state.backendUrl )
  
  
  const getLocation = () => {
  console.log("check 1");

  if (!navigator.geolocation) {
    toast.error("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log("Location success:", pos);

      const { latitude, longitude, accuracy } = pos.coords;

      setForm((prev) => ({
        ...prev,
        latitude,
        longitude,
        accuracy,
        locationTime: pos.timestamp,
      }));

      setLocationAllowed(true);
    },
    (err) => {
      console.log("Geolocation error:", err);

      if (err.code === 1) toast.error("Permission denied");
      if (err.code === 2) toast.error("Location unavailable");
      if (err.code === 3) toast.error("Location request timed out");

      setLocationAllowed(false);
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000,
    }
  );
};

useEffect(()=>{
  getLocation();
},[] )


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
      imageTime: Date.now(),
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();
      console.log( "form data is ", form);
    if (!locationAllowed) {
      toast.error("Location access is required");
      return;
    }

    if (!form.image) {
      toast.error("Please capture an image");
      return;
    }

   const data = new FormData();
   const keys = Object.keys(form);
   console.log("keys is ", keys);
   keys.forEach((key)=>{
    data.append(key, form[key] );
   })
  
    try {
      console.log("c1");
      console.log(backendUrl + "/api/admin/upload/reportIssue");
          let res = await axios.post(backendUrl + "/api/admin/upload/reportIssue" , data )
          if(res.data.success == true ){
              toast.success("Report submitted successfully");
          }
          else{
            toast.error(res.data.message);
          }
      console.log(res);
    } catch (err) {
      toast.error("Error in submitting report");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit a Report</h2>
  
  <form onSubmit={submitData} className="flex flex-col gap-4">
    {/* Title Input */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Enter a brief title"
        value={form.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        required
      />
    </div>

    {/* Description Textarea */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea
        name="description"
        placeholder="Describe the problem in detail..."
        value={form.description}
        onChange={handleChange}
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
        required
      />
    </div>

    {/* File Input */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
        disabled={!locationAllowed}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        required
      />
      {!locationAllowed && (
        <p className="text-xs text-red-500 mt-1">Please enable location access to upload images.</p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={!locationAllowed}
      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed"
    >
      Submit Report
    </button>
  </form>
</div>
  );
}

export default ReportIssue;
