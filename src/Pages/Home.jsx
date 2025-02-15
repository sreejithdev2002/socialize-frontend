import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import FloatingNav from "../Components/FloatingNav";
import Header from "../Components/Header";
import { GetPostsApi } from "../Services/userApi";

function Home() {
  const [feeds, setFeeds] = useState([]);

  const fetchData = async () => {
    try {
      const response = await GetPostsApi();
      setFeeds(response.data.posts);
    } catch (error) {
      console.error("Error Fetching Posts: " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updatePostData = (updatedPost) => {
    setFeeds((prevFeeds) =>
      prevFeeds.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  return (
    <>
      <div>
        <Header />
        <div className="flex flex-col items-center gap-y-10 my-5">
          {feeds.map((data) => (
            <Card key={data.id} data={data} updatePostData={updatePostData} />
          ))}
        </div>
      </div>
      <FloatingNav />
    </>
  );
}

export default Home;
