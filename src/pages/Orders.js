import React, { useEffect, useState, useContext } from "react";

import UserContext from "../UserContext";
import UserOrderView from "../components/UserOrderView";
import AdminOrderView from "../components/AdminOrderView";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let endpoint = user.isAdmin ? `${process.env.REACT_APP_API_URL}/users/orders` : `${process.env.REACT_APP_API_URL}/users/myorders`;

    const fetchData = async () => {
      try {
        const response = await fetch(
          endpoint,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (data.length) {
          setOrders(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchData();
  }, [user.isAdmin]); // Add user.isAdmin to dependencies

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {user.isAdmin ? (
        <AdminOrderView orders={orders} />
      ) : (
        <>
          <UserOrderView orders={orders} />
        </>
      )}
    </>
  );
};

export default Orders;
