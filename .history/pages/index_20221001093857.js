import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SignIn from '../components/SignIn';


export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <title>Mama-Mboga</title>
        <meta name="description" content="Mama-Mboga app for you." />
        <meta property="og:title" content="Mama-Mboga" key="title" />
      </Head>
      <div className="mobile:px-10 px-4 pb-10 flex justify-center">
        <main className="w-fw">
          <SignIn />
        </main>
      </div>
      <footer className="flex justify-center">
        <div
          className="
        sm:flex-row sm:items-center
        flex-col
        flex w-fw px-12 py-8
        desktop:px-0
        border-solid
        border-t border-gray-300"
        >
          <span className="block text-gray-700 text-xs">
            Copyright © 2022 . All rights reserved.
          </span>
          {/* <div
            className="
            sm:justify-end sm:m-0
            flex flex-1 mt-4
          "
          >
            <Link href="/admin">
              <a aria-label="Admin panel">
                <p className="text-sm font-semibold">Admins</p>
              </a>
            </Link>
          </div> */}
        </div>
      </footer>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
