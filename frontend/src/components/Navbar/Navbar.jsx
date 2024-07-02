import NavLinks from "./NavLinks";
import { IoMenu, IoClose } from "react-icons/io5";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { URL } from "../../url";
import img from "../../assets/e-campus.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  // console.log(user.data.avatar);

  const menuRef = useRef();
  const imgRef = useRef();

  // const username = user.data.username;
  // console.log(username);

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setIsOpen(false);
    }
  });

  const handleLogout = async () => {
    try {
      const res = await fetch(URL + "/api/v1/users/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${user.data.accessToken}` },
      });

      console.log("logout: ", res);

      // Clear the token from localStorage
      localStorage.clear();

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <div className="pt-2 flex items-center font-medium justify-around w-full bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg">
        <div className="z-50 p-2 md:w-auto w-full flex justify-between items-center md:mt-0 mt-4">
          <Link to="/" className="md:block flex items-center">
            <img src={img} alt="e-campus logo" className="w-52 h-auto" />
          </Link>
          <div
            onClick={() => setOpen(!open)}
            className={`-mt-2 md:-mt-0
      ${
        open
          ? "text-3xl md:hidden flex cursor-pointer"
          : "text-3xl md:hidden flex text-white cursor-pointer"
      }`}
          >
            <div className="pl-6 pr-2">{!open ? <IoMenu /> : <IoClose />}</div>
          </div>
        </div>

        <ul className="md:flex hidden items-center gap-6 font-mono">
          <NavLinks />
        </ul>
        {user ? (
          <div className="relative">
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
                className="bg-white rounded-md p-4 w-52 z-50 shadow-lg absolute top-[43px] right-[1px]"
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
                    <h3 onClick={handleLogout}>Logout</h3>
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
