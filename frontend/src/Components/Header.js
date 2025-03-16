import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HeaderNew.css'

function Header() {
    const [menuToggle, setMenuToggle] = useState(false)

    // Handle body scroll when menu is open
    useEffect(() => {
        if (menuToggle) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }

        // Cleanup function
        return () => {
            document.body.classList.remove('menu-open')
        }
    }, [menuToggle])

    const toggleMenu = () => {
        setMenuToggle(!menuToggle)
    }

    const closeMenu = () => {
        setMenuToggle(false)
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuToggle && !event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-btn')) {
                closeMenu()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuToggle])

    // Close menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992 && menuToggle) {
                closeMenu()
            }
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [menuToggle])

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/" className="logo-link" onClick={closeMenu}>
                        <span className="logo-icon">📚</span>
                        <span className="logo-text">Library OS</span>
                    </Link>
                </div>
                
                <nav className={menuToggle ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/books" className="nav-link" onClick={closeMenu}>Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
                        </li>
                    </ul>
                </nav>
                
                <div className="header-actions">
                    <Link to="/signin" className="get-started-btn" onClick={closeMenu}>Get Started</Link>
                    <button 
                        className="mobile-menu-btn" 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={menuToggle ? "hamburger active" : "hamburger"}></span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
