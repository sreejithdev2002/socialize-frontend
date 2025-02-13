import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginApi } from "../Services/userApi";
import { useUser } from "../Context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const values = { email, password };

    try {
      const response = await LoginApi(values);
      if (response.data.token) {
        login(response.data.token, email);
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col justify-center h-dvh">
      <div className="flex flex-col text-center my-2 py-10 bg-black border border-gray-700 rounded">
        <h1 className="text-white text-center text-5xl font-[Courgette]">
          Socialize
        </h1>
        <form
          className="flex flex-col items-center py-5"
          onSubmit={handleLogin}
        >
          <input
            className="bg-[#121212] my-1 p-2 border border-gray-500 rounded-sm text-sm w-[30%]"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <input
            className="bg-[#121212] my-1 p-2 border border-gray-500 rounded-sm text-sm w-[30%]"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button
            className="bg-blue-600 w-[30%] rounded-sm my-1 py-1 text-sm cursor-pointer"
            type="Submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="flex flex-col text-center py-5 bg-black border border-gray-700 rounded">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
