"use client";
import React from "react";
import BookUpload from "@/components/dashboard/book-upload/BookUpload";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";

const page = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <BookUpload />
      </AuthProvider>
    </NotificationProvider>
  );
};

export default page;
