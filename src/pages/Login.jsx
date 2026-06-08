import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // INPUT CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // LOGIN SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "https://shopsphere-backend-qxry.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      // ✅ LOGIN SUCCESS
      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        // ✅ IMPORTANT FIX
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // ✅ ADMIN LOGIN
        if (data.user?.role === "admin") {

          navigate("/admin");

        } else {

          navigate("/");

        }

      } else {

        alert(data.message || "Login Failed");

      }

    } catch (err) {

      console.log(err);

      alert("Server Error");

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl"
      >

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🔐 Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full border border-gray-300 focus:border-blue-500 outline-none rounded-xl px-4 py-3 mb-4"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full border border-gray-300 focus:border-blue-500 outline-none rounded-xl px-4 py-3 mb-4"
          required
        />

        {/* LOGIN BUTTON */}
        <button
          className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-3 rounded-xl font-semibold mb-3"
        >
          Login
        </button>

        {/* GOOGLE LOGIN */}
        <a
          href="https://shopsphere-backend-qxry.onrender.com/api/auth/google"
          className="block text-center bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-xl font-semibold mb-4"
        >
          Continue with Google
        </a>

        {/* REGISTER */}
        <p className="text-sm text-center text-gray-600">

          New user?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register here
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Login;

