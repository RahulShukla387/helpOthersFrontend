import { useState, useEffect } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.success("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("UPLOAD SUCCESS:", res.data);
      setMessage("Upload successful!");
      setFile(null);
      setTimeout(()=>{
        setMessage("");
      },2000)

    } catch (err) {
      console.log("FULL ERROR:", err);
  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  setMessage(err.response?.data?.error || "Upload failed!");
      setTimeout(()=>{
        setMessage("");
      },2000)
    }
  };

  return (
   <div className="container mx-auto px-4 py-12 flex flex-col items-center">
  <form onSubmit={handleSubmit} className="w-full max-w-md">
    <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-slate-200 shadow-sm hover:border-blue-400 transition-colors group">
      <div className="flex flex-col items-center justify-center space-y-4">
        
        <input
          type="file"
          id="image"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        
        <label 
          htmlFor="image" 
          className="cursor-pointer flex flex-col items-center justify-center w-full py-10 rounded-2xl bg-slate-50 group-hover:bg-blue-50 transition-colors"
        >
          <div className="p-4 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {file ? file.name : "Click Here to Upload"}
          </p>
          <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
        </label>

        <button 
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:bg-slate-300" 
          type="submit"
          disabled={!file}
        >
          Upload
        </button>
      </div>
    </div>
  </form>

  {message && (
    <p className={`mt-6 px-4 py-2 rounded-full text-sm font-medium ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {message}
    </p>
  )}
</div>
  );
}

export default Upload;
