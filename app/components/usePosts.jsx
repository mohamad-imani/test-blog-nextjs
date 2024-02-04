import React, { useEffect, useState } from "react";

export function usePosts() {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    async function getPosts() {
      const res = await fetch("https://vahidalvandi.ir/wp-json/wp/v2/posts");
      const data = await res.json();

      const newLoadingStates = data.reduce((acc, post) => {
        acc[post.id] = true;
        return acc;
      }, {});

      setLoadingStates(newLoadingStates);
      setAllPosts(data);
      setTimeout(() => {
        const updatedLoadingStates = { ...newLoadingStates };
        for (let id in updatedLoadingStates) {
          updatedLoadingStates[id] = false;
        }
        setLoadingStates(updatedLoadingStates);
      }, 1000);
    }
    getPosts();
  }, []);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setId(e.target.querySelector("input").value);
  // }
  // function ErrorMessage({ message }) {
  //   return (
  //     <p>
  //       <span>⛔ </span>

  //       {message}
  //     </p>
  //   );
  // }

  // useEffect(() => {

  //   async function getPostById() {
  //     try {
  //       if (id) {
  //         const res = await fetch(
  //           `https://vahidalvandi.ir/wp-json/wp/v2/posts/${id}`
  //         );
  //         if (!res.ok) throw new Error("Wrong ID");
  //         const data = await res.json();
  //         setPosts([data]);
  //       } else {
  //         setPosts([]);
  //       }
  //     } catch (err) {
  //       console.error(err.message);
  //       setError(err.message);
  //     }
  //   }
  //   getPostById();
  //   return () => {
  //     setError("");
  //   };
  // }, [id]);
  return { posts, error, allPosts, loadingStates };
}
