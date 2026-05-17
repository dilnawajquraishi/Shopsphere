// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// import { BrowserRouter } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";

// import "./index.css"; // ✅ CSS वापस लाने के लिए

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </BrowserRouter>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

// ✅ CONTEXTS
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// ✅ CSS (IMPORTANT)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>
  </BrowserRouter>
);





// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </BrowserRouter>
// );