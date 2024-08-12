"use client";
import React from "react";
import Login from "@/components/login/Login";
import { NotificationProvider } from "@/context/NotificationContext";
// import { AuthProvider } from "@/context/AuthContext";
// import { Notification } from "@/components/notification/LoginNotification";
// import { Provider } from "react-redux";
// import store from "@/redux/store/Store";
const page = () => {
  return (
    <>
      {/* <Provider store={store}> */}
        {/* <AuthProvider> */}
          {/* <Notification /> */}
          <NotificationProvider>
            <Login />
          </NotificationProvider>
        {/* </AuthProvider> */}
      {/* </Provider> */}
    </>
  );
};

export default page;
