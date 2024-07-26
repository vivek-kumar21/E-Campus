import { Route, Routes } from "react-router-dom";
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
import Auth from "./Auth";

function App() {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
}

function AppContent() {
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />

      {/* Navbar routes */}
      {!user && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </>
      )}
      <Route path="/chatbot" element={<ChatBot />} />
      <Route
        path="/profile"
        element={
          <Auth>
            <Profile />
          </Auth>
        }
      />
      <Route
        path="/settings/*"
        element={
          <Auth>
            <Settings />
          </Auth>
        }
      />

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
      <Route path="/blogs/create" element={<CreatePost />} />
      <Route path="/blogs/posts/post/:id" element={<PostDetails />} />
      <Route path="/blogs/edit/:id" element={<EditPost />} />
      <Route path="/blogs/myblogs/:id" element={<MyBlogs />} />
      <Route path="/blogs/profile/:id" element={<BlogProfile />} />
    </Routes>
  );
}

export default App;
