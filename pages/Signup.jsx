import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const BASE_URL =
      import.meta.env.VITE_API_URL || "https://signuploginbackend.vercel.app";

    try {
      const response = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("User registered successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);

        setFormData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error(error);

      setIsSuccess(false);
      setMessage("Something went wrong! Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md min-h-screen flex justify-center items-center mx-auto p-4">
      <div className="w-full bg-white shadow-2xl p-6 rounded-md">
        <h2 className="text-4xl text-center font-medium py-5">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-[#0099FF] font-medium mb-1">Name:</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="outline-none ring focus:ring-2 ring-[#0099FF] p-2 rounded-md"
              placeholder="Enter Your Name"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-[#0099FF] font-medium mb-1">Email:</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="outline-none ring focus:ring-2 ring-[#0099FF] p-2 rounded-md"
              placeholder="Enter Your Email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-[#0099FF] font-medium mb-1">Password:</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="outline-none ring focus:ring-2 ring-[#0099FF] p-2 rounded-md"
              placeholder="Enter Your Password"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0099FF] hover:bg-[#007acc] disabled:bg-gray-400 text-white font-medium rounded-md p-2 transition-colors"
          >
            {loading ? "Registering..." : "Signup"}
          </button>
        </form>

        {/* Success / Error Message */}
        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Already have an account */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#0099FF] hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </section>
  );
};

export default Signup;
