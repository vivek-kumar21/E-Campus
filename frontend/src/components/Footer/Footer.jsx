import { Link } from "react-router-dom";
import Item from "./Item";
import { INFORMATION, RESOURCES, COMPANY, UPDATES } from "./Menus";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
        <Item Links={INFORMATION} title="INFORMATION" />
        <Item Links={RESOURCES} title="RESOURCES" />
        <Item Links={COMPANY} title="COMPANY" />
        <Item Links={UPDATES} title="UPDATES" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>@ 2024 e-campus. All rights reserved.</span>
        <span>Terms . Privacy Policy</span>
        <div>
          <span
            className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
          >
            <Link>
              <FaFacebook />
            </Link>
          </span>
          <span
            className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
          >
            <Link>
              <FaGithub />
            </Link>
          </span>
          <span
            className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
          >
            <Link>
              <FaInstagram />
            </Link>
          </span>
          <span
            className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
          >
            <Link>
              <FaLinkedin />
            </Link>
          </span>
          <span
            className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
          >
            <Link>
              <FaTwitter />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
