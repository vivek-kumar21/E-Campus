import axios from "axios";
import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import Jobs from "./Jobs";
import { URL } from "../../url";
import FilterSection from "../../components/Internship/FilterSection";
import Loader from "../../components/Loader";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaFilter } from "react-icons/fa";

const Hero = () => {
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    title: ["All"],
    stipend: "All",
    duration: "All",
    place: ["All"],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `${URL}/api/v1/internships?page=${page}&limit=5`
      );

      const numbers = [...Array(res.data.totalPages).keys()].map(
        (num) => num + 1
      );
      setPages(numbers);
      setIsLoading(false);
      setInternships(res.data.data);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    // Filter internships when filters change
    const applyFilters = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `${URL}/api/v1/internships?page=${page}&limit=5`
      );
      setIsLoading(false);
      setInternships(res.data.data);
    };

    applyFilters();
  }, [filters, page]);

  const handleBack = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < pages.length) setPage(page + 1);
  };

  const handleFilterChange = (id, value, checked) => {
    setFilters((prev) => {
      if (id === "stipend" || id === "duration") {
        return {
          ...prev,
          [id]: value === "All" ? "All" : checked ? value : "",
        };
      } else {
        return {
          ...prev,
          [id]:
            value === "All"
              ? ["All"]
              : checked
              ? [...prev[id].filter((item) => item !== "All"), value]
              : prev[id].filter((item) => item !== value),
        };
      }
    });
  };

  const getNumericStipend = (stipendString) => {
    const match = stipendString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const filteredInternships = internships.filter((internship) => {
    const { title, stipend, duration, place } = filters;

    const titleMatch =
      title.includes("All") ||
      title.some((t) =>
        internship.role.toLowerCase().includes(t.toLowerCase())
      );

    const internshipStipend = getNumericStipend(internship.stipend);
    const stipendMatch =
      stipend === "All" ||
      (stipend === "<1000" && internshipStipend < 1000) ||
      (stipend === "1000 - 4000" &&
        internshipStipend >= 1000 &&
        internshipStipend <= 4000) ||
      (stipend === "4000 - 10000" &&
        internshipStipend > 4000 &&
        internshipStipend <= 10000) ||
      (stipend === "10000 - 20000" &&
        internshipStipend > 10000 &&
        internshipStipend <= 20000) ||
      (stipend === ">20000" && internshipStipend > 20000);

    const durationMatch =
      duration === "All" || internship.duration === duration;

    const placeMatch =
      place.includes("All") ||
      place.some((p) =>
        internship.location.toLowerCase().includes(p.toLowerCase())
      );

    return titleMatch && stipendMatch && durationMatch && placeMatch;
  });

  return (
    <div className="bg-[#fafbfc] mt-16 pb-12">
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
        <h1 className="xl:text-5xl lg:text-5xl sm:text-3xl text-2xl xl:leading-normal lg:leading-normal font-bold text-center">
          Find your{" "}
          <span className="text-teal-500 relative">
            <span className="relative">dream company</span>
            <span
              className="absolute w-full left-0 right-0 bottom-[-18px] h-8 bg-no-repeat bg-center bg-contain"
              style={{
                backgroundImage: "url(https://www.beyondcss.dev/underline.svg)",
              }}
            ></span>
          </span>
        </h1>
        <p className="text-xl lg:w-1/2 text-center -mt-1 leading-10 my-0">
          Discover your path to professional growth.
          <br /> Start your journey with us.
        </p>
        <div className="flex items-center border-2 border-solid border-teal-500 rounded-full h-16 lg:w-2/5 w-full py-2 relative mt-10">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent h-full w-full border-none outline-none absolute px-20 xl:text-2xl text-base"
            type="text"
            placeholder="Job title or keyword"
          />
          <button className="bg-teal-500 flex items-center justify-center rounded-full text-white w-12 h-12 absolute left-2 border-none">
            <HiSearch className="text-2xl" />
          </button>
        </div>
      </div>

      {/* All Internships */}
      <div className="bg-[#f5f6fc]">
        <div className="container mx-auto px-6 py-6">
          <h2 className="xl:text-4xl lg:text-3xl text-2xl font-semibold">
            Recommended Internships
          </h2>

          {/* Filter button for mobile devices */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center bg-teal-500 text-white px-4 py-2 rounded-full mt-4 mb-8"
          >
            <FaFilter className="mr-2" />
            Filters
          </button>

          <div className="flex">
            {/* Filter Section */}
            <div className="hidden md:mt-6 mt-0 lg:block lg:w-1/4 w-full lg:pr-8">
              <FilterSection
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Filter popup for mobile devices */}
            {showFilters && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center lg:hidden">
                <div className="bg-white p-8 rounded-md w-4/5 max-h-[80%] overflow-y-auto">
                  <FilterSection
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClose={() => setShowFilters(false)}
                  />
                </div>
              </div>
            )}

            {/* Internships Section */}
            <div className="lg:w-3/4 w-full md:mt-6 mt-0">
              {isLoading ? (
                <Loader />
              ) : (
                filteredInternships
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.role.toLowerCase().includes(search.toLowerCase());
                  })
                  .map((intern, i) => (
                    <div key={i} className="mb-4">
                      <Jobs
                        _id={intern._id}
                        amount={intern.stipend}
                        country={intern.location}
                        company={intern.companyName}
                        time={intern.duration}
                        title={intern.role}
                        type="Internship"
                      />
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={handleBack}
              disabled={page === 1}
              className="px-4 py-2 rounded-full bg-teal-500 text-white mr-2"
            >
              <IoIosArrowBack />
            </button>
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-full ${
                  p === page
                    ? "bg-teal-500 text-white"
                    : "bg-white text-teal-500 border border-teal-500"
                } mr-2`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={page === pages.length}
              className="px-4 py-2 rounded-full bg-teal-500 text-white"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
