import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../url";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import HomePosts from "../../components/blog/HomePosts";
import Loader from "../../components/Loader";
import { UserContext } from "../../context/userContext.jsx";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  
  const userId = useParams().id;
  // console.log(noResults);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoader(true);
      try {
        const res = await axios.get(URL + "/api/v1/blogs/posts/user/" + userId);

        // console.log(res.data)
        setPosts(res.data.data);
        if (res.data.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <h3>
              <Link to={user ? `/blogs/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </h3>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
