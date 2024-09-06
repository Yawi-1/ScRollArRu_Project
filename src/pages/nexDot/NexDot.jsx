import { useEffect, useContext } from 'react';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import Layout from '../../components/layout/Layout';
// ------------------------ Assets ---------------------------
import { FaBookOpen, FaRegCircle } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
// ------------------------- Images ----------------------------
import nexDotLight from "/logo/nexDotLight.webp";
import nexDotDark from '/logo/nexDotDark.webp';
import logo from '/logo/logo.svg';
import cartoon from '/cartoon.webp';
import playstore from '/playstore.webp';
import scanner from '/scanner.webp';
import wonder from '/wondersBody.webp';
import jurassic from '/jurassic.webp';
import earth from '/earthBook.webp';
import dragon from '/dragon.webp';
import phoneImg from '/phone.webp';
import books from '/books.webp';

// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';

function NexDot() {
    // ---------------------------------- Context Data ----------------------------------
    const { mode } = useContext(myContext).modeData;

    useEffect(() => {
        AOS.init({ duration: 1200 }); // Initialize AOS with a duration of 1200ms
    }, []);
    
    return (
        <Layout>
            {/* NexDot Navbar */}
            <div className='flex flex-col md:flex-row mx-2 mb-5 justify-between'>
                <img src={mode === "dark" ? nexDotDark : nexDotLight} className='h-20 mx-auto md:mx-0' alt="NexDot Light" />
                <div className='flex flex-col md:flex-row items-center'>
                    <img src={cartoon} className='h-24 mx-auto md:mx-0' alt="Cartoon" />
                    <div className='text-center md:text-left'>
                        <h1 className='text-xl font-semibold flex justify-center md:justify-start'>
                            Scroll<img src={logo} className='h-6' alt="Logo"/>R4U Technologies Pvt. Ltd.<span className='text-blue-600 md:ml-2'>PRESENTS</span>
                        </h1>
                        <div className='border-2 rounded-lg bg-white/50 dark:bg-black/50'>
                            <div className='flex items-center justify-center'>
                                <img src={mode === "dark" ? nexDotDark : nexDotLight} className='h-6 md:h-10 m-1 md:border-r-2 dark:border-white border-black' alt="NexDot Light" />
                                <div className='m-1 border-r-2 dark:border-white border-black flex items-center'>
                                    <img src={playstore} className='h-7 md:h-10' alt="Playstore" />
                                    <span className='m-1'>GET it on playstore</span>
                                </div>
                                <img src={scanner} className='h-12 mr-1 my-1' alt="Scanner" />
                                <span>SCAN QR for App</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className='text-center mt-16 mx-auto w-11/12 md:w-9/12'>
                {/* Part 1 */}
                <div data-aos="fade-in" data-aos-duration="2000">
                    <h1 className='text-5xl font-bold mt-24 mb-4'>Experience the Magic of Learning!</h1>
                    <p className='text-lg font-medium leading-7'>
                        Have you ever imagined having dinosaurs, planets, and the human body right in your living room?
                        Your dream has come true! Simply take your phone, scan our books, and witness the magic as it
                        comes to life before you.
                    </p>
                    <div className='flex flex-col md:flex-row justify-between mt-5'>
                        <img src={wonder} className='w-8/12 md:w-1/4 mx-auto mb-5 md:mb-0 rounded-md' data-aos="fade-up" data-aos-delay="100" alt="Wonder" />
                        <img src={jurassic} className='w-8/12 md:w-1/4 mx-auto mb-5 md:mb-0 rounded-md' data-aos="fade-up" data-aos-delay="300" alt="Jurassic" />
                        <img src={earth} className='w-8/12 md:w-1/4 mx-auto rounded-md' data-aos="fade-up" data-aos-delay="500" alt="Earth" />
                    </div>
                </div>
                {/* Part 2 */}
                <div data-aos="fade-in" data-aos-duration="2000">
                    <h1 className='text-5xl font-bold mt-24 mb-4'>The Books that speak</h1>
                    <p className='text-lg font-medium leading-7'>
                        Imagine learning with 3D models, playing games, and even interacting with what you’re learning –
                        all right in front of you with the help of our 3D Books! This is the future of learning, and it’s here now!
                    </p>
                    <img src={dragon} data-aos="fade-up" data-aos-duration="2500" className='w-10/12 mx-auto' alt="Dragon" />
                </div>
                {/* Part 3 */}
                <div data-aos="fade-in" data-aos-duration="2000">
                    <h1 className='text-5xl font-bold mt-24 mb-4'>The Future of Learning is here!</h1>
                    <div className='flex flex-col md:flex-row justify-center'>
                        <img src={phoneImg} className='w-full md:w-1/2' data-aos="fade-up" data-aos-duration="2000" alt="Phone" />
                        <div className='text-lg font-medium my-auto text-left mx-10 md:mx-0'>
                            <h2 className='font-semibold text-3xl text-blue-500 my-5'>Learning Perks</h2>
                            <ul className='list-disc'>
                                <li>Multilingual app</li>
                                <li>Exciting games</li>
                                <li>Engaging storytelling</li>
                                <li>High-quality 3D models</li>
                                <li>Lifetime access</li>
                                <li>Informative content</li>
                                <li>High-quality graphics</li>
                                <li>Defining the way of learning</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Part 4 */}
                <div data-aos="fade-in" data-aos-duration="1000" className='mb-5'>
                    <h1 className='text-5xl font-bold mt-24 mb-4'>The Features of NexDot AR App:</h1>
                    <div className='flex flex-col md:flex-row'>
                        <ul className='text-lg flex flex-col items-center'>
                            <li className='flex items-center md:text-2xl text-xl font-medium text-blue-600'>
                                <FaBookOpen className='m-2' />Bring Textbooks to Life
                            </li>
                            <p className='text-center md:text-left'>Our AR app simplifies complex concepts with 3D models, animations, and interactive features.</p>
                            <li className='flex items-center md:text-2xl text-xl font-medium mt-5 text-blue-600'>
                                <IoGameController className='m-2' />Games that Make You Smarter</li>
                            <p className='text-center md:text-left'>Interactive games make learning engaging and enjoyable, testing knowledge for a fun and rewarding experience.</p>
                            <li className='flex items-center md:text-2xl text-xl font-medium mt-5 text-blue-600'><FaRegCircle className='m-2' />Step into the Lesson
                            </li>
                            <p className='text-center md:text-left'>Augmented Reality improves learning through interactive 3D models and virtual worlds, enhancing educational experiences with ScrollAR4U.</p>
                        </ul>
                        <img src={books} className='w-full md:w-1/2' data-aos="fade-up" data-aos-duration="2000" alt="Books" />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NexDot;
