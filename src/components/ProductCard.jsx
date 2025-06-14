import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-4">
     
      <div className="position-relative" style={{ height: '220px', overflow: 'hidden', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
        <img
          src={product.images[0]}
          className="w-100 h-100 object-fit-cover"
          alt={product.title}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title fw-semibold text-truncate">{product.title}</h5>
          <p className="card-text text-success fw-bold">${product.price}</p>
        </div>

        <Link to={`/product/${product.id}`} className="btn btn-outline-primary mt-3 rounded-pill">
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
