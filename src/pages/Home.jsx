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





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";

// function Home() {

//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [search, setSearch] = useState("");
//   const [color, setColor] = useState("");
//   const [size, setSize] = useState("");
//   const [category, setCategory] = useState("");

//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   useEffect(() => {
//     fetch("http://https://shopsphere-backend-qxry.onrender.com/api/products")
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setFiltered(data);
//       });
//   }, []);

//   useEffect(() => {

//     let data = [...products];

//     // 🔍 SEARCH
//     if (search) {

//       data = data.filter((p) => {

//         const searchText = search.toLowerCase();

//         return (
//           p.name?.toLowerCase().includes(searchText) ||
//           p.category?.toLowerCase().includes(searchText) ||
//           p.color?.toLowerCase().includes(searchText) ||
//           p.size?.toLowerCase().includes(searchText)
//         );

//       });

//     }

//     // 🎨 COLOR FILTER
//     if (color) {

//       data = data.filter((p) =>
//         p.color
//           ?.toLowerCase()
//           .split(",")
//           .map(c => c.trim())
//           .includes(color.toLowerCase())
//       );

//     }

//     // 📏 SIZE FILTER
//     if (size) {

//       data = data.filter((p) =>
//         p.size
//           ?.toLowerCase()
//           .split(",")
//           .map(s => s.trim())
//           .includes(size.toLowerCase())
//       );

//     }

//     // 📦 CATEGORY FILTER
//     if (category) {

//       data = data.filter((p) =>
//         p.category?.toLowerCase() === category.toLowerCase()
//       );

//     }

//     setFiltered(data);

//   }, [search, color, size, category, products]);

//   return (
//     <div>

//       {/* 🔍 FILTER */}
//       <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl shadow">

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-4 py-2 rounded-xl outline-none w-full md:w-64"
//         />

//         {/* CATEGORY */}
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border px-4 py-2 rounded-xl outline-none"
//         >
//           <option value="">All Category</option>

//           <option>Shirt</option>
//           <option>T-shirt</option>
//           <option>Jeans</option>
//           <option>Hoodie</option>
//           <option>Jacket</option>
//           <option>Trouser</option>
//           <option>Lower</option>
//           <option>Shoes</option>
//           <option>Kurta</option>
//           <option>Watch</option>

//         </select>

//         {/* COLOR */}
//         <select
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//           className="border px-4 py-2 rounded-xl outline-none"
//         >
//           <option value="">All Color</option>

//           <option>Black</option>
//           <option>White</option>
//           <option>Blue</option>
//           <option>Red</option>
//           <option>Green</option>
//           <option>Yellow</option>
//           <option>Pink</option>
//           <option>Brown</option>
//           <option>Grey</option>
//           <option>Orange</option>

//         </select>

//         {/* SIZE */}
//         <select
//           value={size}
//           onChange={(e) => setSize(e.target.value)}
//           className="border px-4 py-2 rounded-xl outline-none"
//         >
//           <option value="">All Size</option>

//           <option>XS</option>
//           <option>S</option>
//           <option>M</option>
//           <option>L</option>
//           <option>XL</option>
//           <option>XXL</option>

//           <option>28</option>
//           <option>30</option>
//           <option>32</option>
//           <option>34</option>
//           <option>36</option>
//           <option>38</option>
//           <option>40</option>
//           <option>42</option>

//         </select>

//       </div>

//       {/* 🛍️ PRODUCTS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//         {filtered.map((p) => {

//           const liked = wishlist.find(i => i._id === p._id);

//           return (
//             <div
//               key={p._id}
//               onClick={() => navigate(`/product/${p._id}`)}
//               className="bg-white rounded-2xl shadow hover:shadow-xl transition p-3 cursor-pointer flex flex-col"
//             >

//               {/* IMAGE */}
//               <div className="relative bg-gray-100 rounded-xl flex items-center justify-center h-56 overflow-hidden">

