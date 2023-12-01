import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, Modal } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [details, setDetails] = useState({});

  const fetchProfile = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/userdetails`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data._id !== "undefined") {
          console.log(data);
          setDetails(data);
        }
      });
  };

  const handleChangePassword = () => {
    // Implement your logic for changing the password here
    console.log("Changing password...");
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = async () => {

    if (newPassword !== confirmPassword) {
      // Passwords do not match, show an error message
      Swal.fire({
        title: 'Password Mismatch',
        icon: 'error',
        text: 'Passwords do not match. Please enter matching passwords.',
      });
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          newPassword,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Password changed successfully'
        });
        // Handle success, e.g., show a success message
      } else {
        const errData = await response.json();
        console.error(errData);
        Swal.fire({
          title: 'Failed',
          icon: 'error',
          text: 'Something went wrong. Try again later'
        });
        // Handle error, e.g., show an error message
      }
      setShowModal(false);

    } catch (error) {
      console.error("Password change failed", error);
    }
    console.log("Saving new password:", newPassword);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return user.id === null ? (
    <Navigate to="/products" />
  ) : (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <h2>Profile Details</h2>
            <p>
              <strong>Firstname:</strong> {details.firstName}
            </p>
            <p>
              <strong>Lastname:</strong> {details.lastName}
            </p>
            <p>
              <strong>Mobile No:</strong> {details.mobileNo}
            </p>
            <p>
              <strong>Email:</strong> {details.email}
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Button onClick={handleChangePassword} variant="primary">
              Change Password
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Password Change Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
