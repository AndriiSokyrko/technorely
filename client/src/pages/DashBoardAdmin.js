import React from 'react';
import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CompanyList from "../components/CompanyList";
import Pages from "../components/Pages";
import UserBar from "../components/UserBar";

const DashBoardAdmin = () => {
    return (
        <Container>
            <p>dashboard admin</p>
            <Row className="mt-2">
                <Col md={3}>
                    <UserBar/>
                </Col>
                <Col md={9}>
                    <CompanyList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
};

export default DashBoardAdmin;