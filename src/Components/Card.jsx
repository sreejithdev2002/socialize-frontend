import React, { useState } from "react";
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
import CommentModal from "./Comment"; // Import Comment Modal
import { LikePostApi } from "../Services/userApi";

export default function PostCard({ data }) {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(data.likes);
  const [liked, setLiked] = useState(data.isLiked); // Boolean: true if user has liked

  const handleLike = async () => {
    try {
      const response = await LikePostApi(data.id);
      setLikes(response.likes); // Update like count
      setLiked(response.liked); // Update like state
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }}>
              {data.user.name.charAt(0)}
            </Avatar>
          }
          title={data.user.name}
        />
        <CardMedia
          component="img"
          image={`http://localhost:5000${data.imageUrl}`}
          alt="Post Image"
          sx={{ width: 400, height: 350, objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="body2">{data.caption}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleLike}>
            <FavoriteIcon sx={{ color: liked ? "red" : ""}} />{" "}
            <p className="text-base ml-1">{likes}</p>
          </IconButton>
          <IconButton onClick={() => setShowComments(true)}>
            <ChatIcon /> <p className="text-base ml-1">{data.comments}</p>
          </IconButton>
        </CardActions>
      </Card>

      {showComments && (
        <CommentModal postId={data.id} onClose={() => setShowComments(false)} />
      )}
    </>
  );
}

// import React, { useState } from "react";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ChatIcon from "@mui/icons-material/Chat";
// import CommentModal from "./Comment";
// import { LikePostApi } from "../Services/userApi"; // Import API function

// export default function PostCard({ data }) {
//   const [showComments, setShowComments] = useState(false);
//   const [likes, setLikes] = useState(data.likes);
//   const [liked, setLiked] = useState(data.isLiked); // Boolean: true if user has liked

//   const handleLike = async () => {
//     try {
//       const response = await LikePostApi(data.id);
//       setLikes(response.likes); // Update like count
//       setLiked(response.liked); // Update like state
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   return (
//     <>
//       <Card sx={{ maxWidth: 400 }}>
//         <CardHeader
//           avatar={<Avatar>{data.user.name.charAt(0)}</Avatar>}
//           title={data.user.name}
//         />
//         <CardMedia
//           component="img"
//           image={`http://localhost:5000${data.imageUrl}`}
//           alt="Post Image"
//           sx={{ width: 400, height: 350, objectFit: "cover" }}
//         />
//         <CardContent>
//           <Typography variant="body2">{data.caption}</Typography>
//         </CardContent>
//         <CardActions>
//           <IconButton onClick={handleLike}>
//             <FavoriteIcon sx={{ color: liked ? "red" : "gray" }} />
//             <Typography variant="body2" sx={{ marginLeft: 1 }}>
//               {likes}
//             </Typography>
//           </IconButton>
//           <IconButton onClick={() => setShowComments(true)}>
//             <ChatIcon />
//             <Typography variant="body2" sx={{ marginLeft: 1 }}>
//               {data.comments}
//             </Typography>
//           </IconButton>
//         </CardActions>
//       </Card>

//       {showComments && (
//         <CommentModal postId={data.id} onClose={() => setShowComments(false)} />
//       )}
//     </>
//   );
// }
