import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  const { user } = useContext(UserContext);
  console.log(user);

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
      <div className="flex items-center justify-center gap-10 mt-8 mb-16">
        <img
          className="w-[180px] h-[180px] rounded-full"
          src={avatar}
          alt="profile_picture"
        />
        <div className="flex gap-8 mt-8">
          <div className="flex flex-col gap-8">
            <div className="bg-gray-200 p-4 pr-52 rounded-xl">
              <h1 className="text-bold text-[18px]">Username</h1>
              <p className="text-sm mt-2">{username}</p>
            </div>
            <div className="bg-gray-200 p-4 pr-52 rounded-xl">
              <h1 className="text-bold text-[18px]">Email</h1>
              <p className="text-sm mt-2">{email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="bg-gray-200 p-4 pr-52 rounded-xl">
              <h1 className="text-bold text-[18px]">Date of account </h1>
              <p className="text-sm mt-2">22-05-2024</p>
            </div>
            <div className="bg-gray-200 p-4 pr-52 rounded-xl">
              <h1 className="text-bold text-[18px]">Address</h1>
              <p className="text-sm mt-2">Katras, Dhanbad</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
