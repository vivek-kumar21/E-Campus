import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isOpen }) => {
  const [heading, setHeading] = useState("");

  const links = [
    {
      name: "Branch",
      link: "/branch",
      submenu: false,
    },
    {
      name: "Roadmaps",
      link: "/roadmaps",
      submenu: false,
    },
    {
      name: "Sheets",
      link: "/sheets",
      submenu: false,
    },
    { name: "Internships", link: "/internships", submenu: false },
    { name: "Coding Arena", link: "/coding-arena", submenu: false },
    { name: "Blog", link: "/blogs", submenu: false },
  ];

  return (
    <div className={isOpen ? "mt-20 md:flex" : "md:flex md:gap-x-10 md:-ml-10"}>
      {links.map((link) => (
        <div key={link.name}>
          <div className="text-left group">
            <h1
              onClick={() =>
                heading !== link.name ? setHeading(link.name) : setHeading("")
              }
              className={
                isOpen
                  ? "text-sm font-bold py-5 flex justify-between items-center md:pr-0 pr-5 group"
                  : "text-white text-sm font-bold py-5 flex justify-between items-center md:pr-0 pr-5 group"
              }
            >
              {!link.submenu ? (
                <NavLink
                  to={link.link}
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-300 hover:text-cyan-300 duration-300"
                      : "hover:text-cyan-300 duration-300"
                  }
                >
                  {link.name}
                </NavLink>
              ) : (
                <>
                  <p className="hover:text-cyan-300 duration-300">
                    {link.name}
                  </p>
                </>
              )}
            </h1>
          </div>

          {/* Mobile Menus */}
          {link.submenu && (
            <div
              className={`bg-white ${
                heading === link.name ? "md:hidden" : "hidden"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
