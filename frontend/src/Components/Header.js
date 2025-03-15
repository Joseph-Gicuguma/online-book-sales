import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    const [menuToggle, setMenuToggle] = useState(false)

    const toggleMenu = () => {
        setMenuToggle(!menuToggle)
    }

    const closeMenu = () => {
        setMenuToggle(false)
    }

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <span className="logo-icon">📚</span>
                        <span className="logo-text">LibraryOS</span>
                    </Link>
                </div>
                
                <nav className={menuToggle ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={closeMenu}>About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/books" className="nav-link" onClick={closeMenu}>Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={closeMenu}>Contact</Link>
                        </li>
                    </ul>
                </nav>
                
                <div className="header-actions">
                    <Link to="/signin" className="get-started-btn">Get Started</Link>
                    <button className="mobile-menu-btn" onClick={toggleMenu}>
                        <span className={menuToggle ? "hamburger active" : "hamburger"}></span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
