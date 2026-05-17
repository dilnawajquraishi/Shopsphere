import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  const liked = wishlist.find(p => p._id === product._id);

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6 bg-white rounded shadow">

      {/* 🖼️ IMAGE */}
      <div>
        <img
          src={`http://localhost:5000/${product.image}`}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* 📄 DETAILS */}
      <div>

        <h1 className="text-2xl font-bold mb-3">
          {product.name}
        </h1>

        <p className="text-green-600 text-xl font-semibold mb-2">
          ₹ {product.price}
        </p>

        <p className="text-gray-600 mb-2">
          Category: {product.category}
        </p>

        <p className="text-gray-600 mb-2">
          Color: {product.color}
        </p>

        <p className="text-gray-600 mb-2">
          Size: {product.size}
        </p>

        <p className="mb-4">
          Stock: {product.stock}
        </p>

        {/* ❤️ WISHLIST */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`px-4 py-2 rounded mb-3 ${
            liked ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          {liked ? "❤️ Added" : "🤍 Wishlist"}
        </button>

        {/* 🛒 CART */}
        <button
          onClick={() => {
            addToCart(product);
            alert("Added to Cart");
          }}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          🛒 Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetail;




// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// function ProductDetail() {

//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   // 📦 PRODUCT
//   useEffect(() => {
//     fetch(`http://localhost:5000/api/products`)
//       .then(res => res.json())
//       .then(data => {
//         const p = data.find(i => i._id === id);
//         setProduct(p);
//       });
//   }, [id]);

//   // ⭐ REVIEWS
//   const loadReviews = () => {
//     fetch(`http://localhost:5000/api/reviews/${id}`)
//       .then(res => res.json())
//       .then(setReviews);
//   };

//   useEffect(() => {
//     loadReviews();
//   }, [id]);

//   // ➕ ADD REVIEW
//   const submitReview = async () => {

//     if (!comment) {
//       alert("Write something");
//       return;
//     }

//     await fetch("http://localhost:5000/api/reviews", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         productId: id,
//         userName: "User",
//         rating,
//         comment
//       })
//     });

//     setComment("");
//     loadReviews();
//   };

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="p-4">

//       {/* PRODUCT */}
//       <div className="flex gap-6">

//         <img
//           src={`http://localhost:5000/uploads/${product.image}`}
//           className="w-72 h-72 object-cover"
//         />

//         <div>
//           <h1 className="text-xl font-bold">{product.name}</h1>
//           <p className="text-green-600">₹ {product.price}</p>
//         </div>

//       </div>

//       {/* ⭐ ADD REVIEW */}
//       <div className="mt-6">

//         <h2 className="font-bold mb-2">⭐ Add Review</h2>

//         <select onChange={(e) => setRating(e.target.value)}>
//           <option value="5">5 ⭐</option>
//           <option value="4">4 ⭐</option>
//           <option value="3">3 ⭐</option>
//           <option value="2">2 ⭐</option>
//           <option value="1">1 ⭐</option>
//         </select>

//         <textarea
//           placeholder="Write review..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="block border p-2 mt-2 w-full"
//         />

//         <button
//           onClick={submitReview}
//           className="bg-blue-500 text-white px-4 py-1 mt-2"
//         >
//           Submit
//         </button>

//       </div>

//       {/* 📦 SHOW REVIEWS */}
//       <div className="mt-6">

//         <h2 className="font-bold mb-2">Reviews</h2>

//         {reviews.map(r => (
//           <div key={r._id} className="bg-white p-3 shadow mb-2">

//             <p>⭐ {r.rating}</p>
//             <p>{r.comment}</p>

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }

// export default ProductDetail;