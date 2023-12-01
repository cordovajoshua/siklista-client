import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";
import { Link } from "react-router-dom";

const AdminView = ({ productsData, fetchProducts }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productArr = productsData.map((product, index) => {
      return (
        <tr key={product._id}>
          <td>{index + 1}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.description}</td>
          <td>{product.image}</td>
          <td className={product.isActive ? "text-success" : "text-danger"}>
            {product.isActive ? "Available" : "Unavailable"}
          </td>
          <td>
            <EditProduct product={product._id} fetchProducts={fetchProducts} />
          </td>
          <td>
            <ArchiveProduct
              product={product._id}
              fetchProducts={fetchProducts}
              isActive={product.isActive}
            />
          </td>
        </tr>
      );
    });
    setProducts(productArr);
  }, [productsData]);

  return (
    <Container fluid className="">
      <div className="row">
        {/* Sidebar
        <nav className="col-md-2 d-none d-md-block bg-light">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/orders" className="nav-link active">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  All Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  All Users
                </Link>
              </li>
            </ul>
          </div>
        </nav> */}

        {/* Main content */}
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4 container my-5">
          <h2>Product Management</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image URL</th>
                <th>Availability</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>{products}</tbody>
          </Table>
        </main>
      </div>
    </Container>
  );
};

export default AdminView;
