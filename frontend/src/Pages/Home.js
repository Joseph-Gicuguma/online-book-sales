import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div id='home'>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Manage Your Library Seamlessly & Efficiently!</h1>
                        <p className="hero-description">
                            Streamline your library operations with our comprehensive management platform. 
                            Track books, manage users, and analyze data all in one place.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/signin" className="start-managing-btn">Start Managing</Link>
                            <Link to="/books" className="learn-more-btn">Learn More</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="/images/library-illustration.svg" alt="Library Management" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-container">
                    <h2 className="section-title">Powerful Features for Modern Libraries</h2>
                    <p className="section-subtitle">Everything you need to manage your library efficiently</p>
                    
                    <div className="features-container">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-book"></i>
                            </div>
                            <h3 className="feature-title">Book Cataloging</h3>
                            <p className="feature-description">
                                Easily catalog and organize your entire book collection with our intuitive system.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3 className="feature-title">User Management</h3>
                            <p className="feature-description">
                                Track member activities, loans, and returns with automated notifications.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h3 className="feature-title">Analytics & Reports</h3>
                            <p className="feature-description">
                                Get valuable insights with comprehensive reporting and analytics tools.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Books Section */}
            <section className="popular-books-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Popular Books</h2>
                        <div className="navigation-arrows">
                            <button className="nav-arrow prev-arrow">←</button>
                            <button className="nav-arrow next-arrow">→</button>
                        </div>
                    </div>
                    
                    <div className="books-container">
                        <div className="book-card">
                            <div className="book-cover">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU" alt="The Digital Age" />
                            </div>
                            <h3 className="book-title">The Digital Age</h3>
                            <p className="book-author">By John Smith</p>
                            <span className="book-category">Fiction</span>
                        </div>
                        
                        <div className="book-card">
                            <div className="book-cover">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU" alt="Future of Learning" />
                            </div>
                            <h3 className="book-title">Future of Learning</h3>
                            <p className="book-author">By Sarah Johnson</p>
                            <span className="book-category">Non-Fiction</span>
                        </div>
                        
                        <div className="book-card">
                            <div className="book-cover">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU" alt="Tech Revolution" />
                            </div>
                            <h3 className="book-title">Tech Revolution</h3>
                            <p className="book-author">By Mike Wilson</p>
                            <span className="book-category">Sci-Fi</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="footer-logo">LibraryOS</h3>
                        <p className="footer-tagline">Making library management simple and efficient.</p>
                    </div>
                    
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">About Us</Link></li>
                                <li><Link to="/">Features</Link></li>
                                <li><Link to="/">Pricing</Link></li>
                            </ul>
                        </div>
                        
                        <div className="footer-column">
                            <h4>Legal</h4>
                            <ul>
                                <li><Link to="/">Privacy Policy</Link></li>
                                <li><Link to="/">Terms of Service</Link></li>
                                <li><Link to="/">Cookie Policy</Link></li>
                            </ul>
                        </div>
                        
                        <div className="footer-column">
                            <h4>Connect</h4>
                            <div className="social-icons">
                                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
                            </div>
                            <p>Email: contact@librarys.com</p>
                            <p>Phone: (555) 123-4567</p>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>© 2025 LibraryOS. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home
