"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [subscriptionName, setSubscriptionName] = useState("");
  const [subscriptionCost, setSubscriptionCost] = useState("");
  const [subscriptionDate, setSubscriptionDate] = useState("");
  const [subscriptionRenual, setSubscriptionRenual] = useState("monthly");

  function onSubscriptionNameHanndler(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    setSubscriptionName(e.target.value);
  }

  function onSubscriptionCostHanndler(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    setSubscriptionCost(e.target.value);
  }

  function onSubscriptionDateHanndler(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    setSubscriptionDate(e.target.value);
  }

  function onSubscriptionRenualHanndler(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    setSubscriptionRenual(e.target.value);
  }

  function resetInputState() {
    setSubscriptionName("");
    setSubscriptionCost("");
    setSubscriptionDate("");
    setSubscriptionRenual("");
  }

  function canSubmit(): string {
    if (
      subscriptionName.length > 0 &&
      subscriptionCost &&
      subscriptionDate &&
      subscriptionRenual
    ) {
      return "opacity-100 cursor-pointer";
    }
    return "opacity-50 cursor-not-allowed";
  }

  function submitItemFormHandler(e: React.FormEvent) {
    e.preventDefault();
    console.log("submit items!");
    resetInputState();
  }

  return (
    <main className="flex max-h-screen h-screen flex-col justify-center items-center p-24 ">
      <div className="flex flex-col z-10 w-full font-mono text-sm lg:flex h-full">
        <div className="nav flex flex-row flex-1 justify-between w-full">
          <p className="flex justify-center items-center align-middle text-lg">
            Subscription Tracker
          </p>
          <div className="flex-0">
            <button className="px-10 py-5">Github</button>
            <button className="px-10 py-5">About</button>
            <button className="px-10 py-5">Logout</button>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <h1 className="text-3xl flex-1 mt-5 underline-offset-4 underline">
            Subscription Tracker
          </h1>

          <div className="subscription-container w-[70%] mx-auto h-full bg-slate-200 p-5 mt-10 overflow-scroll overflow-x-hidden">
            <div className="subscription-item flex flex-row justify-around items-center align-middle bg-slate-50 py-5 mb-5">
              <p>Netflix</p>
              <p>11.99</p>
              <p>Renual Date</p>
              <p>Dayley|Monthly|Anualy|Bianualy</p>
              <div className="subscription-item-options flex flex-row justify-center items-center align-middle gap-3">
                <button className="px-2 py-1 bg-green-400">E</button>
                <button className="px-2 py-1 bg-red-500">X</button>
              </div>
            </div>

            <div className="subscription-item flex flex-row justify-around items-center align-middle bg-slate-50 py-5 mb-5">
              <p>Netflix</p>
              <p>11.99</p>
              <p>Renual Date</p>
              <p>Dayley|Monthly|Anualy|Bianualy</p>
              <div className="subscription-item-options flex flex-row justify-center items-center align-middle gap-3">
                <button className="px-2 py-1 bg-green-400">E</button>
                <button className="px-2 py-1 bg-red-500">X</button>
              </div>
            </div>

            <div className="subscription-item flex flex-row justify-around items-center align-middle bg-slate-50 py-5 mb-5">
              <p>Netflix</p>
              <p>11.99</p>
              <p>Renual Date</p>
              <p>Dayley|Monthly|Anualy|Bianualy</p>
              <div className="subscription-item-options flex flex-row justify-center items-center align-middle gap-3">
                <button className="px-2 py-1 bg-green-400">E</button>
                <button className="px-2 py-1 bg-red-500">X</button>
              </div>
            </div>
            <div className="subscription-item flex flex-row justify-around items-center align-middle bg-slate-50 py-5 mb-5">
              <p>Netflix</p>
              <p>11.99</p>
              <p>Renual Date</p>
              <p>Dayley|Monthly|Anualy|Bianualy</p>
              <div className="subscription-item-options flex flex-row justify-center items-center align-middle gap-3">
                <button className="px-2 py-1 bg-green-400">E</button>
                <button className="px-2 py-1 bg-red-500">X</button>
              </div>
            </div>
            <div className="subscription-item flex flex-row justify-around items-center align-middle bg-slate-50 py-5 mb-5">
              <p>Netflix</p>
              <p>11.99</p>
              <p>Renual Date</p>
              <p>Dayley|Monthly|Anualy|Bianualy</p>
              <div className="subscription-item-options flex flex-row justify-center items-center align-middle gap-3">
                <button className="px-2 py-1 bg-green-400">E</button>
                <button className="px-2 py-1 bg-red-500">X</button>
              </div>
            </div>
            <div className="subscription-item flex flex-row justify-around items-center align-middle bg-slate-50 py-5 mb-5">
              <p>Netflix</p>
              <p>11.99</p>
              <p>Renual Date</p>
              <p>Dayley|Monthly|Anualy|Bianualy</p>
              <div className="subscription-item-options flex flex-row justify-center items-center align-middle gap-3">
                <button className="px-2 py-1 bg-green-400">E</button>
                <button className="px-2 py-1 bg-red-500">X</button>
              </div>
            </div>
            <div className="subscription-item flex flex-row justify-around items-center align-middle bg-slate-50 py-5 mb-5">
              <p>Netflix</p>
              <p>11.99</p>
              <p>Renual Date</p>
              <p>Dayley|Monthly|Anualy|Bianualy</p>
              <div className="subscription-item-options flex flex-row justify-center items-center align-middle gap-3">
                <button className="px-2 py-1 bg-green-400">E</button>
                <button className="px-2 py-1 bg-red-500">X</button>
              </div>
            </div>
          </div>
          <form
            onSubmit={submitItemFormHandler}
            className="subscription-container w-[70%] mx-auto h-auto bg-slate-200 p-5 my-5 flex flex-row items-center justify-center"
          >
            <div className="flex-1 mr-5 ">
              <label htmlFor="title" className="block">
                Subscription Title
              </label>
              <input
                placeholder="Netflix"
                onChange={onSubscriptionNameHanndler}
                name="title"
                id="title"
                type="text"
                className="py-1"
                value={subscriptionName}
              ></input>
            </div>
            <div className="flex-1 mr-5">
              <label htmlFor="cost" className="block">
                Subscription Cost
              </label>
              <input
                placeholder="11.99"
                onChange={onSubscriptionCostHanndler}
                name="cost"
                id="cost"
                type="number"
                className="py-1"
                value={subscriptionCost}
              ></input>
            </div>

            <div className="flex-1 mr-5">
              <label htmlFor="date" className="block">
                Subscription Date
              </label>
              <input
                onChange={onSubscriptionDateHanndler}
                name="cost"
                id="date"
                type="date"
                className="py-1"
                value={subscriptionDate}
              ></input>
            </div>
            <div className="flex-1 mr-5">
              <label htmlFor="renual" className="block">
                Subscription Renual
              </label>
              <select
                name="cost"
                id="renual"
                className="py-1"
                onChange={onSubscriptionRenualHanndler}
                value={subscriptionRenual}
              >
                <option value="monthly">Monthly</option>
                <option value="biannually">Biannually</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <button className={`flex-1 h-full bg-green-400 ${canSubmit()}`}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
