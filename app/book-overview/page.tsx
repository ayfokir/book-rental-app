'use client'
import React from 'react'
import BookOverview from '@/components/book-overview/BookOverview'
import { Provider } from 'react-redux'
import store from '@/redux/store/Store'
const page = () => {
  return (
    <>
    <Provider  store={store}>
    < BookOverview /> 
    </Provider>

    </>
  )
}

export default page



