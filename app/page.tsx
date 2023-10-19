"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import loadingGif from "../public/loading.gif";
import { signInWithPopup, getAuth } from "firebase/auth";
import googleLogo from "../public/Google__G__Logo.svg";

import Head from "next/head";

import { auth, provider } from "./firebase";

import { redirect } from "next/navigation";

export default function Page() {
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    let userEmail;
    setIsLoading(true);
    const data = await signInWithPopup(auth, provider).then((data) => {
      if (!data.user.email) {
        return null;
      }
      localStorage.setItem("uid", data.user.uid);
      setUid(data.user.uid);
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (localStorage.getItem("uid")) {
      console.log("login redirect");
      if (uid) redirect("/dashboard");
    }
  }, [uid]);

  return (
    <>
      <div className="flex flex-col justify-center items-center align-middle h-screen w-screen">
        <h1 className="text-3xl md:text-5xl mt-2 md:mt-5 underline-offset-4 underline mb-5 text-center">
          Subscription Tracker
        </h1>
        <div className="flex flex-col items-center justify-center align-middle bg-slate-200 h-auto md:h-[600px] w-[80%] md:w-[500px] p-5 md:p-10">
          <div className="w-[80%]">
            <h2 className="text-xl font-bold md:text-3xl mt-1 md:mt-5 my-3">
              Login With Google Accoutn
            </h2>
            <div className="flex flex-col text-start text-base mf:text-lg">
              <p className="mt-2 font-bold">Subscription Tracker App:</p>
              <p className="my-2">
                Keep track of your subscriptions in a simple list using
                firebase's Firestore Database and Authentication.
              </p>
              <p>
                A simple collection storing your subscriptions name, date, cost
                and renewal rate.
              </p>
            </div>

            <div className="border border-b-1 border-black w-[100%] text-center my-5"></div>

            <div
              onClick={handleClick}
              className="w-full bg-slate-100 rounded-md flex justify-between items-center py-5 px-5 h-auto font-bold cursor-pointer align-bottom flex-1 my-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>

              <button className="font-bold cursor-pointer text-sm md:text-base">
                Signin With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
