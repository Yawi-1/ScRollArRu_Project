// --------------------------------------- Modules ------------------------------------------------
import { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";


// ------------------------------------------------ Assets ------------------------------------------------
import { FaRegImage, FaTrash } from "react-icons/fa6";


// ------------------------------------------------ Components ------------------------------------------------
import DashLayout from "../DashLayout";
import Spinner from '../../components/loader/Spinner';

// ------------------------------------------------ Firebase ------------------------------------------------
import { fireDB } from "../../firebase/firebase";
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


// ----------------------------- Component code --------------------------------------
export default function AddMedia() {
  // ------------------------------- Database Connection ------------------------------------
  const mediaCollectionReference = collection(fireDB, "media");

  // ------------------------------------ States ------------------------------------------
  const [loading,setLoading] = useState(false);
  const { mediaUid } = useParams();
  const [mediaData, setMediaData] = useState({
    title: "",
    description: "",
    year: "",
    mediaPic: []
  })


  const InputRef = useRef();
  // ---------------------------------------------- Funtions -----------------------------------------
  function doUpdate(event) {
    let { name, value } = event.target;
    setMediaData({ ...mediaData, [name]: value });
  }

  function checkIfEmpty() {
    let { title, description, year, mediaPic } = mediaData;

    if (title != "" && description != "" && year != "" && mediaPic.length > 0) return true;
    else return false;
  }

  function doPicUpload(event) {
    const file = event.target.files[0];
    if (file != null) {
      const storageRef = ref(storage, `mediaImages/${new Date().getTime() + file.name}`);
        setLoading(true)
       uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((url) => {
          let imageArray = [...mediaData.mediaPic, url];
          setMediaData({ ...mediaData, ["mediaPic"]: imageArray });
          InputRef.current.value = null;
          setLoading(false);
        }).catch((err) => {
          toast.error(err);
          setLoading(false);
        });
      }).catch((err) => {
        toast.error(err);
      });
    }
  }

  function deleteImage(imageUrl) {
    const fileRef = ref(storage, imageUrl);
    deleteObject(fileRef).then(() => {
      const newImageArray = mediaData.mediaPic.filter((data) => { if (data != imageUrl) { return imageUrl } });
      setMediaData({ ...mediaData, ["mediaPic"]: newImageArray });
    }).catch((err) => {
      console.log(err);
    })
  }

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
     console.log(err)
    });
  }

  function saveMediaData() {
    if (checkIfEmpty()) {
      if (mediaUid == "noMedia") {
        addDoc(mediaCollectionReference, mediaData).then(() => {
          toast.success("Media added successfully !!!");
          setMediaData({ title: "", description: "", year: "", mediaPic: [] });
        }).catch((err) => {
          console.log(err);
        })
      } else {
        updateDoc(doc(mediaCollectionReference, mediaUid), mediaData).then(() => {
          toast.success("Media updated successfully !!!");
          setMediaData({ title: "", description: "", year: "", mediaPic: [] });
        }).catch((err) => {
          console.log(err);
        })
      }
    } else {
      toast.error("Please enter all the details properly !!!");
    }
  }

  useEffect(() => {
    if (mediaUid != "noMedia") {
      fetchMediaDetails();
    }
  }, []);

  // ------------------------------------------------ Component code ------------------------------------------------
  return (
    <DashLayout>
      <div className="text-white">
        <h1 className='font-bold text-3xl mt-2 ml-5'>Add Media</h1>
        <div className='flex justify-center my-auto'>
          <div className="w-full m-5 flex border border-gray-200 rounded p-2 ">
            <div className=" pb-1 w-5/12 mx-2">
              <div className="mt-5">

                {/* ------------------------------------------------ Media images upload box ------------------------------------------------ */}
                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="text-sm font-medium">Add media images</label>
                  <label htmlFor="mediaPic" className="relative cursor-pointer rounded-md font-semibold hover:text-blue-400">
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-200 px-6 py-16 h-full">
                      <div className="text-center">
                        <FaRegImage className="mx-auto h-12 w-12" />
                        <div className="mt-4 flex text-sm leading-6">
                          <span>Upload media image</span>
                          <input id="mediaPic" name="mediaPic" ref={InputRef} type="file" onChange={(event) => { doPicUpload(event) }} accept='image/*' className="sr-only" />
                        </div>
                        {loading && <Spinner/>}
                      </div>
                    </div>
                  </label>
                </div>

                {/* ------------------------------------------------ Uploaded images display ------------------------------------------------ */}
                <div className={`w-full p-3 ${mediaData.mediaPic.length == 0 ? "hidden" : "block"}`}>
                  <h2>Images Uploaded</h2>
                  {mediaData.mediaPic.map((imageUrl, index) =>
                    <div key={index} className="flex items-center justify-between p-2 border border-white m-2 rounded-md px-4">
                      <img src={imageUrl} className="w-24 h-16" />
                      <p>Image {index + 1}</p>
                      <FaTrash className='cursor-pointer' size={25} onClick={() => { deleteImage(imageUrl) }} />
                    </div>
                  )}
                </div>

              </div>
            </div>


            <div className="px-3 pb-12 w-1/2">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

                {/* ------------------------------------------------ Title text box ------------------------------------------------ */}
                <div className="col-span-3">
                  <label htmlFor="title" className=" text-sm font-medium">Title</label>
                  <input type="text" placeholder='Title'  name="title" id="title" onChange={doUpdate} value={mediaData.title} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600 mt-1" />
                </div>

                {/* ------------------------------------------------ Description text box ------------------------------------------------ */}
                <div className="col-span-full">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <textarea id="description" placeholder='Description' name="description" type="text" onChange={doUpdate} value={mediaData.description} className="mt-1 w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600" />
                </div>

                {/* ------------------------------------------------ Publish year text box ------------------------------------------------ */}
                <div className="col-span-2">
                  <label htmlFor="year" className="text-sm font-medium">Year</label>
                  <div className="mt-1">
                    <select id="year" name="year" onChange={doUpdate} value={mediaData.year} className="w-full p-2 rounded-md text-black placeholder:text-gray-400 focus:ring-blue-600">
                      <option value="" >Select</option>
                      {Array.from({ length: 5 }, (arrElement, index) =>
                        <option key={index} value={(new Date().getFullYear()) - index}>{(new Date().getFullYear()) - index}</option>
                      )}
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* ------------------------------------------------ Save button ------------------------------------------------ */}
            <div className="mt-16 w-1/12">
              <button type="button" onClick={saveMediaData} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Save</button>
            </div>

          </div>
        </div>
      </div>
    </DashLayout>
  )
}