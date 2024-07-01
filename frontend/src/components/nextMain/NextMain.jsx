import { motion } from "framer-motion";
import { fadeIn } from "../../varients";

const NextMain = () => {
  return (
    <div className="text-center py-10">
      <motion.h5
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.1 }}
        className="text-heading_color text-4xl"
      >
        WHY ARE YOU HERE?
      </motion.h5>
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.1 }}
        className="max-w-5xl mx-auto mt-6 px-4 md:px-0"
      >
        <div className="flex flex-col gap-6">
          <div className="border-l-8 border-cyan-300 p-6">
            <div className="flex items-center">
              <h1 className="font-bold text-8xl text-cyan-200">01</h1>
              <div className="ml-4">
                <h1 className="text-2xl md:text-3xl text-gray-500">Guidance</h1>
                <p className="text-base md:text-lg mt-2">
                  Clear roadmaps tailored to your branch of engineering, helping
                  you navigate your academic curriculum and focus on what
                  matters most.
                </p>
              </div>
            </div>
          </div>
          <div className="border-l-8 border-cyan-300 p-6">
            <div className="flex items-center">
              <h1 className="font-bold text-8xl text-cyan-200">02</h1>
              <div className="ml-4">
                <h1 className="text-2xl md:text-3xl text-gray-500">
                  Opportunity
                </h1>
                <p className="text-base md:text-lg mt-2">
                  Access to internship information from top companies, enabling
                  you to gain real-world experience and kickstart your career
                  journey.
                </p>
              </div>
            </div>
          </div>
          <div className="border-l-8 border-cyan-300 p-6">
            <div className="flex items-center">
              <h1 className="font-bold text-8xl text-cyan-200">03</h1>
              <div className="ml-4">
                <h1 className="text-2xl md:text-3xl text-gray-500">
                  Skill Development
                </h1>
                <p className="text-base md:text-lg mt-2">
                  Engage in our coding arena to sharpen your programming skills
                  and stay ahead in today's tech-driven world.
                </p>
              </div>
            </div>
          </div>
          <div className="border-l-8 border-cyan-300 p-6">
            <div className="flex items-center">
              <h1 className="font-bold text-8xl text-cyan-200">04</h1>
              <div className="ml-4">
                <h1 className="text-2xl md:text-3xl text-gray-500">Insights</h1>
                <p className="text-base md:text-lg mt-2">
                  Dive into our blog section where seniors and alumni share
                  their experiences and interview tips, providing valuable
                  guidance as you chart your own path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NextMain;
