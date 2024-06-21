import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import img1 from "../../assets/roadmaps/frontend.svg";
import img2 from "../../assets/roadmaps/backend.jpg";
import img3 from "../../assets/roadmaps/devops.webp";
import img4 from "../../assets/roadmaps/react.jpg";
import img5 from "../../assets/roadmaps/nodejs.png";
import img6 from "../../assets/roadmaps/fullstack.png";
import img7 from "../../assets/roadmaps/android.webp";
import img8 from "../../assets/roadmaps/python.png";
import img9 from "../../assets/roadmaps/cloud.webp";
import img10 from "../../assets/roadmaps/machine.png";
import img11 from "../../assets/roadmaps/spring-boot.png";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa6";

const roadmaps = [
  {
    name: "Frontend Developer",
    image: img1,
    desc: "A comprehensive guide to becoming a proficient frontend developer, covering essential skills and technologies.",
    link: "https://roadmap.sh/frontend",
  },
  {
    name: "Backend Developer",
    image: img2,
    desc: "This roadmap helps you understand the path to becoming a successful backend developer.",
    link: "https://roadmap.sh/backend",
  },
  {
    name: "DevOps Engineer",
    image: img3,
    desc: "Learn the critical skills and tools required to excel as a DevOps engineer with this detailed roadmap.",
    link: "https://roadmap.sh/devops",
  },
  {
    name: "React Developer",
    image: img4,
    desc: "A step-by-step guide to becoming a React developer, from basics to advanced concepts.",
    link: "https://roadmap.sh/react",
  },
  {
    name: "Node.js Developer",
    image: img5,
    desc: "This roadmap provides a structured path to mastering Node.js for backend development.",
    link: "https://roadmap.sh/nodejs",
  },
  {
    name: "Fullstack Developer",
    image: img6,
    desc: "Gain insights into both frontend and backend development with this comprehensive fullstack developer roadmap.",
    link: "https://roadmap.sh/fullstack",
  },
  {
    name: "Android Developer",
    image: img7,
    desc: "Step-by-step guide to becoming an Android developer, covering necessary skills and tools.",
    link: "https://roadmap.sh/android",
  },
  {
    name: "Python Developer",
    image: img8,
    desc: "A comprehensive roadmap to mastering Python development, including important libraries and frameworks.",
    link: "https://roadmap.sh/python",
  },
  {
    name: "Cloud Engineer",
    image: img9,
    desc: "This roadmap guides you through the skills and knowledge needed to become a cloud engineer.",
    link: "https://roadmap.sh/cloud",
  },
  {
    name: "Machine Learning Engineer",
    image: img10,
    desc: "Detailed guide to becoming a machine learning engineer, covering key concepts and tools.",
    link: "https://roadmap.sh/machinelearning",
  },
  {
    name: "Spring Boot Developer",
    image: img11,
    desc: "Detailed guide to becoming a spring boot developer, covering key concepts and tools.",
    link: "https://roadmap.sh/spring-boot",
  },
];

const Roadmaps = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center relative justify-center bg-gray-100 py-48 px-20">
        <p className="text-4xl text-slate-800 font-bold">
          Navigate Your Career Journey with{" "}
          <span className="text-teal-500 relative">
            <span className="relative">Confidence</span>
            <span
              className="absolute inset-x-0 bottom-[-18px] h-8 bg-no-repeat bg-center bg-contain"
              style={{
                backgroundImage: "url(https://www.beyondcss.dev/underline.svg)",
              }}
            ></span>
          </span>
        </p>
        <p className="text-center text-gray-500 mt-2 px-4 w-2/3">
          Explore Our Detailed Roadmaps for Every Professional Path.
        </p>
        <div>
          <p className="bg-orange-500 p-2 px-4 text-white absolute top-20 left-32">
            Web Development
            <FaLocationArrow className="text-orange-500 text-xl absolute rotate-90 left-[158px] top-[35px]" />
          </p>
          <p className="bg-cyan-500 p-2 px-4 text-white absolute top-20 right-20">
            App Development
            <FaLocationArrow className="text-cyan-500 text-xl absolute rotate-180 right-[155px] top-[35px]" />
          </p>
          <p className="bg-indigo-500 p-2 px-4 text-white absolute bottom-10 left-20">
            Data Science
            <FaLocationArrow className="text-indigo-500 text-xl absolute rotate-0 left-[120px] bottom-[35px]" />
          </p>
          <p className="bg-fuchsia-500 p-2 px-4 text-white absolute bottom-20 right-36">
            UI/UX Design
            <FaLocationArrow className="text-fuchsia-500 text-xl absolute -rotate-90 right-[122px] bottom-[35px]" />
          </p>
          <p className="bg-rose-500 p-2 px-4 text-white absolute top-10 right-80">
            Artificial Intelligence
            <FaLocationArrow className="text-rose-500 text-xl absolute rotate-180 right-[170px] top-[35px]" />
          </p>
          <p className="bg-emerald-500 p-2 px-4 text-white absolute bottom-32">
            Machine Learning
            <FaLocationArrow className="text-emerald-500 text-xl absolute -rotate-90 right-[153px] bottom-[35px]" />
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center py-12 px-4">
        <h2 className="text-3xl text-gray-800 font-bold mb-4">
          Explore Roadmaps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          {roadmaps.map((sheet, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
            >
              <img
                src={sheet.image}
                alt={sheet.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{sheet.name}</h3>
                <p className="text-gray-600 mb-4">{sheet.desc}</p>
                <Link
                  to={sheet.link}
                  className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 inline-block"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Roadmaps;
