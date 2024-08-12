"use client";
import React from "react";
import BookUpload from "@/components/dashboard/book-upload/BookUpload";
import { AuthProvider } from "@/context/AuthContext";
// import { NotificationProvider } from "@/context/NotificationContext";
import { Provider } from "react-redux";
import { Notification } from "@/components/notification/Notification";
import store from "@/redux/store/Store";
const page = () => {
  return (
    <Provider store={store}>
      {/* <NotificationProvider> */}
      <Notification />
      <AuthProvider>
        <BookUpload />
      </AuthProvider>
      {/* </NotificationProvider> */}
    </Provider>
  );
};

export default page;
