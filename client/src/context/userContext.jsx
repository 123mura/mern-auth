// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/user", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (response.ok) {
//           const userData = await response.json();
//           setUser(userData);
//           console.log("Fetched user data:", userData); // Debugging log
//         } else {
//           console.error("Error fetching user data");
//         }
//       } catch (error) {
//         console.error("error fetching user data:", error);
//       } finally {
//         setLoading(false);
//         console.log("Loading state set to false"); // Debugging log
//       }
//     };
//     fetchUserData();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log("UserProvider error", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