//                 <img
//                   src={`http://https://shopsphere-backend-qxry.onrender.com/${p.image}`}
//                   alt={p.name}
//                   className="h-full w-full object-contain hover:scale-105 transition duration-300"
//                 />

//                 {/* ❤️ */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleWishlist(p);
//                   }}
//                   className={`absolute top-2 right-2 text-2xl ${
//                     liked ? "text-red-500" : "text-gray-400"
//                   }`}
//                 >
//                   ♥
//                 </button>

//               </div>

//               {/* DETAILS */}
//               <div className="mt-3 flex flex-col flex-grow">

//                 <h2 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
//                   {p.name}
//                 </h2>

//                 <p className="text-green-600 font-bold text-lg mt-1">
//                   ₹ {p.price}
//                 </p>

//                 <p className="text-xs text-gray-500 mt-1">
//                   {p.category} • {p.color}
//                 </p>

//                 <p className="text-xs text-gray-500">
//                   Sizes: {p.size}
//                 </p>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     addToCart(p);
//                     alert("Added to Cart");
//                   }}
//                   className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold"
//                 >
//                   🛒 Add to Cart
//                 </button>

//               </div>

//             </div>
//           );
//         })}

//       </div>

//     </div>
//   );
// }

// export default Home;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";

// function Home() {

//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [search, setSearch] = useState("");
//   const [color, setColor] = useState("");
//   const [size, setSize] = useState("");
//   const [category, setCategory] = useState("");

//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   useEffect(() => {

//     fetch("http://https://shopsphere-backend-qxry.onrender.com/api/products")
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setFiltered(data);
//       });

//   }, []);

//   useEffect(() => {

//     let data = [...products];

//     // 🔍 SEARCH
//     if (search) {
//       data = data.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // 🎨 COLOR
//     if (color) {
//       data = data.filter(
//         p => p.color?.toLowerCase() === color.toLowerCase()
//       );
//     }

//     // 📏 SIZE
//     if (size) {
//       data = data.filter(
//         p => p.size?.toLowerCase() === size.toLowerCase()
//       );
//     }

//     // 👕 CATEGORY
//     if (category) {
//       data = data.filter(
//         p => p.category?.toLowerCase() === category.toLowerCase()
//       );
//     }

//     setFiltered(data);

//   }, [search, color, size, category, products]);

//   return (
//     <div>

//       {/* 🔥 FILTER SECTION */}
//       <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl shadow">

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="Search product..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-4 py-2 rounded-xl outline-none"
//         />

//         {/* CATEGORY */}
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border px-4 py-2 rounded-xl"
//         >

//           <option value="">All Category</option>

//           <option>T-Shirt</option>
//           <option>Shirt</option>
//           <option>Jeans</option>
//           <option>Hoodie</option>
//           <option>Jacket</option>
//           <option>Cargo</option>
//           <option>Shorts</option>
//           <option>Track Pant</option>
//           <option>Trouser</option>
//           <option>Kurta</option>
//           <option>Blazer</option>
//           <option>Shoes</option>
//           <option>Sneakers</option>

//         </select>

//         {/* COLOR */}
//         <select
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//           className="border px-4 py-2 rounded-xl"
//         >

//           <option value="">All Color</option>

//           <option>Black</option>
//           <option>White</option>
//           <option>Blue</option>
//           <option>Red</option>
//           <option>Green</option>
//           <option>Yellow</option>
//           <option>Grey</option>
//           <option>Brown</option>
//           <option>Navy</option>
//           <option>Pink</option>
//           <option>Olive</option>
//           <option>Orange</option>
//           <option>Purple</option>

//         </select>

//         {/* SIZE */}
//         <select
//           value={size}
//           onChange={(e) => setSize(e.target.value)}
//           className="border px-4 py-2 rounded-xl"
//         >

//           <option value="">All Size</option>

//           {/* SHIRT */}
//           <option>XS</option>
//           <option>S</option>
//           <option>M</option>
//           <option>L</option>
//           <option>XL</option>
//           <option>XXL</option>

