import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { fadeIn } from "../../varients";
import image1 from "../../assets/dev.png";
import image2 from "../../assets/tanmay.png";
import image3 from "../../assets/ankit.png";
import image4 from "../../assets/satyam.png";

const Testimonial = () => {
  const data = [
    {
      image: image1,
      name: "DEV KARAN YADAV",
      review:
        "I would recommend this to every college student who is confused about choosing their career.",
      link: "https://www.linkedin.com/in/the-dev-karan/",
    },
    {
      image: image2,
      name: "TANMAY TEWARY",
      review:
        "Excellent resource! Comprehensive notes, coding sheets, and valuable internship info. Highly recommend!",
      link: "https://www.linkedin.com/in/tanmay-kumar-tewary-b9ba2823b/",
    },
    {
      image: image4,
      name: "SATYAM SINGH",
      review:
        "Lifesaver for engineering students! Top-notch resources and insightful blog posts. A must-have!",
      link: "https://www.linkedin.com/in/satyam-kumar-singh-02897b24a/",
    },
    {
      image: image3,
      name: "ANKIT KUMAR",
      review:
        "Everything in one place! Detailed notes, coding sheets, and internship info. Amazing resource",
      link: "https://www.linkedin.com/in/ankit-kumar-07068021b/",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleButtonClick = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
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
        <h1 className="text-2xl mx-4 md:mx-auto leading-normal font-bold">
          Read what others have to say
        </h1>
      </motion.div>
      <div className="max-w-5xl mx-auto gap-8 -mt-6 group">
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="mt-10 md:mt-20 relative"
        >
          <Slider {...settings}>
            {data.map((d, i) => (
              <div key={i}>
                <div className="bg-teal-800/10 duration-500 flex flex-col items-center p-6 md:p-12 rounded-xl mix-blend-luminosity">
                  <img
                    src={d.image}
                    alt=""
                    className="h-24 md:h-32 max-auto rounded-full mb-4"
                  />
                  <h4 className="uppercase text-lg md:text-xl font-bold text-center">
                    {d.name}
                  </h4>
                  <p className="text-sm md:text-base leading-6 my-3 font-light opacity-50 text-center">
                    {d.review}
                  </p>
                  <button
                    onClick={() => handleButtonClick(d.link)}
                    className="bg-teal-500 text-white py-2 px-6 md:py-2.5 md:px-8 rounded-full"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            ))}
          </Slider>
          <style>{`
            .slick-prev,
            .slick-next {
              color: #333;
              z-index: 10;
            }
            .slick-prev:before,
            .slick-next:before {
              color: #333;
            }
            @media (max-width: 768px) {
              .slick-prev,
              .slick-next {
                display: none !important;
              }
            }
          `}</style>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
