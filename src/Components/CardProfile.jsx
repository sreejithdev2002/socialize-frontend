import React, { useState, useEffect } from "react";
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

import { CheckLikeStatusApi, LikePostApi } from "../Services/userApi";

export default function CardProfile({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await CheckLikeStatusApi(post.id);
        setIsLiked(response.data.isLiked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    fetchLikeStatus();
  }, [post.id]);

  const fetchComments = async () => {
    try {
      await GetCommentsApi(post.id);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async () => {
    try {
      await LikePostApi(post.id);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
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
              {post.User.name.charAt(0)}
            </Avatar>
          }
          title={post.User.name}
        />
        <CardMedia
          component="img"
          image={`http://localhost:5000${post.imageUrl}`}
          alt={post.caption}
          sx={{ width: 400, height: 350, objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
            {post.caption}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon sx={{ color: isLiked ? "red" : "gray" }} />
          </IconButton>
          <IconButton onClick={() => setShowComments(true)}>
            <ChatIcon sx={{ color: "#b0b0b0" }} />
          </IconButton>
        </CardActions>
      </Card>
      {showComments && (
        <CommentModal
          postId={post.id}
          onClose={() => setShowComments(false)}
          onCommentAdded={fetchComments}
        />
      )}
    </>
  );
}
