import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { UserContextProvider } from "./context/userContext";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
};

export default App;
