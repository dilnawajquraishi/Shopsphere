import { useEffect, useState } from "react";

import {
  ShoppingBag,
  Users,
  IndianRupee,
  Package,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

import AdminSidebar from "../../components/AdminSidebar";

function AdminDashboard() {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("https://shopsphere-backend-qxry.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("https://shopsphere-backend-qxry.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));

    fetch("https://shopsphere-backend-qxry.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

  }, []);

  const revenue = orders.reduce(
    (a, c) => a + c.totalAmount,
    0
  );

  const lowStock = products.filter(
    (p) => p.stock <= 5
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      <AdminSidebar />

      <div className="lg:ml-64 p-4 md:p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

          <div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back Admin 👋
            </p>

          </div>

          <div className="bg-white px-5 py-3 rounded-2xl shadow-sm">

            <p className="text-sm text-gray-500">
              Total Revenue
            </p>

            <h2 className="text-2xl font-bold text-green-600">
              ₹ {revenue}
            </h2>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

            <div className="flex items-center justify-between">

              <div className="bg-green-100 p-4 rounded-2xl">
                <IndianRupee className="text-green-600" />
              </div>

              <TrendingUp className="text-green-500" />

            </div>

            <p className="text-gray-500 mt-4">
              Revenue
            </p>

            <h2 className="text-3xl font-bold mt-1">
              ₹ {revenue}
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

            <div className="flex items-center justify-between">

              <div className="bg-blue-100 p-4 rounded-2xl">
                <ShoppingBag className="text-blue-600" />
              </div>

              <TrendingUp className="text-blue-500" />

            </div>

            <p className="text-gray-500 mt-4">
              Orders
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {orders.length}
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

            <div className="flex items-center justify-between">

              <div className="bg-orange-100 p-4 rounded-2xl">
                <Package className="text-orange-600" />
              </div>

              <TrendingUp className="text-orange-500" />

            </div>

            <p className="text-gray-500 mt-4">
              Products
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {products.length}
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

            <div className="flex items-center justify-between">

              <div className="bg-purple-100 p-4 rounded-2xl">
                <Users className="text-purple-600" />
              </div>

              <TrendingUp className="text-purple-500" />

            </div>

            <p className="text-gray-500 mt-4">
              Users
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {users.length}
            </h2>

          </div>

        </div>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* RECENT ORDERS */}
          <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
              Recent Orders
            </h2>

            <div className="space-y-4">

              {orders.slice(0, 5).map((order) => (

                <div
                  key={order._id}
                  className="border rounded-2xl p-4 hover:bg-gray-50 transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                      <p className="font-bold">
                        {order.userId}
                      </p>

                      <p className="text-sm text-gray-500 break-all">
                        {order._id}
                      </p>
                    </div>

                    <div className="text-green-600 font-bold text-lg">
                      ₹ {order.totalAmount}
                    </div>

                    <div>
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                        {order.status}
                      </span>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* LOW STOCK */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="flex items-center gap-3 mb-6">

              <AlertTriangle className="text-red-500" />

              <h2 className="text-2xl font-bold">
                Low Stock
              </h2>

            </div>

            <div className="space-y-4">

              {lowStock.length === 0 ? (

                <p className="text-gray-500">
                  No low stock products
                </p>

              ) : (

                lowStock.map((item) => (

                  <div
                    key={item._id}
                    className="border-b pb-3 flex items-center justify-between"
                  >

                    <div>

                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Only {item.stock} left
                      </p>

                    </div>

                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                      Low
                    </span>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;






// -------------------------------------------------



// import { useEffect, useState } from "react";
// import {
//   ShoppingBag,
//   Users,
//   IndianRupee,
//   Package,
//   TrendingUp,
//   AlertCircle,
// } from "lucide-react";

// function AdminDashboard() {

//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {

//     fetch("http://localhost:5000/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));

//     fetch("http://localhost:5000/api/orders")
//       .then((res) => res.json())
//       .then((data) => setOrders(data));

//     fetch("http://localhost:5000/api/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data));

//   }, []);

//   const revenue = orders.reduce(
//     (a, c) => a + c.totalAmount,
//     0
//   );

//   const soldProducts = orders.reduce((acc, order) => {

//     order.products.forEach((p) => {

//       const existing = acc.find(
//         (item) => item.name === p.name
//       );

//       if (existing) {
//         existing.qty += p.qty;
//       } else {
//         acc.push({
//           name: p.name,
//           qty: p.qty,
//         });
//       }

//     });

//     return acc;

//   }, []);

//   const topProducts = soldProducts
//     .sort((a, b) => b.qty - a.qty)
//     .slice(0, 5);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="flex items-center justify-between mb-8">

//         <div>
//           <h1 className="text-4xl font-bold text-gray-800">
//             Admin Dashboard
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Welcome Back Admin 👋
//           </p>
//         </div>

//         <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border">
//           <p className="text-sm text-gray-500">
//             Today Sales
//           </p>

//           <h2 className="text-2xl font-bold text-green-600">
//             ₹ {revenue}
//           </h2>
//         </div>

//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

//         <div className="bg-white rounded-3xl shadow-sm p-6 border hover:shadow-lg transition">

//           <div className="flex items-center justify-between mb-4">
//             <div className="bg-green-100 p-3 rounded-2xl">
//               <IndianRupee className="text-green-600" size={28} />
//             </div>

//             <TrendingUp className="text-green-500" />
//           </div>

//           <p className="text-gray-500 text-sm">
//             Total Revenue
//           </p>

//           <h2 className="text-3xl font-bold mt-2">
//             ₹ {revenue}
//           </h2>

//         </div>

//         <div className="bg-white rounded-3xl shadow-sm p-6 border hover:shadow-lg transition">

//           <div className="flex items-center justify-between mb-4">
//             <div className="bg-blue-100 p-3 rounded-2xl">
//               <ShoppingBag className="text-blue-600" size={28} />
//             </div>

//             <TrendingUp className="text-blue-500" />
//           </div>

//           <p className="text-gray-500 text-sm">
//             Total Orders
//           </p>

//           <h2 className="text-3xl font-bold mt-2">
//             {orders.length}
//           </h2>

//         </div>

//         <div className="bg-white rounded-3xl shadow-sm p-6 border hover:shadow-lg transition">

//           <div className="flex items-center justify-between mb-4">
//             <div className="bg-orange-100 p-3 rounded-2xl">
//               <Package className="text-orange-600" size={28} />
//             </div>

//             <TrendingUp className="text-orange-500" />
//           </div>

//           <p className="text-gray-500 text-sm">
//             Total Products
//           </p>

//           <h2 className="text-3xl font-bold mt-2">
//             {products.length}
//           </h2>

//         </div>

//         <div className="bg-white rounded-3xl shadow-sm p-6 border hover:shadow-lg transition">

//           <div className="flex items-center justify-between mb-4">
//             <div className="bg-purple-100 p-3 rounded-2xl">
//               <Users className="text-purple-600" size={28} />
//             </div>

//             <TrendingUp className="text-purple-500" />
//           </div>

//           <p className="text-gray-500 text-sm">
//             Total Users
//           </p>

//           <h2 className="text-3xl font-bold mt-2">
//             {users.length}
//           </h2>

//         </div>

//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border p-6">

//           <div className="flex items-center justify-between mb-6">

//             <h2 className="text-2xl font-bold text-gray-800">
//               Recent Orders
//             </h2>

//           </div>

//           <div className="space-y-4">

//             {orders.slice(0, 5).map((order) => (

//               <div
//                 key={order._id}
//                 className="border rounded-2xl p-4 hover:bg-gray-50 transition"
//               >

//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

//                   <div>
//                     <p className="font-bold text-gray-800">
//                       Order ID
//                     </p>

//                     <p className="text-gray-500 text-sm break-all">
//                       {order._id}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="font-bold text-gray-800">
//                       Customer
//                     </p>

//                     <p className="text-gray-500 text-sm">
//                       {order.userId}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="font-bold text-gray-800">
//                       Amount
//                     </p>

//                     <p className="text-green-600 font-bold">
//                       ₹ {order.totalAmount}
//                     </p>
//                   </div>

//                   <div>
//                     <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
//                       {order.status}
//                     </span>
//                   </div>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//         <div className="bg-white rounded-3xl shadow-sm border p-6">

//           <div className="flex items-center justify-between mb-6">

//             <h2 className="text-2xl font-bold text-gray-800">
//               Top Products
//             </h2>

//             <Package className="text-gray-400" />

//           </div>

//           <div className="space-y-4">

//             {topProducts.length === 0 ? (

//               <div className="flex flex-col items-center justify-center py-10 text-center">

//                 <AlertCircle size={40} className="text-gray-400 mb-3" />

//                 <p className="text-gray-500">
//                   No Products Sold Yet
//                 </p>

//               </div>

//             ) : (

//               topProducts.map((item, index) => (

//                 <div
//                   key={index}
//                   className="flex items-center justify-between border-b pb-3"
//                 >

//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       {item.name}
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       Best Selling Product
//                     </p>
//                   </div>

//                   <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
//                     {item.qty} Sold
//                   </div>

//                 </div>

//               ))

//             )}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default AdminDashboard;