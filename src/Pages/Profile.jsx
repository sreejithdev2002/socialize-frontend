import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import CardProfile from "../Components/CardProfile";
import { GetUserLikedPostsApi, GetUserPostsApi } from "../Services/userApi";
import { useUser } from "../Context/UserContext";
import FloatingNav from "../Components/FloatingNav";

function Profile() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    if (activeTab === "posts") {
      fetchUserPosts();
    } else {
      fetchLikedPosts();
    }
  }, [activeTab]);

  const fetchUserPosts = async () => {
    try {
      const response = await GetUserPostsApi();
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const response = await GetUserLikedPostsApi();
      setLikedPosts(response.data.likedPosts);
    } catch (error) {
      console.error("Error fetching liked posts:", error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="flex flex-col my-5 items-center">
          <h1 className="text-4xl mt-10">{user?.name || "Profile"}</h1>

          <div className="flex mt-5">
            <div
              className={`cursor-pointer w-[20dvw] py-2 text-center transition duration-300 rounded-l-sm border-r border-gray-600 ${
                activeTab === "posts"
                  ? "bg-gray-800"
                  : "bg-gray-700 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </div>
            <div
              className={`cursor-pointer w-[20dvw] py-2 text-center transition duration-300 rounded-r-sm ${
                activeTab === "likes"
                  ? "bg-gray-800"
                  : "bg-gray-700 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("likes")}
            >
              Likes
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {activeTab === "posts" &&
              (posts.length > 0 ? (
                posts.map((post) => <CardProfile key={post.id} post={post} />)
              ) : (
                <p className="text-gray-400">No posts found</p>
              ))}

            {activeTab === "likes" &&
              (likedPosts.length > 0 ? (
                likedPosts.map((post) => (
                  <CardProfile key={post.id} post={post} />
                ))
              ) : (
                <p className="text-gray-400">No liked posts</p>
              ))}
          </div>
        </div>
      </div>
      <FloatingNav />
    </>
  );
}

export default Profile;
