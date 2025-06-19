import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {check} from "./http/userAPI";
import {Context} from "./index";
import {jwtDecode} from "jwt-decode";
import {observer} from "mobx-react";
import {Spinner} from "react-bootstrap";
import Footer from "./components/Footer";
import {Toaster} from "react-hot-toast";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setLoading(false)
        } else {
            check(token).then( (data) => {
                user.setIsAuth(true)
                const infoUser = jwtDecode(token)
                user.setCurrentUser(infoUser)
            }).finally(() => setLoading(false))
        }
    }, [token, user])
    if (loading) {
        return <div style={{width: "100px", height: "100px", margin: "auto"}}
                    className="d-flex flex-column justify-content-center m-auto"><Spinner animation="grow"/></div>;
    }
    return (
        <>
            <Toaster position="top-right"/>
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </>

    )
});

export default App;