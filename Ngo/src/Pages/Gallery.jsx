import { useState, useEffect, useRef, useCallback } from "react";


//todo Gallery function 

import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const SEB_PRIMARY = '#1E3A8A';
const SEB_SECONDARY = '#F59E0B'; 

// Gallery Data
const galleryData = [
    { id: 1, url: "/gallery/ag1.jpg" },
    { id: 2, url: "/gallery/ag3.jpg" },
    { id: 3, url: "/gallery/ag5.jpg" },
    { id: 4, url: "/gallery/ag7.jpg" },
    { id: 5, url: "/gallery/ag9.jpg" },
    { id: 6, url: "/gallery/ag2.jpg" },
    { id: 7, url: "/gallery/ag4.jpg" },
    { id: 8, url: "/gallery/ag6.jpg" },
    { id: 9, url: "/gallery/ag8.jpg" },
    // { id: 10, url: "/gallery/ng8.jpg" },
    // { id: 11, url: "/images/gallery3.JPG" },
    // { id: 11, url: "/gallery/ng9.jpg" },
];

const ScrollStyles = () => (
    <style>
        {`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .gallery-card {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
            transform: scale(0.85);
            opacity: 0.6; 
            filter: blur(3px) grayscale(50%);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            position: relative;
            cursor: pointer;
            height: 250px; 
            width: 150px;
            transform-origin: center center;
        }

        .gallery-card.active {
            transform: scale(1.1);
            opacity: 1;
            filter: blur(0) grayscale(0%);
            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.2);
            z-index: 20;
            border: 4px solid ${SEB_SECONDARY};
        }
        
        .gallery-track {
            transform-style: preserve-3d;
        }
        `}
    </style>
);

const ImageCard = ({ image, isActive, index, onCardClick }) => {
    return (
        <div 
            onClick={() => onCardClick(index)}
            className={`gallery-card w-80 flex-shrink-0 mx-4 my-8 bg-white rounded-xl overflow-hidden ${isActive ? 'active' : ''}`}
            aria-label={`View image ${index + 1}`}
        >
            <div className="relative w-full h-full">
                <img 
                    src={image.url} 
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/cccccc/333333?text=Image+Unavailable`; }}
                />
                <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/10 transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0.9 }}
                ></div>
            </div>
        </div>
    );
};

const PaginationDots = ({ count, activeIndex, onDotClick }) => (
    <div className="flex justify-center items-center gap-3 mt-8">
        {Array.from({ length: count }).map((_, index) => (
            <button
                key={index}
                onClick={() => onDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? `w-6 bg-[${SEB_SECONDARY}]` : 'bg-gray-400 hover:bg-gray-500'}`}
                aria-label={`Go to slide ${index + 1}`}
            />
        ))}
    </div>
);


const Gallery = () => {
    const galleryRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const scrollToIndex = useCallback((index) => {
        const gallery = galleryRef.current;
        if (!gallery || !gallery.children[index]) return;
        const card = gallery.children[index];
        const galleryWidth = gallery.offsetWidth;
        const cardWidth = card.offsetWidth;
        const cardLeft = card.offsetLeft;
        const scrollLeft = cardLeft - (galleryWidth / 2) + (cardWidth / 2);
        gallery.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        setActiveIndex(index);
    }, []);

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % galleryData.length;
            scrollToIndex(nextIndex);
        }, 4000);
        return () => clearInterval(interval);
    }, [activeIndex, isPlaying, scrollToIndex]);
    
    const handleNavClick = (direction) => {
        setIsPlaying(false);
        const newIndex = (activeIndex + direction + galleryData.length) % galleryData.length;
        scrollToIndex(newIndex);
    };

    const handleCardOrDotClick = (index) => {
        setIsPlaying(false);
        scrollToIndex(index);
    };

    return (
        // CHANGED: Switched to a light background (bg-gray-100)
        <section id="gallery" className="py-24  overflow-hidden">
            <ScrollStyles />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                
                {/* NEW: Updated heading and text colors for the light background */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Moments That <span style={{ color: SEB_PRIMARY }}>Define Us</span>
                </h2>
                
                {/* NEW: Consolidated and improved subheading */}
                <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
📸 Witness the Impact: Service in Action and Spiritual Journeys captured tells a story of compassion, growth, and community transformation.                </p>

                <div className="relative flex justify-center items-center">
                    <button
                        onClick={() => handleNavClick(-1)}
                        className="absolute -left-0 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full shadow-2xl focus:outline-none transition duration-200 hover:scale-110 active:scale-90 hidden md:block"
                        style={{ color: 'white', backgroundColor: SEB_PRIMARY }}
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft size={30} />
                    </button>

                    <div 
                        ref={galleryRef}
                        className="flex items-center overflow-x-scroll hide-scrollbar gallery-track max-w-full md:max-w-6xl py-4"
                    >
                        {galleryData.map((image, index) => (
                            <ImageCard 
                                key={image.id} 
                                image={image} 
                                index={index}
                                isActive={index === activeIndex}
                                onCardClick={handleCardOrDotClick}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => handleNavClick(1)}
                        className="absolute -right-0 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full shadow-2xl focus:outline-none transition duration-200 hover:scale-110 active:scale-90 hidden md:block"
                        style={{ color: 'white', backgroundColor: SEB_PRIMARY }}
                        aria-label="Next Slide"
                    >
                        <ChevronRight size={30} />
                    </button>
                </div>
                
                
            </div>
        </section>
    );
};

export default Gallery;