//           {/* PANT */}
//           <option>28</option>
//           <option>30</option>
//           <option>32</option>
//           <option>34</option>
//           <option>36</option>
//           <option>38</option>
//           <option>40</option>

//         </select>

//       </div>

//       {/* 🛍️ PRODUCTS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//         {filtered.map((p) => {

//           const liked = wishlist.find(i => i._id === p._id);

//           return (

//             <div
//               key={p._id}
//               onClick={() => navigate(`/product/${p._id}`)}
//               className="bg-white rounded-2xl shadow hover:shadow-xl transition p-3 cursor-pointer flex flex-col"
//             >

//               {/* IMAGE */}
//               <div className="relative bg-gray-100 rounded-xl flex items-center justify-center h-56">

//                 <img
//                   src={`http://https://shopsphere-backend-qxry.onrender.com/${p.image}`}
//                   alt={p.name}
//                   className="max-h-full max-w-full object-contain"
//                 />

//                 {/* ❤️ */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleWishlist(p);
//                   }}
//                   className={`absolute top-2 right-2 text-xl ${
//                     liked ? "text-red-500" : "text-gray-400"
//                   }`}
//                 >
//                   ♥
//                 </button>

//               </div>

//               {/* DETAILS */}
//               <div className="mt-3 flex flex-col flex-grow">

//                 <h2 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
//                   {p.name}
//                 </h2>

//                 <p className="text-green-600 font-bold text-lg mt-1">
//                   ₹ {p.price}
//                 </p>

//                 <p className="text-xs text-gray-500 mt-1">
//                   {p.category} • {p.color} • {p.size}
//                 </p>

//                 {/* CART BUTTON */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     addToCart(p);
//                     alert("Added to Cart");
//                   }}
//                   className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold"
//                 >
//                   🛒 Add to Cart
//                 </button>

//               </div>

//             </div>

//           );
//         })}

//       </div>

//     </div>
//   );
// }

// export default Home;

// ye bilkul sahi with filter




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";

// function Home() {

//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [search, setSearch] = useState("");
//   const [color, setColor] = useState("");
//   const [size, setSize] = useState("");
//   const [category, setCategory] = useState("");

//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   // 📦 GET PRODUCTS
//   useEffect(() => {

//     fetch("http://https://shopsphere-backend-qxry.onrender.com/api/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setFiltered(data);
//       });

//   }, []);

//   // 🔥 FILTER + SEARCH
//   useEffect(() => {

//     let data = [...products];

//     // 🔍 SEARCH
//     if (search.trim() !== "") {

//       data = data.filter((p) => {

//         const productName =
//           p.name?.toLowerCase() || "";

//         const categoryName =
//           p.category?.toLowerCase() || "";

//         const colorName =
//           p.color?.toLowerCase() || "";

//         const searchText =
//           search.toLowerCase().trim();

//         return (
//           productName.includes(searchText) ||
//           categoryName.includes(searchText) ||
//           colorName.includes(searchText)
//         );

//       });

//     }

//     // 🎨 COLOR FILTER
//     if (color) {

//       data = data.filter(
//         (p) =>
//           p.color?.toLowerCase() ===
//           color.toLowerCase()
//       );

//     }

//     // 📏 SIZE FILTER
//     if (size) {

//       data = data.filter(
//         (p) =>
//           p.size?.toLowerCase() ===
//           size.toLowerCase()
//       );

//     }

//     // 👕 CATEGORY FILTER
//     if (category) {

//       data = data.filter(
//         (p) =>
//           p.category?.toLowerCase() ===
//           category.toLowerCase()
//       );

//     }

//     setFiltered(data);

//   }, [search, color, size, category, products]);

//   return (

//     <div>

//       {/* 🔥 PREMIUM FILTER BAR */}
//       <div className="bg-white rounded-3xl shadow-lg p-5 mb-6 flex flex-wrap gap-4 items-center">

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="🔍 Search products..."
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//           className="border border-gray-300 px-4 py-3 rounded-2xl outline-none flex-1 min-w-[220px] focus:ring-2 focus:ring-blue-500"
//         />

