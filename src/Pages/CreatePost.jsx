import React, { useState } from "react";
import Header from "../Components/Header";
import { CreatePostApi } from "../Services/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB.");
        return;
      }

      setFile(selectedFile);

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
      toast.error("Please select an image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);

      await CreatePostApi(formData);

      toast.success("Post uploaded successfully!");
      navigate("/")
      setImage(null);
      setFile(null);
      setCaption("");
    } catch (error) {
      console.error("Error uploading post:", error.response?.data || error);
      toast.error("Error uploading post.");
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
