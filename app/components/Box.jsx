"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import Loading from "../Loading";

export default function Box({
  title,
  description,
  img,
  link,
  date,
  isLoading,
}) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const htmlString = img;
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlString, "text/html");
    const imgElement = htmlDoc.querySelector("img");
    if (imgElement) {
      const imgSrc = imgElement?.src;
      setSrc(imgSrc);
    } else {
      console.log("Failed to fetch ");
      setSrc("");
    }
  }, []);

  const dateString = date;
  let convertedDate = Date.parse(dateString);
  const Formatted = {
    monthTitle: getDateFormat(convertedDate, { month: "long" }),
    year: getDateFormat(convertedDate, { year: "numeric" }),
    day: getDateFormat(convertedDate, { day: "numeric" }),
  };

  function getDateFormat(uDate, option) {
    let date = new Intl.DateTimeFormat("fa-IR", option).format(uDate);
    return date;
  }

  return (
    <div className="flex flex-col rounded-md w-80 sm:w-80 hover:shadow-md transition-all duration-300 shadow-md space-y-4 justify-between items-center  bg-white  2xl:w-96 pb-3">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            {src && (
              <Image
                alt="Failed to load"
                className="rounded-t-md "
                src={src}
                width={640}
                height={600}
              />
            )}
          </div>
          <div className="px-3 space-y-3">
            <Link href={link}>
              <h1 className="cursor-pointer font-bold transition-all duration-300 hover:text-black text-xl  text-[#035d9a] text-opacity-80 ">
                {title}
              </h1>
            </Link>
            <div className="flex gap-x-2 text-black/70 items-center text-sm">
              <span>نویسنده: مدیر</span>
              <span>
                <FaCalendar />
              </span>
              <span>{`${Formatted.day} ${Formatted.monthTitle} ${Formatted.year}`}</span>
            </div>

            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
            <Link href={link}>
              <button className="mt-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium justify-self-center px-2 py-1 text-center rounded-lg">
                ادامه مطالب
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
