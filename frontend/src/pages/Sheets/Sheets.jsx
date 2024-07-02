import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import img1 from "../../assets/striver.png";
import img2 from "../../assets/babbar.jpg";
import img3 from "../../assets/arsh.jpg";
import img4 from "../../assets/leetcode.png";
import { Link } from "react-router-dom";

const sheets = [
  {
    name: "Striver's A2Z DSA Sheet",
    image: img1,
    desc: "It is designed to provide a complete roadmap for learners to master various concepts and problem-solving techniques in DSA.",
    link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2",
  },
  {
    name: "Striver's SDE Sheet",
    image: img1,
    desc: "This sheet is specifically designed to prepare individuals for technical interviews with top tech companies, particularly for roles like Software Development Engineer, Software Engineer, or similar positions.",
    link: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems",
  },
  {
    name: "Striver's 79 Last Moment DSA Sheet",
    image: img1,
    desc: "This sheet is intended for individuals who are preparing for interviews or contests on short notice and need to quickly revise key concepts and practice problems.",
    link: "https://takeuforward.org/interview-sheets/strivers-79-last-moment-dsa-sheet-ace-interviews",
  },
  {
    name: "DSA Sheet by Love Babbar",
    image: img2,
    desc: "Love Babbar, a well-known figure in the tech community, has curated this sheet to help individuals enhance their problem-solving skills and ace technical interviews.",
    link: "https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar",
  },
  {
    name: "Arsh DSA Sheet",
    image: img3,
    desc: "This DSA sheet is designed by Arsh Goyal and contains 280+ DSA questions. Arsh DSA sheet covers almost every concept of DSA which will help in understanding DSA concepts in depth.",
    link: "https://www.proelevate.in/dsa-practice/arsh-dsa-sheet",
  },
  {
    name: "Blind 75",
    image: img4,
    desc: "his DSA sheet is designed to help individuals prepare for technical interviews at top tech companies by focusing on a carefully selected set of 75 essential problems covering various data structures and algorithms topics.",
    link: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
  },
];

const Sheets = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center md:mt-48 mt-28 mb-20">
        <p className="text-4xl text-slate-800 font-bold">Select DSA Sheet</p>
        <p className="text-center text-gray-500 mt-2 px-4 w-2/5">
          Your quick reference guide for choosing the best Data Structures and
          Algorithms (DSA) in programming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg px-6 md:px-0 mx-auto">
        {sheets.map((sheet, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border overflow-hidden hover:border-teal-300"
          >
            <div className="p-4 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center">
                  <img
                    src={sheet.image}
                    alt={sheet.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <p className="text-lg mt-2 font-semibold mb-2 ml-4">
                    {sheet.name}
                  </p>
                </div>
                <hr className="mx-auto w-60 my-4" />
                <p className="text-gray-600 mb-4">{sheet.desc}</p>
              </div>
              <div className="text-center">
                <Link
                  to={sheet.link}
                  className="bg-teal-500 p-2 px-4 rounded-md text-white hover:bg-teal-600 inline-block"
                >
                  Solve
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Sheets;
