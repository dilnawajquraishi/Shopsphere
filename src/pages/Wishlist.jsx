// import { useEffect, useState } from "react";

// function Wishlist() {

//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/wishlist", {
//       headers: {
//         "Authorization": localStorage.getItem("token")
//       }
//     })
//       .then(res => res.json())
//       .then(setItems);
//   }, []);

//   return (
//     <div className="p-4">

//       <h1 className="text-2xl font-bold mb-4">
//         ❤️ Wishlist
//       </h1>

//       {items.map((item) => (
//         <div key={item._id} className="border p-3 mb-2">
//           Product ID: {item.productId}
//         </div>
//       ))}

//     </div>
//   );
// }

// export default Wishlist;


import { useWishlist } from "../context/WishlistContext";

function Wishlist() {

  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">❤️ Wishlist</h1>

      <div className="grid md:grid-cols-3 gap-4">

        {wishlist.map(item => (
          <div key={item._id} className="bg-white p-3 shadow rounded">

            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              className="h-40 w-full object-cover"
            />

            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>

            <button
              onClick={() => toggleWishlist(item)}
              className="text-red-500 mt-2"
            >
              Remove ❤️
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Wishlist;