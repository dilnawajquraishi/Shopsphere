import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Home() {

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {

    let data = [...products];

    if (search) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (color) data = data.filter(p => p.color === color);
    if (size) data = data.filter(p => p.size === size);
    if (category) data = data.filter(p => p.category === category);

    setFiltered(data);

  }, [search, color, size, category, products]);

  return (
    <div>

      {/* 🔍 FILTER */}
      <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded shadow">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <select onChange={(e) => setCategory(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">All Category</option>
          <option>Shirt</option>
          <option>Jeans</option>
          <option>T-shirt</option>
        </select>

        <select onChange={(e) => setColor(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">All Color</option>
          <option>Red</option>
          <option>Blue</option>
          <option>Black</option>
        </select>

        <select onChange={(e) => setSize(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">All Size</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>

      </div>

      {/* 🛍️ PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {filtered.map((p) => {

          const liked = wishlist.find(i => i._id === p._id);

          return (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition p-3 cursor-pointer flex flex-col"
            >

              {/* 🔥 IMAGE BOX FIX */}
              <div className="relative bg-gray-100 rounded-xl flex items-center justify-center h-56">

                <img
                  src={`http://localhost:5000/${p.image}`}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain"
                />

                {/* ❤️ */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p);
                  }}
                  className={`absolute top-2 right-2 text-xl ${
                    liked ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  ♥
                </button>

              </div>

              {/* DETAILS */}
              <div className="mt-3 flex flex-col flex-grow">

                <h2 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
                  {p.name}
                </h2>

                <p className="text-green-600 font-bold text-lg mt-1">
                  ₹ {p.price}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {p.category} • {p.color} • {p.size}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                    alert("Added to Cart");
                  }}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold"
                >
                  🛒 Add to Cart
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Home;

// import { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";

// function Home() {

//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState("all");

//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then(res => res.json())
//       .then(setProducts);
//   }, []);

//   const filtered = category === "all"
//     ? products
//     : products.filter(p => p.category === category);

//   return (
//     <div>

//       {/* FILTER */}
//       <select onChange={(e) => setCategory(e.target.value)}>
//         <option value="all">All</option>
//         <option value="Shirt">Shirt</option>
//         <option value="Jeans">Jeans</option>
//         <option value="T-shirt">T-shirt</option>
//         <option value="Jacket">Jacket</option>
//       </select>

//       {/* GRID */}
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2">

//         {filtered.map(p => (
//           <ProductCard key={p._id} product={p} />
//         ))}

//       </div>

//     </div>
//   );
// }

// export default Home;