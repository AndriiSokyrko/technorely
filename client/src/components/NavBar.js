import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LOGIN_ROUTE, USER_ROUTE} from "../utils/consts";
import {Button, Dropdown, DropdownButton, NavLink} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'
import EditProfile from "./modals/EditProfile";
import {getUserById} from "../http/userAPI";
import {getRoles} from "../http/roleApi";
import Image from "react-bootstrap/Image";
import ResetPassword from "./modals/resetPassword";

const NavBar = observer(() => {
    const {user, roles} = useContext(Context)
    const navigate = useNavigate()
    const [profileVisible, setProfileVisible] = useState()
    const [resetVisible, setResetVisible] = useState()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }
    const handleProfile = () => {
        getRoles().then(role => {
            roles.setRole(role.data)

        }).catch(e => e.message)


        setProfileVisible(true)
    }
    const handleResetPassword = () => {
        setResetVisible(true)
    }
    useEffect(() => {
        getUserById(user.getUser.id).then(data => {
            user.setUserInfo(data.user_info)
        }).catch(e => console.log(e.message))
    }, [])
    return (
        <Navbar bg="dark" variant="dark">
            <EditProfile show={profileVisible} onHide={() => setProfileVisible(false)}/>
            <ResetPassword show={resetVisible} onHide={() => setResetVisible(false)}/>

            <Container>
                <NavLink to={user.isAuth && USER_ROUTE}>DashBoard</NavLink>
                {user.isAuth ?
                    <Nav >
                        {user.getUserInfo.img &&
                            <Image className="rounded-2 me-2 mt-2" width="25px" height="25px"
                                   src={process.env.REACT_APP_API_URL + user.getUserInfo.img}/>
                        }
                        <Dropdown className="border-4 border-white bg-black">
                            <Dropdown.Toggle variant={"outline-light"} id="dropdown-basic">
                                Profile
                            </Dropdown.Toggle>
                            <Dropdown.Menu  variant="black" title="profile" className="background-black color-white " >
                                <Dropdown.Item   onClick={handleProfile}>Edit profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleResetPassword}>Reset pass..</Dropdown.Item>
                                <Dropdown.Item>Something...</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>
                        <Button
                            variant={"outline-light"}
                            className="mx-2"
                            onClick={() => logOut()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
