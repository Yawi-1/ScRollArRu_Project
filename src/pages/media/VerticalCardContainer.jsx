// ---------------------------------- Modules ----------------------------------
import { useContext } from 'react'


// ---------------------------------- Components ----------------------------------
import VerticalCard from '../../components/verticalCard/VerticalCard'


// ---------------------------------- Context ----------------------------------
import myContext from '../../context/data/myContext';


// ---------------------------------- Vertical Card Container Component Code ----------------------------------
export default function VerticalCardContainer({mediaData}) {
    // ---------------------------------- Context Data ----------------------------------
    const context = useContext(myContext);
    const {mediaYear} = context.eventYearData;

    const events = mediaData.filter(events => events.year == mediaYear)

    return (
        <div className = "w-full lg:w-3/4 flex flex-col lg:m-4">
            <h1 className = "border-b-2 text-2xl text-center font-bold">Events of {mediaYear}</h1>
            <div className = "flex flex-wrap flex-row w-full">
                {events.map((event, index) => (
                    <VerticalCard key = {index} event = {event}></VerticalCard>
                ))}
            </div>
        </div>
    )
}