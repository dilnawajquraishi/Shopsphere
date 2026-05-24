// import { useEffect, useState } from "react";

// function AdminOrders() {

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {

//     fetch("http://localhost:5000/api/orders")
//       .then(res => res.json())
//       .then(data => setOrders(data));

//   }, []);

//   return (
//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-5">
//         📦 All Orders (Admin)
//       </h1>

//       {orders.map(order => (

//         <div key={order._id} className="bg-white shadow rounded p-5 mb-5">

//           <p><b>User:</b> {order.userId}</p>
//           <p><b>Status:</b> {order.status}</p>
//           <p><b>Total:</b> ₹{order.totalAmount}</p>
//           <p><b>Address:</b> {order.address}</p>

//           <div className="mt-3">

//             <b>Products:</b>

//             {order.products.map((p, i) => (
//               <div key={i} className="border-b py-1">
//                 {p.name} × {p.qty} = ₹{p.price * p.qty}
//               </div>
//             ))}

//           </div>

//         </div>

//       ))}

//     </div>
//   );
// }

// export default AdminOrders;



// ------------------------------------------------------

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetch("https://shopsphere-backend-qxry.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));

  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      <AdminSidebar />

      <div className="lg:ml-64 p-4 md:p-6">

        <h1 className="text-3xl font-bold mb-6">
          All Orders
        </h1>

        <div className="space-y-4">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm p-5"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <p className="font-bold text-lg">
                    {order.userId}
                  </p>

                  <p className="text-sm text-gray-500 break-all">
                    {order._id}
                  </p>

                </div>

                <div className="text-green-600 font-bold text-xl">
                  ₹ {order.totalAmount}
                </div>

                <div>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {order.status}
                  </span>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminOrders;