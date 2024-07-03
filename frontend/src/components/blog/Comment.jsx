import axios from "axios";
// import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../../url";
import { useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

const Comment = ({ c }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(c);

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/v1/blogs/comments/" + id, {
        withCredentials: true,
      });

      window.location.reload(true);
      navigate("/blogs/posts/post/" + c.postId);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p className="md:flex hidden">{new Date(c.updatedAt).toString().slice(16, 21)}</p>
          {user?.data._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
