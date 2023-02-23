import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiCake } from "react-icons/hi";
import { getAllItems } from "../utils/firebaseFunctions";
import { MdCloudUpload, MdDelete, MdAttachMoney } from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { categories } from "../utils/categories";
import Loader from "./Loader";
import { storage } from "../firebase.config";
import { saveItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [weight, setWeight] = useState("");
  const [feilds, setFeilds] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [{items},dispatch]=useStateValue();
  const uploadImage = (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFeilds(true);
        setMsg("Error while uploading. Try again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFeilds(false);
          setLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageAsset(downloadUrl);
          setLoading(false);
          setFeilds(true);
          setMsg("Upload Success");
          setTimeout(() => {
            setFeilds(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    setLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setLoading(false);
      setMsg("Image Deleted");
    });
  };
  const saveDetails = () => {
    setLoading(true);
    try {
      if (!title || !price || !imageAsset || !categories) {
        setFeilds(true);
        setMsg("Required Feilds cant be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFeilds(false);
          setLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          price: price,
          quantity: 1,
        };
        saveItem(data)
        setLoading(false)
      setFeilds(true)
      setMsg('Item Uploaded Successfully')
      setAlertStatus('success')
      clearData()
      setTimeout(()=>{
        setFeilds(false) 
      },4000)
      }
    } catch(error) {
      console.log(error);
      setFeilds(true);
      setMsg("Error while uploading. Try again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFeilds(false);
        setLoading(false);
      }, 4000);
    }
    fetchData()
  };
  const clearData=()=>{
      console.log('clear Data working')
      setTitle("")
      setImageAsset(null)
      setPrice("00000")
      setCategory("Select Category")
  }
  const fetchData=async()=>{
    await getAllItems().then(data=>{
      dispatch({
        type:actionType.SET_ITEMS,
        items:data
      })
    })
  }
  return (
    <div className="w-full min-h-screen h-auto flex items-center justify-center">
      <div className="w-[90%] items-center md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col justify-center">
        {feilds && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 font-bold rounded-lg text-center ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emereald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-grea=y-300 flex items-center gap-2">
          <HiCake className="text-2xl text-gray-700 "></HiCake>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none w-full h-full px-2 py-2 text-lg bg-transparent font-semibold"
            type="text"
            required
            value={title}
            placeholder="Enter a Title"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="border-0 outline-none capitalize bg-white "
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group w-full flex justify-center items-center flex-col border-2 border-dotted border-gray-300  h-225 md:h-420 cursor-pointer">
          {loading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full gap-3 flex flex-col items-center justify-center ">
                      <MdCloudUpload className="text-grey-500 text-3xl" />
                      <p className="text-grey-500 ">Upload Image</p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    ></input>
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="upload image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 rounded-full text-xl bg-red-500 cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-grey-300 flex items-center gap-2">
            <MdAttachMoney />
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              required
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
            ></input>
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="bg-primary ml-0 md:ml-auto w-full md:w-auto border-none outline-none px-12 py-2 rounded-lg text-lg font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
