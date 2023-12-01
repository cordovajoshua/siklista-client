import React from "react";
import { Card, Image, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ productProp }) => {
  const { _id, name, price, image, brand } = productProp;

  const linkStyles = {
    textDecoration: 'none',
    color: 'black',
  };

  const imageStyles = {
    maxHeight: '250px',
    objectFit: 'cover', // Ensure images maintain aspect ratio and cover the container
  };

  // Check if name and brand are defined before using toUpperCase()
  const formattedName = name ? name.toUpperCase() : '';
  const formattedBrand = brand ? brand.toUpperCase() : '';

  return (
    <div>
      <Link to={`/products/${_id}`} style={linkStyles}>
        <Stack className="text-center">
          <Image src={image} style={imageStyles} />
          {/* Use the formattedName and formattedBrand variables */}
          <h4>{formattedName}</h4>
          <h5 className="text-secondary">{formattedBrand}</h5>
          <h5 className="text-warning-emphasis">&#8369;{price}</h5>
        </Stack>
      </Link>
    </div>
  );
};

export default ProductCard;
