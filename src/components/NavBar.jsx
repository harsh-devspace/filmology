import React from 'react'
import { Link } from 'react-router-dom'
import '../css/NavBar.css'

const NavBar = () => {
  return (
    <nav className='navbar'>
        <div className='nav-brand'>
            <Link className='brand-link' to="/">Filmology</Link>
        </div>
        <div className='nav-links'>
            <Link className='link-name' to="/">Home</Link>
            <Link className='link-name' to="/favorites">Favorites</Link>
        </div>
    </nav>
  )
}

export default NavBar
