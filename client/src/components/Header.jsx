import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='header'>
      <div className='header-logo'>Logo</div>
      <div className="nav-list">
        <ul className='ul-list'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header