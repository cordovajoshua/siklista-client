import React from 'react'
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';

const ArchiveProduct = ({product, fetchProducts, isActive}) => {
  const archiveToggle = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === true) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Product Successfully Archived",
          });
          fetchProducts();
        } else {
          Swal.fire({ 
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });
          fetchProducts();
        }
 
      });
  };

  const activateToggle = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Product Successfully Updated",
          });
          fetchProducts();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });
          fetchProducts();
        }

      });
  };

  return (
    <>
      {isActive ? (
        <Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>
          Archive
        </Button>
      ) : (
        <Button variant="success" size="sm" onClick={() => activateToggle(product)}>
          Activate
        </Button>
      )}
    </>
  );
}

export default ArchiveProduct