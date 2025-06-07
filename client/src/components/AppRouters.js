import React from 'react';
import {authRotes} from "../routes";
import {Route, Router, Routes} from "react-router-dom";

const AppRouters = () => {
    const isAuth = false
    return (
        <Router>
            <Routes>
                {
                    isAuth && authRotes.map(({path, Component})=>{
                        <Route key={path} path={path} element={Component} exact/>
                    })
                }
            </Routes>
            {
                publickRotes.map(({path, Component})=>{
                    <Route key={path} path={path} element={Component} exact/>
                })
            }
            <Route path="*" element={<Navigate to="/" replace />} />

        </Router>
    );
};

export default AppRouters;