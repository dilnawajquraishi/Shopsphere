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

  // 📦 FETCH PRODUCTS
  useEffect(() => {

    fetch("https://shopsphere-backend-qxry.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);
        setFiltered(data);

      });

  }, []);

  // 🔍 FILTERS
  useEffect(() => {

    let data = [...products];

    // SEARCH
    if (search) {

      data = data.filter((p) => {

        const text = search.toLowerCase();

        return (

          p.name?.toLowerCase().includes(text) ||
          p.category?.toLowerCase().includes(text) ||
          p.color?.toLowerCase().includes(text) ||
          p.size?.toLowerCase().includes(text)

        );

      });

    }

    // COLOR FILTER
    if (color) {

      data = data.filter((p) =>

        p.color
          ?.toLowerCase()
          .split(",")
          .map((c) => c.trim())
          .includes(color.toLowerCase())

      );

    }

    // SIZE FILTER
    if (size) {

      data = data.filter((p) =>

        p.size
          ?.toLowerCase()
          .split(",")
          .map((s) => s.trim())
          .includes(size.toLowerCase())

      );

    }

    // CATEGORY FILTER
    if (category) {

      data = data.filter(
        (p) =>
          p.category?.toLowerCase() ===
          category.toLowerCase()
      );

    }

    setFiltered(data);

  }, [search, color, size, category, products]);

  return (

    <div>

      {/* 🔍 FILTER */}
      <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl shadow">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-xl outline-none w-full md:w-64"
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-xl outline-none"
        >

          <option value="">All Category</option>

          <option>Shirt</option>
          <option>T-shirt</option>
          <option>Jeans</option>
          <option>Hoodie</option>
          <option>Jacket</option>
          <option>Trouser</option>
          <option>Lower</option>
          <option>Shoes</option>
          <option>Kurta</option>
          <option>Watch</option>

        </select>

        {/* COLOR */}
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border px-4 py-2 rounded-xl outline-none"
        >

          <option value="">All Color</option>

          <option>Black</option>
          <option>White</option>
          <option>Blue</option>
          <option>Red</option>
          <option>Green</option>
          <option>Yellow</option>
          <option>Pink</option>
          <option>Brown</option>
          <option>Grey</option>
          <option>Orange</option>

        </select>

        {/* SIZE */}
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border px-4 py-2 rounded-xl outline-none"
        >

          <option value="">All Size</option>

          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>

          <option>28</option>
          <option>30</option>
          <option>32</option>
          <option>34</option>
          <option>36</option>
          <option>38</option>
          <option>40</option>
          <option>42</option>

        </select>

      </div>

      {/* 🛍 PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {filtered.map((p) => {

          // ❤️ FIXED LIKE CHECK
          const liked = wishlist.some(
            (i) => i._id === p._id
          );

          return (

            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition p-3 cursor-pointer flex flex-col"
            >

              {/* IMAGE */}
              <div className="relative bg-gray-100 rounded-xl flex items-center justify-center h-56 overflow-hidden">

                <img
                  src={`https://shopsphere-backend-qxry.onrender.com/${p.image}`}
                  alt={p.name}
                  className="h-full w-full object-contain hover:scale-105 transition duration-300"
                />

                {/* ❤️ WISHLIST */}
                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    toggleWishlist(p);

                  }}
                  className={`absolute top-2 right-2 text-2xl transition ${
                    liked
                      ? "text-red-500"
                      : "text-gray-400"
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
                  {p.category} • {p.color}
                </p>

                <p className="text-xs text-gray-500">
                  Sizes: {p.size}
                </p>

                {/* ADD TO CART */}
                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    addToCart(p);

                    alert("Added to Cart");

                  }}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold"
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

