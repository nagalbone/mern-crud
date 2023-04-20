import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const HomePage = () => {
  const [users, setUsers] = useState();
  const [loadGrid, setLoadGrid] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  // get data
  const fetchData = () => {
    return fetch("http://localhost:8080/getData")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  // delete data
  const deleteData = async (id) => {
    try {
      let res = await fetch("http://localhost:8080/deleteData", {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        alert("User Deleted");
        setLoadGrid(id);
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //submit form
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/postData", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile,
          address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        alert("User created successfully");
        handleClose();
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobile("");
        setAddress("");
        setLoadGrid(email);
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loadGrid]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <br />
            <Button variant="primary" onClick={handleShow}>
              Add
            </Button>
            <hr />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((items, i) => {
                  return (
                    <tr key={i}>
                      <td>{items.firstName}</td>
                      <td>{items.lastName}</td>
                      <td>{items.mobile}</td>
                      <td>{items.address}</td>
                      <td>
                        <i
                          className="fa fa-trash"
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteData(items._id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First NAme"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={submitForm}>
              Add
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomePage;
