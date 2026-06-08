



// ---------------------Checkout updated------------------



// import { useCart } from "../context/CartContext";

// function Checkout() {

//   const { cart, clearCart } = useCart();

//   const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

//   const placeOrder = async () => {

//     if (cart.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     await fetch("http://https://shopsphere-backend-qxry.onrender.com/api/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         products: cart,
//         totalAmount: total
//       })
//     });

//     alert("🎉 Order Placed Successfully (Cash on Delivery)");

//     clearCart();
//   };

//   return (
//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//       <h2>Total: ₹{total}</h2>

//       <button
//         onClick={placeOrder}
//         className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
//       >
//         Place Order (COD)
//       </button>

//     </div>
//   );
// }

// export default Checkout;


// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Checkout() {

//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const total = cart.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   // 📦 PLACE ORDER
//   const placeOrder = async () => {

//     try {

//       setLoading(true);

//       const user = JSON.parse(localStorage.getItem("user"));

//       const products = cart.map(item => ({
//         productId: item._id,
//         name: item.name,
//         price: item.price,
//         qty: item.qty
//       }));

//       const res = await fetch(
//         "http://https://shopsphere-backend-qxry.onrender.com/api/orders",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json"
//           },

//           body: JSON.stringify({
//             userId: user?._id || user?.name,
//             products,
//             totalAmount: total,
//             address
//           })
//         }
//       );

//       const data = await res.json();

//       console.log(data);

//       if (data.success) {

//         alert("🎉 Order Placed Successfully");

//         localStorage.removeItem("cart");

//         navigate("/orders");

//         window.location.reload();

//       } else {

//         alert(data.message || "Order Failed");

//       }

//     } catch (err) {

//       console.log(err);

//       alert("Server Error");

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         🧾 Checkout
//       </h1>

//       <div className="bg-white rounded-2xl shadow p-6">

//         {/* PRODUCTS */}
//         <div className="space-y-4">

//           {cart.map(item => (

//             <div
//               key={item._id}
//               className="flex justify-between border-b pb-3"
//             >

//               <div>

//                 <h2 className="font-semibold">
//                   {item.name}
//                 </h2>

//                 <p className="text-sm text-gray-500">
//                   Qty: {item.qty}
//                 </p>

//               </div>

//               <h2 className="font-bold">
//                 ₹ {item.price * item.qty}
//               </h2>

//             </div>

//           ))}

//         </div>

//         {/* TOTAL */}
//         <div className="mt-6 text-right">

//           <h2 className="text-2xl font-bold">
//             Total: ₹ {total}
//           </h2>

//         </div>

//         {/* ADDRESS */}
//         <textarea
//           placeholder="Enter Delivery Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="w-full border mt-6 p-3 rounded-lg outline-none"
//           rows="4"
//         />

//         {/* BUTTON */}
//         <button
//           onClick={placeOrder}
//           disabled={loading}
//           className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
//         >

//           {loading ? "Placing Order..." : "Confirm Order"}

//         </button>

//       </div>

//     </div>
//   );
// }

// export default Checkout;





// ---------------------------------------------
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Checkout() {

//   const { cart } = useCart();
//   const navigate = useNavigate();
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

//   const placeOrder = async () => {

//     if (cart.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     if (!address) {
//       alert("Address required");
//       return;
//     }

//     try {

//       setLoading(true);

//       const user = JSON.parse(localStorage.getItem("user"));

//       // 🔥 CLEAN PRODUCTS (IMPORTANT FIX)
//       const products = cart.map(item => ({
//         productId: item._id,
//         name: item.name,
//         price: item.price,
//         qty: item.qty
//       }));

//       const res = await fetch("http://https://shopsphere-backend-qxry.onrender.com/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           userId: user?._id || "guest",
//           products,
//           totalAmount: total,
//           address
//         })
//       });

//       const data = await res.json();

//       console.log("ORDER RESPONSE:", data);

//       if (data.success) {

//         alert("Order Placed Successfully");

//         localStorage.removeItem("cart");

//         navigate("/orders");

//       } else {
//         alert("Order Failed");
//       }

//     } catch (err) {
//       console.log(err);
//       alert("Server Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl">

//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//       {/* CART SUMMARY */}
//       <div className="mb-4 space-y-2">
//         {cart.map((item) => (
//           <div key={item._id} className="flex justify-between border-b pb-2">
//             <span>{item.name} x {item.qty}</span>
//             <span>₹{item.price * item.qty}</span>
//           </div>
//         ))}
//       </div>

//       <h2 className="font-bold text-lg mb-3">
//         Total: ₹{total}
//       </h2>

//       {/* ADDRESS */}
//       <input
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         placeholder="Enter Address"
//         className="border p-2 w-full mb-3 rounded"
//       />

//       {/* BUTTON */}
//       <button
//         onClick={placeOrder}
//         disabled={loading}
//         className="bg-green-600 text-white px-4 py-2 w-full rounded"
//       >
//         {loading ? "Placing Order..." : "Confirm Order"}
//       </button>

//     </div>
//   );
// }

// export default Checkout;




// ------------------------


// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Checkout() {

//   const { cart } = useCart();

//   const navigate = useNavigate();

//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const total = cart.reduce(
//     (a, c) => a + c.price * c.qty,
//     0
//   );

//   const placeOrder = async () => {

//     if (cart.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     if (!address) {
//       alert("Address required");
//       return;
//     }

//     try {

//       setLoading(true);

//       const user = JSON.parse(localStorage.getItem("user"));

//       const res = await fetch(
<<<<<<< HEAD
//         "http://https://shopsphere-backend-qxry.onrender.com/api/orders",
=======
//         "http://localhost:5000/api/orders",
>>>>>>> 9e2c10728c54c7f1d78b4de997009e8fc9d9d295
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json"
//           },

//           body: JSON.stringify({

//             // ✅ IMPORTANT FIX
//             userId: user.name,

//             products: cart,

//             totalAmount: total,

//             address

//           })

//         }
//       );

//       const data = await res.json();

//       if (data.success) {

//         alert("Order Placed Successfully");

//         localStorage.removeItem("cart");

//         navigate("/orders");

//       } else {

//         alert("Order Failed");

//       }

//     } catch (err) {

//       console.log(err);

//       alert("Server Error");

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">

//       <h1 className="text-3xl font-bold mb-6">
//         Checkout
//       </h1>

//       <textarea
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         placeholder="Enter Full Address"
//         className="border w-full p-3 rounded-lg mb-5 h-32 outline-none"
//       />

//       <div className="flex justify-between items-center mb-5">

//         <h2 className="text-xl font-bold">
//           Total:
//         </h2>

//         <h2 className="text-2xl text-green-600 font-bold">
//           ₹ {total}
//         </h2>

//       </div>

//       <button
//         onClick={placeOrder}
//         disabled={loading}
//         className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
//       >

//         {loading
//           ? "Placing Order..."
//           : "Confirm Order"}

//       </button>

//     </div>
//   );
// }

// export default Checkout;







import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {

  const { cart } = useCart();

  const navigate = useNavigate();

  // ✅ ADDRESS STATES
  const [useNewAddress, setUseNewAddress] = useState(false);

  // ✅ USER ADDRESS
  const [address, setAddress] = useState("");

  const [newAddress, setNewAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (a, c) => a + c.price * c.qty,
    0
  );

  const placeOrder = async () => {

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    // ✅ FINAL ADDRESS
    const finalAddress = useNewAddress
      ? newAddress
      : address;

    if (!finalAddress) {
      alert("Address required");
      return;
    }

    try {

      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        "https://shopsphere-backend-qxry.onrender.com/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            userId: user.name,

            products: cart,

            totalAmount: total,

            address: finalAddress

          })

        }
      );

      const data = await res.json();

      if (data.success) {

        alert("Order Placed Successfully");

        localStorage.removeItem("cart");

        navigate("/orders");

      } else {

        alert("Order Failed");

      }

    } catch (err) {

      console.log(err);

      alert("Server Error");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">

      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      {/* ✅ ADDRESS SECTION */}
      <div className="bg-gray-50 border rounded-xl p-4 mb-5">

        <h2 className="text-lg font-bold mb-4">
          Delivery Address
        </h2>

        {/* CURRENT ADDRESS */}
        <label className="flex items-start gap-2 mb-4 cursor-pointer">

          <input
            type="radio"
            checked={!useNewAddress}
            onChange={() => setUseNewAddress(false)}
          />

          <div className="w-full">

            <p className="font-semibold mb-2">
              Current Address
            </p>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Current Address"
              className="border w-full p-3 rounded-lg h-24 outline-none"
            />

          </div>

        </label>

        {/* NEW ADDRESS */}
        <label className="flex items-center gap-2 cursor-pointer mb-3">

          <input
            type="radio"
            checked={useNewAddress}
            onChange={() => setUseNewAddress(true)}
          />

          <span className="font-semibold">
            Deliver To Another Address
          </span>

        </label>

        {/* NEW ADDRESS BOX */}
        {useNewAddress && (

          <textarea
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter New Delivery Address"
            className="border w-full p-3 rounded-lg h-24 outline-none"
          />

        )}

      </div>

      {/* TOTAL */}
      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
          Total:
        </h2>

        <h2 className="text-2xl text-green-600 font-bold">
          ₹ {total}
        </h2>

      </div>

      {/* BUTTON */}
      <button
        onClick={placeOrder}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
      >

        {loading
          ? "Placing Order..."
          : "Confirm Order"}

      </button>

    </div>
  );
}

export default Checkout;