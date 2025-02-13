import { userInstance } from "../axios/axiosInstance";


// POST METHODS

export const SignUpApi = (value) => {
  return userInstance.post("/createAccount", { ...value });
};

export const LoginApi = (value) => {
  return userInstance.post("/login", { ...value });
};

export const CreatePostApi = (formData) => {
  return userInstance.post("/createPost", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const AddComment = (postId, text) => {
  return userInstance.post(`/${postId}`, {text});
};

export const LikePostApi = (postId) => {
  return userInstance.post(`/${postId}/like`, {})
}


// GET METHODS

export const GetPostsApi = () => {
  return userInstance.get("/getPosts");
};

export const GetUserPostsApi = () => {
  return userInstance.get("/userPosts");
};

export const GetUserLikedPostsApi = () => {
  return userInstance.get("/userLikedPosts");
};

export const GetCommentsApi = (postId) => {
  return userInstance.get(`/${postId}`);
};
