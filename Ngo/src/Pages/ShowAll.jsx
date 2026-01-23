import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "../api/api";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ShowAll = () => {
    let [data, setdata] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    let getdata = async () => {
        try {
            let res = await api.post("getImage");
            setdata(res.data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    useEffect(() => {
        console.log("data successfully fetched", data);
    }, [data])

    const openLightbox = (index) => {
        setSelectedImg(data[index]);
        setCurrentIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImg(null);
        setCurrentIndex(null);
    };

    const nextImage = useCallback(() => {
        const nextIdx = (currentIndex + 1) % data.length;
        setSelectedImg(data[nextIdx]);
        setCurrentIndex(nextIdx);
    }, [currentIndex, data]);

    const prevImage = useCallback(() => {
        const prevIdx = (currentIndex - 1 + data.length) % data.length;
        setSelectedImg(data[prevIdx]);
        setCurrentIndex(prevIdx);
    }, [currentIndex, data]);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            
            <header className="max-w-4xl mx-auto text-center mt-12 mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
                    Moments of <span className="text-blue-600">Change</span> Captured
                </h1>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic">
                    "Every photo tells a story of hope, resilience, and the beautiful lives 
                    transformed through our collective efforts."
                </p>
                <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
            </header>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {/* ... rest of the image mapping code provided previously ... */}
            </div>

            {/* ... Lightbox Code ... */}
        {/* </div> */}

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data && data.map((item, index) => (
                    <div 
                        style={{boxShadow:"2px 2px 20px RGB(173, 216, 230)"}}
                        key={index} 
                        className="group relative overflow-hidden rounded-xl bg-gray-200 cursor-pointer aspect-square shadow-md hover:shadow-xl transition-all duration-300"
                        onClick={() => openLightbox(index)}
                    >
                        <img 
                            src={item.url || item} 
                            alt={`Gallery item ${index}`}
                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="text-white font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-2">
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
                    >
                        <X size={30} />
                    </button>

                    <button 
                        onClick={prevImage}
                        className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-all"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <div className="max-w-3xl max-h-[60vh] flex flex-col items-center">
                        <img 
                            src={selectedImg.url || selectedImg} 
                            className="max-w-[97vh] max-h-[97vh] object-contain rounded-lg shadow-2xl"
                            alt="Full view"
                        />
                        {/* <p className="text-white mt-4 text-sm font-light">
                            Image {currentIndex + 1} of {data.length}
                        </p> */}
                    </div>

                    <button 
                        onClick={nextImage}
                        className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-all"
                    >
                        <ChevronRight size={48} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShowAll;