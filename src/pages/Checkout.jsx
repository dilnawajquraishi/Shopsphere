
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