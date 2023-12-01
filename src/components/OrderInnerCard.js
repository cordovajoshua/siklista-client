import React from "react";
import { ListGroup } from "react-bootstrap";

const OrderInnerCard = ({ order }) => {
  console.log(order);
  return (
    <>
        <ListGroup>
      {order.products.map((product) => (
        <ListGroup.Item key={product._id}>
          <b>Product Name:</b> {product.product.name}
          <br />
          <b>Quantity:</b> {product.quantity}
          <br />
          <b>Subtotal:</b> {product.product.price * product.quantity}
        </ListGroup.Item>
      ))}
    </ListGroup>
    </>
  );
};

export default OrderInnerCard;
