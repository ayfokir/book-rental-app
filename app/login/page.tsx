'use client'
import React from 'react'
import Login from '@/components/login/Login'
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthProvider } from '@/context/AuthContext';

const page = () => {
  return (
    <>
    <AuthProvider >
    <NotificationProvider >
    <Login />  
    </NotificationProvider>
    </AuthProvider>
      
    </>
  )
}

export default page