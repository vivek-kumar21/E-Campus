import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {URL} from "../../url.js";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProfilePosts from "../../components/blog/ProfilePosts.jsx";
import { UserContext } from "../../context/userContext.jsx";

const BlogProfile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserContext);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + param);

      setUsername(res.data.username);
      setEmail(res.data.email);
      // setPassword(res.data.password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = axios.put(
        URL + "/api/users/" + user._id,
        { username, email },
        { withCredentials: true }
      );

      setUpdated(true);
    } catch (error) {
      console.log(error);
      setUpdated(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <div>
      <Navbar />

      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your posts: </h1>
          {posts?.map((post) => (
            <Link key={post._id} to={"/blogs/posts/post/" + post._id}>
              <ProfilePosts post={post} />
            </Link>
          ))}
        </div>
        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 border-2 border-black outline-0 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-4 py-2 border-2 border-black outline-0 text-gray-500"
              placeholder="Your email"
              type="email"
            />
            {/* <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none px-4 py-2 border-2 border-black outline-0 text-gray-500"
              placeholder="Your password"
              type="password"
            /> */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold rounded-lg bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogProfile;
