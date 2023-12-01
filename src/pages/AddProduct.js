import React, {useState, useContext} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserContext from "../UserContext";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";

const AddProduct = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          price,
          description,
          image,
          brand
        })
      });
      const data = await response.json();
      if (data) {
        Swal.fire({
          title: 'Success!',
					icon:"success",
					text: "Product Added Successfully!"
				});
        navigate('/products');
      } else {
        Swal.fire({
					icon: "error",
					title: "Unsuccessful Course Creation",
					text: data.message
				});
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      (user.isAdmin) ? (
<Card className="mx-auto mt-5 w-50">
        <Card.Body>
          <Card.Title>Add New Product</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min={0}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="3"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
      ) : (
        <Navigate to="/products" />
      )
  );
};

export default AddProduct;
