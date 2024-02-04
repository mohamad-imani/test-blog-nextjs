"use client";
// import Link from "next/link";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import React from "react";
import { FaSearch } from "react-icons/fa";
import Social from "./Social";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const buttonRef = useRef();
  useEffect(function () {
    function handleClickOutside(e) {
      if (buttonRef.current && buttonRef.current.contains(e.target)) {
        return;
      }
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("click outside");
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside, true);

    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="h-16 flex justify-between items-center lg:justify-around px-2 py-1 bg-white shadow-md ">
      <div>
        <Link href={"https://vahidalvandi.ir"}>
          <span className="text-[#035d9a] font-semibold text-xl">
            وحید الوندی{" "}
          </span>{" "}
          <br />
          <span className="font-medium text-sm text-black/75">
            انتشار تجربیاتم هنگام کدنویسی
          </span>
        </Link>
      </div>
      <div className=" relative hidden sm:flex justify-center items-center text-center p-1 gap-x-2">
        <input
          className="absolute text-[#7c7c7c] py-1 px-3 rounded-full transition-all duration-300 focus:border-black outline-none border-sky-600 border "
          type="text"
          placeholder="جستجو..."
        />
        <button className="absolute overflow-hidden  p-[4px] -left-24  rounded-full">
          <FaSearch color={"rgb(2 132 199)"} />
        </button>
      </div>
      <Social />

      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center z-50 lg:hidden"
        ref={buttonRef}
      >
        <span
          className={`bg-slate-700 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                    }`}
        ></span>
        <span
          className={`bg-slate-700 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
        ></span>
        <span
          className={`bg-slate-700 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                    }`}
        ></span>
      </button>
      <div className="hidden lg:flex lg:gap-x-2 items-center text-sm">
        <Link
          className="text-white py-1 px-2 rounded-md hover:text-sky-800 hover:bg-white transition-all duration-300 bg-sky-800 border border-sky-800 "
          href={"https://vahidalvandi.ir"}
        >
          صفحه اصلی
        </Link>

        <Link
          className="text-white py-1 px-2 rounded-md hover:text-sky-800 hover:bg-white transition-all duration-300 bg-sky-800 border border-sky-800 "
          href={
            "https://vahidalvandi.ir/%d8%af%d8%b1%d8%a8%d8%a7%d8%b1%d9%87-%d9%85%d9%86/"
          }
        >
          درباره من
        </Link>
        <Link
          className="text-white py-1 px-2 rounded-md hover:text-sky-800 hover:bg-white transition-all duration-300 bg-sky-800 border border-sky-800  "
          href={
            "https://vahidalvandi.ir/category/%d8%a2%d9%85%d9%88%d8%b2%d8%b4/"
          }
        >
          بلاگ{" "}
        </Link>
      </div>

      <nav
        ref={ref}
        className={` transition-all duration-300 ease-in-out p-3 bg-white  fixed right-0 top-0 z-[60] ${
          isOpen
            ? "w-1/2 h-screen opacity-100 visible"
            : "w-0 h-0 opacity-0 invisible"
        }`}
      >
        <ul className="transition-all duration-300 ease-in-out flex flex-col justify-center items-center space-y-4 ">
          <li>
            <Link
              className="text-sky-800 py-1 px-2 transition-all duration-300  "
              href={"https://vahidalvandi.ir"}
            >
              صفحه اصلی
            </Link>
          </li>
          <span className="w-full h-[1px] bg-sky-800"></span>
          <li>
            <Link
              className="text-sky-800 py-1 px-2 transition-all duration-300  "
              href={
                "https://vahidalvandi.ir/%d8%af%d8%b1%d8%a8%d8%a7%d8%b1%d9%87-%d9%85%d9%86/"
              }
            >
              درباره من
            </Link>
          </li>
          <span className="w-full h-[1px] bg-sky-800"></span>

          <li>
            <Link
              className="text-sky-800 py-1 px-2 transition-all duration-300  "
              href={
                "https://vahidalvandi.ir/category/%d8%a2%d9%85%d9%88%d8%b2%d8%b4/"
              }
            >
              بلاگ
            </Link>
          </li>
          <span className="w-full h-[1px] bg-sky-800"></span>
        </ul>
      </nav>

      <div
        className={`fixed z-40 inset-0 transition-opacity duration-300 ease-in-out ${
          isOpen ? "bg-black opacity-50 " : "opacity-0 pointer-events-none"
        }`}
      ></div>
    </header>
  );
}
