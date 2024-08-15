"use client";
import Image from "next/image";
import Register from "@/components/register/Register";
import Header from "@/components/header/Header";
import { Provider } from "react-redux";
import store from "@/redux/store/Store";
import Footer from "@/components/footer/Footer";
import Books from "@/components/home-page/Books";
export default function Home() {
  return (
    <Provider store={store}>
      <main>
        <Header />
        <Books />
        <Footer />
      </main>
    </Provider>
  );
}
