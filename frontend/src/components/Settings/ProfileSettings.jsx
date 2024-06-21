import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { URL } from "../../url";
import Loader from "../Loader";

const ProfileSettings = () => {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  // console.log(email);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        URL + "/api/v1/users/update-account",
        { email: email },
        { withCredentials: true }
      );

      if (file) {
        const formData = new FormData();
        formData.append("avatar", file); // Append the file to the FormData

        const res = await axios.patch(URL + "/api/v1/users/avatar", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Set the Content-Type header for FormData
          },
        });

        console.log(res.data);
      }

      setLoading(false);
      window.location.reload(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setEmail(user.data.email);
  }, [user.data.email]);

  return (
    <div>
      <p className="text-xl text-gray-500">Profile</p>
      <div className="flex items-center justify-center">
        <div className="relative">
          <img
            className="h-32 w-32 rounded-full mt-4"
            src={user.data.avatar}
            alt="profile_photo"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-4 gap-x-6">
        <div>
          <p className="text-md">Username:</p>
          <input
            value={user.data.username}
            className="p-2 border-2 pr-60"
            disabled
          />
        </div>

        <div className="mt-2">
          <p className="text-md">Email:</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-2 pr-60"
          />
        </div>

        <div className="mt-2">
          <p className="text-md">Avatar:</p>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-2 border-2 pr-[135px]"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="flex gap-x-1 p-2 px-4 bg-teal-500 rounded-md mt-6 text-white hover:bg-teal-400"
        >
          {loading ? (
            <div className="flex">
              <Loader size="w-6 h-6" />
              <span>Updating...</span>
            </div>
          ) : (
            <span>Update</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
