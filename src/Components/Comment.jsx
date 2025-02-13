import React, { useState, useEffect } from "react";
import { AddComment, GetCommentsApi } from "../Services/userApi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

const getAvatarColor = (name) => {
  const colors = [
    "#f50057",
    "#ff9800",
    "#4caf50",
    "#2196f3",
    "#9c27b0",
    "#795548",
    "#3f51b5",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

function CommentModal({ postId, onClose, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await GetCommentsApi(postId);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await AddComment(postId, newComment);
      setNewComment("");
      fetchComments();
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Comments</DialogTitle>
      <DialogContent dividers>
        {comments.length > 0 ? (
          <List>
            {comments.map((comment) => {
              const avatarColor = getAvatarColor(comment.User.name);
              return (
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      src={comment.User.profilePic || ""}
                      sx={{
                        bgcolor: comment.User.profilePic
                          ? "transparent"
                          : avatarColor,
                      }}
                    >
                      {comment.User.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={comment.User.name}
                    secondary={comment.text}
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant="body2" align="center">
            No comments yet.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentModal;
