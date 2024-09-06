// ---------------------------------- Modules ----------------------------------
import { useState, useEffect } from 'react';


// ---------------------------------- Carousel Component Code ----------------------------------
export default function Carousel({slides, delay}){
    // ---------------------------------- States ----------------------------------
    const [currentSlide, setCurrentSlide] = useState(0);


    // ---------------------------------- Use Effect to Change Slides ----------------------------------
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, delay * 1000);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="relative max-w-full mx-auto overflow-hidden">

        {/* ---------------------------------- Carousel Images ---------------------------------- */}
        <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                    <img src={slide} className="w-full h-64 sm:h-80 md:h-96 object-contain" />
                </div>
            ))}
        </div>
          
        {/* ---------------------------------- Carousel Dots ---------------------------------- */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {slides.map((slide, index) => (
                <button key={index} className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`} onClick={() => setCurrentSlide(index)}></button>
            ))}
        </div>

    </div>
  );
};