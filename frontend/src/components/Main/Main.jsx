import { Link } from "react-router-dom";
import TypewriterComponent from "typewriter-effect";
import { motion } from "framer-motion";
import { fadeIn } from "../../varients";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Main = () => {
  const { user } = useContext(UserContext);

  return (
    <motion.div
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="text-white font-bold py-32 text-center space-y-5"
    >
      <div className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl space-y-5 font-extrabold text-zinc-300">
        <h1>One Stop Destination</h1>
        <h1>
          For All{" "}
          <span className="text-teal-500 relative">
            <span className="relative">Resources</span>
            <span
              className="absolute inset-x-0 bottom-[-18px] h-8 bg-no-repeat bg-center bg-contain"
              style={{
                backgroundImage: "url(https://www.beyondcss.dev/underline.svg)",
              }}
            ></span>
          </span>
        </h1>
        <div className="text-transparent text-[30px] bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Roadmaps",
                "Internships",
                "Coding Sheets",
                "Coding Arena",
                "Blogs",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Empowering Engineers with Knowledge, Skills, and Opportunity.
        <br />
        Your Gateway to Engineering Excellence Starts Here.
      </div>
      <div>
        {user ? (
          ""
        ) : (
          <Link to="/login">
            <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-blue-500 duration-300">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default Main;
