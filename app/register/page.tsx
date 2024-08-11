import React from 'react'
import Register from '@/components/register/Register'
import { NotificationProvider } from '@/context/NotificationContext';

const page = () => {
  return (
    <>
    <NotificationProvider >
    < Register  />  
    </NotificationProvider>
    </>
  )
}

export default page