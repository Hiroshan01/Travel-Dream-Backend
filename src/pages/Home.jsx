import { useState } from "react";
import feature1 from "../assets/feature-1.png";
import feature2 from "../assets/feature-2.png";
import { FaAddressBook } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    arrival: "",
    departure: "",
    adults: 0,
    kids: 0,
    kid_ages: "",
    nationality: "",
  });

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      contact: "",
      arrival: "",
      departure: "",
      adults: 0,
      kids: 0,
      kid_ages: "",
      nationality: "",
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/booking",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Success toast
      toast.success("Booking Successfull ! Please Check Your E-Mail");

      resetForm();
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response data:", error.response?.data);

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
      <div className="h-64 bg-[url('/header.jpeg')] h-[500px] bg-cover bg-center flex items-center justify-center">
        <div className="flex bg-opacity-50 p-4">
          <p className="text-black text-5xl font-serif">
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

      {/*card*/}
      <div className="m-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition flex flex-col md:flex-row items-center gap-4">
            <img
              className="w-30 md:w-26 h-24 object-cover rounded mb-4 md:mb-0"
              src={feature1}
              alt="feature"
            />
            <div>
              <h3 className="text-lg font-bold mb-1">Best Destinations</h3>
              <p className="text-gray-600">
                Discover the most breathtaking places around Sri Lanka.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <img
              className="w-25 h-24 object-cover rounded"
              src={feature2}
              alt="feature"
            />
          </div>
        </div>
      </div>

      {/*grid image*/}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Top Destinations
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
        <p className="text-center text-gray-600 text-lg font-serif">
          Find out what are the best destinations in Sri Lanka
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative bg-blue-100 h-48 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/destination/Ella-Sri-Lanka-8-Fantastic-things-to-do-in-Ella-Sri-Lanka-e1554930904131.jpg"
              alt="Ella"
            />
            <div className="absolute inset-0 backdrop-blur-lg bg-opacity-10 opacity-0 hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
              <span className="text-lg text-9xl font-serif font-bold">
                Ella
              </span>
            </div>
          </div>

          <div className="relative bg-green-100 h-48 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/destination/Nuwara-Eliya_day-tour.webp"
              alt="Nuwara Eliya"
            />
            <div className="absolute inset-0 backdrop-blur-lg bg-opacity-10 opacity-0 hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
              <span className="text-lg text-9xl font-serif font-bold">
                Nuwaraeliya
              </span>
            </div>
          </div>

          <div className="relative bg-purple-100 h-48 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/destination/OIP (1).jpeg"
              alt="Destination"
            />
            <div className="absolute inset-0 backdrop-blur-lg bg-opacity-10 opacity-0 hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
              <span className="text-lg text-9xl font-serif font-bold">
                Hikaduwa
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative bg-blue-100 h-48 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/destination/R.jpeg"
              alt="Ella"
            />
            <div className="absolute inset-0 backdrop-blur-lg bg-opacity-10 opacity-0 hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
              <span className="text-lg text-9xl font-serif font-bold">
                Sigiriya
              </span>
            </div>
          </div>

          <div className="relative bg-green-100 h-48 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/destination/download.webp"
              alt="Nuwara Eliya"
            />
            <div className="absolute inset-0 backdrop-blur-lg bg-opacity-10 opacity-0 hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
              <span className="text-lg text-9xl font-serif font-bold">
                Arugam Bay
              </span>
            </div>
          </div>

          <div className="relative bg-purple-100 h-48 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/destination/Kandy-1.png"
              alt="Destination"
            />
            <div className="absolute inset-0 backdrop-blur-lg bg-opacity-10 opacity-0 hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
              <span className="text-lg text-9xl font-serif font-bold">
                Kandy
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto m-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Book Your Ceylon Journey
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
        <p className="text-center text-gray-600 text-lg font-serif">
          Start your adventure today! Fill out the form below and we'll get back
          to you within 24 hours.
        </p>
      </div>

      <div className="grid place-items-center flex">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-10 w-full max-w-md">
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Full Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-name"
                  type="text"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-email"
                >
                  Email Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-email"
                  type="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-contact"
                >
                  Contact Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-contact"
                  type="tel"
                  placeholder="Contact Number*"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-arrival"
                >
                  Arrival Date *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-arrival"
                  type="date"
                  value={formData.arrival}
                  onChange={(e) =>
                    setFormData({ ...formData, arrival: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-departure"
                >
                  Departure Date *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-departure"
                  type="date"
                  value={formData.departure}
                  onChange={(e) =>
                    setFormData({ ...formData, departure: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-adults"
                >
                  Number of Adults
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-adults"
                  type="number"
                  min="1"
                  placeholder="Number of Adults *"
                  value={formData.adults}
                  onChange={(e) =>
                    setFormData({ ...formData, adults: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-kids"
                >
                  Number of Kids
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-kids"
                  type="number"
                  min="0"
                  placeholder="Number of Kids"
                  value={formData.kids}
                  onChange={(e) =>
                    setFormData({ ...formData, kids: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-kid-ages"
                >
                  Ages of Kids
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-kid-ages"
                  type="text"
                  placeholder="Ages of Kids (e.g., 5, 8)"
                  value={formData.kid_ages}
                  onChange={(e) =>
                    setFormData({ ...formData, kid_ages: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-nationality"
                >
                  Nationality *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-nationality"
                  type="text"
                  placeholder="Nationality *"
                  value={formData.nationality}
                  onChange={(e) =>
                    setFormData({ ...formData, nationality: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  <p className="flex items-center gap-1">
                    {loading ? "Sending.." : "Booking"}
                    <FaAddressBook />
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
