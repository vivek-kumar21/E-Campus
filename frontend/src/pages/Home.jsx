import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Navbar from "../components/Navbar/Navbar";
import Testimonial from "../components/Testimonial/Testimonial";
import NextMain from "../components/nextMain/NextMain";
import img from "../assets/png1.jpg";
import ChatButton from "../components/Chatbot/ChatButton";

const Home = () => {
  return (
    <div>
      <div
        className="h-[650px] w-full bg-no-repeat bg-cover overflow-hidden bg-[#050913]"
        style={{ backgroundImage: `url(${img})` }}
      >
        <Navbar />
        <Main />
      </div>
      <NextMain />
      <Testimonial />
      <Footer />

      <ChatButton />
    </div>
  );
};

export default Home;
