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
    <>
      {links.map((link) => (
        <div key={link.name}>
          <div className="px-3 text-left group">
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
                  {/* <span className="text-sm md:hidden inline">
                    {heading === link.name ? (
                      <IoChevronUp />
                    ) : (
                      <IoChevronDown />
                    )}
                  </span>
                  <span className="text-sm md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                    <IoChevronDown />
                  </span> */}
                </>
              )}
            </h1>
            {/* {link.submenu && (
              <div>
                <div className="absolute top-13 hidden group-hover:md:block hover:md:block shadow-md">
                  <div className="py-3">
                    <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                  </div>
                  <Link to="#">
                    <div className="bg-white p-3.5 rounded-md">
                      {link.sublinks.map((sublink, i) => (
                        <Link to={sublink.link} key={i}>
                          <li
                            key={sublink.name}
                            className="duration-300 p-2 text-xs my-2.5 rounded hover:bg-teal-300"
                          >
                            {sublink.name}
                          </li>
                        </Link>
                      ))}
                    </div>
                  </Link>
                </div>
              </div>
            )} */}
          </div>

          {/* Mobile Menus */}
          {link.submenu && (
            <div
              className={`
              ${heading === link.name ? "md:hidden" : "hidden"}
            `}
            >
              {/* sublinks */}
              {/* {link.sublinks.map((sublink) => (
                <div key={sublink.name}>
                  <div>
                    <li className="text-sm text-gray-600 my-2.5 py-4 pl-7 font-semibold md:pr-0 pr-5">
                      <Link to={sublink.link} className="hover:text-primary">
                        {sublink.name}
                      </Link>
                    </li>
                  </div>
                </div>
              ))} */}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default NavLinks;
