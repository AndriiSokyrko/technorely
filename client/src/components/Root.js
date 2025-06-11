import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, PUBLIC_ROUTE} from "../utils/consts";
import {check} from "../http/userAPI";
import {jwtDecode} from "jwt-decode";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const Root = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const data =check()
                if(data) {
                    user.setIsAuth(true)
                    const infoUser = jwtDecode(token)
                    user.setUser({id: infoUser.id, role: infoUser.role})
                    if (infoUser.role !== 'USER') {
                        console.log(infoUser.role)
                        navigate(ADMIN_ROUTE);
                    } else {
                        navigate(PUBLIC_ROUTE);
                    }
                }
            } catch (e) {
                navigate(LOGIN_ROUTE);
            }
        }
    }, [navigate, user]);
    return (
        <></>
    );
});

export default Root;