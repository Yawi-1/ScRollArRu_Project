// ---------------------------------- Modules ----------------------------------
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";


// ---------------------------------- Components ----------------------------------
import Carousel from "../../components/carousel/Carousel"
import Layout from '../../components/layout/Layout';


// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, getDoc, collection } from 'firebase/firestore';


// ---------------------------------- MediaPost Component Code ----------------------------------
export default function MediaPost() {
    // ------------------------------- Database Connection ------------------------------------
    const mediaCollectionReference = collection(fireDB, "media");

    // ---------------------------------- States ----------------------------------
    const { mediaUid } = useParams();
    const [mediaData, setMediaData] = useState({
        title: "",
        description: "",
        year: "",
        mediaPic: []
      });

    function fetchMediaDetails() {
        const docRef = doc(mediaCollectionReference, mediaUid);
        getDoc(docRef).then((result) => {
            if (result.exists()) {
                setMediaData(result.data());
            } else {
                toast.error("No such data exists !!!");
            }
        }
        ).catch((err) => {
            toast.error(err);
        });
    }

    useEffect(fetchMediaDetails, []);

    return (
        <Layout>
            <div className="w-10/12 mx-auto my-4">
                <Carousel delay="3" slides={mediaData.mediaPic}></Carousel>
                <div className="font-bold text-3xl flex justify-between mx-8 ">
                    <div className="capitalize break-words w-2/3">{mediaData.title}</div>
                    <div>{mediaData.year}</div>
                </div>
                <div className="p-6 text-justify break-words">{mediaData.description}</div>
            </div>
        </Layout>
    )
}