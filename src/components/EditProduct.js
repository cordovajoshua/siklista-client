import React, {useState} from 'react'
import { Button, Modal, Form } from "react-bootstrap";
import Swal from 'sweetalert2';


const EditProduct = ({product, fetchProducts}) => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [showEdit, setShowEdit] = useState(false);

  const editProduct = (e, productId) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        image
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data === true) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Product Successfully Updated',
          });
          closeEdit();
          fetchProducts();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Please try again'
          });
          closeEdit();
          fetchProducts();
        }
      });
  };

  const openEdit = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then(data => {
        setProductId(data._id);
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setImage(data.image);
      })

    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => openEdit(product)}>
        Edit
      </Button>
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editProduct(e, product)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="productImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" size="sm" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" size='sm' type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditProduct;