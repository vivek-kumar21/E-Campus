import axios from "axios";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { URL } from "../../url.js";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import HomePosts from "../../components/blog/HomePosts.jsx";
import { UserContext } from "../../context/userContext.jsx";
import Loader from "../../components/Loader.jsx";
import { IoSearch } from "react-icons/io5";

const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { user } = useContext(UserContext);
  const observer = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${URL}/api/v1/blogs/posts?page=${page}&limit=5&search=${searchTerm}`
        );

        setPosts((prevPosts) => [...prevPosts, ...res.data.data.posts]);
        setHasMore(page < res.data.data.totalPages);
        setNoResults(res.data.data.posts.length === 0);
      } catch (error) {
        console.log(error);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, searchTerm]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
    setPosts([]);
  };

  return (
    <>
      <Navbar />

      <div className="px-4 md:px-8 lg:px-[200px] mt-20 min-h-[80vh]">
        <div className="flex items-center justify-center my-6">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search posts..."
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearch className="text-gray-500" />
            </div>
          </div>
        </div>

        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <Link
                key={post._id}
                to={user ? `/blogs/posts/post/${post._id}` : "/login"}
                ref={lastPostRef}
                className="block"
              >
                <HomePosts post={post} user={user} />
              </Link>
            );
          } else {
            return (
              <Link
                key={post._id}
                to={user ? `/blogs/posts/post/${post._id}` : "/login"}
                className="block"
              >
                <HomePosts post={post} user={user} />
              </Link>
            );
          }
        })}

        {loading && (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
        {noResults && (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>

      <Footer />
    </>
  );
};

export default BlogHome;
