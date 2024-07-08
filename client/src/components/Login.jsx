import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill out the details");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Logged in successfully");
        console.log("Login response:", response.data); // Debugging log
        if (response.data.validUser) {
          setUser(response.data.validUser); // Update user context
          console.log("User set in context:", response.data.validUser); // Debugging log
          navigate("/");
          setEmail("");
          setPassword("");
        } else {
          console.error("User data not found in response");
        }
      }
    } catch (err) {
      console.log("Error while signing in", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
