import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function Social() {
  return (
    <nav>
      <ul className="flex gap-x-3">
        <li>
          <Link
            href={"https://www.linkedin.com/in/vahidalvandi"}
            className="text-sky-800 hover:text-black transition-all duration-300 "
          >
            <FaLinkedinIn size={20} />
          </Link>
        </li>
        <li>
          <Link
            href={"https://twitter.com/vahidalvandi"}
            className="text-sky-800 hover:text-black transition-all duration-300"
          >
            <FaXTwitter size={20} />
          </Link>
        </li>
        <li>
          <Link
            href={"https://github.com/vahidalvandi"}
            className="text-sky-800 hover:text-black transition-all duration-300"
          >
            <FaGithub size={20} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
