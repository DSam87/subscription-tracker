"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import loadingGif from "../../public/loading.gif";
import {
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const auth = getAuth();

  const itemsRef = collection(db, "items");

  const [subscriptionName, setSubscriptionName] = useState("");
  const [subscriptionCost, setSubscriptionCost] = useState("");
  const [subscriptionDate, setSubscriptionDate] = useState("");
  const [subscriptionRenewal, setSubscriptionRenewal] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [logout, setLogout] = useState(false);

  function logoutUser() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("uid");
      })
      .catch((error) => {
        console.error(error);
      });
    setLogout(true);
  }

  useEffect(() => {
    if (!logout) {
      let uid = localStorage.getItem("uid");
      if (uid) {
        setCurrentUserId(uid);
        getUserItems();
      } else {
        redirect("/");
      }
    } else {
      redirect("/");
    }
  }, [logout]);

  async function submitItemFormHandler(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, "items"), {
        name: subscriptionName,
        cost: subscriptionCost,
        date: subscriptionDate,
        renual: subscriptionRenewal,
        uidCreator: currentUserId,
      });
      resetInputState();

      setCurrentItems((prevState) => {
        return [
          ...prevState,
          {
            name: subscriptionName,
            cost: subscriptionCost,
            date: subscriptionDate,
            renual: subscriptionRenewal,
            id: docRef.id,
            uidCreator: currentUserId,
          },
        ];
      });
      setIsLoading(false);
      console.log("data sent", docRef.id);
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  async function getUserItems() {
    const items: any = [];
    try {
      setIsLoading(true);
      let currentUserId = localStorage.getItem("uid");
      const q = query(itemsRef, where("uidCreator", "==", currentUserId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
        console.log(typeof doc.id);
      });

      setIsLoading(false);
      setCurrentItems(items);
    } catch (e) {
      console.log(e);
      console.error("Error: ", e);
    }
  }

  async function deleteItem(id: string) {
    setIsLoading(true);
    const docRef = doc(db, "items", id);
    try {
      await deleteDoc(docRef);
      console.log("Document deleted");
    } catch (e) {
      console.error("Error: ", e);
    }
    getUserItems();
    setIsLoading(false);
  }

  function onSubscriptionNameHanndler(e: React.ChangeEvent<HTMLInputElement>) {
    setSubscriptionName(e.target.value);
  }

  function onSubscriptionCostHanndler(e: React.ChangeEvent<HTMLInputElement>) {
    setSubscriptionCost(e.target.value);
  }

  function onSubscriptionDateHanndler(e: React.ChangeEvent<HTMLInputElement>) {
    setSubscriptionDate(e.target.value);
  }

  function onSubscriptionRenewalHandler(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    setSubscriptionRenewal(e.target.value);
  }

  function resetInputState() {
    setSubscriptionName("");
    setSubscriptionCost("");
    setSubscriptionDate("");
  }

  function canSubmit(): string {
    if (
      subscriptionName.length > 0 &&
      subscriptionCost &&
      subscriptionDate &&
      subscriptionRenewal
    ) {
      return "opacity-100 cursor-pointer";
    }
    return "opacity-50 cursor-not-allowed";
  }

  return (
    <main className="flex max-h-screen h-screen flex-col justify-center items-center p-4 md:p-24 overflow-hidden">
      <div className="flex flex-col z-10 w-full font-mono text-sm md:flex h-full">
        <div className="nav flex flex-row  justify-between w-full">
          <p className="flex justify-center items-center align-middle text-sm md:text-lg">
            Subscription Tracker
          </p>
          <div className="flex-0">
            <Link
              target="_blank"
              className="px-2 md:px-10 py-5"
              href="https://github.com/DSam87"
            >
              Github
            </Link>
            <button className="px-2 md:px-10 py-5" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <h1 className="text-3xl flex-1 mt-1 md:mt-5 underline-offset-4 underline">
            Subscription Tracker
          </h1>

          <div className=" relative flex flex-col subscription-container w-[95%] md:w-[70%] mx-auto h-full bg-slate-200 p-2 md:p-5 mt-2 md:mt-10 overflow-scroll overflow-x-hidden">
            {isLoading ? (
              <Image
                priority={true}
                className=" fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                alt="loading gif"
                src={loadingGif}
              ></Image>
            ) : null}

            {currentItems.map((el: any) => {
              return (
                <div
                  key={`${el.id}`}
                  id={el.id}
                  className="subscription-item flex flex-row justify-around items-center align-middle bg-slate-50 py-5 mb-5"
                >
                  <p className="w-[50px] md:w-auto">{el.name}</p>
                  <p>{el.cost}</p>
                  <p className="w-[50px] md:w-auto">{el.date}</p>
                  <p>{el.renual}</p>
                  <div className="subscription-item-options flex flex-row justify-center items-center align-middle md:gap-0 gap-3">
                    <button
                      onClick={(e) => {
                        deleteItem(el.id);
                      }}
                      className=" px-2 py-1 bg-red-500 flex justify-center align-middle items-center"
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <form
            onSubmit={submitItemFormHandler}
            className="subscription-container flex-col w-[95%] md:w-[70%] mx-auto h-auto bg-slate-200 p-8 md:p-5 my-5 flex md:flex-row items-center justify-center"
          >
            <div className=" mr-5 md:w-auto w-full">
              <label htmlFor="title" className="block">
                Subscription Title
              </label>
              <input
                placeholder="Netflix"
                onChange={onSubscriptionNameHanndler}
                name="title"
                id="title"
                type="text"
                className="py-1 w-full"
                value={subscriptionName}
                disabled={isLoading}
              ></input>
            </div>
            <div className="flex-1 mr-5 md:w-auto w-full ">
              <label htmlFor="cost" className="block">
                Subscription Cost
              </label>
              <input
                placeholder="11.99"
                onChange={onSubscriptionCostHanndler}
                name="cost"
                id="cost"
                type="number"
                className="py-1 w-full"
                value={subscriptionCost}
                disabled={isLoading}
              ></input>
            </div>
            <div className="flex-1 mr-5 md:w-auto w-full">
              <label htmlFor="renewal" className="block">
                Subscription Renewal
              </label>
              <select
                name="renewal"
                id="renewal"
                className="py-1 w-full"
                onChange={onSubscriptionRenewalHandler}
                value={subscriptionRenewal}
                disabled={isLoading}
              >
                <option value="monthly">Monthly</option>
                <option value="biannually">Biannually</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div className="flex-1 mr-5 md:w-auto w-full">
              <label htmlFor="date" className="block">
                Subscription Date
              </label>
              <input
                onChange={onSubscriptionDateHanndler}
                name="date"
                id="date"
                type="date"
                className="py-1 w-full"
                value={subscriptionDate}
                disabled={isLoading}
              ></input>
            </div>

            <button
              disabled={isLoading}
              className={`flex-1 h-full bg-green-400 ${canSubmit()} py-1 my-4 w-full`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
