import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-10 mt-24 mb-10">
        <img
          className="w-[200px] h-[200px] rounded-full"
          src={user.data.avatar}
          alt="profile_picture"
        />
        <p className="text-3xl text-gray-900 font-bold -mt-6">
          {user.data.username}
        </p>
        <p className="text-xl text-gray-800 -mt-10">{user.data.email}</p>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
