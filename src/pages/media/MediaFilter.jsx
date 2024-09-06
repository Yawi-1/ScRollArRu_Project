// ---------------------------------- Modules ----------------------------------
import { useContext, useEffect } from 'react'


// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';


// ---------------------------------- Media Filter Desktop Component Code ----------------------------------
export default function MediaFilter({ mediaData }) {
    // ---------------------------------- Filtering Out Distinct Years ----------------------------------
    const years = [...new Set(mediaData.map(events => events.year))].sort().reverse();


    // ---------------------------------- Context Data ----------------------------------
    const context = useContext(myContext);
    const { setEventYear } = context.eventYearData;

    return (
        <div className="lg:w-1/4">

            {/* ---------------------------------- Mobile View ---------------------------------- */}
            <div className="lg:hidden w-full flex flex-row justify-between">
                {years.map((year, index) => (
                    <div className="flex-grow border-2 border-gray-300 dark:border-gray-500 text-xl text-center py-2 px-2 bg-gray-200/80 dark:bg-neutral-900/80" onClick={() => setEventYear(year)} key={index}>{year}</div>
                ))}
            </div>

            {/* ---------------------------------- Desktop View ---------------------------------- */}
            <div className="hidden lg:block m-4">
                <div className="flex flex-col">
                    <h1 className="border-b-2 text-2xl font-bold text-center">Filter events by year</h1>
                    <div className="mt-4">
                        {years.map((year, index) => (
                            <div className="border-2 border-gray-300 dark:border-gray-500 m-2 text-xl text-center p-2 bg-gray-100/80 dark:bg-neutral-800/80 hover:bg-gray-300/80 dark:hover:bg-neutral-900/60" onClick={() => setEventYear(year)} key={index}>Event of {year}</div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}