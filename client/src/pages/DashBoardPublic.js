import React, {useContext, useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CompanyList from "../components/CompanyList";
import Pages from "../components/Pages";
import Filter from "../components/Filter";
import CreateCompany from "../components/modals/CreateCompany";
import Sort from "../components/Sort";
import {observer} from "mobx-react";
import {Context} from "../index";

const DashBoardPublic = observer(() => {
    const [companyVisible, setCompanyVisible] = useState(false)
    const {company}= useContext(Context)
    return (
        <Container>
            <h2>Public DashBoard</h2>
            <Row className="mt-2">
                <Col md={3}>
                    <Filter/>
                </Col>
                <Col md={9}>
                    <div className="d-flex justify-content-between ">
                        <Button variant={"outline-light"} className="bg-black text-white border-white"
                                onClick={() => setCompanyVisible(true)}>Добавить компанию</Button>
                        <Sort />
                        <CreateCompany show={companyVisible} onHide={() => setCompanyVisible(false)}/>
                    </div>
                    <CompanyList />
                    <Pages company={company}/>
                </Col>
            </Row>
        </Container>
    );
});

export default DashBoardPublic;