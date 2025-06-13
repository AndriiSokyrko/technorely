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

const Footer = observer(() => {
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
        <div bg="dark" variant="dark" className="d-flex bg-black w-100 align-items-center justify-content-center text-white mt-5 p-2">
                <h2>@2025</h2>
        </div>

    );
});

export default Footer;
