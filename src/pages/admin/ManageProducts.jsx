// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ManageProducts() {

//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   const fetchProducts = () => {
//     fetch("http://https://shopsphere-backend-qxry.onrender.com/api/products")
//       .then(res => res.json())
//       .then(setProducts);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const deleteProduct = async (id) => {
//     await fetch(`http://https://shopsphere-backend-qxry.onrender.com/api/products/${id}`, {
//       method: "DELETE"
//     });
//     fetchProducts();
//   };

//   return (
//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

//       <div className="grid grid-cols-3 gap-4">

//         {products.map((p) => (
//           <div key={p._id} className="bg-white p-4 shadow rounded">

//             <img
//               src={`http://https://shopsphere-backend-qxry.onrender.com/${p.image}`}
//               className="h-32 w-full object-cover rounded"
//             />

//             <h2 className="font-bold mt-2">{p.name}</h2>
//             <p>₹ {p.price}</p>

//             <div className="flex gap-2 mt-3">

//               {/* ✅ EDIT */}
//               <button
//                 onClick={() => navigate(`/admin/edit/${p._id}`)}
//                 className="bg-yellow-500 text-white px-3 py-1 rounded"
//               >
//                 Edit
//               </button>

//               {/* ❌ DELETE */}
//               <button
//                 onClick={() => deleteProduct(p._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>

//             </div>

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }

// export default ManageProducts;





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ManageProducts() {

//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   // 📦 GET PRODUCTS
//   const getProducts = () => {
//     fetch("http://https://shopsphere-backend-qxry.onrender.com/api/products")
//       .then(res => res.json())
//       .then(setProducts);
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   // ❌ DELETE PRODUCT
//   const deleteProduct = async (id) => {
//     await fetch(`http://https://shopsphere-backend-qxry.onrender.com/api/products/${id}`, {
//       method: "DELETE"
//     });

//     alert("Product Deleted Successfully");
//     getProducts();
//   };

//   return (
//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         🛠 Manage Products
//       </h1>

//       {/* PRODUCT GRID */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//         {products.map((p) => (

//           <div
//             key={p._id}
//             className="bg-white rounded-2xl shadow hover:shadow-xl transition p-3 flex flex-col"
//           >

//             {/* 🔥 BIG IMAGE BOX */}
//             <div className="h-60 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">

//               <img
//                 src={`http://https://shopsphere-backend-qxry.onrender.com/${p.image}`}
//                 alt={p.name}
//                 className="max-h-full max-w-full object-contain scale-110"
//               />

//             </div>

//             {/* DETAILS */}
//             <div className="mt-3 flex flex-col flex-grow">

//               <h2 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
//                 {p.name}
//               </h2>

//               <p className="text-green-600 font-bold text-lg">
//                 ₹ {p.price}
//               </p>

//               <p className="text-xs text-gray-500">
//                 {p.category} • {p.color} • {p.size}
//               </p>

//               <p className="text-xs text-gray-600">
//                 Stock: {p.stock}
//               </p>

//               {/* BUTTONS */}
//               <div className="flex gap-2 mt-auto">

//                 <button
//                   onClick={() => navigate(`/admin/edit/${p._id}`)}
//                   className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 rounded-lg text-sm"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => deleteProduct(p._id)}
//                   className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg text-sm"
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }

// export default ManageProducts;


// ------------------------new---------------------------

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageProducts() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 📦 GET PRODUCTS
  const getProducts = () => {

    fetch("https://shopsphere-backend-qxry.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });

  };

  useEffect(() => {
    getProducts();
  }, []);

  // ❌ DELETE PRODUCT
  const deleteProduct = async (id) => {

    await fetch(`https://shopsphere-backend-qxry.onrender.com/api/products/${id}`, {
      method: "DELETE"
    });

    alert("Product Deleted Successfully");

    getProducts();

  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        🛠 Manage Products
      </h1>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {products.map((p) => (

          <div
            key={p._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition p-3 flex flex-col"
          >

            {/* IMAGE */}
            <div className="h-60 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">

              <img
                src={`https://shopsphere-backend-qxry.onrender.com/${p.image}`}
                alt={p.name}
                className="max-h-full max-w-full object-contain scale-110"
              />

            </div>

            {/* DETAILS */}
            <div className="mt-3 flex flex-col flex-grow">

              <h2 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
                {p.name}
              </h2>

              <p className="text-green-600 font-bold text-lg">
                ₹ {p.price}
              </p>

              <p className="text-xs text-gray-500">
                {p.category} • {p.color} • {p.size}
              </p>

              <p className="text-xs text-gray-600">
                Stock: {p.stock}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-auto">

                {/* ✅ FIXED EDIT BUTTON */}
                <button
                  onClick={() =>
                    navigate(`/admin/add-product/${p._id}`)
                  }
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 rounded-lg text-sm"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg text-sm"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default ManageProducts;