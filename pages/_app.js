import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Weather App | Next.js | Varun Soni</title>
      </Head>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
  