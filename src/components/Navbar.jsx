import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Navbar() {
  const { cartItems } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const categories = ['All', 'Clothes', 'Electronics', 'Furniture', 'Shoes', 'Other'];

  const currentCategory = new URLSearchParams(location.search).get('category')?.toLowerCase() || 'all';

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            🛒 E-Shop
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav align-items-center gap-2">
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/cart">
                  Cart
                  <span className="badge bg-success ms-1">{cartItems.length}</span>
                </Link>
              </li>

              {currentUser ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-white">
                      <i className="bi bi-person-circle me-1"></i>
                      {currentUser.email}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="btn btn-sm btn-outline-light" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>


      <div className="bg-light border-bottom">
        <div className="container d-flex flex-wrap gap-3 py-2 justify-content-center">
          {categories.map((cat) => {
            const catSlug = cat.toLowerCase() === 'all' ? '' : `?category=${cat.toLowerCase()}`;
            return (
              <Link
                key={cat}
                to={`/${catSlug}`}
                className={`text-decoration-none px-3 py-1 rounded ${
                  currentCategory === cat.toLowerCase() ? 'bg-dark text-white fw-bold' : 'text-dark'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Navbar;
