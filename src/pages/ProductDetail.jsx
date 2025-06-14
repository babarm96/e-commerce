import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/', { state: { message: 'Item added to cart successfully!' } });
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      {/* Back Arrow */}
      <div className="mb-4">
        <button className="btn btn-link text-decoration-none" onClick={handleBack}>
          ← Back to Home
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img src={product.images[0]} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <h4>${product.price}</h4>
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;




