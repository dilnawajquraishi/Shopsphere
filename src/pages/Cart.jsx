import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {

  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (

        <>
          <div className="space-y-4">

            {cart.map((item) => (

              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
              >

                <div className="flex items-center gap-4">

                  <div className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded-lg">
                    <img
                      src={`http://localhost:5000/${item.image}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      {item.category} • {item.color} • {item.size}
                    </p>
                    <p className="text-green-600 font-bold">
                      ₹ {item.price}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-2">

                  <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>

                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          {/* TOTAL + CHECKOUT */}
          <div className="text-right mt-6">

            <h2 className="text-xl font-bold mb-3">
              Total: ₹ {total}
            </h2>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Proceed to Checkout
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;



// ---------------------------update for checkout-----------------------

// import { useCart } from "../context/CartContext";

// function Cart() {

//   const { cart, removeFromCart, updateQty } = useCart();

//   const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

//   return (
//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         🛒 Your Cart
//       </h1>

//       {cart.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (

//         <div className="space-y-4">

//           {cart.map((item) => (

//             <div
//               key={item._id}
//               className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
//             >

//               {/* 🔥 IMAGE + DETAILS */}
//               <div className="flex items-center gap-4">

//                 {/* ✅ PERFECT SIZE (professional) */}
//                 <div className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded-lg">

//                   <img
//                     src={`http://localhost:5000/${item.image}`}
//                     alt={item.name}
//                     className="max-h-full max-w-full object-contain"
//                   />

//                 </div>

//                 <div>
//                   <h2 className="font-semibold text-base">
//                     {item.name}
//                   </h2>

//                   <p className="text-sm text-gray-500">
//                     {item.category} • {item.color} • {item.size}
//                   </p>

//                   <p className="text-green-600 font-semibold">
//                     ₹ {item.price}
//                   </p>
//                 </div>

//               </div>

//               {/* 🔢 QTY */}
//               <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">

//                 <button
//                   onClick={() => updateQty(item._id, item.qty - 1)}
//                   className="px-2 text-lg"
//                 >
//                   -
//                 </button>

//                 <span className="font-medium">
//                   {item.qty}
//                 </span>

//                 <button
//                   onClick={() => updateQty(item._id, item.qty + 1)}
//                   className="px-2 text-lg"
//                 >
//                   +
//                 </button>

//               </div>

//               {/* ❌ REMOVE */}
//               <button
//                 onClick={() => removeFromCart(item._id)}
//                 className="text-red-500 text-sm hover:underline"
//               >
//                 Remove
//               </button>

//             </div>

//           ))}

//           {/* 💰 TOTAL */}
//           <div className="text-right font-bold text-xl mt-6">
//             Total: ₹ {total}
//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

// export default Cart;









// _____________________________________






// import { useCart } from "../context/CartContext";

// function Cart() {

//   const { cart, removeFromCart, updateQty } = useCart();

//   return (
//     <div className="p-6">

//       {cart.map((item) => (

//         <div key={item._id} className="flex gap-4 mb-4">

//           {/* IMAGE */}
//           <img
//             src={`http://localhost:5000/${item.image}`}
//             className="w-20 h-20 object-contain"
//           />

//           <div>
//             <h2>{item.name}</h2>

//             {/* 🔢 QTY */}
//             <div className="flex gap-2 mt-2">

//               <button
//                 onClick={() => updateQty(item._id, item.qty - 1)}
//               >
//                 -
//               </button>

//               <span>{item.qty}</span>

//               <button
//                 onClick={() => updateQty(item._id, item.qty + 1)}
//               >
//                 +
//               </button>

//             </div>

//             {/* ❌ DELETE */}
//             <button
//               onClick={() => removeFromCart(item._id)}
//               className="text-red-500"
//             >
//               Remove
//             </button>

//           </div>

//         </div>

//       ))}

//     </div>
//   );
// }

// export default Cart;