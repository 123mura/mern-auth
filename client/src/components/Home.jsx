import React, { useEffect, useState } from "react";
import { decode } from "jwt-decode"; // Importing as a named export

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getTokenFromCookies = () => {
      const token = document.cookie
        .split(";")
        .find((row) => row.trim().startsWith("token="));
      if (token) {
        return token.split("=")[1];
      }
      return null;
    };

    const decodeToken = (token) => {
      try {
        const decodedToken = decode(token); // Using the named import 'decode'
        return decodedToken.username;
      } catch (err) {
        console.error("Error decoding token", err);
        return null;
      }
    };

    const token = getTokenFromCookies();
    if (token) {
      const username = decodeToken(token);
      setUsername(username);
    }
  }, []);

  return (
    <div>{username ? <h1>Welcome, {username}</h1> : <h1>Loading...</h1>}</div>
  );
};

export default Home;
