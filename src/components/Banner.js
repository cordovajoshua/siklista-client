import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Banner = () => {

  const styles = {
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),no-repeat center url("https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    height: '100vh',
    color: 'white',
    fontFamily: 'Oswald',
    backgroundSize: 'cover',
    height: '100vh ',
  }

  return (
    <div className='d-flex flex-column text-center align-items-center justify-content-center' style={styles}>
      <h1 className='display-2' style={{padding: '0 50px'}}>RIDE, EXPLORE, LIVE FREE</h1>
      <div>
        <Button as={Link} to="/products" variant='outline-light' size='lg'>SHOP BIKES</Button>
      </div>
    </div>
  )
};

export default Banner;