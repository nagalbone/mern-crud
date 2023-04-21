import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [users, setUsers] = useState();
  const [loadGrid, setLoadGrid] = useState();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchData();
  }, [loadGrid]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <br />

            <Button onClick={() => navigate("/add")} variant="primary">
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
                          className="fas fa-edit"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/edit/${items._id}`)}
                        ></i>
                        &nbsp;
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
    </>
  );
};

export default HomePage;
