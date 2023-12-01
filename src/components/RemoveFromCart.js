import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const RemoveFromCartButton = ({ productId, onRemove }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleRemove = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (data.success) {
        onRemove(productId);
      } else {
        console.error('Error removing product from cart');
      }
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow} size='sm'>
        Remove
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove from Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this item from your cart?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveFromCartButton;
