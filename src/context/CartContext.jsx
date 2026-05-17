// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {

//   const [cart, setCart] = useState([]);

//   // 🔄 LOAD FROM LOCALSTORAGE
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   // 💾 SAVE TO LOCALSTORAGE
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // 🛒 ADD TO CART
//   const addToCart = (product) => {

//     const exist = cart.find((item) => item._id === product._id);

//     if (exist) {
//       // 🔁 quantity increase
//       setCart(
//         cart.map((item) =>
//           item._id === product._id
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         )
//       );
//     } else {
//       // 🆕 new item add (🔥 image fix here)
//       const newItem = {
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         category: product.category,
//         color: product.color,
//         size: product.size,
//         stock: product.stock,
//         image: product.image, // ✅ IMPORTANT
//         qty: 1
//       };

//       setCart([...cart, newItem]);
//     }
//   };

//   // ❌ REMOVE ITEM
//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item._id !== id));
//   };

//   // 🔢 UPDATE QTY
//   const updateQty = (id, qty) => {
//     setCart(
//       cart.map((item) =>
//         item._id === id ? { ...item, qty } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQty
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // ✅ CUSTOM HOOK
// export const useCart = () => useContext(CartContext);



import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // LOAD
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) setCart(JSON.parse(data));
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD
  const addToCart = (product) => {

    const exist = cart.find((i) => i._id === product._id);

    if (exist) {
      setCart(cart.map((i) =>
        i._id === product._id
          ? { ...i, qty: i.qty + 1 }
          : i
      ));
    } else {
      setCart([
        ...cart,
        {
          ...product,
          image: product.image,
          qty: 1
        }
      ]);
    }
  };

  // ❌ REMOVE (FIXED)
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  // 🔢 UPDATE QTY (FIXED)
  const updateQty = (id, qty) => {

    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((i) =>
        i._id === id ? { ...i, qty } : i
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQty
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {

//   const [cart, setCart] = useState([]);

//   // 🔄 LOAD FROM LOCALSTORAGE
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart"));
//     if (savedCart) setCart(savedCart);
//   }, []);

//   // 💾 SAVE TO LOCALSTORAGE
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // 🛒 ADD TO CART
//   const addToCart = (product) => {

//     // 🔥 FIX: image properly save करो
//     const item = {
//       _id: product._id,
//       name: product.name,
//       price: product.price,
//       category: product.category,
//       color: product.color,
//       size: product.size,
//       stock: product.stock,
//       image: product.image, // ✅ IMPORTANT
//       qty: 1
//     };

//     const exist = cart.find((x) => x._id === product._id);

//     if (exist) {
//       setCart(
//         cart.map((x) =>
//           x._id === product._id ? { ...x, qty: x.qty + 1 } : x
//         )
//       );
//     } else {
//       setCart([...cart, item]);
//     }
//   };

//   // ❌ REMOVE
//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item._id !== id));
//   };

//   // 🔢 UPDATE QTY
//   const updateQty = (id, qty) => {
//     setCart(
//       cart.map((item) =>
//         item._id === id ? { ...item, qty } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{
//       cart,
//       addToCart,
//       removeFromCart,
//       updateQty
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // ✅ HOOK
// export const useCart = () => useContext(CartContext);