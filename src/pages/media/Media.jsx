// --------------------------------------- Modules required ------------------------------------------------
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";


// ---------------------------------- Components ----------------------------------
import Layout from '../../components/layout/Layout'
import MediaFilter from './MediaFilter'
import VerticalCardContainer from './VerticalCardContainer'


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { getDocs, collection } from 'firebase/firestore';


// ---------------------------------- Media Component Code ----------------------------------
export default function Media() {
    // ------------------------------- Database Connection ------------------------------------
    const mediaCollectionReference = collection(fireDB, "media");

    // ------------------------------- States ------------------------------------
    const [mediaData, setMediaData] = useState([]);

    // ---------------------------------- Functions ----------------------------------
    function fetchMedia() {
        getDocs(mediaCollectionReference).then((result) => {
            const dataRecieved = result.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setMediaData(dataRecieved);
        }).catch((err) => {
            toast.error(err);
        });
    }

    useEffect(fetchMedia, []);

    return (
        // ---------------------------------- Main Layout ----------------------------------
        <Layout>
            <div className="flex flex-col lg:flex-row">
                <MediaFilter mediaData = {mediaData}></MediaFilter>
                <VerticalCardContainer mediaData = {mediaData}></VerticalCardContainer>
            </div>
        </Layout>
    )
}