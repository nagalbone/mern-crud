import React from 'react'
import {
    Table,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import AddModel from '../components/AddModel';

const HomePage = () => {
  return (
    <>
    <Container>
        <Row>
            <Col>
            <br/>
            <AddModel />
            <hr/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>yogesh Sabankar</td>
                    <td>sabankar@gmail.com</td>
                    <td>9563256451</td>
                    <td>Pune</td>
                    <td><i class="fas fa-edit"></i>&nbsp;&nbsp;<i class="fa fa-trash"></i></td>
                    </tr>
                </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default HomePage;