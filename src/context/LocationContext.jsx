// import { createContext, useContext, useState, useEffect } from "react";

// // 🔥 1. Context create
// const LocationContext = createContext();

// // 🔥 2. Provider
// export const LocationProvider = ({ children }) => {

//   // 📍 location store
//   const [location, setLocation] = useState("Select Location");

//   // 🔄 3. page reload पर localStorage से data लाना
//   useEffect(() => {
//     const saved = localStorage.getItem("location");
//     if (saved) setLocation(saved);
//   }, []);

//   // 📍 4. current location detect
//   const detectLocation = () => {

//     if (!navigator.geolocation) {
//       alert("Browser support nahi karta");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {

//         const { latitude, longitude } = pos.coords;

//         // 🌍 FREE API (city name nikalne ke liye)
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//         );

//         const data = await res.json();

//         const city =
//           data.address.city ||
//           data.address.town ||
//           data.address.village ||
//           "Your Location";

//         setLocation(city);

//         localStorage.setItem("location", city);
//       },
//       () => {
//         alert("Permission deny ho gayi");
//       }
//     );
//   };

//   // ✍️ 5. manual location
//   const setManualLocation = (city) => {
//     setLocation(city);
//     localStorage.setItem("location", city);
//   };

//   return (
//     <LocationContext.Provider value={{
//       location,
//       detectLocation,
//       setManualLocation
//     }}>
//       {children}
//     </LocationContext.Provider>
//   );
// };

// // 🔥 hook
// export const useLocation = () => useContext(LocationContext);

import { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {

  const [location, setLocation] = useState("Detecting location...");

  // 📍 CURRENT LOCATION DETECT
  const detectLocation = () => {

    if (!navigator.geolocation) {
      setLocation("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (pos) => {

        const { latitude, longitude } = pos.coords;

        try {

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            "Your Location";

          setLocation(city);

          localStorage.setItem("location", city);

        } catch {
          setLocation("Location error");
        }
      },

      () => {
        // ❌ Permission deny
        const saved = localStorage.getItem("location");

        if (saved) {
          setLocation(saved);
        } else {
          setLocation("Select Location");
        }
      }
    );
  };

  // 🔥 AUTO DETECT ON PAGE LOAD
  useEffect(() => {

    detectLocation();

  }, []);

  // ✍️ MANUAL LOCATION
  const setManualLocation = (city) => {

    if (!city) return;

    setLocation(city);

    localStorage.setItem("location", city);
  };

  return (
    <LocationContext.Provider value={{
      location,
      detectLocation,
      setManualLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);