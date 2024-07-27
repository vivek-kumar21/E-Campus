import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-8 mt-24 mb-10 p-4 bg-white shadow-sm">
        <img
          className="w-[150px] h-[150px] rounded-full border-4 border-gray-300"
          src={user.data.avatar}
          alt="profile_picture"
        />
        <div className="text-center">
          <p className="text-4xl text-gray-900 font-semibold mb-2">
            {user.data.username}
          </p>
          <p className="text-lg text-gray-600 mb-4">{user.data.email}</p>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <p className="text-lg text-gray-700 mb-2">
              <strong>College:</strong> {user.data.college}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Designation:</strong> {user.data.designation}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
