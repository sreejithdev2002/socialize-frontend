import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import CommentModal from "./Comment";
import {
  CheckLikeStatusApi,
  LikePostApi,
  GetCommentsApi,
} from "../Services/userApi";

export default function PostCard({ data, updatePostData }) {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(data.likes || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(data.comments || 0);

  console.log(data.likes + " likes");

  useEffect(() => {
    FetchLikeStatus();
  }, []);

  const FetchLikeStatus = async () => {
    try {
      const response = await CheckLikeStatusApi(data.id);
      console.log("Like status response:", response.data);

      setLiked(response.data.isLiked || false);
      setLikes(response.data.likeCount ?? likes);
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await LikePostApi(data.id);
      console.log("Like API Response:", response);

      const newLikeCount = liked ? likes - 1 : likes + 1;
      setLiked(!liked);
      setLikes(newLikeCount >= 0 ? newLikeCount : 0);

      updatePostData({ ...data, likes: newLikeCount });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentUpdate = async () => {
    try {
      const response = await GetCommentsApi(data.id);
      setComments(response.data.comments.length);

      updatePostData({ ...data, comments: response.data.comments.length });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          bgcolor: "#1e1e1e",
          color: "#ffffff",
          marginBottom: 1,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }}>
              {data.user.name.charAt(0) ||
                data.User.name.charAt(0) ||
                "Username"}
            </Avatar>
          }
          title={
            <Typography sx={{ color: "#ffffff" }}>
              {data.user.name || data.User.name || "Username"}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          image={`http://localhost:5000${data.imageUrl}`}
          alt={data.caption}
          sx={{ width: 400, height: 350, objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
            {data.caption}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleLike}>
            <FavoriteIcon sx={{ color: liked ? "red" : "#b0b0b0" }} />
            <Typography
              variant="body2"
              sx={{ marginLeft: 1, color: "#ffffff" }}
            >
              {likes || 0}
            </Typography>
          </IconButton>
          <IconButton onClick={() => setShowComments(true)}>
            <ChatIcon sx={{ color: "#b0b0b0" }} />
            <Typography
              variant="body2"
              sx={{ marginLeft: 1, color: "#ffffff" }}
            >
              {comments}
            </Typography>
          </IconButton>
        </CardActions>
      </Card>

      {showComments && (
        <CommentModal
          postId={data.id}
          onClose={() => setShowComments(false)}
          onCommentAdded={handleCommentUpdate}
        />
      )}
    </>
  );
}
