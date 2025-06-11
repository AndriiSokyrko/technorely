import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {ADMIN_ROUTE, LOGIN_ROUTE, PUBLIC_ROUTE} from "../utils/consts";
import {Button, NavLink} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'
import {check} from "../http/userAPI";
import {jwtDecode} from "jwt-decode";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.role !== 'USER') {
            navigate(ADMIN_ROUTE);
        } else {
            navigate(PUBLIC_ROUTE);
        }
    // const token = localStorage.getItem('token');
    // if (token) {
    // try {
    //     const data = check()
    //     if (data) {
    //         user.setIsAuth(true)
    //         const infoUser = jwtDecode(token)
    //         user.setUser({id: infoUser.id, role: infoUser.role})
    //         if (infoUser.role !== 'USER') {
    //             navigate(ADMIN_ROUTE);
    //         } else {
    //             navigate(PUBLIC_ROUTE);
    //         }
    //     }
    // } catch (e) {
    //     navigate(LOGIN_ROUTE);
    // }
    // } else{
    //     navigate(LOGIN_ROUTE)
    // }
    }, [navigate, user]);

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={user.isAuth ? ADMIN_ROUTE : PUBLIC_ROUTE}>DashBoard</NavLink>
                {user.isAuth ?

                    <Nav style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
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
