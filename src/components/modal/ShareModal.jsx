import React, { useState } from 'react'
import { FacebookIcon, TelegramIcon, LinkedinIcon, LinkedinShareButton, EmailIcon, WhatsappIcon, TwitterIcon, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton, } from 'react-share'
import { RxCross1 } from "react-icons/rx";
const ShareModal = ({ toggleShareModal }) => {
    const [copied, setCopied] = useState(false);
    const currentPageUrl = window.location.href;
    const copyUrl = () => {
        setCopied(true);
        navigator.clipboard.writeText(window.location.href);
    };
    
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='flex flex-col justify-center bg-black text-white flex-wrap gap-10 rounded-md md:w-1/3 w-[90%] py-8 relative'>
                <h1 className=' text-center text-xl mt-2'>Share a post:</h1>
                <span onClick={toggleShareModal} className='absolute top-4 right-4 cursor-pointer '><RxCross1 size={24} /></span>
                <div className='flex pl-4 justify-around items-center flex-wrap  mb-4 md:w-[80%] w-[60%] mx-auto gap-4'>
                    <FacebookShareButton
                        url={currentPageUrl}>
                        <FacebookIcon className='rounded-full hover:scale-105' size={48} />
                    </FacebookShareButton>
                    <TelegramShareButton
                        url={currentPageUrl}>
                        <TelegramIcon className='rounded-full hover:scale-105' size={48} />
                    </TelegramShareButton>
                    <TwitterShareButton
                        url={currentPageUrl}>
                        <TwitterIcon className='rounded-full hover:scale-105' size={48} />
                    </TwitterShareButton>
                    <WhatsappShareButton
                        url={currentPageUrl}>
                        <WhatsappIcon className='rounded-full hover:scale-105' size={48} />
                    </WhatsappShareButton>
                    <LinkedinShareButton
                        url={currentPageUrl}>
                        <LinkedinIcon className='rounded-full hover:scale-105' size={48} />
                    </LinkedinShareButton>
                    <EmailShareButton
                        url={currentPageUrl}>
                        <EmailIcon className='rounded-full hover:scale-105' size={48} />
                    </EmailShareButton>
                </div>
                <div className='w-[80%] mx-auto border  flex gap-2  items-center justify-between border-white rounded-full px-4 py-2 '>
                    <input type="text" value={currentPageUrl} className='text-xs border-none bg-black  w-[90%]' />
                    <span onClick={copyUrl} className='bg-blue-600 hover:bg-blue-500 px-4 py-2 cursor-pointer rounded-full'>Copy</span>
                </div>
            {
                copied && <span className=' text-center font-medium'>Text copied to clipboard</span>
            }
            </div>

        </div>
    )
}

export default ShareModal