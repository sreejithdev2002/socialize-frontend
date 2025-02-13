import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpApi } from "../Services/userApi";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const values = {
      name,
      email,
      password,
    };
    try {
      const response = await SignUpApi(values);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/login");
      console.log("User Account Created");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else if (error.response?.status === 401) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center h-dvh">
      <div className="flex flex-col text-center my-2 py-10 bg-black border border-gray-700 rounded">
        <h1 className="text-white text-center text-5xl font-[Courgette]">
          Socialize
        </h1>
        <p className="my-1 text-sm text-gray-300">
          Sign up to see photos from your friends.
        </p>
        <form
          className="flex flex-col items-center py-5"
          onSubmit={handleSignUp}
        >
          <input
            className="bg-[#121212] my-1 p-2 border border-gray-500 rounded-sm text-sm w-[30%]"
            type="text"
            name="name"
            placeholder="Username"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-[#121212] my-1 p-2 border border-gray-500 rounded-sm text-sm w-[30%]"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-[#121212] my-1 p-2 border border-gray-500 rounded-sm text-sm w-[30%]"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 w-[30%] rounded-sm my-1 py-1 text-sm cursor-pointer"
            type="Submit"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="flex flex-col text-center py-5 bg-black border border-gray-700 rounded">
        <p>
          Have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
