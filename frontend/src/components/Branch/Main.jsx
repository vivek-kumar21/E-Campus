import { Link } from "react-router-dom";

import cseIcon from "../../assets/branch/cse.png";
import itIcon from "../../assets/branch/it.png";
import aimlIcon from "../../assets/branch/aiml.png";
import iotIcon from "../../assets/branch/iot.png";
import eceIcon from "../../assets/branch/ece.png";
import eeIcon from "../../assets/branch/ee.png";
import eeeIcon from "../../assets/branch/eee.png";
import meIcon from "../../assets/branch/me.png";
import csbsIcon from "../../assets/branch/csbs.png";

const branch = [
  {
    title: "CSE",
    fullForm: "Computer Science and Engineering",
    desc: "Dive into the world of computing and learn about software development, algorithms, and data structures.",
    logo: cseIcon,
    borderColor: "orange",
    link: "cse",
  },
  {
    title: "IT",
    fullForm: "Information Technology",
    desc: "Focus on the application of technology in managing and processing information.",
    logo: itIcon,
    borderColor: "yellow",
    link: "it",
  },
  {
    title: "CSE-AIML",
    fullForm: "Computer Science and Engineering(AIML)",
    desc: "Specialize in Artificial Intelligence and Machine Learning to create intelligent systems.",
    logo: aimlIcon,
    borderColor: "green",
    link: "cse-aiml",
  },
  {
    title: "CSE-IOT",
    fullForm: "Computer Science and Engineering(Internet of Things)",
    desc: "Learn about interconnected devices and how they communicate over the internet.",
    logo: iotIcon,
    borderColor: "blue",
    link: "cse-iot",
  },
  {
    title: "ECE",
    fullForm: "Electronics and Communication Engineering",
    desc: "Study the design and development of electronic devices and communication systems.",
    logo: eceIcon,
    borderColor: "gray",
    link: "ece",
  },
  {
    title: "EE",
    fullForm: "Electrical Engineering",
    desc: "Explore the fundamentals of electrical systems and their applications in various fields.",
    logo: eeIcon,
    borderColor: "red",
    link: "ee",
  },
  {
    title: "EEE",
    fullForm: "Electrical and Electronics Engineering",
    desc: "Combine the principles of electrical and electronic engineering for diverse applications.",
    logo: eeeIcon,
    borderColor: "violet",
    link: "eee",
  },
  {
    title: "ME",
    fullForm: "Mechanical Engineering",
    desc: "Learn about the design, analysis, and manufacturing of mechanical systems.",
    logo: meIcon,
    borderColor: "purple",
    link: "me",
  },
  {
    title: "CSBS",
    fullForm: "Computer Science and Business Studies",
    desc: "Integrate computer science with business studies for a comprehensive understanding.",
    logo: csbsIcon,
    borderColor: "fuchsia",
    link: "csbs",
  },
];

const Main = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="flex flex-col items-center justify-center mt-24 mb-20 text-center">
        <p className="text-5xl text-slate-800 font-extrabold">
          Explore{" "}
          <span className="text-teal-500 relative">
            <span className="relative">Engineering</span>
            <span
              className="absolute inset-x-0 bottom-[-18px] h-8 bg-no-repeat bg-center bg-contain"
              style={{
                backgroundImage: "url(https://www.beyondcss.dev/underline.svg)",
              }}
            ></span>
          </span>{" "}
          Resources
        </p>
        <p className="text-xl text-gray-700 mt-4 px-4 w-full max-w-3xl">
          Empower your engineering journey with our comprehensive resource
          library, tailored for every branch. Enhance your skills, deepen your
          knowledge, and grow your career with our curated content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
        {branch.map((branchItem, i) => (
          <div
            key={i}
            className="flex flex-col justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 duration-300"
            style={{ borderTop: `6px solid ${branchItem.borderColor}` }}
          >
            <div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {branchItem.title}
                </h2>
                <h3 className="text-lg text-gray-800 font-medium mb-4">
                  {branchItem.fullForm}
                </h3>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">{branchItem.desc}</p>
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex items-center justify-between">
                <Link to={`/branch/${branchItem.link}`}>
                  <button className="p-2 px-4 border border-teal-200 rounded-md bg-teal-50 hover:bg-teal-400 hover:text-white duration-300">
                    See Details
                  </button>
                </Link>
                <img className="w-20 h-20" src={branchItem.logo} alt="icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
