// import React, { useState, useEffect } from "react";
// import { AddComment, GetCommentsApi } from "../Services/userApi";

// function CommentModal({ postId, onClose }) {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   console.log(postId + " postId")
//   console.log(newComment + "new comment@!@!@")

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await GetCommentsApi(postId);
//       console.log(response.data)
//       setComments(response.data.comments);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;
//     try {
//       await AddComment(postId, newComment);
//       setNewComment("");
//       console.log(newComment)
//       fetchComments(); // Refresh comments
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white w-96 p-4 rounded-lg">
//         <h2 className="text-xl font-bold">Comments</h2>
//         <button onClick={onClose} className="absolute top-2 right-4 text-xl">✖</button>

//         <div className="mt-4 h-48 overflow-y-auto">
//           {comments.length > 0 ? (
//             comments.map((comment) => (
//               <div key={comment.id} className="mb-2 p-2 border rounded text-black">
//                 <p className="font-semibold">{comment.User.name}</p>
//                 <p>{comment.text}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No comments yet.</p>
//           )}
//         </div>

//         <div className="mt-4 flex text-black">
//           <input
//             type="text"
//             placeholder="Add a comment..."
//             className="flex-grow p-2 border rounded-l"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           />
//           <button className="bg-blue-500 text-white px-4 rounded-r" onClick={handleAddComment}>
//             Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CommentModal;

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
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function CommentModal({ postId, onClose }) {
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
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Comments
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {comments.length > 0 ? (
          <List>
            {comments.map((comment, index) => (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight="bold">
                        {comment.User.name}
                      </Typography>
                    }
                    secondary={comment.text}
                  />
                </ListItem>
                {index !== comments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary" align="center">
            No comments yet.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentModal;
