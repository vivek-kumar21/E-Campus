import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-blue-500 duration-300">
      {children}
    </button>
  );
};

export default Button;
