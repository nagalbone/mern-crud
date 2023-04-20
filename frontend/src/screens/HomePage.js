import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import AddModel from "../components/AddModel";

const HomePage = () => {
  const [users, setUsers] = useState();

  const fetchData = () => {
    return fetch("http://localhost:8080/getData")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <br />
            <AddModel />
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
                        <i className="fas fa-edit"></i>&nbsp;&nbsp;
                        <i className="fa fa-trash"></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
