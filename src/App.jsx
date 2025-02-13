// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router";
// // import FloatingNav from "./Components/FloatingNav";
// import CreatePost from "./Pages/CreatePost";
// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Profile from "./Pages/Profile";
// import Signup from "./Pages/Signup";
// import { useState } from "react";

// function App() {
//   // const isLoggedIn = true;
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   const token = localStorage.getItem("token");

//   if (token) {
//     setIsLoggedIn(true);
//   }

//   return (
//     <div className="mx-10 lg:mx-[30%] md:mx-[30%] h-dvh">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           {isLoggedIn ? (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/create-post" element={<CreatePost />} />
//             </>
//           ) : (
//             ""
//           )}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import LoadingSpinner from "./Components/LoadingSpinner";

// Lazy loading for better performance
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Profile = lazy(() => import("./Pages/Profile"));
const CreatePost = lazy(() => import("./Pages/CreatePost"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token presence to boolean
    setTimeout(() => setLoading(false), 1000); // Simulate loading delay
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  // };

  if (loading) {
    return (
      // <div className="flex justify-center items-center h-screen">
      //   <span className="text-white text-lg">Loading...</span>
      // </div>
      <div className="flex h-dvh justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
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
                {/* <Route path="/logout" element={<Logout onLogout={handleLogout} />} /> */}
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

// Logout component for handling logout
// function Logout({ onLogout }) {
//   useEffect(() => {
//     onLogout();
//   }, [onLogout]);

//   return <Navigate to="/login" />;
// }

// Loading screen component for Suspense
function LoadingScreen() {
  return (
    <div className="flex h-dvh justify-center items-center">
      <LoadingSpinner />
    </div>
  );
}

export default App;
