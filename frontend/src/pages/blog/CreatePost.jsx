import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { URL } from "../../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(user.data.username);

  const navigate = useNavigate();

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
    updatedCats.splice(i);
    setCategories(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...categories];
    updatedCats.push(category);
    setCategory("");
    setCategories(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const sanitizedDesc = DOMPurify.sanitize(desc);

    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", sanitizedDesc);
    formData.append("username", user.data.username);
    formData.append("profileImage", user.data.avatar);
    formData.append("photo", file);
    formData.append("userId", user.data._id);

    // Append each category individually
    categories.forEach((category) => {
      formData.append("categories[]", category);
    });

    try {
      setLoading(true);
      const res = await axios.post(
        URL + "/api/v1/blogs/posts/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);
      navigate("/blogs/posts/post/" + res.data.data._id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-20">
        <h1 className="font-bold md:text-2xl text-xl ">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
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

            {/* categories */}
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
            onClick={handleCreate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md"
          >
            {loading ? <Loader size={"w-8 h-8"} /> : <p>Create</p>}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
