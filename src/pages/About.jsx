import { useState } from "react";

import { FaAddressBook } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

function About() {
  const [feedbackData, setFeedbackData] = useState({
    location: "",
    rating: "",
    experience: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFeedbackData({
      location: "",
      rating: "",
      experience: "",
      email: "",
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/feedback",
        feedbackData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Success toast
      toast.success("Send Feedback !");

      resetForm();
    } catch (error) {
      console.error("Full error object:", error);

      // Error toast
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/*banner*/}
      <div className="h-64 bg-[url('/about/banner.png')] h-[500px] bg-cover bg-center flex items-center justify-center">
        <div className="flex bg-opacity-50 p-4">
          <p className="text-white text-5xl font-serif">
            Ceylon
            <br />
            <span className="text-white text-8xl flex-row">Journey .</span>
            <br />
            <span className="font-serif text-white text-xl flex-row">
              Live your best moments
            </span>
          </p>
          <br />
        </div>
      </div>
      {/*grid image*/}
      <div className="max-w-6xl mx-auto m-15 px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          About Sri Lankan Tourism
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
        <p className="font-serif text-center text-base sm:text-lg md:text-xl leading-relaxed">
          At Ceylon Journeys, we believe that every traveler deserves more than
          just a vacation — they deserve an unforgettable experience. Rooted in
          the rich culture, breathtaking landscapes, and warm hospitality of Sri
          Lanka, we specialize in crafting tailor-made journeys that reflect the
          unique interests of each traveler. Whether you're seeking adventure in
          the misty hill country, serenity by golden beaches, or insight into
          ancient heritage sites, our dedicated team is here to guide you every
          step of the way. With a deep passion for sustainable tourism and a
          commitment to excellence, Ceylon Journeys invites you to discover Sri
          Lanka through a lens of authenticity, comfort, and wonder.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110">
            <img
              className="w-full h-full object-cover rounded"
              src="/about/about-1.jpeg"
              alt="Ella"
            />
          </div>

          <div className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110">
            <img
              className="w-full h-full object-cover rounded"
              src="/about/about-2.jpeg"
              alt="Nuwara Eliya"
            />
          </div>

          <div className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110">
            <img
              className="w-full h-full object-cover rounded"
              src="/about/about-3.jpeg"
              alt="Destination"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110">
            <img
              className="w-full h-full object-cover rounded"
              src="/about/about-4.jpeg"
              alt="Ella"
            />
          </div>

          <div className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110">
            <img
              className="w-full h-full object-cover rounded"
              src="/about/about-5.jpeg"
              alt="Nuwara Eliya"
            />
          </div>

          <div className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110">
            <img
              className="w-full h-full object-cover rounded"
              src="/about/about-6.jpeg"
              alt="Destination"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto m-15">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Our Vision & Mission
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
      </div>

      <div className="flex justify-center flex-wrap gap-6 p-4">
        <div className="block max-w-sm p-6 bg-gray-300 border border-gray-200 rounded-lg shadow-sm hover:bg-blue-200 dark:bg-teal-900 dark:border-gray-700 dark:hover:bg-teal-700 transition-colors duration-300">
          <h5 className="flex items-center justify-center mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Vision
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
            “To create a secure, innovative, and resilient tourism environment
            in Sri Lanka by leveraging advanced technologies, fostering
            collaboration, and ensuring comprehensive safety measures that
            protect and enhance the experiences of every traveler..”
          </p>
        </div>

        <div className="block max-w-sm p-6 bg-blue-200 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200  dark:bg-teal-900 dark:border-gray-700 dark:hover:bg-teal-700 transition-colors duration-300">
          <h5 className="flex items-center justify-center mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Mission
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
            “Our mission is to provide accurate, up-to-date information and
            resources on tourism security in Sri Lanka, while promoting the
            integration of cutting-edge technologies such as machine learning to
            address security challenges. We aim to enhance collaboration between
            stakeholders, foster awareness, and implement solutions that ensure
            a safe, enjoyable, and worry-free travel experience for all
            visitors..”
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto m-15 px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Strategic Goals
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
        <ul className="font-serif text-left text-base sm:text-lg md:text-xl leading-relaxed space-y-6 list-none mx-auto max-w-3xl">
          <li>
            <span className="font-bold text-blue-600 mr-2">A.</span>
            Enhance Awareness and Education Promote awareness among tourists and
            local stakeholders about safety measures, security protocols, and
            best practices for risk management in the tourism sector.
          </li>
          <li>
            <span className="font-bold text-blue-600 mr-2">B.</span>
            Leverage Technology for Security Enhancement Implement and promote
            the use of machine learning and other advanced technologies to
            identify, prevent, and respond to security threats in real-time,
            ensuring a safer environment for travelers.
          </li>
          <li>
            <span className="font-bold text-blue-600 mr-2">C.</span>
            Collaborate with Industry Stakeholders Foster collaboration between
            government authorities, law enforcement, tourism operators, and
            technology experts to create an integrated approach to improving
            security and crisis management in the tourism sector.
          </li>
          <li>
            <span className="font-bold text-blue-600 mr-2">D.</span>
            Provide Accurate and Timely Information Offer up-to-date information
            and alerts on potential risks, emerging security concerns, and
            safety recommendations for tourists, helping them make informed
            decisions while traveling in Sri Lanka.
          </li>
          <li>
            <span className="font-bold text-blue-600 mr-2">E.</span>
            Promote Sustainable and Resilient Tourism Encourage sustainable
            tourism practices that not only protect the natural and cultural
            resources of Sri Lanka but also build resilience against security
            challenges, ensuring long-term growth and visitor satisfaction.
          </li>
          <li>
            <span className="font-bold text-blue-600 mr-2">F.</span>
            Continuous Improvement and Innovation Regularly review and update
            security protocols, using data-driven insights and new technological
            innovations to stay ahead of evolving threats and enhance the
            overall safety of Sri Lanka’s tourism industry.
          </li>
        </ul>
      </div>
      <div className="max-w-6xl mx-auto m-15 px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Our History
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
        <p className="font-serif text-justify text-base sm:text-lg md:text-xl leading-relaxed">
          In 1966, the Government decided to develop tourism in a planned and a
          systematic manner, after identifying the need to set up an
          institutional framework. The Ceylon Tourist Board (created by the
          Ceylon Tourist Board Act No. 10 of 1966) and the Ceylon Hotels
          Corporation (created by Ceylon Hotels Corporation Act of 1966) were
          set up duly. Created to promote rapid economic development, through
          the development of foreign tourism, the Ceylon Tourist Board (CTB) was
          a statutory body that allowed greater freedom in decision making and
          flexibility in financial management. The legislation also covered the
          establishment of a national holiday resort company, which planned
          various types of accommodation and resort areas. Moreover it included
          the setting up of an authority under the Tourist Board to manage and
          administer each resort. The Act conferred powers for the Protection of
          Highways and Places of Scenic Beauty and vested authority in the
          Ceylon Tourist Board for the Registration and Classification of
          Tourist Hotels and all other tourist services including travel
          agencies. The Tourist Development Act of 1968 provided the Ceylon
          Tourist Board with the statutory authority to develop tourism on a
          planned and controlled basis In October 2007 the Tourism Act No 38 of
          2005 came into effect. With the circulation of the new Tourism act,
          the Sri Lanka Tourist Board Act No 10 of 1966, which was in effect for
          the past 41 years, was replaced. In terms of the provisions contained
          in the new act, the Tourism Development Fund was legally constituted,
          with 2 main sources remitting finances to the fund. By way of 1/3 of
          the Airport Tax collections and 1% of the Turnover of all Sri Lanka
          Tourist Board registered establishments. The Act provided for the
          setting up of the Sri Lanka Tourism Development Authority, Sri Lanka
          Promotions Bureau, Sri Lanka Convention Bureau and Sri Lanka Institute
          of Hotel Management, thereby replacing the Sri Lanka Tourist Board.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 m-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110">
            <img
              className="w-full h-full object-cover rounded"
              src="/about/hist1.jpeg"
              alt="Nuwara Eliya"
            />
          </div>

          <div className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110">
            <img
              className="w-full h-full object-cover rounded"
              src="/about/hist2.jpeg"
              alt="Destination"
            />
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-10 w-full max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
              Share Your Travel Experience
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
            <p className="font-serif text-center text-base sm:text-lg md:text-xl leading-relaxed text-gray-600">
              Have you visited a place in Sri Lanka? Rate it and share your
              experience with others!
            </p>
          </div>

          <div className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email *
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="text"
                placeholder="Enter location name"
                value={feedbackData.email}
                onChange={(e) =>
                  setFeedbackData({ ...feedbackData, email: e.target.value })
                }
              />
            </div>
            {/* Location Field */}
            <div className="mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="location"
                type="text"
                placeholder="Enter location name"
                value={feedbackData.location}
                onChange={(e) =>
                  setFeedbackData({ ...feedbackData, location: e.target.value })
                }
              />
            </div>

            {/* Rating Field */}
            <div className="mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="rating"
              >
                Rating
              </label>
              <select
                className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="rating"
                value={feedbackData.rating}
                onChange={(e) =>
                  setFeedbackData({ ...feedbackData, rating: e.target.value })
                }
              >
                <option value="">Select Rating</option>
                <option value="Poor">1 - Poor</option>
                <option value="Fair">2 - Fair</option>
                <option value="Good">3 - Good</option>
                <option value="Very Good">4 - Very Good</option>
                <option value=" Excellent">5 - Excellent</option>
              </select>
            </div>

            {/* Experience Field */}
            <div className="mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="experience"
              >
                Your Experience
              </label>
              <textarea
                className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                id="experience"
                rows="5"
                placeholder="Share your experience..."
                value={feedbackData.experience}
                onChange={(e) =>
                  setFeedbackData({
                    ...feedbackData,
                    experience: e.target.value,
                  })
                }
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition"
                onClick={handleSubmit}
                disabled={loading}
              >
                <span className="flex items-center gap-2">
                  {loading ? "Submitting..." : "Submit Feedback"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
