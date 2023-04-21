import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  // get data
  const fetchData = () => {
    return fetch(`http://localhost:8080/getSingleData/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setMobile(data.mobile);
        setAddress(data.address);
      });
  };

  //submit form
  const submitForm = async (e) => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      mobile === "" ||
      address === ""
    ) {
      alert("Plz fill all fields.");
      return false;
    }
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/updateData", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile,
          address,
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        alert("User Updated successfully");
        navigate("/");
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col>
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
                Update
              </Button>
              &nbsp;
              <Button variant="secondary" onClick={() => navigate("/")}>
                Back
              </Button>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default EditUser;
