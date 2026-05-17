import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {

  const { cart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* 🔥 LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transition"
        >
          🛍️ ShopSphere
        </Link>

        {/* 🔍 SEARCH */}
        <div className="hidden md:flex items-center w-1/3 bg-white rounded-full overflow-hidden shadow">

          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 outline-none text-gray-700"
          />

          <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-black font-semibold">
            🔍
          </button>

        </div>

        {/* 🔗 NAV LINKS */}
        <div className="flex items-center gap-5 text-sm font-semibold text-white">

          <Link
            to="/"
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="relative hover:text-yellow-300 transition"
          >
            🛒 Cart

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold px-1.5 rounded-full shadow">
                {totalItems}
              </span>
            )}

          </Link>

          <Link
            to="/orders"
            className="hover:text-yellow-300 transition"
          >
            Orders
          </Link>

          <Link
            to="/wishlist"
            className="hover:text-yellow-300 transition"
          >
            ❤️ Wishlist
          </Link>

          {/* 🧑‍💼 ADMIN */}
          {user?.role === "admin" && (

            <div className="flex items-center gap-3 border-l border-white/40 pl-3">

              <Link
                to="/admin"
                className="hover:text-yellow-300 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/add-product"
                className="hover:text-yellow-300 transition"
              >
                Add
              </Link>

              <Link
                to="/admin/products"
                className="hover:text-yellow-300 transition"
              >
                Manage
              </Link>

              <Link
                to="/admin/orders"
                className="hover:text-yellow-300 transition"
              >
                Orders
              </Link>

            </div>

          )}

          {/* 👤 USER */}
          <span className="hidden md:block text-white/90">
            Hi, <span className="font-bold">{user?.name}</span>
          </span>

          {/* 🔓 LOGOUT */}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-white shadow transition"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Navbar;


// ---------------------------------------------------------------



// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// function Navbar() {

//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50">

//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

//         {/* 🔥 LOGO */}
//         <Link to="/" className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transition">
//           🛍️ ShopSphere
//         </Link>

//         {/* 🔍 SEARCH */}
//         <div className="hidden md:flex items-center w-1/3 bg-white rounded-full overflow-hidden shadow">

//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="w-full px-4 py-2 outline-none text-gray-700"
//           />

//           <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-black font-semibold">
//             🔍
//           </button>

//         </div>

//         {/* 🔗 NAV LINKS */}
//         <div className="flex items-center gap-5 text-sm font-semibold text-white">

//           <Link to="/" className="hover:text-yellow-300 transition">Home</Link>

//           <Link to="/cart" className="relative hover:text-yellow-300 transition">
//             🛒 Cart
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold px-1.5 rounded-full shadow">
//                 {totalItems}
//               </span>
//             )}
//           </Link>

//           <Link to="/orders" className="hover:text-yellow-300 transition">
//             Orders
//           </Link>

//           <Link to="/wishlist" className="hover:text-yellow-300 transition">
//             ❤️ Wishlist
//           </Link>

//           {/* 🧑‍💼 ADMIN */}
//           {user?.role === "admin" && (
//             <div className="flex items-center gap-3 border-l border-white/40 pl-3">

//               <Link to="/admin" className="hover:text-yellow-300 transition">
//                 Dashboard
//               </Link>

//               <Link to="/admin/add" className="hover:text-yellow-300 transition">
//                 Add
//               </Link>

//               <Link to="/admin/products" className="hover:text-yellow-300 transition">
//                 Manage
//               </Link>

//               <Link to="/admin/orders" className="hover:text-yellow-300 transition">
//                 Orders
//               </Link>

//             </div>
//           )}

//           {/* 👤 USER */}
//           <span className="hidden md:block text-white/90">
//             Hi, <span className="font-bold">{user?.name}</span>
//           </span>

//           {/* 🔓 LOGOUT */}
//           <button
//             onClick={logout}
//             className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-white shadow transition"
//           >
//             Logout
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Navbar;



// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// function Navbar() {

//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="bg-white shadow-md sticky top-0 z-50">

//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

//         {/* 🔥 LOGO */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           🛍️ ShopSphere
//         </Link>

//         {/* 🔍 SEARCH (UI only) */}
//         <div className="hidden md:flex items-center w-1/3">
//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="w-full border px-3 py-2 rounded-l-md focus:outline-none"
//           />
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md">
//             🔍
//           </button>
//         </div>

