import React, { useContext, useEffect, useState } from "react";
import { Table, Container, Image, Button } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import RemoveFromCart from "../components/RemoveFromCart";
import Swal from "sweetalert2";

const Cart = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        const products = data.products;
        setTotalPrice(data.totalPrice);
        setCartItems(products);
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching cart data");
    } finally {
      setLoading(false);
    }
  }

  const checkout = async () => {
    if (user.isAdmin) {
      return navigate("/products");
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/checkout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        Swal.fire({
          title: 'Success',
          text: 'Order placed successfully!',
          icon: 'success'
        });
        setCartItems([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
  };
  

  

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    {user.isAdmin ? (
      <Navigate to="/products" />
    ) : (
      <Container className="mt-5">
      {cartItems === null || cartItems.length === 0 ? (
        <div className="d-flex justify-content-center text-center mt-5">
          <div className="d-flex flex-column justify-content-center align-items-center w-50">
            <h2>Your shopping cart is empty</h2>
            <Button as={Link} to="/products" variant="warning" className="w-50">
              Go shopping now
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {cartItems.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <Image src={product.product.image} className="w-25" />
                  </td>
                  <td>{product.product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.subtotal}</td>
                  <td>
                    <RemoveFromCart productId={product.product._id} onRemove={() => removeFromCart(product.product._id)} />
                  </td>
                </tr>
              )
            })}
            </tbody>
          </Table>
          <div className="d-flex">
            <div className="ms-auto d-flex align-items-center gap-3">
              <h5 className="">Total Price: {totalPrice}</h5>
              <Button variant="warning" onClick={checkout}>
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
    )
    }
    </>

  );
};

export default Cart;
