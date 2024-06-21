import React from "react";

const title = [
  "All",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "App Developer",
  "UI/UX Design",
  "Content Writing",
  "Graphic Design",
  "Marketing",
  "Data Science",
];
const stipend = [
  "All",
  "<1000",
  "1000 - 4000",
  "4000 - 10000",
  "10000 - 20000",
  ">20000",
];
const duration = [
  "All",
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months",
];
const place = ["All", "Kolkata", "Bangalore", "Pune", "Delhi"];

const filterOptions = [
  {
    id: "title",
    title: "Title",
    options: title,
    type: "checkbox",
  },
  {
    id: "stipend",
    title: "Stipend",
    options: stipend,
    type: "radio",
  },
  {
    id: "duration",
    title: "Duration",
    options: duration,
    type: "radio",
  },
  {
    id: "place",
    title: "Place",
    options: place,
    type: "checkbox",
  },
];

const FilterSection = ({ filters, onFilterChange }) => {
  return (
    <div>
      {filterOptions.map((filter) => (
        <div key={filter.id} className="mb-6">
          <h3 className="font-bold">{filter.title}</h3>
          {filter.options.map((option) => (
            <div key={option} className="flex gap-x-2 mb-2">
              <input
                type={filter.type}
                id={`${filter.id}-${option}`}
                name={filter.id}
                value={option}
                checked={
                  filters[filter.id].includes(option) ||
                  (filter.type === "radio" && filters[filter.id] === option)
                }
                onChange={(e) =>
                  onFilterChange(filter.id, option, e.target.checked)
                }
              />
              <label htmlFor={`${filter.id}-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
