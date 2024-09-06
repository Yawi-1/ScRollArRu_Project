import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  { id: 1, imageUrl: '/guideCarouselImages/step.webp', step: '1. Download NextDot app from the Playstore.' },
  { id: 2, imageUrl: '/guideCarouselImages/step.webp', step: '2. Press Get Started button to proceed.' },
  { id: 3, imageUrl: '/guideCarouselImages/step.webp', step: '3. Login or Sign-up with your Google Account easily.' },
  { id: 4, imageUrl: '/guideCarouselImages/step.webp', step: '4. Press Proceed to start' },
  { id: 5, imageUrl: '/guideCarouselImages/step.webp', step: '5. Select the book you want to explore.' },
  { id: 6, imageUrl: '/guideCarouselImages/step.webp', step: "6. Tap Let's Start button on the welcome panel." },
  { id: 7, imageUrl: '/guideCarouselImages/step.webp', step: '7. Select Yes! Process with AR to continue.' },
  { id: 8, imageUrl: '/guideCarouselImages/step.webp', step: '8. Choose your preferred language.' },
  { id: 9, imageUrl: '/guideCarouselImages/step.webp', step: '9. Press Open AR to experience AR or Start for Quiz!' },
  { id: 10, imageUrl: '/guideCarouselImages/step.webp', step: '10. Start Scanning the book pages and enjoy!' },
];

export default function GuideCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  function setPreviousSlide() {
    setCurrentSlide(currentSlide === 0 ? 9 : currentSlide - 1);
  }

  function setNextSlide() {
    setCurrentSlide(currentSlide === 9 ? 0 : currentSlide + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [styles, setStyles] = useState({});
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        // md size
        setStyles({ left: '30%', top: '7%' });
      } else if (window.innerWidth >= 1024) {
        // lg size
        setStyles({ left: '42%', top: '7%' });
      } else {
        setStyles({});
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call handler right away so state gets updated with initial window size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div className='relative flex items-center bg-gray-100 dark:bg-neutral-800 my-10 border rounded-lg'>

        {/* ---------------------------------------------------- sm --------------------------------------- */}
        <div className='relative block md:hidden h-[38rem] w-full mx-auto py-5'>
          {/*--------------------- images  --------------------*/}
          <div className=' overflow-hidden w-8/12 mb-2 mx-auto'>
            <div className="flex transition-transform duration-5000 ease-in" style={{ transform: `translateX(-${currentSlide * 100}%)`, zIndex: '50' }}>
              {slides.map((slide) => (
                <div key={slide.id} className=" flex-shrink-0 w-full">
                  <img src={slide.imageUrl} alt={slide.caption} className="mx-auto object-contain h-72 my-2 border rounded-lg" />
                </div>
              ))}
            </div>
          </div>
          {/* --------------------------------------- circles ----------------------------------------- */}
          <div className='relative mx-auto w-3/4 h-8 border-black dark:border-white border-b-2'>
            {/*--------------- Button 1 --------------*/}
            <div
              className="absolute text-black text-xl font-medium w-14 h-14  bg-white rounded-full flex justify-center items-center border border-black  bg-green-100" onClick={setPreviousSlide} style={{ left: '-11%' }}>
              {currentSlide === 0 ? '10' : currentSlide}
            </div>
            {/*--------------- Button 2 ---------------*/}
            <div className="absolute text-black text-xl font-semibold w-14 h-14 bg-white rounded-full flex justify-center items-center border border-black bg-yellow-200 dark:bg-cyan-200" style={{ right: '38%'}}>
              {currentSlide + 1}
            </div>
            {/*--------------- Button 3 ---------------*/}
            <div className="absolute text-black text-xl font-medium w-14 h-14 bg-white rounded-full flex justify-center items-center border border-black bg-green-100" onClick={setNextSlide} style={{ right: '-11%' }}>
              {currentSlide === 9 ? '1' : currentSlide + 2}
            </div>
          </div>
          {/* ------------------------------------ Text ---------------------------------------- */}
          <div className='font-semibold text-2xl text-center  w-10/12 absolute' style={{ top: '71%', left: '8%' }}>
            {slides[currentSlide].step}
          </div>
          {/* ------------------------------------ Button ---------------------------------------- */}
          <div className="md:hidden absolute bottom-7 right-14 ">
            <Link to = "/nexDot">
            <button className='bg-blue-500 hover:scale-105 text-white px-4 py-2 rounded'>
              Know more about NexDot
            </button></Link>
          </div>

        </div>

        {/* ----------------------------------------------------- md and lg ----------------------------------------------- */}
        <div className="hidden md:block flex justify-center items-center w-full mx-auto ">

          {/* images  */}
          <div className='h-3/4 w-1/4 bg-white'>
            <div className='absolute overflow-hidden w-1/2  lg:w-1/3 ' style={{ left: '3%' }}>
              <div className="flex transition-transform duration-5000 ease-in" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide) => (
                  <div key={slide.id} className="md:w-full flex-shrink-0 ">
                    <img src={slide.imageUrl} alt={slide.caption} className=" md:h-96 object-contain border rounded-lg mx-auto mt-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='h-96 my-10'>
            {/* ------------------------- Circle -------------------------------- */}
            <div className={`relative w-80 h-80 border-r-2 rounded-full border-gray-900 dark:border-gray-200`}
              style={styles}>

              {/*--------------- Button 1 --------------*/}
              <div
                className="text-black text-xl font-medium absolute w-14 h-14 md:w-16 md:h-16 rounded-full flex justify-center items-center border border-black bg-green-100" style={{ top: '-7%', left: '47%' }} onClick={setPreviousSlide}>
                {currentSlide === 0 ? '10' : currentSlide}
              </div>
              {/*------------------ Button 2 ---------------*/}
              <div className="text-black text-xl font-semibold absolute w-14 h-14 md:w-16 md:h-16 rounded-full flex justify-center items-center border border-black bg-yellow-200" style={{ top: '38%', left: '88%' }}>
                {currentSlide + 1}
              </div>
              {/*------------------ Button 3 ---------------*/}
              <div className="text-black text-xl font-medium absolute w-14 h-14 md:w-16 md:h-16 rounded-full flex justify-center items-center border border-black bg-green-100" style={{ bottom: '-7%', right: '33%' }} onClick={setNextSlide}>
                {currentSlide === 9 ? '1' : currentSlide + 2}
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------------- Text ------------------------------ */}
        <div className='hidden md:block w-2/5 lg:w-4/5 relative text-3xl font-semibold mx-10 lg:mx-5' style={{ transition: "ease-in" }} >
          {slides[currentSlide].step}
        </div>
        {/* ------------------------------------ Button ---------------------------------------- */}
        <div className="hidden md:block bg-blue-500 hover:scale-95 text-white absolute bottom-12 right-14 lg:right-14 px-4 py-2 rounded">
          <Link to = '/nexDot'>
            Know more about NexDot
          </Link>
        </div>
      </div>
    </div >
  )
};