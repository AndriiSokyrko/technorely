import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CompanyList from "../components/CompanyList";
import Pages from "../components/Pages";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import CreateCompany from "../components/modals/CreateCompany";
import UserList from "../components/UserList";
import {Context} from "../index";
import CreateAdmin from "../components/modals/CreateAdmin";
import {getRoles} from "../http/roleApi";
import SwaggerComponent from "../components/SwaggerComponent";

const DashBoardAdmin = () => {
    const [companyVisible, setCompanyVisible] = useState(false)
    const [visible, setVisible] = useState({company: true, user:false, docs: false})
    const [createAdminVisible, setCreateAdminVisible] = useState(false)
    const {user,company,role}= useContext(Context)

    const handleHide = (name) => {
        Object.keys(visible).map(key=>{
            if(key===name){
                visible[key]=true
            } else {
                visible[key]=false
            }
            setVisible({...visible})
        })

    }
    useEffect(() => {
        getRoles().then(data => {
            role.setRoles(data)
            role.setFlagRedrawRole(3)
        })
    },[role.getFlagRedrawRole])
    return (
        <Container>
            <h2>Admin DashBoard</h2>
            <Row className="mt-2">
                <Col md={3}>
                    <Form bg="dark" className="d-flex flex-column bg-black p-2 mt-2  align-items-center">
                        {
                            Object.keys(visible).map(key=>{
                                if ( key==='company' && visible[key]===true)
                                {
                                    return (<Filter/>)
                                }
                                if (key==='user' && visible[key]===false)
                                {
                                 return (

                                         <Button key={key} variant="outline-light" className="p-2 w-100 mb-2"
                                                 onClick={() => handleHide('user')}>
                                             Список пользователей</Button>
                                         )
                                }

                                if (key==='company' && visible[key]===false) {
                                    return (

                                            <Button key={key} variant="outline-light" className="p-2 w-100 mb-2"
                                                    onClick={() => handleHide('company')}>
                                                Список компаний</Button>
                                )
                                }
                                if(key==='docs' && visible[key]===false) {
                                    return (<Button key={key} variant="outline-light" className="p-2 w-100 mb-2"
                                             onClick={() => handleHide('docs')}>
                                        Документация</Button>)
                                }
                            })

                        }
                    </Form>
                </Col>
                <Col md={9}>
                    {
                        Object.keys(visible).map(key=> {
                            if (key === 'company' && visible[key] === true) {
                                return (<div  key={key}>
                                    <div className="d-flex justify-content-between ">
                                        <div className="bg-black text-white border-white rounded-2 border-white"><Button
                                            variant={"outline-light"}
                                            onClick={() => setCompanyVisible(true)}>Добавить компанию</Button></div>
                                        <Sort/>
                                        <CreateCompany show={companyVisible} onHide={() => setCompanyVisible(false)}/>
                                    </div>
                                    <CompanyList/>
                                    <Pages company={company}/>
                                </div>)
                            }
                            if (key === 'user' && visible[key] === true) {
                                return (
                                    <div key={key}>
                                        {user.getCurrentUser.role === 'SUPERADMIN' &&
                                            <div className="d-flex justify-content-between ">
                                                <Button variant={"outline-light"}
                                                        className="bg-black text-white border-white"
                                                        onClick={() => setCreateAdminVisible(true)}>Создать
                                                    админа</Button>
                                                <CreateAdmin show={createAdminVisible}
                                                             onHide={() => setCreateAdminVisible(false)}/>
                                            </div>
                                        }
                                        <UserList/>
                                        <Pages company={user}/>
                                    </div>)
                            }
                            if (key === 'docs' && visible[key] === true) {
                                return (<div key={key}>
                                    <SwaggerComponent/>
                                </div>)
                            }
                        })
                    }
                </Col>
            </Row>
        </Container>
    );

};

export default DashBoardAdmin;