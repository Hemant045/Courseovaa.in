import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "@/api/checkAccess";
import { getAuth } from "firebase/auth";

export default function WebDevelopmentCoursePage() {
  const navigate = useNavigate();

  // Loading state to disable buttons while checking
  const [loading, setLoading] = useState(false);

  const handleEnrollClick = async () => {
    setLoading(true);
    const auth = getAuth();
    const userEmail = auth.currentUser?.email;

    if (!userEmail) {
      alert("Please log in first to enroll.");
      setLoading(false);
      return;
    }

    try {
      const courseId = "web-development-course"; // apna unique course id yahan rakho
      const result = await checkAccess(userEmail, courseId);

      if (result.accessGranted) {
        alert("You already have access to this course! Redirecting to course content...");
        navigate("/course/web-development"); // apne route ke hisab se update karo
      } else {
        alert("You don't have access yet. Redirecting to payment page...");
        window.open("https://payments.cashfree.com/forms/courseova-upi", "_blank");
      }
    } catch (error) {
      console.error("Error checking access:", error);
      alert("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-purple-100 px-6 md:px-12 lg:px-24 -mb-3">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="pt-5">
            <span className="bg-yellow-300 text-black text-xs px-3 py-1 rounded-full font-medium inline-block mb-2">
              Learn From The Experts
            </span>
            <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-3">
              MERN Stack Mastery: Full-Stack Web Development Course
            </h1>
            <p className="text-gray-700 text-base leading-6 mb-3">
              Become a <strong>full-stack web developer</strong> with this
              <strong> comprehensive MERN Stack course</strong>! 🔥 With{" "}
              <strong>30+ hours</strong> of content, you’ll master{" "}
              <strong>HTML, CSS, JavaScript, React, Node.js, and MongoDB</strong>.
              <br />
              Build <strong>real-world projects</strong> and gain hands-on experience in{" "}
              <strong>frontend & backend development, APIs, and databases</strong>. Whether you’re a beginner or looking to level up, this course (in{" "}
              <strong>English</strong>) will make you <strong>job-ready!</strong>
            </p>
            <p className="text-md text-gray-800 mb-6">
              💼 Start coding today and bring your web development dreams to life! 🚀💡
            </p>
            <Button
              size="lg"
              className="text-lg px-6 py-4 shadow-xl hover:scale-105 transition-transform"
              onClick={handleEnrollClick}
              disabled={loading}
            >
              {loading ? "Checking Access..." : "👉 Enroll Now At Just ₹199/- Only"}
            </Button>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/web.png"
              alt="Web Dev Course"
              className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] rounded-xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Certificate & Features */}
      <section className="py-20 bg-white px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img src="/images/certificate.png" alt="Course Certificate" className="rounded-xl shadow-lg max-w-full" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 ml-4">
              What Will You Get In This Course
            </h2>
            <ul className="space-y-3 text-base leading-4 text-gray-700 font-medium ml-4">
              <li>📘 Online Recorded Lectures</li>
              <li>📝 Notes & Practice Questions</li>
              <li>🌐 Course in English Language</li>
              <li>🔒 Lifetime Access</li>
            </ul>
            <div className="mt-6 ml-4">
              <span className="inline-block bg-yellow-300 text-black text-sm px-5 py-2 rounded-full font-semibold shadow-sm">
                🎓 Completion Certificate Awarded After Course
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Should You Join Us ?</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[{ icon: "💰", title: "Affordable Pricing" },
              { icon: "📝", title: "Practice questions with lectures" },
              { icon: "🧪", title: "Real Life Projects" },
              { icon: "🎥", title: "30+ Hours Of Content" },
              { icon: "🎓", title: "Enroll Now to get all lectures of the course" },
              { icon: "📒", title: "Premium Notes with every lecture" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap PDF */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-purple-200 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Download our complete roadmap PDF to learn about all the topics covered in this course.
          </h3>
          <div className="flex justify-center flex-wrap gap-4">
            <a
              href="https://drive.google.com/file/d/1awvdnSMlgQaSi0cmrKIhlis67jwrfDA2/view?usp=sharing"
              download
              className="bg-primary text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-primary/90 transition"
            >
              📥 Download Roadmap PDF
            </a>
            {/* Second Enroll Now Button with same behavior */}
            <Button
              onClick={handleEnrollClick}
              disabled={loading}
              className="bg-purple-700 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-purple-800 transition"
            >
              {loading ? "Checking Access..." : "💳 Enroll Now At Just 199/- Only"}
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions (FAQs)</h2>
          {faqList.map((faq, index) => (
            <FAQItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-blue-100 to-purple-200 rounded-lg my-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center text-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Do you have more questions related to this course?
            </h3>
            <p className="text-xl font-semibold text-gray-800">
              Don’t worry!! You can contact us on
            </p>
          </div>
          <div className="text-lg space-y-4 text-gray-800">
            <p>📱 <strong>+91 92573 72495</strong></p>
            <p>📧 <strong>couseova45@gmail.com</strong></p>
          </div>
        </div>
      </section>

      {/* Notes CTA Section */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-blue-100 to-purple-200 rounded-lg my-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-col items-center gap-6 ">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Unlock Our Premium Coding Notes of MERN for Only ₹39! 💻 ✨
          </h3>
          <a
            href="https://payments.cashfree.com/forms/MERN-Notes"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-md font-semibold shadow-lg transition"
          >
            💳 Buy Now At Just 39/- Only
          </a>
        </div>
      </section>

      {/* Centered text below */}
      <div className="max-w-3xl mx-auto text-center mt-8 px-4">
        <p className="text-base leading-6 text-gray-800 font-medium">
          Get access to high-quality handwritten MERN stack notes designed to boost your learning and help you crack interviews with confidence!
        </p>
      </div>

      {/* Student Reviews Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Hear From Our Students 👩‍💻👨‍💻
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination]}
          className="w-full max-w-6xl mx-auto pb-12"
        >
          {[
            {
              name: "Aditi Sharma",
              review:
                "This course is simply amazing! The roadmap is clear, and the explanations are beginner-friendly yet detailed. Loved it!",
            },
            {
              name: "Ravi Mehta",
              review:
                "The best MERN stack course. Real projects, lifetime access, and super affordable. Thank you team!",
            },
            {
              name: "Sakshi Patel",
              review:
                "Explains concepts with such simplicity. Notes + projects + roadmap = Perfect combo. Highly recommended!",
            },
            {
              name: "Mohit Saini",
              review:
                "Quality content at budget price. Smooth teaching and great community support. 5 stars!",
            },
          ].map((student, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg h-full transition hover:shadow-xl">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {student.name}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{student.review}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style>
          {`
            .swiper-pagination {
              bottom: 0 !important;
              margin-top: 20px;
            }
          `}
        </style>
      </section>

      <Footer />
    </>
  );
}

const faqList = [
  { q: "Who is this course for?", a: "Anyone who wants to become a full-stack web developer — beginners or professionals." },
  { q: "What will I learn in this course?", a: "You’ll master HTML, CSS, JavaScript, React, Node.js, MongoDB, and more." },
  { q: "What makes this course different?", a: "Real projects, affordable price, and job-ready content with mentorship." },
  { q: "Will I get the Recorded Access of this Course?", a: "Yes! You’ll get full lifetime access to the course materials." },
  { q: "What tools or software do I need?", a: "Just a laptop/PC, internet connection, and VS Code or any code editor." },
  { q: "Which Language is this course available?", a: "It is available in English with beginner-friendly explanations." }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} className={`border-2 border-gray-300 rounded-lg p-4 mb-4 cursor-pointer transition-all duration-300 ${open ? "bg-purple-50 border-purple-500 shadow-lg" : ""}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{question}</h3>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && (
        <p className="mt-2 text-gray-700 transition-all duration-300 ease-in-out">{answer}</p>
      )}
    </div>
  );
}
