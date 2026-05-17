// import { useEffect, useState } from "react";

// function Orders() {

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {

//     const user = JSON.parse(localStorage.getItem("user"));

//     // 🔥 REAL DATABASE FETCH
//     fetch(`http://localhost:5000/api/orders/user/${user._id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setOrders(data);
//       })
//       .catch((err) => console.log(err));

//   }, []);

//   return (
//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         🧾 My Orders
//       </h1>

//       {orders.length === 0 ? (

//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           No Orders Yet
//         </div>

//       ) : (

//         <div className="space-y-5">

//           {orders.map((order) => (

//             <div
//               key={order._id}
//               className="bg-white shadow rounded-2xl p-5"
//             >

//               <div className="flex justify-between mb-3">

//                 <h2 className="font-bold">
//                   Order ID: {order._id}
//                 </h2>

//                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                   {order.status}
//                 </span>

//               </div>

//               <p className="mb-3 text-gray-500">
//                 Total: ₹ {order.totalAmount}
//               </p>

//               <div className="space-y-2">

//                 {order.products.map((p, i) => (

//                   <div
//                     key={i}
//                     className="flex justify-between border-b pb-2"
//                   >

//                     <div>
//                       <p className="font-semibold">
//                         {p.name}
//                       </p>

//                       <p className="text-sm text-gray-500">
//                         Qty: {p.qty}
//                       </p>
//                     </div>

//                     <p className="font-bold">
//                       ₹ {p.price * p.qty}
//                     </p>

//                   </div>

//                 ))}

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//     </div>
//   );
// }

// export default Orders;


// import { useEffect, useState } from "react";

// function Orders() {

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {

//     fetch("http://localhost:5000/api/orders")
//       .then(res => res.json())
//       .then(data => setOrders(data))
//       .catch(err => console.log(err));

//   }, []);

//   return (
//     <div className="p-6">

//       {/* HEADER */}
//       <h1 className="text-3xl font-bold mb-6">
//         🧾 My Orders
//       </h1>

//       {/* EMPTY STATE */}
//       {orders.length === 0 && (
//         <div className="bg-white p-6 rounded shadow text-center text-gray-500">
//           No orders found
//         </div>
//       )}

//       {/* ORDER LIST */}
//       <div className="space-y-5">

//         {orders.map((order) => (

//           <div
//             key={order._id}
//             className="bg-white shadow rounded-xl p-5 border"
//           >

//             {/* TOP */}
//             <div className="flex justify-between items-center mb-3">

//               <h2 className="font-bold text-gray-700">
//                 Order ID: {order._id}
//               </h2>

//               <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                 {order.status}
//               </span>

//             </div>

//             {/* PRODUCTS */}
//             <div className="space-y-2">

//               {order.products.map((p, i) => (

//                 <div
//                   key={i}
//                   className="flex justify-between border-b pb-2"
//                 >

//                   <div>
//                     <h3 className="font-semibold">
//                       {p.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       Qty: {p.qty}
//                     </p>
//                   </div>

//                   <p className="font-bold text-blue-600">
//                     ₹ {p.price * p.qty}
//                   </p>

//                 </div>

//               ))}

//             </div>

//             {/* TOTAL */}
//             <div className="mt-4 text-right font-bold text-lg">
//               Total: ₹ {order.totalAmount}
//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }

// export default Orders;




// ---------------------------------------
import { useEffect, useState } from "react";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    fetch(
      `http://localhost:5000/api/orders/user/${user.name}`
    )
      .then(res => res.json())
      .then(data => {
        setOrders(data);
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        🧾 My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="bg-white p-6 rounded-2xl shadow text-center">
          No Orders Yet
        </div>

      ) : (

        <div className="space-y-5">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-2xl shadow p-5"
            >

              <div className="flex justify-between mb-3">

                <h2 className="font-bold text-lg">
                  Order ID: {order._id}
                </h2>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {order.status}
                </span>

              </div>

              <p className="text-gray-500 mb-3">
                Total: ₹ {order.totalAmount}
              </p>

              <div className="space-y-2">

                {order.products.map((p, i) => (

                  <div
                    key={i}
                    className="flex justify-between border-b pb-2"
                  >

                    <div>

                      <p className="font-semibold">
                        {p.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {p.qty}
                      </p>

                    </div>

                    <p className="font-bold text-blue-600">
                      ₹ {p.price * p.qty}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;