//         {/* 🔗 NAV LINKS */}
//         <div className="flex items-center gap-4 text-sm font-medium">

//           <Link to="/" className="hover:text-blue-600">Home</Link>

//           <Link to="/cart" className="relative hover:text-blue-600">
//             🛒 Cart
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
//                 {totalItems}
//               </span>
//             )}
//           </Link>

//           <Link to="/orders" className="hover:text-blue-600">
//             Orders
//           </Link>

//           <Link to="/wishlist" className="hover:text-blue-600">
//             ❤️ Wishlist
//           </Link>

//           {/* 🧑‍💼 ADMIN */}
//           {user?.role === "admin" && (
//             <div className="flex items-center gap-3 border-l pl-3">

//               <Link to="/admin" className="hover:text-blue-600">
//                 Dashboard
//               </Link>

//               <Link to="/admin/add" className="hover:text-blue-600">
//                 Add
//               </Link>

//               <Link to="/admin/products" className="hover:text-blue-600">
//                 Manage
//               </Link>

//               {/* 🔥 FULL CODE FOR YOUR LINE */}
//               <Link to="/admin/orders" className="hover:text-blue-600">
//                 Orders
//               </Link>

//             </div>
//           )}

//           {/* 👤 USER */}
//           <span className="hidden md:block text-gray-600">
//             Hi, {user?.name}
//           </span>

//           {/* 🔓 LOGOUT */}
//           <button
//             onClick={logout}
//             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
//           >
//             Logout
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Navbar;


// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// function Navbar() {

//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="bg-white shadow p-4 flex justify-between items-center">

//       <h1 className="font-bold text-xl">🛍️ ShopSphere</h1>

//       <div className="flex gap-5 items-center">

//         <Link to="/">Home</Link>
//         <Link to="/cart">Cart 🛒 ({totalItems})</Link>
//         <Link to="/orders">Orders</Link>
//         <Link to="/wishlist">❤️ Wishlist</Link>

//         {/* ADMIN */}
//         {user?.role === "admin" && (
//           <>
//             <Link to="/admin">Admin</Link>
//             <Link to="/admin/add">Add Product</Link>
//             <Link to="/admin/products">Manage</Link>
//           </>
//         )}

//         <span>Hi, {user?.name}</span>

//         <button
//           onClick={logout}
//           className="bg-red-500 text-white px-3 py-1 rounded"
//         >
//           Logout
//         </button>

//       </div>

//     </div>
//   );
// }

// export default Navbar;



// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useState } from "react";

// function Navbar() {

//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const [menuOpen, setMenuOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-900 text-white shadow-lg">

//       {/* TOP BAR */}
//       <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

//         {/* LOGO */}
//         <Link to="/" className="text-2xl font-bold text-yellow-400">
//           🛍️ ShopSphere
//         </Link>

//         {/* DESKTOP MENU */}
//         <div className="hidden md:flex gap-6 items-center">

//           <Link to="/" className="hover:text-yellow-400">Home</Link>

//           <Link to="/cart" className="relative hover:text-yellow-400">
//             Cart
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1 rounded">
//                 {cart.length}
//               </span>
//             )}
//           </Link>

//           <Link to="/orders" className="hover:text-yellow-400">
//             Orders
//           </Link>

//           {/* ADMIN */}
//           {user?.role === "admin" && (
//             <Link to="/admin" className="hover:text-yellow-400">
//               Admin
//             </Link>
//           )}

//           {/* USER */}
//           <span className="text-gray-300 text-sm">
//             Hi, {user?.name}
//           </span>

//           <button
//             onClick={logout}
//             className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>

//         </div>

//         {/* MOBILE BUTTON */}
//         <button
//           className="md:hidden text-2xl"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>

//       </div>

//       {/* MOBILE MENU */}
//       {menuOpen && (
//         <div className="md:hidden bg-gray-800 px-4 py-3 space-y-3">

//           <Link to="/" className="block">Home</Link>
//           <Link to="/cart" className="block">Cart ({cart.length})</Link>
//           <Link to="/orders" className="block">Orders</Link>

//           {user?.role === "admin" && (
//             <Link to="/admin" className="block">Admin</Link>
//           )}

//           <button
//             onClick={logout}
//             className="w-full bg-red-500 py-1 rounded"
//           >
//             Logout
//           </button>

//         </div>
//       )}

//     </nav>
//   );
// }

// export default Navbar;