import { useWishlist } from "../context/WishlistContext";

function Wishlist() {

  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">❤️ Wishlist</h1>

      <div className="grid md:grid-cols-3 gap-4">

        {wishlist.map(item => (

          <div key={item._id} className="bg-white p-3 shadow rounded">

            {/* ✅ AMAZON STYLE IMAGE FIX */}
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">

              <img
                src={
                  item.image
                    ? item.image.startsWith("http")
                      ? item.image
                      : `https://shopsphere-backend-qxry.onrender.com/${item.image}`
                    : "https://via.placeholder.com/300"
                }
                className="max-h-full max-w-full object-contain"
                alt={item.name}
              />

            </div>

            {/* DETAILS */}
            <h3 className="mt-2 font-semibold">{item.name}</h3>

            <p className="text-green-600 font-bold">
              ₹ {item.price}
            </p>

            {/* REMOVE BUTTON */}
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
