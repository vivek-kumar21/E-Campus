import { IoLocationOutline } from "react-icons/io5";
import { GrAnnounce } from "react-icons/gr";
import { LiaDotCircle } from "react-icons/lia";
import { Link } from "react-router-dom";

const Jobs = ({
  _id,
  amount,
  country,
  company,
  title,
  time,
  type,
}) => {
  function getRandomColor() {
    // Generate random RGB values
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);

    // Construct RGB color string
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
  }

  const randomColor = getRandomColor();

  return (
    <div className="w-full rounded-[8px] shadow overflow-y-auto max-h-[500px]">
      <div
        className="bg-white w-full p-6 rounded-t-[8px]"
        style={{ borderLeft: `4px solid ${randomColor}` }}
      >
        <span className="flex items-start justify-between">
          <span className="flex-1 md:flex items-start lg:gap-x-6 gap-x-3 lg:text-lg text-base">
            <button className="p-3 rounded-md border-none outline-none md:mb-0 mb-3">
              <GrAnnounce size={24} style={{ color: `${randomColor}` }} />
            </button>
            <p className="text-[16px]">Type: {type}</p>{" "}
            <p className="text-[16px]">Duration: {time}</p>
          </span>
        </span>
        <div className="md:pl-20">
          <p className="text-lg font-semibold md:mt-0 mt-3">{title}</p>
          <p className="text-base pt-3">{amount}</p>
        </div>
      </div>
      <div className="py-6 px-4 flex-1 md:flex justify-between rounded-b-[8px] border border-solid border-[#e2e4e7]">
        <div className="flex-1 md:flex items-center gap-x-6 text-lg">
          <span className="flex items-center gap-x-2">
            <IoLocationOutline
              className="text-lg"
              style={{ color: `${randomColor}` }}
            />
            <p className="text-base font-light">{country}</p>
          </span>
          <span className="flex items-center gap-x-2 lg:py-0 py-3">
            <LiaDotCircle
              className="text-lg"
              style={{ color: `${randomColor}` }}
            />
            <p className="text-base font-light">{company}</p>
          </span>
        </div>
        <Link
          to={`/internships/${_id}`}
          className="rounded-full bg-white border border-solid border-[#e2e3e7] text-base text-black font-bold px-6 py-2 outline-none shadow hover:bg-teal-500 hover:text-white transition duration-200"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default Jobs;
