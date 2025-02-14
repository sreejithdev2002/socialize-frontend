import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./Components/LoadingSpinner";
import { UserProvider, useUser } from "./Context/UserContext";
import { ToastContainer } from 'react-toastify';


const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Profile = lazy(() => import("./Pages/Profile"));
const CreatePost = lazy(() => import("./Pages/CreatePost"));

function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

function MainApp() {
  const { isLoggedIn } = useUser();

  return (
    <div className="mx-10 lg:mx-[30%] md:mx-[30%] h-dvh">
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            />
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
      <ToastContainer theme="dark"/>
    </div>
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
