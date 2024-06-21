import { motion } from "framer-motion";
import { fadeIn } from "../../varients";

const NextMain = () => {
  return (
    <div>
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
          className="flex flex-col mt-6 max-w-5xl mx-auto gap-8"
        >
          <div className="flex justify-between p-6 border-l-8 border-cyan-300">
            <h1 className="font-bold text-8xl text-cyan-200">01</h1>
            <div>
              <h1 className="text-3xl text-gray-500">Guidance</h1>
              <p className="text-lg  ml-36 w-3/4">
                Clear roapmaps tailored to your branch of engineering,helping
                you navigate your academic curriculam and focus on what matters
                most.
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4 p-6 border-l-8 border-cyan-300">
            <h1 className="font-bold text-8xl text-cyan-200">02</h1>
            <div>
              <h1 className="text-3xl text-gray-500">Opportunity</h1>
              <p className="text-lg  ml-36 w-3/4">
                Access to internship information from top companies, enablong
                you to gain real-world experience and kickstart your career
                journey.
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4 p-6 border-l-8 border-cyan-300">
            <h1 className="font-bold text-8xl text-cyan-200">03</h1>
            <div>
              <h1 className="text-3xl text-gray-500">Skill Development</h1>
              <p className="text-lg  ml-36 w-3/4">
                Engage in our coding arena to sharpen your programming skills
                and stay ahead in today's texh-driven world.
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4 p-6 border-l-8 border-cyan-300">
            <h1 className="font-bold text-8xl text-cyan-200">04</h1>
            <div>
              <h1 className="text-3xl text-gray-500">Insights</h1>
              <p className="text-lg ml-36 w-3/4">
                Dive into our blog section where seniors and alumi share their
                experiences and interview tips, providing valuable guidance as
                you chart your own path.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NextMain;
