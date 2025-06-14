import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const query = useQuery();
  const search = query.get('search')?.toLowerCase() || "";
  const category = query.get('category')?.toLowerCase() || "";
  const location = useLocation();
  const flashMessage = location.state?.message;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const filteredProducts = products.filter(product => {
    const nameMatch = product.title.toLowerCase().includes(search);
    const categoryMatch = category ? product.category.name.toLowerCase() === category : true;
    return nameMatch && categoryMatch;
  });

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      {flashMessage && showMessage && (
        <div className="alert alert-success alert-dismissible fade show text-center" role="alert">
          {flashMessage}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowMessage(false)}
          ></button>
        </div>
      )}

      <h2 className="mb-4 bg-dark m-auto text-white p-2 text-center">Products</h2>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>Currently no product available in that category</p>
        )}
      </div>
    </div>
  );
};

export default Home;
