import React from "react";

const HomePosts = ({ post }) => {
  const desc =
    post.description.length > 200
      ? post.description.slice(0, 200) + "..."
      : post.description;

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:space-x-4 mt-8 border-l-4 border-teal-400 p-4 md:p-6 rounded-md shadow-lg hover:shadow-2xl duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="md:w-[35%] w-full h-[200px] overflow-hidden rounded-lg">
        <img
          src={post.photo}
          alt="blog_image"
          className="w-full h-48 md:h-full object-cover transition-transform duration-300 transform hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col w-full md:w-[65%] space-y-2 md:space-y-4 mt-4 md:mt-0">
        <h1 className="text-sm md:text-lg font-bold transition-colors duration-300">
          {post.title}
        </h1>
        <div className="flex items-center text-xs md:text-sm font-semibold text-gray-500 mt-1 md:mb-2">
          <img
            className="w-6 h-6 rounded-full border-2 border-teal-300"
            src={post.profileImage}
            alt="profile_photo"
          />
          <p className="ml-2">@{post.username}</p>
          {/* Show date and time only on desktop */}
          <div className="hidden md:flex ml-auto space-x-1">
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
        {/* Description */}
        <p
          className="text-sm md:text-lg transition-all duration-300"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></p>
      </div>
    </div>
  );
};

export default HomePosts;
