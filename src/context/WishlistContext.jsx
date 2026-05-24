// import { createContext, useState, useEffect, useContext } from "react";

// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {

//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(data);
//   }, []);

//   const toggleWishlist = (product) => {
//     let updated = [...wishlist];

//     const exist = updated.find(p => p._id === product._id);

//     if (exist) {
//       updated = updated.filter(p => p._id !== product._id);
//     } else {
//       updated.push(product);
//     }

//     setWishlist(updated);
//     localStorage.setItem("wishlist", JSON.stringify(updated));
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);





import {
  createContext,
  useState,
  useEffect,
  useContext
} from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);

  // ❤️ LOAD FROM LOCALSTORAGE
  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(data);

  }, []);

  // ❤️ TOGGLE WISHLIST
  const toggleWishlist = (product) => {

    let updated = [...wishlist];

    const exist = updated.find(
      (p) => p._id === product._id
    );

    if (exist) {

      updated = updated.filter(
        (p) => p._id !== product._id
      );

    } else {

      updated.push(product);

    }

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

  };

  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

};

export const useWishlist = () =>
  useContext(WishlistContext);