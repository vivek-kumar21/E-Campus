import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import cseImg from "../../assets/branchDetails/cse.jpg";
import itImg from "../../assets/branchDetails/it.jpg";
import aimlImg from "../../assets/branchDetails/aiml.jpg";
import iotImg from "../../assets/branchDetails/iot.jpg";
import eceImg from "../../assets/branchDetails/ece.jpg";
import eeImg from "../../assets/branchDetails/ee.jpg";
import eeeImg from "../../assets/branchDetails/eee.jpg";
import meImg from "../../assets/branchDetails/me.jpg";
import csbsImg from "../../assets/branchDetails/csbs.jpg";
import { SlNote } from "react-icons/sl";
import { FaYoutube } from "react-icons/fa";

const branchDetails = [
  {
    name: "cse",
    title: "CSE",
    fullForm: "Computer Science and Engineering",
    desc: "Computer Science and Engineering (CSE) delves into the theoretical and practical aspects of computing. Students learn about algorithms, data structures, software development, computer architecture, and artificial intelligence. This field emphasizes problem-solving skills and the development of efficient software solutions. CSE graduates are equipped to design and develop cutting-edge technologies, contributing to advancements in various industries such as healthcare, finance, and entertainment.",
    subjects: [
      {
        name: "Operating System",
        desc: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.",
        logo: cseImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Database Management System",
        desc: "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
        logo: cseImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Compiler Design",
        desc: "Compiler Design principles provide an in-depth view of translation and optimization process, which include lexical analysis, syntax analysis, and code generation.",
        logo: cseImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Discrete Mathematics",
        desc: "Discrete Mathematics involves study of mathematical structures that are fundamentally discrete rather than continuous.",
        logo: cseImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Data Structure and Algorithms",
        desc: "Data Structures and Algorithms involve the study of data organization, management, and storage formats that enable efficient access and modification.",
        logo: cseImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Digital Electronics",
        desc: "Digital Electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them.",
        logo: cseImg,
        youtube: "",
        notes: "",
      },
    ],
  },
  {
    name: "it",
    title: "IT",
    fullForm: "Information Technology",
    desc: "Information Technology focuses on using technology to address business and organizational challenges. Key areas include software development, web development, cybersecurity, network administration, and data management. IT professionals work on developing and maintaining software applications, managing databases, and ensuring network security and efficiency. Career paths in IT include roles such as IT consultant, systems analyst, network administrator, database administrator, and web developer. The field emphasizes practical problem-solving skills, technical expertise, and an understanding of business processes to create and maintain technology solutions that improve organizational performance and productivity.",
    logo: itImg,
    subjects: [
      {
        name: "Operating System",
        desc: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.",
        logo: itImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Database Management System",
        desc: "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
        logo: itImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Compiler Design",
        desc: "Compiler Design principles provide an in-depth view of translation and optimization process, which include lexical analysis, syntax analysis, and code generation.",
        logo: itImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Discrete Mathematics",
        desc: "Discrete Mathematics involves study of mathematical structures that are fundamentally discrete rather than continuous.",
        logo: itImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Data Structure and Algorithms",
        desc: "Data Structures and Algorithms involve the study of data organization, management, and storage formats that enable efficient access and modification.",
        logo: itImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Digital Electronics",
        desc: "Digital Electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them.",
        logo: itImg,
        youtube: "",
        notes: "",
      },
    ],
  },
  {
    name: "cse-aiml",
    title: "CSE-AIML",
    fullForm:
      "Computer Science & Engineering(Artificial Intelligence & Machine Learning)",
    desc: "CSE-AIML specializes in designing and developing systems that can learn and make decisions. Key areas include machine learning algorithms, neural networks, natural language processing, computer vision, and robotics. Professionals in this field work on creating intelligent systems that can perform tasks typically requiring human intelligence. Career opportunities include AI/ML engineer, data scientist, research scientist, and AI ethicist. The branch focuses on the development and application of algorithms that enable machines to learn from data, adapt to new situations, and perform complex tasks autonomously.",
    logo: itImg,
    subjects: [
      {
        name: "Operating System",
        desc: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.",
        logo: aimlImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Database Management System",
        desc: "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
        logo: aimlImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Compiler Design",
        desc: "Compiler Design principles provide an in-depth view of translation and optimization process, which include lexical analysis, syntax analysis, and code generation.",
        logo: aimlImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Discrete Mathematics",
        desc: "Discrete Mathematics involves study of mathematical structures that are fundamentally discrete rather than continuous.",
        logo: aimlImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Data Structure and Algorithms",
        desc: "Data Structures and Algorithms involve the study of data organization, management, and storage formats that enable efficient access and modification.",
        logo: aimlImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Digital Electronics",
        desc: "Digital Electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them.",
        logo: aimlImg,
        youtube: "",
        notes: "",
      },
    ],
  },
  {
    name: "cse-iot",
    title: "CSE-IOT",
    fullForm: "Computer Science & Engineering(Internet Of Things)",
    desc: "CSE-IoT focuses on connecting physical devices to the internet, enabling them to collect and exchange data. Key areas include embedded systems, sensor networks, wireless communication, data analytics, and IoT security. Professionals in IoT develop smart devices and systems that enhance automation and data collection. Career paths include IoT developer, embedded systems engineer, IoT solution architect, and IoT security specialist. The field emphasizes the integration of hardware and software to create interconnected systems that improve efficiency, convenience, and data-driven decision-making in various industries.",
    logo: iotImg,
    subjects: [
      {
        name: "Operating System",
        desc: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.",
        logo: iotImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Database Management System",
        desc: "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
        logo: iotImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Compiler Design",
        desc: "Compiler Design principles provide an in-depth view of translation and optimization process, which include lexical analysis, syntax analysis, and code generation.",
        logo: iotImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Discrete Mathematics",
        desc: "Discrete Mathematics involves study of mathematical structures that are fundamentally discrete rather than continuous.",
        logo: iotImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Data Structure and Algorithms",
        desc: "Data Structures and Algorithms involve the study of data organization, management, and storage formats that enable efficient access and modification.",
        logo: iotImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Digital Electronics",
        desc: "Digital Electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them.",
        logo: iotImg,
        youtube: "",
        notes: "",
      },
    ],
  },
  {
    name: "ece",
    title: "ECE",
    fullForm: "Electronics and Communication Engineering",
    desc: "ECE involves designing and developing electronic devices and communication systems. Key areas include analog and digital electronics, signal processing, telecommunications, embedded systems, and VLSI design. Professionals in this field work on creating and improving electronic circuits, communication networks, and embedded systems. Career opportunities include electronics engineer, communication engineer, VLSI design engineer, and signal processing specialist. ECE focuses on the principles of electronics and communication technologies, aiming to advance the functionality and efficiency of modern communication systems and electronic devices.",
    logo: eceImg,
    subjects: [
      {
        name: "Operating System",
        desc: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.",
        logo: eceImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Database Management System",
        desc: "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
        logo: eceImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Compiler Design",
        desc: "Compiler Design principles provide an in-depth view of translation and optimization process, which include lexical analysis, syntax analysis, and code generation.",
        logo: eceImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Discrete Mathematics",
        desc: "Discrete Mathematics involves study of mathematical structures that are fundamentally discrete rather than continuous.",
        logo: eceImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Data Structure and Algorithms",
        desc: "Data Structures and Algorithms involve the study of data organization, management, and storage formats that enable efficient access and modification.",
        logo: eceImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Digital Electronics",
        desc: "Digital Electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them.",
        logo: eceImg,
        youtube: "",
        notes: "",
      },
    ],
  },
  {
    name: "ee",
    title: "EE",
    fullForm: "Electrical Engineering",
    desc: "EE deals with the study and application of electricity, electronics, and electromagnetism. Key areas include power systems, control systems, electrical machines, renewable energy, and circuit design. Electrical engineers work on developing and maintaining electrical systems, power generation and distribution, and control mechanisms. Career paths include electrical engineer, power systems engineer, control engineer, and renewable energy consultant. The field emphasizes the development and implementation of electrical technologies to improve energy efficiency, system reliability, and the integration of renewable energy sources.",
    logo: eeImg,
    subjects: [
      {
        name: "Operating System",
        desc: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.",
        logo: eeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Database Management System",
        desc: "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
        logo: eeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Compiler Design",
        desc: "Compiler Design principles provide an in-depth view of translation and optimization process, which include lexical analysis, syntax analysis, and code generation.",
        logo: eeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Discrete Mathematics",
        desc: "Discrete Mathematics involves study of mathematical structures that are fundamentally discrete rather than continuous.",
        logo: eeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Data Structure and Algorithms",
        desc: "Data Structures and Algorithms involve the study of data organization, management, and storage formats that enable efficient access and modification.",
        logo: eeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Digital Electronics",
        desc: "Digital Electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them.",
        logo: eeImg,
        youtube: "",
        notes: "",
      },
    ],
  },
  {
    name: "eee",
    title: "EEE",
    fullForm: "Electrical & Electronics Engineering",
    desc: "EEE combines principles of both electrical and electronics engineering. Key areas include electrical machines, power electronics, control systems, microprocessors, and communication systems. Professionals in this field work on designing and managing electrical systems and electronic devices. Career opportunities include electrical engineer, electronics engineer, power electronics engineer, and systems designer. EEE focuses on the integration and application of electrical and electronic technologies to develop advanced systems for power generation, distribution, control, and communication.",
    logo: eeeImg,
    subjects: [
      {
        name: "Operating System",
        desc: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.",
        logo: eeeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Database Management System",
        desc: "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
        logo: eeeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Compiler Design",
        desc: "Compiler Design principles provide an in-depth view of translation and optimization process, which include lexical analysis, syntax analysis, and code generation.",
        logo: eeeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Discrete Mathematics",
        desc: "Discrete Mathematics involves study of mathematical structures that are fundamentally discrete rather than continuous.",
        logo: eeeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Data Structure and Algorithms",
        desc: "Data Structures and Algorithms involve the study of data organization, management, and storage formats that enable efficient access and modification.",
        logo: eeeImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Digital Electronics",
        desc: "Digital Electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them.",
        logo: eeeImg,
        youtube: "",
        notes: "",
      },
    ],
  },
  {
    name: "me",
    title: "ME",
    fullForm: "Mechanical Engineering",
    desc: "ME focuses on the design, analysis, manufacturing, and maintenance of mechanical systems. Key areas include thermodynamics, fluid mechanics, material science, robotics, and automotive engineering. Mechanical engineers work on developing and improving mechanical devices and systems, from small components to large machinery. Career paths include mechanical engineer, automotive engineer, HVAC engineer, robotics engineer, and manufacturing engineer. The field emphasizes the application of engineering principles to solve practical problems, enhance product performance, and innovate in the design and production of mechanical systems.",
    logo: meImg,
    subjects: [
      {
        name: "Operating System",
        desc: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.",
        logo: meImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Database Management System",
        desc: "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
        logo: meImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Compiler Design",
        desc: "Compiler Design principles provide an in-depth view of translation and optimization process, which include lexical analysis, syntax analysis, and code generation.",
        logo: meImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Discrete Mathematics",
        desc: "Discrete Mathematics involves study of mathematical structures that are fundamentally discrete rather than continuous.",
        logo: meImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Data Structure and Algorithms",
        desc: "Data Structures and Algorithms involve the study of data organization, management, and storage formats that enable efficient access and modification.",
        logo: meImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Digital Electronics",
        desc: "Digital Electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them.",
        logo: meImg,
        youtube: "",
        notes: "",
      },
    ],
  },
  {
    name: "csbs",
    title: "CSBS",
    fullForm: "Computer Science and Business Systems",
    desc: "CSBS integrates computer science with business and management principles. Key areas include software engineering, data analytics, business strategy, financial management, and project management. Professionals in this field work on developing software solutions with a strong understanding of business needs. Career opportunities include IT manager, business analyst, data analyst, software developer, and project manager. CSBS focuses on bridging the gap between technology and business, ensuring that technological solutions align with business objectives and contribute to organizational success.",
    logo: csbsImg,
    subjects: [
      {
        name: "Operating System",
        desc: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.",
        logo: csbsImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Database Management System",
        desc: "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
        logo: csbsImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Compiler Design",
        desc: "Compiler Design principles provide an in-depth view of translation and optimization process, which include lexical analysis, syntax analysis, and code generation.",
        logo: csbsImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Discrete Mathematics",
        desc: "Discrete Mathematics involves study of mathematical structures that are fundamentally discrete rather than continuous.",
        logo: csbsImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Data Structure and Algorithms",
        desc: "Data Structures and Algorithms involve the study of data organization, management, and storage formats that enable efficient access and modification.",
        logo: csbsImg,
        youtube: "",
        notes: "",
      },
      {
        name: "Digital Electronics",
        desc: "Digital Electronics is a field of electronics involving the study of digital signals and the engineering of devices that use or produce them.",
        logo: csbsImg,
        youtube: "",
        notes: "",
      },
    ],
  },
];

