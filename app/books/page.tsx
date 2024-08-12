'use client'
import React from 'react'
import Books from '@/components/dashboard/books/Books'
import { AuthProvider } from "@/context/AuthContext";

const page = () => {
  return (
    <>
        <AuthProvider>
        <Books  />
        </AuthProvider>   

    </>
  )
}

export default page