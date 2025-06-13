import React, {useContext, useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CompanyList from "../components/CompanyList";
import Pages from "../components/Pages";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import CreateCompany from "../components/modals/CreateCompany";
import UserList from "../components/UserList";
import {Context} from "../index";

const DashBoardAdmin = () => {
    const [companyVisible, setCompanyVisible] = useState(false)
    const [companyListVisible, setCompanyListVisible] = useState(true)
    const [userListVisible, setUserListVisible] = useState(false)
    const {user,company}= useContext(Context)

    const handleHide = () => {
        setCompanyListVisible(!companyListVisible)
        setUserListVisible(!userListVisible)
    }

    return (
        <Container>
            <h2>Admin DashBoard</h2>
            <Row className="mt-2">
                <Col md={3}>
                    {!userListVisible && <Filter/>}
                    <Form bg="dark" className="d-flex flex-column bg-black p-2 mt-2  align-items-center">
                        {
                            !userListVisible ? <Button variant="outline-light" className="p-2 w-100" onClick={handleHide}>
                            Список пользователей</Button>:
                        <Button variant="outline-light" className="p-2 w-100" onClick={handleHide}>
                            Список компаний</Button>
                        }
                    </Form>
                </Col>
                <Col md={9}>
                    {!userListVisible ? <div id="company_list">
                        <div className="d-flex justify-content-between ">
                            <Button variant={"outline-light"} className="bg-black text-white border-white"
                                    onClick={() => setCompanyVisible(true)}>Добавить компанию</Button>
                            <Sort/>
                            <CreateCompany show={companyVisible} onHide={() => setCompanyVisible(false)}/>
                        </div>
                        <CompanyList/>
                        <Pages company={company}/>
                    </div> :
                    <div>
                        <UserList/>
                        <Pages company={user}/>
                    </div>
                    }
                </Col>
            </Row>
        </Container>
    );

};

export default DashBoardAdmin;