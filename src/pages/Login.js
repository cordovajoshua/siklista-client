import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/userdetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            setUser({
              id: data._id,
              isAdmin: data.isAdmin,
            });
          });
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (typeof data.access !== "undefined") {
          localStorage.setItem("token", data.access);

          retrieveUserDetails(data.access);
          setUser({ access: localStorage.getItem("token") });

          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome to Siklista Scape!",
          });
          const redirectLocation = localStorage.getItem("redirectLocation");
          if (redirectLocation) {
            localStorage.removeItem("redirectLocation");
            navigate(redirectLocation);
          } else {
            navigate("/");
          }
        } else {
          toast.error("Incorrect email or password.");
          console.log("Incorrect email or password.");
        }
      } else {
        const errData = await response.json();
        console.log(errData);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <>
      <ToastContainer />
      <Card
        className="mx-auto my-5"
        style={{ width: "70%", maxWidth: "600px" }}
      >
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleSubmit}>
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
