'use client'
import Image from "next/image";
import Register from "@/components/register/Register";
import Header from "@/components/header/Header";
import Books from "@/components/books/Books";
import { Provider } from 'react-redux';
import store from "@/redux/store/Store";

export default function Home() {
  return (
    <Provider store={store}  >
    <main>
    <Books  />
    </main>
    </Provider>
  );
}
