import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center bg-dark m-auto text-white p-2">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty</div>
      ) : (
        <>
          <div className="row">
            {cartItems.map(item => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.images?.[0] || 'https://via.placeholder.com/200'}
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text fw-bold">${item.price.toFixed(2)}</p>
                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-end mt-4">
            <h4>Total: ${total.toFixed(2)}</h4>
            <Link to="/checkout" className="btn btn-primary mt-2">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
