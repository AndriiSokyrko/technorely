import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CompanyList from "../components/CompanyList";
import Pages from "../components/Pages";
import Filter from "../components/Filter";
import CreateCompany from "../components/modals/CreateCompany";
import Sort from "../components/Sort";
import {observer} from "mobx-react";
import {Context} from "../index";

import {getRoles} from "../http/roleApi";

const DashBoardPublic = observer(() => {
    const [companyVisible, setCompanyVisible] = useState(false)
    const {company,user,role}= useContext(Context)

    useEffect(() => {
        getRoles().then(data => {
            role.setRoles(data)
            role.setFlagRedrawRole(3)
        })
    },[user.page, user.getFlagRedrawRole])

    return (
        <Container>
            <h2>Public DashBoard</h2>
            <Row className="mt-2">
                <Col md={3}>
                    <Filter/>
                </Col>
                <Col md={9}>
                    <div className="d-flex justify-content-between ">
                        <div className="bg-black text-white border-white rounded-2 border-white" >
                            <Button variant={"outline-light"}  onClick={() => setCompanyVisible(true)}>Добавить компанию</Button></div>
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