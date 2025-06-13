import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
// import {QueryClientProvider} from "@tanstack/react-query";
// import {queryClient} from "./store/UserStore";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {check, getUserById} from "./http/userAPI";
import {Context} from "./index";
import {jwtDecode} from "jwt-decode";
import ComponentSpinner from "./components/ComponentSpinner";
import {observer} from "mobx-react";
import {Spinner} from "react-bootstrap";

const App = observer (() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(!token) {
            setLoading(false)
        } else {
            check().then(data => {
                user.setIsAuth(true)
                const infoUser = jwtDecode(token)
                user.setUser(infoUser)

            }).finally(() => setLoading(false))
        }
    }, [token, user])
    if (loading) {
        // return <ComponentSpinner/>
        return <div className="d-flex align-items-center w-100 h-50"><Spinner  animation="grow"/></div>;
    }
    return (

            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
             </BrowserRouter>
    )
});

export default App;