import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Image } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../UserContext";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(UserContext);
  const userId = user.id;

  const navigate = useNavigate();
  const location = useLocation();

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const addToCart = async () => {
    try {
      if (userId === null) {
        setRedirectToLogin(true);
        return navigate("/login");
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity,
        }),
      });
      const data = await response.json();
      if (data) {
        toast("Product Successfully Added to Cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const deductQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (redirectToLogin) {
      setRedirectToLogin(false);
      // Save the current location before redirecting to login
      localStorage.setItem("redirectLocation", location.pathname);
    }

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setImage(data.image);
      });
  }, [productId, redirectToLogin, location.pathname]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <Container className="my-5">
        <ToastContainer className="mt-5" />
        <Row>
          <Col md={6}>
            <Image src={image} fluid />
          </Col>
          <Col md={6}>
            <h5 className={styles.title}>{name}</h5>
            <p>{description}</p>
            <p>&#8369; {price}</p>
            <ButtonToolbar aria-label="Toolbar with button groups">
              <ButtonGroup className="mb-3" aria-label="First group">
                <Button variant="outline-dark" onClick={deductQuantity}>
                  -
                </Button>
                <Button variant="outline-dark" disabled>
                  {quantity}
                </Button>
                <Button variant="outline-dark" onClick={addQuantity}>
                  +
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
            <div className="d-grid gap-2">
              <Button
                variant="outline-dark"
                size="md"
                className={styles.btnCart}
                onClick={addToCart}
              >
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
