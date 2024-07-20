import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { URL } from "../../url";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${URL}/api/v1/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", res.data.data.accessToken);

      // console.log(res.data.data.user);
      setUser(res.data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <div className="w-full flex items-center justify-center ">
        <div className="bg-white px-10 py-10 rounded-3xl border-2 border-white my-7">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="font-medium text-sm text-gray-500 mt-4">
            Welcome back! Please enter your details.
          </p>
          <div className="mt-8">
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

            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

            <div className="mt-8 flex justify-between items-center">
              <Link className="font-medium text-sm text-gray-500 hover:text-teal-300 duration-300">
                Forgot password
              </Link>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                onClick={handleLogin}
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
                  <span>Sign in</span>
                )}
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Don't have an account?</p>
              <Link
                to="/signup"
                className="text-teal-400 text-base font-medium ml-2"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
