'use client'

import React from 'react'
import Owners from '@/components/dashboard/owners/Owners'
import { AuthProvider } from "@/context/AuthContext";
import { Provider } from 'react-redux';
import store from '@/redux/store/Store';
const page = () => {
   return (
    <Provider store={store}>
    < AuthProvider>
    <Owners/> 
    </AuthProvider>
    </Provider>
    )
}

export default page