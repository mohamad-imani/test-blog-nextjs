"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({ src: "./Nazanin.ttf" });

export default function Home({ pageProps }) {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);
      const res = await fetch("https://vahidalvandi.ir/wp-json/wp/v2/posts");
      const data = await res.json();
      setAllPosts(data);
      setIsLoading(false);
    }
    getPosts();
  }, []);

  useEffect(() => {
    async function getPostById() {
      try {
        if (id) {
          const res = await fetch(
            `https://vahidalvandi.ir/wp-json/wp/v2/posts/${id}`
          );
          if (!res.ok) throw new Error("Wrong ID");
          const data = await res.json();
          setPosts([data]);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    }
    getPostById();
    return () => {
      setError("");
    };
  }, [id]);
  function handleSubmit(e) {
    e.preventDefault();
    setId(e.target.querySelector("input").value);
  }
  function ErrorMessage({ message }) {
    return (
      <p>
        <span>⛔ </span>

        {message}
      </p>
    );
  }
  return (
    <main className={`h-screen  bg-gradient-to-t from-slate-300 to-slate-500 ${myFont.className}`}>
      <div className="flex ">
      
        <div className="flex justify-between w-full border-black rounded-md shadow-sm shadow-black/50 p-5 m-5 bg-white/65">
          <div className="space-y-5 flex flex-col items-center">
            <h1
              className={`font-bold text-3xl text-[#035d9a] `}
            >
              بلاگ ها
            </h1>

            <ol>
              {isLoading ? (
                <Loading />
              ) : (
                allPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      className="font-semibold transition-all duration-300 hover:text-[#035d9a] text-lg text-black text-opacity-80 "
                      href={post.link}
                    >
                      {post.title.rendered}
                    </Link>
                  </li>
                ))
              )}
            </ol>
          </div>
          <div className="w-[1px] h-[90%] my-auto bg-black/50"></div>
          <div className="space-y-5 flex flex-col items-center">
            <h1
              className={`font-bold text-3xl text-[#035d9a]`}
            >
              جستجوی بلاگ بر اساس شناسه
            </h1>
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex justify-center items-center"
            >
              <input
                type="number"
                className="bg-slate-200 rounded-md px-2 py-1 order-1 focus:outline-0"
              />
              <button
                type="submit"
                className=" px-2 py-1  font-light mx-1 rounded-md hover:bg-opacity-40 bg-[#01b47e] transition-all duration-300"
              >
                🔎
              </button>
            </form>
            {error ? (
              <ErrorMessage message={error} />
            ) : (
              posts.map((postById) => (
                <Link
                  className="font-semibold transition-all duration-300 hover:text-[#035d9a] text-lg text-black text-opacity-80 "
                  key={postById.id}
                  href={postById.link}
                >
                  {postById.title.rendered}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
