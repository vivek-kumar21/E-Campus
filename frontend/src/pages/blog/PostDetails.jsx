// PostDetails.js

import { useNavigate, useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../../url";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Comment from "../../components/blog/Comment";
import { UserContext } from "../../context/userContext";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(true);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/v1/blogs/posts/" + postId, {
        withCredentials: true,
      });

      if (res.data.statusCode === 200) {
        toast.success("Post deleted successfully");
        navigate("/blogs");
      } else {
        toast.error("Post deletion failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoader(true);
      try {
        const res = await axios.get(URL + "/api/v1/blogs/posts/" + postId);

        if (res.data.data) {
          setPost(res.data.data);
        } else {
          toast.error("Post not found");
        }
      } catch (err) {
        toast.error("Error fetching post data");
        console.log(err);
      } finally {
        setLoader(false);
      }
    };

    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/v1/blogs/comments/" + postId);
      setComments(res.data.data);
    } catch (err) {
      toast.error("Error fetching comments");
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostComments();
    }
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        URL + "/api/v1/blogs/comments/create",
        {
          comment: comment,
          author: user.data.username,
          postId: postId,
          userId: user.data._id,
        },
        { withCredentials: true }
      );

      fetchPostComments();
      setComment("");
    } catch (err) {
      toast.error("Error posting comment");
      console.log(err);
    }
  };

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((c) => c._id !== commentId)
    );
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : post ? (
        <div className="px-8 md:px-[200px] mt-20">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user.data?._id === post?.userId && (
              <div className="flex items-center space-x-2">
                <p
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => navigate("/blogs/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={handleDeletePost}
                >
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <div className="flex items-center space-x-2">
              <img
                className="w-8 h-8 rounded-full"
                src={post.profileImage}
                alt="profile_photo"
              />
              <p className="font-semibold text-gray-700">@{post.username}</p>
            </div>
            <div className="flex space-x-2 text-gray-500">
              <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
              <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
            </div>
          </div>
          <img
            src={post.photo}
            className="w-full mx-auto mt-8 rounded-lg shadow-md"
            alt="Post"
          />
          <div
            className="mx-auto mt-8 text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
          <div className="flex flex-col mt-8 space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4 font-semibold text-gray-700">
            <p>Categories:</p>
            <div className="flex flex-wrap gap-2">
              {post.categories?.map((c, i) => (
                <div
                  key={i}
                  className="bg-gray-300 rounded-lg px-3 py-1 text-sm"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Editor Details */}
          <div className="flex flex-col items-center mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Editor Details:
            </h3>
            <div className="flex flex-col items-center gap-4">
              <img
                className="w-24 h-24 rounded-full border-2 border-gray-300"
                src={post.profileImage}
                alt="Editor Profile"
              />
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {post.username}
                </p>
                <p className="text-sm text-gray-600">{post.email}</p>
                <p className="text-sm text-gray-600">
                  {post.editorDesignation}
                </p>
                <p className="text-sm text-gray-600">{post.editorCollege}</p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Comments
            </h3>
            {comments?.length ? (
              <div className="space-y-4">
                {comments.map((c) => (
                  <Comment
                    key={c._id}
                    c={c}
                    onCommentDelete={handleCommentDelete} // Pass callback
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No comments yet.</p>
            )}
            {/* Write a comment */}
            <div className="flex flex-col mt-6 md:flex-row md:gap-x-4">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Write a comment"
                className="md:w-[80%] w-full border rounded-md py-2 px-4 mb-4 md:mb-0"
              />
              <button
                onClick={postComment}
                className="bg-black text-sm text-white px-4 py-2 rounded-md md:w-[20%]"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <p className="text-xl">Post not found</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
