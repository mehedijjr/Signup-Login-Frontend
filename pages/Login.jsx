import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Login successful!");

        setFormData({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/profile");
        }, 1000);

        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.name);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Login failed!");
      }
    } catch (error) {
      console.log("Login error:", error);

      setIsSuccess(false);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md min-h-screen flex justify-center items-center mx-auto p-4">
      <div className="w-full bg-white shadow-2xl p-6 rounded-md">
        <h2 className="text-4xl text-center font-medium py-5">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0099FF] hover:bg-[#007acc] disabled:bg-gray-400 text-white font-medium rounded-md p-2 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