//         {/* CATEGORY */}
//         <select
//           value={category}
//           onChange={(e) =>
//             setCategory(e.target.value)
//           }
//           className="border border-gray-300 px-4 py-3 rounded-2xl outline-none"
//         >

//           <option value="">
//             All Category
//           </option>

//           <option>T-Shirt</option>
//           <option>Shirt</option>
//           <option>Jeans</option>
//           <option>Hoodie</option>
//           <option>Jacket</option>
//           <option>Cargo</option>
//           <option>Shorts</option>
//           <option>Track Pant</option>
//           <option>Trouser</option>
//           <option>Kurta</option>
//           <option>Blazer</option>
//           <option>Shoes</option>
//           <option>Sneakers</option>

//         </select>

//         {/* COLOR */}
//         <select
//           value={color}
//           onChange={(e) =>
//             setColor(e.target.value)
//           }
//           className="border border-gray-300 px-4 py-3 rounded-2xl outline-none"
//         >

//           <option value="">
//             All Color
//           </option>

//           <option>Black</option>
//           <option>White</option>
//           <option>Blue</option>
//           <option>Red</option>
//           <option>Green</option>
//           <option>Yellow</option>
//           <option>Grey</option>
//           <option>Brown</option>
//           <option>Navy</option>
//           <option>Pink</option>
//           <option>Olive</option>
//           <option>Orange</option>
//           <option>Purple</option>

//         </select>

//         {/* SIZE */}
//         <select
//           value={size}
//           onChange={(e) =>
//             setSize(e.target.value)
//           }
//           className="border border-gray-300 px-4 py-3 rounded-2xl outline-none"
//         >

//           <option value="">
//             All Size
//           </option>

//           {/* SHIRT */}
//           <option>XS</option>
//           <option>S</option>
//           <option>M</option>
//           <option>L</option>
//           <option>XL</option>
//           <option>XXL</option>

//           {/* PANT */}
//           <option>28</option>
//           <option>30</option>
//           <option>32</option>
//           <option>34</option>
//           <option>36</option>
//           <option>38</option>
//           <option>40</option>

//         </select>

//       </div>

//       {/* 🛍️ PRODUCTS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//         {filtered.map((p) => {

//           const liked = wishlist.find(
//             (i) => i._id === p._id
//           );

//           return (

//             <div
//               key={p._id}
//               onClick={() =>
//                 navigate(`/product/${p._id}`)
//               }
//               className="bg-white rounded-3xl shadow hover:shadow-2xl transition duration-300 p-3 cursor-pointer flex flex-col"
//             >

//               {/* 🔥 IMAGE */}
//               <div className="relative bg-gray-100 rounded-2xl flex items-center justify-center h-60 overflow-hidden">

//                 <img
//                   src={`http://https://shopsphere-backend-qxry.onrender.com/${p.image}`}
//                   alt={p.name}
//                   className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
//                 />

//                 {/* ❤️ WISHLIST */}
//                 <button
//                   onClick={(e) => {

//                     e.stopPropagation();
//                     toggleWishlist(p);

//                   }}
//                   className={`absolute top-3 right-3 text-2xl ${
//                     liked
//                       ? "text-red-500"
//                       : "text-gray-400"
//                   }`}
//                 >
//                   ♥
//                 </button>

//               </div>

//               {/* 📄 DETAILS */}
//               <div className="mt-4 flex flex-col flex-grow">

//                 <h2 className="font-semibold text-sm line-clamp-2 min-h-[42px]">
//                   {p.name}
//                 </h2>

//                 <p className="text-green-600 font-bold text-xl mt-2">
//                   ₹ {p.price}
//                 </p>

//                 <p className="text-xs text-gray-500 mt-1">
//                   {p.category} • {p.color} • {p.size}
//                 </p>

//                 {/* 🛒 BUTTON */}
//                 <button
//                   onClick={(e) => {

