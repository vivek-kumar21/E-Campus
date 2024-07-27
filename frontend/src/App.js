import { Route, Routes, useNavigate, Navigate, Outlet } from "react-router-dom";
import { UserContext, UserContextProvider } from "./context/userContext";
import { useContext, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ChatBot from "./pages/ChatBot";
import Profile from "./pages/Profile";
import BlogHome from "./pages/blog/BlogHome";
import CreatePost from "./pages/blog/CreatePost";
import PostDetails from "./pages/blog/PostDetails";
import EditPost from "./pages/blog/EditPost";
import BlogProfile from "./pages/blog/BlogProfile";
import MyBlogs from "./pages/blog/MyBlogs";
import Internships from "./pages/internship/Internships";
import InternshipDetails from "./pages/internship/InternshipDetails";
import Sheets from "./pages/Sheets/Sheets";
import Roadmaps from "./pages/Roadmaps/roadmaps";
import Settings from "./pages/Settings/Settings";
import Branch from "./pages/Branch/Branch";
import BranchDetails from "./components/Branch/BranchDetails";
import CodingArena from "./pages/CodingArena/CodingArena";
import ForgotPassword from "./components/Login/ForgotPassword";

function App() {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
}

function PublicRoute({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  return children ? children : <Outlet />;
}

function AppContent() {
  const { getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />

      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* Authenticated routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/*"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/roadmaps" element={<Roadmaps />} />
      <Route path="/sheets" element={<Sheets />} />

      {/* Branch routes */}
      <Route path="/branch" element={<Branch />} />
      <Route path="/branch/:branchName" element={<BranchDetails />} />

      {/* Internships routes */}
      <Route path="/internships" element={<Internships />} />
      <Route path="/internships/:id" element={<InternshipDetails />} />

      {/* Coding Arena */}
      <Route path="/coding-arena" element={<CodingArena />} />

      {/* Blog routes */}
      <Route path="/blogs" element={<BlogHome />} />
      <Route path="/blogs/posts/post/:id" element={<PostDetails />} />
      <Route path="/blogs/create" element={<CreatePost />} />
      <Route path="/blogs/edit/:id" element={<EditPost />} />
      <Route path="/blogs/myblogs/:id" element={<MyBlogs />} />
      <Route path="/blogs/profile/:id" element={<BlogProfile />} />
    </Routes>
  );
}

export default App;
