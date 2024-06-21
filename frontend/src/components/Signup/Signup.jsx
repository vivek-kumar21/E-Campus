import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setIsLoading(true);

    // Create FormData object
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          withCredentials: true,
        }
      );

      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setAvatar(res.data.avatar);
      setCoverImage(res.data.coverImage);

      setIsLoading(false);

      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white px-10 py-6 rounded-3xl border-2 border-white my-2">
        <h1 className="text-3xl font-semibold">Join us today!</h1>
        <p className="font-medium text-sm text-gray-500 mt-4">
          It's free and only takes a minute
        </p>
        <div className="mt-8">
          <div>
            <label className="text-lg font-medium">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="text-lg font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-lg font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="text-lg font-medium">Avatar</label>
            <input
              onChange={(e) => setAvatar(e.target.files[0])}
              type="file"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            />
          </div>

          <div>
            <label className="text-lg font-medium">Cover Image</label>
            <input
              onChange={(e) => setCoverImage(e.target.files[0])}
              type="file"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Link className="font-medium text-sm text-gray-500 hover:text-teal-300 duration-300">
              Forgot password
            </Link>
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              onClick={handleSignup}
              className={`relative active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all rounded-xl bg-teal-500 text-white text-lg font-bold ${
                isLoading ? "py-6" : "py-3"
              }`}
            >
              {isLoading ? (
                <svg
                  className="absolute inset-0 m-auto w-6 h-6 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
          <div className="mt-6 flex justify-center items-center">
            <p className="font-medium text-base">Already a member?</p>
            <Link
              to="/login"
              className="text-teal-400 text-base font-medium ml-2"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
