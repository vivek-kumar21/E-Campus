import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../url";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { MdAutoGraph } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const InternshipDetails = () => {
  const { id } = useParams();
  const [internship, setIntership] = useState("");
  //   console.log(internship.skills);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${URL}/api/v1/internships/${id}`);

      //   console.log(res.data.data);
      setIntership(res.data.data);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="max-w-screen-2xl mt-8 container mx-auto xl:px-24 px-4">
        <div className="bg-gray-100 w-30 h-52 rounded-md flex items-center justify-center">
          <p className="text-4xl text-teal-500">{internship.companyName}</p>
        </div>

        <div className="mt-8 border inline-block px-2 py-1 rounded-md">
          <div className="flex items-center justify-center space-x-2">
            <MdAutoGraph className="text-teal-500 text-xl" />
            <p className="text-sm">Actively hiring</p>
          </div>
        </div>
        <h1 className="mt-2 text-xl">{internship.role}</h1>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <CiLocationOn />
          {internship.location}
        </div>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <SlCalender />
          {internship.duration}
        </div>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <FaRegMoneyBillAlt />
          {internship.stipend}
        </div>

        <hr className="mt-6" />

        <p className="text-bold text-xl mt-6">Company Details</p>
        <p className="text-gray-600 mt-2">{internship.about}</p>

        <p className="text-bold text-xl mt-6">About the internship</p>
        <p className="text-gray-600 mt-2">{internship.description}</p>

        <p className="text-bold text-xl mt-6">Eligibility</p>
        <p className="text-gray-600 mt-2">{internship.eligibility}</p>

        <p className="text-bold text-xl mt-6">Skill(s) required</p>
        <div className="flex gap-2 mt-2">
          {internship.skills && internship.skills.length > 0 ? (
            internship.skills.map((skill, i) => (
              <div key={i} className="bg-gray-100 rounded-full p-2">
                <p className="text-sm text-gray-600">{skill}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No skills specified</p>
          )}
        </div>

        <p className="text-bold text-xl mt-6">No. of openings</p>
        <p className="text-gray-600 mt-2">{internship.openings}</p>

        <div className="flex justify-center mt-6">
          <button className="bg-teal-500 rounded-md px-8 py-2 text-white hover:bg-teal-600">
            Apply Now
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default InternshipDetails;
