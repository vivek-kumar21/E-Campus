import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { URL } from "../../url";
import Loader from "../Loader";

const PasswordSettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleUpdate = async () => {
    if (newPassword !== retypeNewPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(URL + "/api/v1/users/send-passwordOtp", {
        email: user.data.email,
        oldPassword,
        newPassword,
      });

      console.log(res);
      navigate("/settings/password/otp");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorMessage("Failed to send OTP");
    }
  };

  return (
    <div>
      <p className="text-xl text-gray-500">Password</p>
      <div className="flex flex-col items-center justify-center mt-4 gap-x-6">
        <div>
          <p className="text-md">Old password:</p>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="p-2 border-2 pr-60"
          />
        </div>

        <div className="mt-2">
          <p className="text-md">New password:</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 border-2 pr-60"
          />
        </div>

        <div className="mt-2">
          <p className="text-md">Re-type password:</p>
          <input
            type="password"
            value={retypeNewPassword}
            onChange={(e) => {
              setRetypeNewPassword(e.target.value);
              if (newPassword !== e.target.value) {
                setErrorMessage("Passwords do not match");
              } else {
                setErrorMessage("");
              }
            }}
            className="p-2 border-2 pr-60"
          />
        </div>

        {errorMessage && (
          <div className="mt-2 text-red-500">{errorMessage}</div>
        )}

        <button
          onClick={handleUpdate}
          className="flex items-center justify-center gap-x-1 w-24 h-10 bg-teal-500 rounded-md mt-6 text-white hover:bg-teal-400"
        >
          {loading ? <Loader size={"w-6 h-6"} /> : <span>Update</span>}
        </button>
      </div>
    </div>
  );
};

export default PasswordSettings;
