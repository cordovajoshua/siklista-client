import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import OrdersTable from './OrdersTable'

const UserOrderView = ({orders}) => {
  return (
    <Container className="mt-5">
      {orders.length === 0 ? (
        <div className="d-flex justify-content-center text-center mt-5">
          <div className="d-flex flex-column justify-content-center align-items-center w-50">
            <h2>You have no orders yet</h2>
            <Button as={Link} to="/products" variant="warning" className="w-50">
              Go shopping now
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h1>My Purchases</h1>

          <OrdersTable orders={orders} />
        </>
      )}
    </Container>
  )
}

export default UserOrderView