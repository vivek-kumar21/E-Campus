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
    <div className="flex mt-16">
      <div className={`w-72 h-screen bg-gray-200 relative`}>
        <div className="flex flex-col gap-x-4 p-4">
          <ul className="pt-4">
            {Menus.map((menu, i) => (
              <Link
                to={menu.link}
                key={i}
                className={`text-gray-600 mb-2 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md ${
                  location.pathname.includes(menu.link) ? "bg-gray-300" : ""
                }`}
              >
                <p className="text-xl">{menu.icon}</p>
                <span>{menu.title}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-4 flex-1 h-screen">
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
