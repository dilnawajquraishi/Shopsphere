import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

// 🔐 ROUTES
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// 👤 USER PAGES
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";

// 🧑‍💼 ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import AddProduct from "./pages/admin/AddProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4">

        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />

          <Route
            path="/product/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* USER ROUTES */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ManageProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

        </Routes>

      </div>

    </div>
  );
}

export default App;




// import Navbar from "./components/Navbar";
// import { Routes, Route } from "react-router-dom";

// // 🔐 PROTECTED
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// // 📄 PAGES
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import Orders from "./pages/Orders";
// import Checkout from "./pages/Checkout";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Wishlist from "./pages/Wishlist";
// import ProductDetail from "./pages/ProductDetail";

// // 🧑‍💼 ADMIN
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageProducts from "./pages/admin/ManageProducts";
// import AddProduct from "./pages/admin/AddProduct"; // ✅ IMPORTANT

// function App() {
//   return (
//     <div className="bg-gray-100 min-h-screen">

//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 py-4">

//         <Routes>

//           {/* PUBLIC */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* USER */}
//           <Route path="/" element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           } />

//           <Route path="/cart" element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           } />

//           <Route path="/orders" element={
//             <ProtectedRoute>
//               <Orders />
//             </ProtectedRoute>
//           } />

//           <Route path="/checkout" element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           } />

//           <Route path="/wishlist" element={
//             <ProtectedRoute>
//               <Wishlist />
//             </ProtectedRoute>
//           } />

//           <Route path="/product/:id" element={
//             <ProtectedRoute>
//               <ProductDetail />
//             </ProtectedRoute>
//           } />

//           {/* 🔥 ADMIN */}
//           <Route path="/admin" element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           } />

//           {/* ✅ EDIT ROUTE */}
//           <Route path="/admin/edit/:id" element={
//             <AdminRoute>
//               <AddProduct />
//             </AdminRoute>
//           } />

//           {/* ✅ ADD ROUTE */}
//           <Route path="/admin/add" element={
//             <AdminRoute>
//               <AddProduct />
//             </AdminRoute>
//           } />

//           <Route path="/admin/products" element={
//             <AdminRoute>
//               <ManageProducts />
//             </AdminRoute>
//           } />

//         </Routes>

//       </div>

//     </div>
//   );
// }

// export default App;

// --------------------------------------



// import Navbar from "./components/Navbar";
// import { Routes, Route } from "react-router-dom";

// // 🔐 PROTECTED
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// // 📄 PAGES
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import Orders from "./pages/Orders";
// import Checkout from "./pages/Checkout";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Wishlist from "./pages/Wishlist";
// import ProductDetail from "./pages/ProductDetail";

// // 🧑‍💼 ADMIN
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageProducts from "./pages/admin/ManageProducts"; // ✅ ADD

// function App() {
//   return (
//     <div className="bg-gray-100 min-h-screen">

//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 py-4">

//         <Routes>

//           {/* PUBLIC */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* USER */}
//           <Route path="/" element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           } />

//           <Route path="/cart" element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           } />

//           <Route path="/orders" element={
//             <ProtectedRoute>
//               <Orders />
//             </ProtectedRoute>
//           } />

//           <Route path="/checkout" element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           } />

//           <Route path="/wishlist" element={
//             <ProtectedRoute>
//               <Wishlist />
//             </ProtectedRoute>
//           } />

//           <Route path="/product/:id" element={
//             <ProtectedRoute>
//               <ProductDetail />
//             </ProtectedRoute>
//           } />

//           {/* 🔥 ADMIN */}
//           <Route path="/admin" element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           } />

//           <Route path="/admin/products" element={
//             <AdminRoute>
//               <ManageProducts />
//             </AdminRoute>
//           } />

//         </Routes>

//       </div>

//     </div>
//   );
// }

// export default App;