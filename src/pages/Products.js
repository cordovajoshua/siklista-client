import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';

const Products = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    let endpoint = user.isAdmin ? `${process.env.REACT_APP_API_URL}/products/all` : `${process.env.REACT_APP_API_URL}/products/`;
    console.log(endpoint);
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    user.isAdmin ? (
      <AdminView productsData={products} fetchProducts={fetchProducts} />
    ) : (
      <UserView productsData={products} />
    )
    
  );
}

export default Products;