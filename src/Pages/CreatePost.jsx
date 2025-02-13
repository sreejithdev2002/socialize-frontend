// import React, { useState } from "react";
// import Header from "../Components/Header";

// function CreatePost() {
//   const [image, setImage] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <Header />

//       <div className="flex flex-col my-10 text-center w-full">
//         <h1 className="text-2xl">Create New Post</h1>

//         <form className="flex flex-col items-center py-5 w-full">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="p-2 bg-[#282828] w-[60%] my-1 rounded-sm text-sm cursor-pointer"
//           />

//           {image && (
//             <img
//               src={image}
//               alt="Preview"
//               className="w-140 h-80 object-cover rounded-lg shadow-md my-3"
//             />
//           )}

//           <input
//             type="text"
//             className="p-2 bg-[#282828] w-[60%] my-1 rounded-sm text-sm cursor-pointer"
//             placeholder="Create a caption"
//           />

//           <button className="bg-blue-600 w-[30%] rounded-sm my-1 py-1 text-sm cursor-pointer">
//             Post
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreatePost;

import React, { useState } from "react";
import Header from "../Components/Header";
import { CreatePostApi } from "../Services/userApi";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Restrict file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }

      setFile(selectedFile);

      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);

      console.log("FormData Contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]); // Key and Value
      }

      await CreatePostApi(formData);

      alert("Post uploaded successfully!");
      setImage(null);
      setFile(null);
      setCaption("");
    } catch (error) {
      console.error("Error uploading post:", error.response?.data || error);
      alert("Error uploading post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Header />

      <div className="flex flex-col my-10 text-center w-full">
        <h1 className="text-2xl">Create New Post</h1>

        <form
          className="flex flex-col items-center py-5 w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 bg-[#282828] w-[60%] my-1 rounded-sm text-sm cursor-pointer"
            aria-label="Upload Image"
          />

          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-140 h-80 object-cover rounded-lg shadow-md my-3"
            />
          )}

          <input
            type="text"
            name="caption"
            className="p-2 bg-[#282828] w-[60%] my-1 rounded-sm text-sm"
            placeholder="Create a caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            aria-label="Create a caption"
          />

          <button
            type="submit"
            className={`w-[30%] rounded-sm my-1 py-1 text-sm cursor-pointer ${
              loading ? "bg-gray-500" : "bg-blue-600"
            }`}
            disabled={!file || loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
