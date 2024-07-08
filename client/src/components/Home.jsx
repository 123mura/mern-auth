import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <h1>
          Welcome Username:{user.username}
          <br />
          Email:{user.email}
          <br />
          Password:{user.password}
          <br />
          user_id: {user._id}
        </h1>
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
};

export default Home;
