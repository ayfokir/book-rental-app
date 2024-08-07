// 'use client'
// import React, { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// interface NotificationProps {
//   status: string;
//   message: string;
// }

// export const Notification: React.FC<NotificationProps> = ({ status, message }) => {
//     console.log("message inside notification:", message)
//   useEffect(() => {
//     if (status === 'error') {
//       toast.error(message, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         toastId: 'error1',
//         className: 'toast-position'
//       });
//     } else if (status === 'success') {
//       toast.success(message, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         toastId: 'success1',
//         className: 'toast-position'
//         }); 
//         }
    
//  // // Clear message and status after 5 seconds
//         // const timer = setTimeout(() => {
//         //   notificationCtx.hideNotification(); // Function to clear message and status
//         // }, 5000);
//         // return () => clearTimeout(timer); // Cleanup the timer
//   }, [status, message]);

//   if (status === 'none') {
//     return null;
// }
//   return (
//     <div className='toast-position'>
//       <ToastContainer />
//     </div>
//   );
// };






// src/components/notification/Notification.tsx
'use client'
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNotification } from '@/context/NotificationContext';

export const Notification: React.FC = () => {
  const { notification } = useNotification();

  useEffect(() => {
    const { status, message } = notification;

    if (status === 'error') {
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
    } else if (status === 'success') {
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
    }
  }, [notification]);

  return (
    <div className='toast-position'>
      <ToastContainer />
    </div>
  );
};
