'use client'

import React from 'react'
import Owners from '@/components/dashboard/owners/Owners'
import { AuthProvider } from "@/context/AuthContext";

const page = () => {
   return (
    <>
    < AuthProvider>
    <Owners/> 
    </AuthProvider>
    </>
    )
}

export default page