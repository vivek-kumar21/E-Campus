import { ImCross } from "react-icons/im";
import { useContext, useEffect, useState } from "react";
import { URL } from "../../url";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import Loader from "../../components/Loader";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const postId = useParams().id;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
    ],
  };

  const deleteCategory = (i) => {
    let updatedCats = [...categories];
    updatedCats.splice(i, 1)
    setCategories(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...categories];
    updatedCats.push(category);
    setCategory("");
    setCategories(updatedCats);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${URL}/api/v1/blogs/posts/${postId}`);

        setTitle(res.data.data.title);
        setDesc(res.data.data.description);
        setFile(null);
        setCategories(res.data.data.categories);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const sanitizedDesc = DOMPurify.sanitize(desc);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", sanitizedDesc);
    formData.append("username", user.data.username);
    formData.append("profileImage", user.data.avatar);
    if (file) {
      formData.append("photo", file);
    }
    formData.append("userId", user.data._id);

    categories.forEach((category) => {
      formData.append("categories[]", category);
    });

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${URL}/api/v1/blogs/posts/${postId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      navigate(`/blogs/posts/post/${res.data.data._id}`);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error("Error updating post:", err);
    }
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="flex items-center justify-center mt-48 mb-48">
          <Loader />
        </div>
      ) : (
        <div className="px-6 md:px-[200px] mt-8">
          <h1 className="font-bold md:text-2xl text-xl ">Update post</h1>
          <form
            className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
            onSubmit={handleUpdate}
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter post title"
              className="px-4 py-2 border-2 rounded-md border-black outline-none"
            />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="px-4 py-2 border-2 rounded-md border-black outline-none"
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 md:space-x-8">
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 border-2 rounded-md border-black outline-none "
                  placeholder="Enter post category"
                  type="text"
                />
                <div
                  onClick={addCategory}
                  className="bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-md"
                >
                  Add
                </div>
              </div>

              <div className="flex px-4 mt-3">
                {categories?.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                  >
                    <p>{c}</p>
                    <p
                      onClick={() => deleteCategory(i)}
                      className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                    >
                      <ImCross />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ReactQuill
              theme="snow"
              value={desc}
              onChange={setDesc}
              modules={modules}
            />

            <button
              type="submit"
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md"
            >
              {isLoading ? <Loader size={"w-8 h-8"} /> : <p>Update</p>}
            </button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EditPost;
