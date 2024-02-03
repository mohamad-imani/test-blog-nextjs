"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Header from "./components/Header";
import Box from "./components/Box";
import Footer from "./components/Footer";
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
      console.log(data);
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
    <div className="h-full flex flex-col justify-between bg-[#ededed] ">
      <Header />

      <main className="flex flex-col 2xl:flex-row px-5 justify-center mt-10 items-center 2xl:items-start gap-y-5">
        <div className="grid gap-y-10 gap-x-5 mx-auto xl:grid-cols-3 ">
          {allPosts.map((post) => (
            <Box
              key={post.id}
              title={post?.title?.rendered}
              description={post?.excerpt?.rendered}
              img={post?.content?.rendered}
              link={post?.link}
              date={post?.date}
            />
          ))}

          <Link
            href={"https://vahidalvandi.ir/blog"}
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium justify-self-center px-5 py-2.5 text-center rounded-lg self-end mb-2 animate-pulse "
          >
            مشاهده همه مطالب
          </Link>
        </div>
        <div className=" h-max flex flex-col gap-y-4 bg-white p-3 w-72 border shadow-sm shadow-black/60 rounded-md ">
          <p>
            از ۱۷ سالگی یا همان سال ۲۰۰۶ برنامه نویسی را شروع کردم و خداراشکر
            همچنان آن را ادامه می دهم علاقه مند به انتقال تجربیاتم به دیگران
            هستم. و با آموزش و یادگیری رشد میکنیم.
          </p>

          <Link
            href={
              "https://vahidalvandi.ir/%d8%af%d8%b1%d8%a8%d8%a7%d8%b1%d9%87-%d9%85%d9%86/"
            }
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium justify-self-center px-2 py-1 text-center rounded-lg"
          >
            درباره من
          </Link>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

