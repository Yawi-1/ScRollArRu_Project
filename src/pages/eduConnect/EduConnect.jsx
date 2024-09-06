// ---------------------------------------------- Assets -----------------------------------------------
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import pic from "/catPic.webp";

function EduConnect() {
    const types = [
        { field: "Student", overview:"The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenl", description: "The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds fleown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky", position: "right" },
        { field: "School",  overview:"The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenl", description: "The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky", position: "left" },
        { field: "Retailer",  overview:"The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenl",  description: "The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky", position: "right" },
        { field: "Distributor", overview:"The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenl",  description: "The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky", position: "left" },
        { field: "Library",  overview:"The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenl",  description: "The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky", position: "right" },
        { field: "Corporate Buyer",  overview:"The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenl", description: "The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky.The quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue skyThe quick brown fox jumps over the lazy dog near the riverbank. Suddenly, a flock of birds flew overhead, creating a beautiful scene under the clear blue sky", position: "left" }
    ];

    return (
        <Layout>
            <div className="flex flex-col sm:mx-10 md:mx-2">
                <header className="p-6 text-center">
                    <h1 className="text-3xl font-bold">Edu-Connect</h1>
                    <p className="mt-4 pb-4 text-lg w-3/4 border-gray-500 dark:border-gray-200 border-b-2 mx-auto">Partner with us to sell our educational products</p>
                </header>

                <section className="px-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold leading-3">Why Partner with Us?</h2>
                        <p className="mt-4 pb-4 w-3/4 border-gray-500 dark:border-gray-200 border-b-2 mx-auto">Benefits of partnering with our company include...</p>
                    </div>

                    {/* Accordion Section */}
                    <div className='my-2'>
                        {types.map((type, index) => (
                            <div key={index} className='my-16 dark:bg-neutral-800/80 bg-gray-100/80 border-gray-200 dark:border-gray-500 border-2 rounded p-4'>
                                <h2 className='text-center text-3xl font-semibold p-2'>{type.field}</h2>
                                
                                {/* Large Screen Layout */}
                                <div className='hidden md:flex justify-between'>
                                    {type.position === "right" && (
                                        <>
                                            <div className='flex w-1/2'>
                                                <img src={pic} className='w-10/12 rounded mx-auto' alt="Placeholder" />
                                            </div>
                                            <div className='flex flex-col w-1/2 relative'>
                                                <div className='flex-grow'>
                                                    <p className='w-10/12'>{type.overview}</p>
                                                </div>
                                                <div className='absolute bottom-0 w-full'>
                                                    <Accordion>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                                                            <Typography>{type.field}</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            {type.description}
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {type.position === "left" && (
                                        <>
                                            <div className='flex flex-col w-1/2 relative'>
                                                <div className='flex-grow'>
                                                    <p className='w-10/12'>{type.overview}</p>
                                                </div>
                                                <div className='absolute bottom-0 w-full'>
                                                    <Accordion>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                                                            <Typography>{type.field}</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            {type.description}
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                            </div>
                                            <div className='flex w-1/2'>
                                                <img src={pic} className='w-10/12 rounded mx-auto' alt="Placeholder" />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Small Screen Layout */}
                                <div className='md:hidden flex flex-col'>
                                    <img src={pic} className='w-full rounded mx-auto mb-4' alt="Placeholder" />
                                    <p className='w-full mb-4'>{type.overview}</p>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                                            <Typography>{type.field}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {type.description}
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Last section */}
                    <div className="my-5 text-center ">
                        <h2 className="text-2xl font-semibold leading-3">Interested in Partnering?</h2>
                        <p className="mt-2">Click the link below to fill out our interest form:</p>
                        <Link to="/eduform" className="mx-auto text-blue-600 underline mt-2 inline-block">
                            <p className="text-xl font-bold">Edu-Connect Form</p>
                        </Link>
                    </div>
                </section>

                <footer className="text-center p-6">
                    <p>Privacy Policy | Terms of Service</p>
                    <p className="mt-2">Follow us on social media: [Social Media Links]</p>
                    <p className="mt-2">Contact us: contact@example.com</p>
                    <p className="mt-2">For support, contact us at: support@example.com</p>
                </footer>
            </div>
        </Layout>
    );
}

export default EduConnect;
