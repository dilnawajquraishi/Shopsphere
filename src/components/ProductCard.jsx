// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";

// function ProductCard({ product }) {

//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">

//       {/* IMAGE */}
//       <div
//         className="h-52 bg-gray-100 rounded overflow-hidden cursor-pointer"
//         onClick={() => navigate(`/product/${product._id}`)}
//       >
//         <img
//           src={`http://localhost:5000/uploads/${product.image}`}
//           alt="product"
//           className="w-full h-full object-cover hover:scale-105 transition"
//         />
//       </div>

//       {/* DETAILS */}
//       <div className="mt-3">

//         <h3 className="font-semibold text-sm">
//           {product.name}
//         </h3>

//         <p className="text-green-600 font-bold">
//           ₹ {product.price}
//         </p>

//         <p className="text-xs">Color: {product.color}</p>
//         <p className="text-xs">Size: {product.size}</p>

//         {/* 🛒 BUTTON */}
//         <button
//           onClick={() => addToCart(product)}
//           className="w-full mt-2 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
//         >
//           Add to Cart 🛒
//         </button>

//       </div>

//     </div>
//   );
// }

// export default ProductCard;

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {

  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ❤️ WISHLIST
  const { wishlist, toggleWishlist } = useWishlist();
  const isLiked = wishlist.find(p => p._id === product._id);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">

      {/* IMAGE + HEART */}
      <div className="relative">

        <div
          className="h-52 bg-gray-100 rounded overflow-hidden cursor-pointer"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <img
            src={`https://shopsphere-backend-qxry.onrender.com/uploads/${product.image}`}
            alt="product"
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>

        {/* ❤️ HEART BUTTON */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 text-2xl"
        >
          {isLiked ? "❤️" : "🤍"}
        </button>

      </div>

      {/* DETAILS */}
      <div className="mt-3">

        <h3 className="font-semibold text-sm">
          {product.name}
        </h3>

        <p className="text-green-600 font-bold">
          ₹ {product.price}
        </p>

        <p className="text-xs">Color: {product.color}</p>
        <p className="text-xs">Size: {product.size}</p>

        {/* 🛒 ADD TO CART */}
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-2 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
        >
          Add to Cart 🛒
        </button>

      </div>

    </div>
  );
}

export default ProductCard;