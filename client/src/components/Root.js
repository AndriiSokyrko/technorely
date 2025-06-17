import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE,  USER_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const Root = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)

    useEffect(() => {
        if (user.isAuth) {
            if(user.getCurrentUser.role!== 'USER'){
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