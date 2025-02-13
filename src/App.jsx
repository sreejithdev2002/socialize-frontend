import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import LoadingSpinner from "./Components/LoadingSpinner";
import { UserProvider } from "./Context/UserContext";

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Profile = lazy(() => import("./Pages/Profile"));
const CreatePost = lazy(() => import("./Pages/CreatePost"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex h-dvh justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <UserProvider>
      <div className="mx-10 lg:mx-[30%] md:mx-[30%] h-dvh">
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {isLoggedIn ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/create-post" element={<CreatePost />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

function LoadingScreen() {
  return (
    <div className="flex h-dvh justify-center items-center">
      <LoadingSpinner />
    </div>
  );
}

export default App;
