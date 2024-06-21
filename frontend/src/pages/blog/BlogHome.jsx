import axios from "axios";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { URL } from "../../url.js";
import { Link, useLocation } from "react-router-dom";
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
  const { search } = useLocation();
  const { user } = useContext(UserContext);
  const observer = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${URL}/api/v1/blogs/posts?page=1&limit=5${search}`
        );
        const sortedPosts = res.data.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setPosts(sortedPosts);
        setHasMore(res.data.data.length > 0);
        setNoResults(res.data.data.length === 0);
      } catch (error) {
        console.log(error);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoading(true);
          const nextPage = Math.ceil(posts.length / 5) + 1;
          
          axios
            .get(`${URL}/api/v1/blogs/posts?page=${nextPage}&limit=5${search}`)
            .then((res) => {
              const sortedPosts = res.data.data.sort(
                (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
              );
              setPosts((prevPosts) => [...prevPosts, ...sortedPosts]);
              setHasMore(res.data.data.length > 0);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, search, posts.length]
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="px-8 md:px-[200px] min-h-[80vh]">
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

        {filteredPosts.map((post, index) => {
          if (filteredPosts.length === index + 1) {
            return (
              <Link
                key={post._id}
                to={user ? `/blogs/posts/post/${post._id}` : "/login"}
                ref={lastPostRef}
              >
                <HomePosts post={post} user={user} />
              </Link>
            );
          } else {
            return (
              <Link
                key={post._id}
                to={user ? `/blogs/posts/post/${post._id}` : "/login"}
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