//                     e.stopPropagation();

//                     addToCart(p);

//                     alert("Added to Cart");

//                   }}
//                   className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-2xl text-sm font-semibold transition"
//                 >
//                   🛒 Add to Cart
//                 </button>

//               </div>

//             </div>

//           );

//         })}

//       </div>

//     </div>

//   );
// }

// export default Home;





// -----------------------------------------------new--------------

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";

// function Home() {

//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [search, setSearch] = useState("");
//   const [color, setColor] = useState("");
//   const [size, setSize] = useState("");
//   const [category, setCategory] = useState("");

//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   useEffect(() => {
//     fetch("http://https://shopsphere-backend-qxry.onrender.com/api/products")
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setFiltered(data);
//       });
//   }, []);

//   useEffect(() => {

//     let data = [...products];

//     if (search) {
//       data = data.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (color) data = data.filter(p => p.color === color);
//     if (size) data = data.filter(p => p.size === size);
//     if (category) data = data.filter(p => p.category === category);

//     setFiltered(data);

//   }, [search, color, size, category, products]);

//   return (
//     <div>

//       {/* 🔍 FILTER */}
//       <div className="flex flex-wrap gap-3 mb-5 bg-white p-4 rounded shadow">

//         <input
//           type="text"
//           placeholder="Search product..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-3 py-2 rounded"
//         />

//         <select onChange={(e) => setCategory(e.target.value)} className="border px-3 py-2 rounded">
//           <option value="">All Category</option>
//           <option>Shirt</option>
//           <option>Jeans</option>
//           <option>T-shirt</option>
//         </select>

//         <select onChange={(e) => setColor(e.target.value)} className="border px-3 py-2 rounded">
//           <option value="">All Color</option>
//           <option>Red</option>
//           <option>Blue</option>
//           <option>Black</option>
//         </select>

//         <select onChange={(e) => setSize(e.target.value)} className="border px-3 py-2 rounded">
//           <option value="">All Size</option>
//           <option>S</option>
//           <option>M</option>
//           <option>L</option>
//         </select>

//       </div>

//       {/* 🛍️ PRODUCTS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//         {filtered.map((p) => {

//           const liked = wishlist.find(i => i._id === p._id);

//           return (
//             <div
//               key={p._id}
//               onClick={() => navigate(`/product/${p._id}`)}
//               className="bg-white rounded-2xl shadow hover:shadow-xl transition p-3 cursor-pointer flex flex-col"
//             >

//               {/* 🔥 IMAGE BOX FIX */}
//               <div className="relative bg-gray-100 rounded-xl flex items-center justify-center h-56">

//                 <img
//                   src={`http://https://shopsphere-backend-qxry.onrender.com/${p.image}`}
//                   alt={p.name}
//                   className="max-h-full max-w-full object-contain"
//                 />

//                 {/* ❤️ */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleWishlist(p);
//                   }}
//                   className={`absolute top-2 right-2 text-xl ${
//                     liked ? "text-red-500" : "text-gray-400"
//                   }`}
//                 >
//                   ♥
//                 </button>

//               </div>

//               {/* DETAILS */}
//               <div className="mt-3 flex flex-col flex-grow">

//                 <h2 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
//                   {p.name}
//                 </h2>

//                 <p className="text-green-600 font-bold text-lg mt-1">
//                   ₹ {p.price}
//                 </p>

//                 <p className="text-xs text-gray-500 mt-1">
//                   {p.category} • {p.color} • {p.size}
//                 </p>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     addToCart(p);
//                     alert("Added to Cart");
//                   }}
//                   className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold"
//                 >
//                   🛒 Add to Cart
//                 </button>

//               </div>

//             </div>
//           );
//         })}

//       </div>

//     </div>
//   );
// }

// export default Home;

// import { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";

// function Home() {

//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState("all");

//   useEffect(() => {
//     fetch("http://https://shopsphere-backend-qxry.onrender.com/api/products")
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