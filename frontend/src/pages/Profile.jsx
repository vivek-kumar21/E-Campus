import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/current-user",
          { withCredentials: true }
        );

        // console.log(res.data.data.avatar);

        setEmail(res.data.data.email);
        setUsername(res.data.data.username);
        setAvatar(res.data.data.avatar);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-10 mt-10 mb-10">
        <img
          className="w-[200px] h-[200px] rounded-full"
          src={avatar}
          alt="profile_picture"
        />
        <p className="text-3xl text-gray-900 font-bold -mt-6">{username}</p>
        <p className="text-xl text-gray-800 -mt-10">{email}</p>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
