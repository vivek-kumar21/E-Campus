import { Link } from "react-router-dom";

const Item = ({ Links, title }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <Link
            to={link.link}
            className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Item;
