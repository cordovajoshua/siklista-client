import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col, Form } from 'react-bootstrap';

const UserView = ({ productsData }) => {
  const [productRows, setProductRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredProducts = productsData
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((product, index) => (
        <Col key={product._id} md={4}>
          <ProductCard productProp={product} />
        </Col>
      ));

    const groupedProducts = groupProductsIntoRows(filteredProducts, 3);
    setProductRows(groupedProducts);
  }, [productsData, searchTerm]);

  const groupProductsIntoRows = (productsArr, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < productsArr.length; i += itemsPerRow) {
      rows.push(<Row key={i} className='mb-4'>{productsArr.slice(i, i + itemsPerRow)}</Row>);
    }
    return rows;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container className='mt-5'>
      <h1 className='text-center my-2'>BIKES</h1>
      <Form className="mb-5">
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search for bikes..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>
      {productRows}
    </Container>
  );
};

export default UserView;
