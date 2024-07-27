import { CgProfile } from "react-icons/cg";
import { PiPassword } from "react-icons/pi";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";
import OTPField from "./OTPFIeld";

const Main = () => {
  const Menus = [
    { title: "Profile", link: "profile", icon: <CgProfile /> },
    { title: "Password", link: "password", icon: <PiPassword /> },
  ];

  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-16">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-gray-200 flex-shrink-0">
        <div className="flex flex-col gap-x-4 p-4 h-full">
          <ul className="pt-4 flex-1">
            {Menus.map((menu, i) => (
              <li key={i}>
                <Link
                  to={menu.link}
                  className={`text-gray-600 mb-2 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md ${
                    location.pathname.includes(menu.link) ? "bg-gray-300" : ""
                  }`}
                >
                  <span className="text-xl">{menu.icon}</span>
                  <span>{menu.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl">Settings</h1>

        <Routes>
          <Route path="/" element={<Navigate to="profile" />} />
          <Route exact path="profile" element={<ProfileSettings />} />
          <Route path="password" element={<PasswordSettings />} />
          <Route path="password/otp" element={<OTPField />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
