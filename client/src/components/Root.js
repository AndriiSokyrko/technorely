import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, PUBLIC_ROUTE, USER_ROUTE} from "../utils/consts";
import {check} from "../http/userAPI";
import {jwtDecode} from "jwt-decode";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const Root = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)

    useEffect(() => {
        if (user.isAuth) {
            if(user.getUser.role!== 'USER'){
                navigate(ADMIN_ROUTE);
            }else{
                navigate(USER_ROUTE);
            }
        } else {
            navigate(LOGIN_ROUTE)
        }

    }, [navigate, user]);
    return (
        <></>
    );
});

export default Root;