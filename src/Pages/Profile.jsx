// import React, { useState } from "react";
// import Header from "../Components/Header";

// function Profile() {
//   const [post, setPost] = useState(false);
//   const [like, setLike] = useState(false);

//   const handlePost = () => {
//     setPost(true);
//     setLike(false);
//   };

//   const handleLike = () => {
//     setPost(false);
//     setLike(true);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col my-5">
//         <h1 className="text-2xl">Profile</h1>
//         <h1 className="text-4xl mt-10">Sreejith U</h1>
//         <div className="flex flex-col items-center my-5">
//           <div className="flex">
//             <div
//               className="bg-gray-700 cursor-pointer hover:bg-gray-800 w-[20dvw] py-2 text-center transition duration-300 rounded-l-sm border-r border-gray-600"
//               onClick={handlePost}
//             >
//               Posts
//             </div>
//             <div
//               className="bg-gray-700 cursor-pointer hover:bg-gray-800 w-[20dvw] py-2 text-center transition duration-300 rounded-r-sm"
//               onClick={handleLike}
//             >
//               Likes
//             </div>
//           </div>
//           {post ? <p>Post</p> : ""}
//           {like ? <p>Like</p> : ""}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import PostCard from "../Components/Card";
import { GetUserLikedPostsApi, GetUserPostsApi } from "../Services/userApi";

function Profile() {
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
      console.log(response.data.posts)
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const response = await GetUserLikedPostsApi();
      console.log(response.data.likedPosts)
      setLikedPosts(response.data.likedPosts);
    } catch (error) {
      console.error("Error fetching liked posts:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col my-5 items-center">
        <h1 className="text-4xl mt-10">Sreejith U</h1>

        {/* Tab Buttons */}
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

        {/* Post Section */}
        <div className="flex flex-col items-center mt-5 gap-y-4">
          {activeTab === "posts" &&
            (posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} data={post} />)
            ) : (
              <p className="text-gray-400">No posts found</p>
            ))}

          {activeTab === "likes" &&
            (likedPosts.length > 0 ? (
              likedPosts.map((post) => <h1>World</h1>)
            ) : (
              <p className="text-gray-400">No liked posts</p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
