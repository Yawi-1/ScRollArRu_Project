// -------------------------------------- Modules --------------------------------------
import { useState, useEffect } from 'react'
import { toast } from "react-toastify";


// -------------------------------------- Components --------------------------------------
import DashLayout from '../DashLayout'
import MediaCard from './MediaCard';


// -------------------------------------- Firebase --------------------------------------
import { fireDB } from '../../firebase/firebase';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';


// -------------------------------------- Media Data Component Code --------------------------------------
export default function MediaData() {
    // -------------------------------------- Database Connection --------------------------------------
    const mediaCollectionReference = collection(fireDB, 'media');

    // -------------------------------------- States --------------------------------------
    const [mediaData, setMediaData] = useState([]);
    const [fetchedMedia, setFetchedMedia] = useState([]);
    const [sortBy, setSortBy] = useState("none");

    // -------------------------------------- Functions --------------------------------------
    function fetchMediaDetails() {
        getDocs(mediaCollectionReference).then((result) => {
            const dataRecieved = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMediaData(dataRecieved);
            setFetchedMedia(dataRecieved);
        }).catch((err) => {
            toast.error(err);
        });
    }

    function deleteMedia(mediaID) {
        deleteDoc(doc(mediaCollectionReference, mediaID)).then(() => {
            fetchMediaDetails();
            toast.success("Media deleted successfully !!!");
        }).catch((err) => {
            toast.error(err);
        })
    }

    function sortData() {
        let sortedData = [...mediaData];

        if (sortBy == "") {
            return null;
        } else if (sortBy == "year") {
            sortedData.sort((a, b) => {
                if (a.year > b.year) {
                    return 1;
                } else {
                    return -1;
                }
            })
        } else if (sortBy == "increasing") {
            sortedData.sort((a, b) => {
                if (a.title > b.title) {
                    return 1;
                } else {
                    return -1;
                }
            })
        } else if (sortBy == "decreasing") {
            sortedData.sort((a, b) => {
                if (a.title < b.title) {
                    return 1;
                } else {
                    return -1;
                }
            })
        }
        return sortedData;
    }

    useEffect(fetchMediaDetails, []);

    useEffect(() => {
        let sortedData = sortData();
        if (sortedData == null) {
            setMediaData(fetchedMedia);
        } else {
            setMediaData(sortedData)
        }
    }, [sortBy]);

    // -------------------------------------- Component Code --------------------------------------
    return (
        <DashLayout>
            <div className='px-10 py-4 text-white'>

                <div className='flex items-center justify-between border-b-2 border-white'>
                    <div className="text-3xl">Media</div>

                    <select name="productFilter" id="productFilter" onChange={(event) => { setSortBy(event.target.value) }} className='w-1/5 border-2 px-6 py-2 m-2 rounded-md bg-black/50'>
                        <option value="">Select</option>
                        <option value="year">Year</option>
                        <option value="increasing">A - Z</option>
                        <option value="decreasing">Z - A</option>
                    </select>
                </div>

                <div className='mt-10 rounded-lg'>
                    {mediaData.map((media, index) => (
                        <MediaCard key={index} media={media} deleteMedia={deleteMedia} />
                    ))}
                </div>

            </div>
        </DashLayout>
    )
}