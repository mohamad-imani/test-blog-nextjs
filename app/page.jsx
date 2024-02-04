"use client";
import Link from "next/link";
import Loading from "./Loading";
import Header from "./components/Header";
import Box from "./components/Box";
import Footer from "./components/Footer";
import { FaSearch } from "react-icons/fa";
import { usePosts } from "./components/usePosts";
import vector from "../public/blog-vector.svg";
import secondVector from "../public/blog-vector-2.svg";
import Image from "next/image";
export default function Home({ pageProps }) {
  const { posts, allPosts, error, loadingStates } = usePosts();

  return (
    <div className=" bg-[url('https://i.postimg.cc/wxyDkPSD/wp.jpg')] h-full bg-no-repeat bg-cover bg-fixed bg-center  min-h-screen flex flex-col">
      <Header />

      <main className="backdrop-filter  backdrop-blur-md flex flex-col flex-grow 2xl:flex-row px-5 justify-center mt-10  items-center 2xl:items-start gap-y-5">
        <div className=" relative sm:hidden mb-4 flex justify-center items-center text-center p-1 gap-x-2">
          <input
            className="absolute text-[#7c7c7c] py-1 px-3 rounded-full transition-all duration-300 focus:border-black outline-none border-sky-600 border "
            type="text"
            placeholder="جستجو..."
          />
          <button className="absolute overflow-hidden  p-[4px] -left-24  rounded-full">
            <FaSearch color={"rgb(2 132 199)"} />
          </button>
        </div>
        <div className="grid gap-y-10 gap-x-5 mx-auto xl:grid-cols-3 lg:grid-cols-2 ">
          {allPosts.map((post) => (
            <Box
              key={post.id}
              title={post?.title?.rendered}
              description={post?.excerpt?.rendered}
              img={post?.content?.rendered}
              link={post?.link}
              date={post?.date}
              isLoading={loadingStates[post.id]}
            />
          ))}
          <Link
            href={"https://vahidalvandi.ir/blog"}
            className=" text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium justify-self-center px-5 py-2.5 text-center rounded-lg self-end  mb-2 animate-pulse "
          >
            مشاهده همه مطالب
          </Link>
        </div>
        <div className=" h-max flex flex-col gap-y-4 bg-white p-3 w-72 border shadow-md shadow-black/60 rounded-md  ">
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
      <div className="absolute left-4 top-[500px] hidden 2xl:flex flex-col space-y-96">
        <Image alt="vector" src={vector} width={400} height={400} />
        <Image alt="vector2" src={secondVector} width={400} height={400} />
      </div>
      <Footer />
    </div>
  );
}
