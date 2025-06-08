import React, {useContext} from 'react';
import {adminRoutes, publickRoutes} from "../routes";
import {Navigate, Route, Router, Routes} from "react-router-dom";
import {Context} from "../index";
import {ROOT_ROUTE} from "../utils/consts";
import AUTH from "../pages/Auth";
const AppRouter = () => {
    const {user} = useContext(Context)
    return (
            <Routes>
                {
                    user.isAuth && user.role!=='USER' && adminRoutes.map(({path, Component}) => {
                        <Route key={path} path={path} element={<Component />} exact/>
                    })
                }

                {
                    user.isAuth && user.role==='USER' ?
                        publickRoutes.map(({path, Component}) => {
                        <Route key={path} path={path} element={<Component />} exact/>
                    }):
                        <Route key={ROOT_ROUTE} path={ROOT_ROUTE} element={<AUTH />} exact/>

                }

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
    );
};

export default AppRouter;