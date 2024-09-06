// ---------------------------------- Modules ----------------------------------
import { Link } from 'react-router-dom';

// ---------------------------------- Assets ----------------------------------
import footerData from '../../assets/footerData';
import fullLogo from '/logo/full_logo.webp';
import fullLogoDark from '/logo/full_logo_dark.webp';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";


// ---------------------------------- Footer Component Code ----------------------------------
export default function Footer() {
  // ---------------------------------- Footer Links ----------------------------------
  const { aboutLinks, productLinks, contactInfo } = footerData;

  return (
    <footer className='dark:bg-neutral-800/80 bg-gray-100/80'>
      <div className='pt-16 pb-4 px-10 flex flex-col lg:flex-row justify-between'>

        {/* ---------------------------------- About Company ---------------------------------- */}
        <div className='w-full lg:w-1/3 mr-2 mb-6 lg:mb-0 text-justify'>
          <img src={fullLogo} alt="Company Logo" className='dark:hidden w-1/3 mb-4' />
          <img src={fullLogoDark} alt="Company Logo" className='hidden dark:block w-1/3 mb-4' />
          <p>We’re dedicated to revolutionizing education through innovative augmented reality solutions. Our mission is to make learning more engaging, enjoyable, and effective for students of all ages.</p>
        </div>

        <div className='lg:ml-5 flex flex-wrap w-full lg:w-2/3 justify-between'>
          {/* ---------------------------------- About Section ---------------------------------- */}
          <div className='sm:w-1/3 md:w-1/4 mt-6'>
            <h4 className="font-medium mb-2">About:</h4>
            <ul>
              {aboutLinks.map((about, index) => (
                <li key={index} className="mb-1 hover:text-blue-500"><Link to={about.link}>{about.field}</Link></li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------- Products Section ---------------------------------- */}
          <div className='sm:w-1/3 md:w-1/4 mt-6'>
            <h4 className="font-medium mb-2">Products:</h4>
            <ul>
              {productLinks.map((product, index) => (
                <li key={index} className="mb-1 hover:text-blue-500"><Link to={product.link}>{product.field}</Link></li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------- Contact Section ---------------------------------- */}
          <div className='sm:w-1/3 md:w-1/4 mt-6'>
            <h4 className="font-medium mb-2">Contact Info:</h4>
            <div className='flex flex-col'>
              {contactInfo.map((contact, index) => (
                <a href={contact.link} key={index} className="mb-1 hover:text-blue-500">{contact.data}</a>
              ))}
            </div>
          </div>

          {/* ---------------------------------- Company Address ---------------------------------- */}
          <div className='w-1/2 md:w-1/4 mt-6 mb-6'>
            <h4 className="font-medium mb-2">Address:</h4>
            <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.7637124140997!2d74.94915127549532!3d30.215290710456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391733b9cf7c0a1d%3A0xd7adeb68f0380d54!2sScrollAR4U%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1718782332662!5m2!1sen!2sin" loading="lazy" title="Company Location" />
          </div>

        </div>
      </div>

      {/* ---------------------------------- Connect Links ---------------------------------- */}
      <div className="flex justify-center space-x-4 m-2 pb-2 text-sm items-center border-b border-white w-1/2 mx-auto">
        <a target="_blank" href='https://www.facebook.com/profile.php?id=61556908565725'><FaFacebook className="mr-1 hover:text-blue-500" size={18} /></a>
        <a target="_blank" href='https://www.linkedin.com/company/scrollar/'><FaLinkedin className="hover:text-blue-500" size={18} /></a>
        <a target="_blank" href='https://www.instagram.com/scrollar4u'><FaInstagram className="hover:text-blue-500" size={18} /></a>
        <a target="_blank" href='https://www.youtube.com/@scrollar'><FaYoutube className="hover:text-blue-500" size={18} /></a>
        <a target="_blank" href='https://x.com/ScrollAR4U'><FaXTwitter className="hover:text-blue-500" size={18} /></a>
      </div>

      {/* ---------------------------------- Copyright Section ---------------------------------- */}
      <div className='flex justify-center mt-2 pb-3'>
        <p className='font-light text-sm text-center'>
          Copyright:&nbsp;&copy; 2024 ScrollAR4U Technologies. All Rights Reserved.
        </p>
      </div>
      
    </footer>
  )
}