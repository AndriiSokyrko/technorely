import React, {useContext} from 'react';
import {adminRoutes, publicRoutes} from "../routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {Context} from "../index";
import Auth from "../pages/Auth";
import {LOGIN_ROUTE} from "../utils/consts";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
            <Routes>

                {/*{user.isAuth && user.role !== 'USER' && (*/}
                {/*    adminRoutes.map(({path, Component}) => (*/}
                {/*        <Route key={path} path={path} element={<Component/>}/>*/}
                {/*    ))*/}
                {/*)}*/}
                {/*{user.isAuth ?*/}
                {/*    publicRoutes.map(({path, Component}) => (*/}
                {/*        <Route key={path} path={path} element={<Component/>}/>*/}
                {/*    )):*/}
                {/*    <Route path={LOGIN_ROUTE} element={<Auth/>}/>*/}

                {/*}*/}
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}

                {adminRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
    );
};

export default AppRouter;