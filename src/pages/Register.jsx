// // // import { useState } from "react";

// // // function Register() {
// // //   const [name, setName] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");

// // //   const handleRegister = (e) => {
// // //     e.preventDefault();

// // //     console.log("Register Data:", { name, email, password });

// // //     // 👉 API call later
// // //   };

// // //   return (
// // //     <div className="flex justify-center items-center h-screen">
// // //       <form
// // //         onSubmit={handleRegister}
// // //         className="bg-white p-6 shadow rounded w-80"
// // //       >
// // //         <h2 className="text-xl font-bold mb-4">Register</h2>

// // //         <input
// // //           className="border p-2 w-full mb-2"
// // //           placeholder="Name"
// // //           onChange={(e) => setName(e.target.value)}
// // //         />

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
// // //           Register
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default Register;

// // import { useState } from "react";

// // function Register() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });

// //   const handleRegister = (e) => {
// //     e.preventDefault();
// //     console.log("Register:", form);
// //   };

// //   return (
// //     <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">

// //       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

// //         <h2 className="text-2xl font-bold text-center mb-6">
// //           Create Account
// //         </h2>

// //         <form onSubmit={handleRegister} className="flex flex-col gap-3">

// //           <input
// //             type="text"
// //             placeholder="Name"
// //             className="border p-2 rounded"
// //             onChange={(e) => setForm({ ...form, name: e.target.value })}
// //           />

// //           <input
// //             type="email"
// //             placeholder="Email"
// //             className="border p-2 rounded"
// //             onChange={(e) => setForm({ ...form, email: e.target.value })}
// //           />

// //           <input
// //             type="password"
// //             placeholder="Password"
// //             className="border p-2 rounded"
// //             onChange={(e) => setForm({ ...form, password: e.target.value })}
// //           />

// //           <button
// //             type="submit"
// //             className="bg-black text-white py-2 rounded hover:bg-gray-800"
// //           >
// //             Register
// //           </button>

// //         </form>

// //       </div>
// //     </div>
// //   );
// // }

// // export default Register;

// import { useState } from "react";

// function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleRegister = (e) => {
//     e.preventDefault();
//     console.log("Register:", form);
//   };

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

//         <h2 className="text-2xl font-bold text-center mb-6">
//           Create Account
//         </h2>

//         <form onSubmit={handleRegister} className="flex flex-col gap-3">

//           <input
//             type="text"
//             placeholder="Name"
//             className="border p-2 rounded"
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-2 rounded"
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-2 rounded"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />

//           <button
//             type="submit"
//             className="bg-black text-white py-2 rounded hover:bg-gray-800"
//           >
//             Register
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }

// export default Register;




import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://shopsphere-backend-qxry.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      alert("Registered Successfully");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">

        <h1 className="text-xl font-bold mb-4">📝 Register</h1>

        <input type="text" name="name" placeholder="Name"
          onChange={handleChange} className="w-full border p-2 mb-3" />

        <input type="email" name="email" placeholder="Email"
          onChange={handleChange} className="w-full border p-2 mb-3" />

        <input type="password" name="password" placeholder="Password"
          onChange={handleChange} className="w-full border p-2 mb-3" />

        <button className="bg-green-600 text-white w-full py-2">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;