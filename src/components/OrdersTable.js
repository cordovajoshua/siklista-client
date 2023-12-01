import React from "react";
import OrderInnerCard from "./OrderInnerCard";
import { Table } from "react-bootstrap";

const OrdersTable = ({ orders }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Purchase ID</th>
          <th>Purchased On</th>
          <th>Details</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          // Convert the purchasedOn string to a Date object
          const purchaseDate = new Date(order.purchasedOn);

          // Format the Date object to a readable string
          const formattedPurchaseDate = purchaseDate.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "UTC",
          });

          return (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{formattedPurchaseDate}</td>
              <td>
                <OrderInnerCard order={order} />
              </td>
              <td>{order.totalAmount}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default OrdersTable;
