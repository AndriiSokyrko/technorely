import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LOGIN_ROUTE} from "../utils/consts";
import {Button, Dropdown, NavLink} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'
import EditProfile from "./modals/EditProfile";
import {getRoles} from "../http/roleApi";
import Image from "react-bootstrap/Image";
import ResetPassword from "./modals/resetPassword";
import {getUserById} from "../http/userAPI";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [profileVisible, setProfileVisible] = useState()
    const [resetVisible, setResetVisible] = useState()
    const [img,setImg] = useState('')

    const logOut = () => {
        user.setCurrentUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }
    const handleProfile = () => {
        getRoles().then(role => {
            role.setRoles(role.data)

        }).catch(e => e.message)


        setProfileVisible(true)
    }
    const handleResetPassword = () => {
        setResetVisible(true)
    }
    useEffect(  ()=>{
          getUserById(user.getCurrentUser.id).then(info => {
            user.setCurrentUserIfo(info.user_info)
              setImg(info.user_info.img)
        })

    },[user.flagRedrawUser])
    return (
        <Navbar bg="dark" variant="dark">
            <EditProfile show={profileVisible} onHide={() => setProfileVisible(false)} userData={{...user.getCurrentUser,user_info:user.getCurrentUserInfo }}/>
            <ResetPassword show={resetVisible} onHide={() => setResetVisible(false)}/>

            <Container>
                <NavLink to="/">DashBoard</NavLink>
                {user.isAuth ?
                    <Nav >
                        {img &&
                            <Image className="rounded-2 me-2 mt-2" width="25px" height="25px"
                                   src={process.env.REACT_APP_API_URL +  img}/>
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
