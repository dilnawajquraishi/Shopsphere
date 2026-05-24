// // // import { useState } from "react";

// // // function Login() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");

// // //   const handleLogin = (e) => {
// // //     e.preventDefault();

// // //     console.log("Login Data:", { email, password });

// // //     // 👉 later API call yaha hoga
// // //   };

// // //   return (
// // //     <div className="flex justify-center items-center h-screen">
// // //       <form
// // //         onSubmit={handleLogin}
// // //         className="bg-white p-6 shadow rounded w-80"
// // //       >
// // //         <h2 className="text-xl font-bold mb-4">Login</h2>

// // //         <input
// // //           className="border p-2 w-full mb-2"
// // //           placeholder="Email"
// // //           onChange={(e) => setEmail(e.target.value)}
// // //         />

// // //         <input
// // //           type="password"
// // //           className="border p-2 w-full mb-2"
// // //           placeholder="Password"
// // //           onChange={(e) => setPassword(e.target.value)}
// // //         />

// // //         <button className="bg-black text-white w-full py-2">
// // //           Login
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default Login;   

// // import { useState } from "react";

// // function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleLogin = (e) => {
// //     e.preventDefault();

// //     console.log("Login Data:", { email, password });

// //     // 👉 yaha backend API call hoga
// //   };

// //   const handleGoogleLogin = () => {
// //     // 👉 Google Auth redirect / Firebase auth
// //     window.alert("Google Login Clicked");
// //   };

// //   return (
// //     <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">

// //       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

// //         <h2 className="text-2xl font-bold text-center mb-6">
// //           Login to ShopSphere
// //         </h2>

// //         {/* EMAIL LOGIN */}
// //         <form onSubmit={handleLogin} className="flex flex-col gap-3">

// //           <input
// //             type="email"
// //             placeholder="Email"
// //             className="border p-2 rounded"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />

// //           <input
// //             type="password"
// //             placeholder="Password"
// //             className="border p-2 rounded"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />

// //           <button
// //             type="submit"
// //             className="bg-black text-white py-2 rounded hover:bg-gray-800"
// //           >
// //             Login
// //           </button>

// //         </form>

// //         {/* DIVIDER */}
// //         <div className="my-4 text-center text-gray-400">OR</div>

// //         {/* GOOGLE LOGIN */}
// //         <button
// //           onClick={handleGoogleLogin}
// //           className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
// //         >
// //           <img
// //             src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
// //             className="w-5 h-5"
// //           />
// //           Continue with Google
// //         </button>

// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {

//   const [form, setForm] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const login = async (e) => {
//     e.preventDefault();

//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });

//     const data = await res.json();

//     localStorage.setItem("token", data.token);

//     alert("Login Success");

//     navigate("/");
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">

//       <h1 className="text-2xl font-bold mb-4">
//         🔐 Login
//       </h1>

//       <form onSubmit={login} className="space-y-3">

//         <input
//           name="email"
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full border p-2"
//         />

//         <input
//           name="password"
//           type="password"
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full border p-2"
//         />

//         <button className="bg-black text-white w-full py-2">
//           Login
//         </button>

//       </form>

//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://shopsphere-backend-qxry.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">

        <h1 className="text-xl font-bold mb-4">🔐 Login</h1>

        <input type="email" name="email" placeholder="Email"
          onChange={handleChange} className="w-full border p-2 mb-3" />

        <input type="password" name="password" placeholder="Password"
          onChange={handleChange} className="w-full border p-2 mb-3" />

        <button className="bg-blue-600 text-white w-full py-2 mb-2">
          Login
        </button>

        {/* GOOGLE LOGIN */}
        <a
          href="https://shopsphere-backend-qxry.onrender.com/api/auth/google"
          className="block text-center bg-red-500 text-white py-2 rounded mb-2"
        >
          Continue with Google
        </a>

        {/* REGISTER LINK */}
        <p className="text-sm text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-600">
            Register here
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;