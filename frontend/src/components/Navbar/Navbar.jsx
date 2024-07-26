import NavLinks from "./NavLinks";
import { IoMenu, IoClose } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { URL } from "../../url";
import img from "../../assets/e-campus.png";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  // console.log(user);

  const menuRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        imgRef.current &&
        !imgRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        URL + "/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      console.log("logout: ", res);

      localStorage.clear();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed md:flex top-0 left-0 w-full z-10">
      <div className="md:pt-2 pt-4 md:pb-0 pb-4 flex items-center font-medium justify-between md:px-9 px-0 w-full bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg">
        <div className="flex items-center z-50">
          <div
            onClick={() => setOpen(!open)}
            className={`text-3xl ml-4 cursor-pointer ${
              open ? "" : "text-white"
            } md:hidden`}
          >
            {!open ? <IoMenu /> : <IoClose />}
          </div>
          <Link to="/" className="ml-0 md:ml-0">
            <img
              src={img}
              alt="e-campus logo"
              className="md:w-52 w-36 h-auto md:ml-4 ml-2"
            />
          </Link>
        </div>

        <ul className="md:flex hidden items-center gap-6 font-mono">
          <NavLinks />
        </ul>

        {user ? (
          <div className="relative md:pr-0 pr-2">
            <img
              ref={imgRef}
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer w-9 h-9 rounded-full"
              src={user.data.avatar}
              alt="profile_picture"
            />

            {isOpen && (
              <div
                ref={menuRef}
                className="bg-white rounded-md p-4 w-52 shadow-lg absolute top-[43px] right-0"
              >
                <ul>
                  <li
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-sm cursor-pointer rounded hover:bg-teal-200"
                  >
                    <h3 onClick={() => navigate("/profile")}>Profile</h3>
                  </li>
                  <li
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-sm cursor-pointer rounded hover:bg-teal-200"
                  >
                    <h3 onClick={() => navigate("/blogs/create")}>
                      Create a blog
                    </h3>
                  </li>
                  <li
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-sm cursor-pointer rounded hover:bg-teal-200"
                  >
                    <h3
                      onClick={() =>
                        navigate("/blogs/myblogs/" + user.data._id)
                      }
                    >
                      My blogs
                    </h3>
                  </li>
                  <li
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-sm cursor-pointer rounded hover:bg-teal-200"
                  >
                    <h3 onClick={() => navigate("/settings")}>Settings</h3>
                  </li>
                  <li
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-sm cursor-pointer rounded hover:bg-teal-200"
                  >
                    <h3 onClick={() => handleLogout()}>Logout</h3>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="md:flex hidden">
            <div className="mr-2">
              <Link
                className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-blue-500 duration-300"
                to="/signup"
              >
                Signup
              </Link>
            </div>
            <div>
              <Link
                className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-blue-500 duration-300"
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        )}

        {/* Mobile nav */}
        <ul
          className={`
          md:hidden fixed w-screen h-full right-0 top-0 left-0 py-24 pl-4
          duration-500 ${open ? "left-0" : "left-[-100%]"} 
        `}
        >
          <div className="text-black bg-white absolute top-0 left-0 h-screen pl-10 w-56">
            <NavLinks isOpen={open} />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
