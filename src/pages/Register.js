import React, { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import UserContext from "../UserContext";

const Register = () => {
  const navigate = useNavigate();

  const {user} = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            mobileNo
          }),
        }
      );

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Email is already registered.") {
          toast.error(data.message);
        } else if (data.message === "Password do not match.") {
          toast.error(data.message);
        } else {
          Swal.fire({
            title:'Registration Successful',
            icon: 'success',
            text: 'Thank you for registering. You can now login.'
          })
          navigate(`/login`);
        }
      } else {
        const errData = await response.json();
        toast.error(errData.message);
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
    {user.id !== null} ? (
      <ToastContainer />
      <Card className="mx-auto my-5" style={{width: '70%', maxWidth: '600px'}}>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMobileNo">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter mobile number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
                minLength={11}
                maxLength={11}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    ) : (
      <Navigate to="/" />
    )
      
    </>
  );
};

export default Register;
