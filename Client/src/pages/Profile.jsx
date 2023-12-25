import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserstart, deleteUserSuccess, signoutFailure, signoutSuccess } from "../redux/user/userSlice";
import {
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const {loading,error}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // we add timestamp in file name so that we get unique file everytime.
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setFilePerc(progress)
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success===false){
          dispatch(updateUserFailure(data.message));
          return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleDelete = async(e) =>{
    try {
      dispatch(deleteUserstart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data = await res.json();
        if(data.success===false){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignout= async()=>{
    try {
      const res=await fetch('/api/auth/signout');
      const data=await res.json();
      if(data.success===false){
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
    } catch (error) {
      dispatch(signoutFailure(error));
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center my-5 text-3xl font-semibold">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar||currentUser.avatar}
          alt={"profile"}
          className="rounded-full object-cover cursor-pointer self-center mt-2 h-24 w-24"
          onChange={handleChange}
        />
        <p className="text-sm self-center">
          {
            fileUploadError?(<span className="text-red-700">Error Image Upload (image size must be less than 2MB)</span>):
            filePerc>0&&filePerc<100 ? (<span className="text-slate-700">
              {`Uploading ${filePerc}%`}
            </span>):
            filePerc===100?(<span className="text-green-700">Uploaded successfully</span>):
            ""
          }
        </p>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link to={"/create-listing"} className="bg-green-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          add new list
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      <p className="text-green-700 mt-5">{updateSuccess?'Profile updated successfully!!':''}</p>
    </div>
  );
}
