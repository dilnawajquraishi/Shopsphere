// import {
//   LayoutDashboard,
//   ShoppingBag,
//   Package,
//   Users,
//   LogOut
// } from "lucide-react";

// import { Link, useLocation } from "react-router-dom";

// function AdminSidebar() {

//   const location = useLocation();

//   const menus = [
//     {
//       name: "Dashboard",
//       path: "/admin",
//       icon: <LayoutDashboard size={20} />
//     },
//     {
//       name: "Orders",
//       path: "/admin/orders",
//       icon: <ShoppingBag size={20} />
//     },
//     {
//       name: "Products",
//       path: "/admin/products",
//       icon: <Package size={20} />
//     },
//     {
//       name: "Users",
//       path: "/admin/users",
//       icon: <Users size={20} />
//     }
//   ];

//   return (
//     <div className="w-64 bg-gray-900 text-white min-h-screen p-5 hidden lg:block fixed left-0 top-0">

//       <h1 className="text-3xl font-bold mb-10">
//         ShopSphere
//       </h1>

//       <div className="space-y-3">

//         {menus.map((menu, index) => (

//           <Link
//             key={index}
//             to={menu.path}
//             className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//               location.pathname === menu.path
//                 ? "bg-blue-600"
//                 : "hover:bg-gray-800"
//             }`}
//           >

//             {menu.icon}

//             <span>{menu.name}</span>

//           </Link>

//         ))}

//       </div>

//       <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 transition mt-10 w-full">

//         <LogOut size={20} />

//         Logout

//       </button>

//     </div>
//   );
// }

// export default AdminSidebar;


import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  LogOut
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

function AdminSidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingBag size={20} />
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={20} />
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={20} />
    }
  ];

  // ✅ LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5 hidden lg:block fixed left-0 top-0">

      <h1 className="text-3xl font-bold mb-10">
        ShopSphere
      </h1>

      <div className="space-y-3">

        {menus.map((menu, index) => (

          <Link
            key={index}
            to={menu.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === menu.path
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`}
          >

            {menu.icon}

            <span>{menu.name}</span>

          </Link>

        ))}

      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 transition mt-10 w-full"
      >

        <LogOut size={20} />

        Logout

      </button>

    </div>
  );
}

export default AdminSidebar;