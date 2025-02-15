import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { Avatar, Tooltip, Button } from "@mui/material";
import { toast } from "react-toastify";

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("User Logged Out")
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center w-full px-5 py-3">
      <Link
        to="/"
        className="text-white text-center text-3xl font-[Courgette] cursor-pointer"
      >
        Socialize
      </Link>
      <div className="flex items-center space-x-4">
        <Tooltip title={user?.name || "Profile"} arrow>
          <Link
            to="/profile"
            className="flex items-center text-white space-x-2"
          >
            <Avatar sx={{ bgcolor: "#f50057", width: 30, height: 30 }}>
              {user?.name?.charAt(0) || "U"}
            </Avatar>
          </Link>
        </Tooltip>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Header;
