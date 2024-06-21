import React from "react";

const HomePosts = ({ post, user }) => {
  const desc =
    post.description.length > 200
      ? post.description.slice(0, 200) + "..."
      : post.description;

  return (
    <div className="w-full flex mt-8 space-x-4 border-l-4 border-teal-400 p-6 rounded-md shadow-lg hover:shadow-2xl   duration-300 transform hover:-translate-y-1">
      <div className="w-[35%] h-[200px] flex justify-center items-center overflow-hidden rounded-lg">
        <img
          src={post.photo}
          alt="blog_image"
          className="h-full w-full object-cover transition-transform duration-300 transform hover:scale-110"
        />
      </div>

      <div className="flex flex-col w-[65%] space-y-4">
        <h1 className="text-xl font-bold md:text-2xl transition-colors duration-300">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <div className="flex gap-2 items-center">
            <img
              className="w-8 h-8 rounded-full border-2 border-teal-300"
              src={post.profileImage}
              alt="profile_photo"
            />
            <p>@{post.username}</p>
          </div>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
        <p
          className="text-sm md:text-lg transition-all duration-300"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></p>
      </div>
    </div>
  );
};

export default HomePosts;
