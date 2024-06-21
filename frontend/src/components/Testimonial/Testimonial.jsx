import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { fadeIn } from "../../varients";
import image1 from "../../assets/dev.png";
import image2 from "../../assets/vivek.jpeg";

const Testimonial = () => {
  const data = [
    {
      image: image1,
      name: "DEV KARAN YADAV",
      review:
        "I would recommend this to every college students who are confused to choose their career.",
    },
    {
      image: image2,
      name: "TANMAY TEWARY",
      review:
        "Feel free to customize the text to better fit your brand voice and target audience.",
    },
    {
      image: image1,
      name: "SATYAM SINGH",
      review:
        "Feel free to customize the text to better fit your brand voice and target audience.",
    },
    {
      image: image2,
      name: "ANKIT KUMAR",
      review:
        "Feel free to customize the text to better fit your brand voice and target audience.",
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="text-center py-10">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.1 }}
      >
        <h5 className="text-heading_color text-4xl uppercase">Testimonials</h5>
        <h1 className="text-2xl w-96 mx-auto leading-normal font-bold mb-12">
          Read what others have to say
        </h1>
      </motion.div>
      <div className="max-w-5xl mx-auto gap-8 group">
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="mt-20"
        >
          <Slider {...settings}>
            {data.map((d, i) => (
              <div key={i}>
                <div className="bg-teal-800/10 duration-500 flex flex-col items-center group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 p-12 rounded-xl mix-blend-luminosity">
                  <img
                    src={d.image}
                    alt=""
                    className="h-20 max-auto rounded-full mb-2"
                  />
                  <h4 className="uppercase text-xl font-bold">{d.name}</h4>
                  <p className="text-sm leading-7 my-3 font-light opacity-50">
                    {d.review}
                  </p>
                  <button className="bg-teal-500 text-white py-2.5 px-8 rounded-full">
                    Get in Touch
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
