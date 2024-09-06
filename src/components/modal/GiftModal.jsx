// ---------------------------------- Modules ----------------------------------
import { useContext } from 'react';


// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';


// ---------------------------------- Gift Modal Component Code ----------------------------------
export default function Modal({index}){
    // ---------------------------------- Context Variables and Function ----------------------------------
    const context = useContext(myContext);
    const {showGiftModal, toggleGiftModal, cardIndex} = context.giftModalToggleData;  

    if (!showGiftModal || index != cardIndex) return null;

    return (
        <div onClick = {()=>{toggleGiftModal(-1)}} className="absolute inset-0 flex items-start z-50">
            <div className="bg-white dark:bg-neutral-700 shadow-lg rounded-lg mt-14 mr-12 w-1/3 max-w-60 p-3">
                
                {/* ---------------------------------- Modal Heading ---------------------------------- */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold dark:text-gray-200">User</h2>
                    <button onClick={()=>{toggleGiftModal(-1)}} className="text-gray-500 hover:text-gray-700">&#x2715;</button>
                </div>
                
                {/* ---------------------------------- User Details ---------------------------------- */}
                <div>
                    <img className="w-24 h-24 rounded-full mx-auto mt-4" src='https://via.placeholder.com/100'/>
                    <div className="text-sm mb-2 dark:text-gray-200 text-center mt-2">User Name</div>
                </div>

                <hr />

                {/* ---------------------------------- Login/Sign Up Buttons ---------------------------------- */}
                <div className = "flex flex-col">
                    
                </div>
                
            </div>
        </div>
    );
};