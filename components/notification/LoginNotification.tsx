
'use client'
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNotification } from '@/context/NotificationContext';
export const Notification: React.FC = () => {

  const {  status, message } =  useNotification().notification
  console.log("inside notification:", message)
  console.log(message)
  useEffect(() => {
    if (status === "success") {
      toast.success(message, {
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
    } else if (status  === "error") {
      toast.error(message, {
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
  }, [status, message]);

  return (
    <div className='toast-position'>
      <ToastContainer />
    </div>
  );
};
