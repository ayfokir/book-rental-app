'use client'
import React from 'react'
import Books from '@/components/dashboard/books/Books'
import { AuthProvider } from "@/context/AuthContext";
import { Provider } from 'react-redux';
import store from '@/redux/store/Store';
const page = () => {
  return (
    <Provider store={store}>
        <AuthProvider>
        <Books  />
        </AuthProvider>   

    </Provider>
  )
}

export default page