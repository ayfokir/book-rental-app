
'use client'
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/Store"; 
export const Notification: React.FC = () => {
  const state = useSelector( (state: RootState) => state.addedBook);
  // const {error, success, message, loading} = useSelector( (state: RootState) => state.addedBook);
  // const {error, success, message, loading} = useSelector( (state: RootState) => state.books);
  const states = useSelector( (state: RootState) => state.books);
  
  useEffect(() => {
    if (state.success || states.success) {
      toast.success(state.message || states.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 'success1',
        className: 'toast-position'
      });
    } else if (!state.success || !states.success) {
      toast.error(state.error || states.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 'error1',
        className: 'toast-position'
      });
    }
  }, [state.success || states.success, state.error || states.error, state.message || states.message]);

  return (
    <div className='toast-position'>
      <ToastContainer />
    </div>
  );
};