const BranchDetails = () => {
  const { branchName } = useParams();
  const branch = branchDetails.find((b) => b.name === branchName);

  return (
    <div>
      <Navbar />

      {branch ? (
        <div className="bg-gray-100 p-4 min-h-screen">
          <div className="flex flex-col items-center justify-center mt-24 mb-12 text-center">
            <h1 className="text-5xl text-slate-800 font-extrabold">
              {branch.title}
            </h1>
            <p className="text-xl text-gray-700 mt-4 px-4 w-full max-w-3xl">
              {branch.fullForm}
            </p>
          </div>
          <div className="max-w-screen-lg mx-auto bg-white p-8 rounded-lg shadow-lg mb-12 border border-gray-200">
            <p className="text-lg text-gray-800 leading-relaxed">
              {branch.desc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
            {branch.subjects.map((subject, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={subject.logo}
                  alt={subject.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="flex flex-col p-4">
                  <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                  <p className="text-gray-600 mb-4">{subject.desc}</p>
                </div>
                <div className="flex justify-around mt-auto mb-2">
                  <a
                    href={subject.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-x-1 p-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <FaYoutube />
                    YouTube
                  </a>
                  <a
                    href={subject.notes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-x-1 p-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                  >
                    <SlNote className="text-sm" /> Notes
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-700 mt-24">
          Branch not found!
        </p>
      )}

      <Footer />
    </div>
  );
};

export default BranchDetails;
