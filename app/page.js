"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Home() {
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
    <main className=" h-screen bg-slate-800">
      <div className="flex ">
        <div className="flex justify-between w-full border-black rounded-md shadow-md shadow-purple-300 p-5 m-5 bg-gradient-to-r from-violet-200 to-pink-200">
          <div className="space-y-5">
            <h1 className="font-bold text-2xl text-slate-700">Blogs</h1>

            <ol>
              {isLoading ? (
                <Loading />
              ) : (
                allPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      className="font-medium hover:text-purple-500"
                      href={post.link}
                    >
                      {post.title.rendered}
                    </Link>
                  </li>
                ))
              )}
            </ol>
          </div>
          <div className="space-y-5">
            <h1 className="font-bold text-2xl text-slate-700">Search blog by ID</h1>
            <form action="" onSubmit={handleSubmit}>
              <input type="number" />
              <button
                type="submit"
                className="px-2 border font-medium mx-1 rounded-md hover:text-purple-500"
              >
                Search
              </button>
            </form>
            {error ? (
              <ErrorMessage message={error} />
            ) : (
              posts.map((postById) => (
                <Link
                  className="font-medium hover:text-purple-500"
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
