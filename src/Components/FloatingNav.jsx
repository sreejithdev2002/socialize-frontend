import React, { useState } from "react";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const FloatingNav = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-post");
    console.log("Clicked create post");
  };

  return (
    <div className="fixed bottom-6 right-6">
      <Tooltip title="Create Post" placement="left">
        <Fab color="primary" onClick={handleClick}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default FloatingNav;
