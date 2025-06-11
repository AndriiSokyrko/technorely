import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
// import {QueryClientProvider} from "@tanstack/react-query";
// import {queryClient} from "./store/UserStore";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {check} from "./http/userAPI";
import {Context} from "./index";
import {jwtDecode} from "jwt-decode";
import ComponentSpinner from "./components/ComponentSpinner";

const App = () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
            const infoUser = jwtDecode(token)
            user.setUser({id: infoUser.id, role: infoUser.role})

        }).finally(() => setLoading(false))
    }, [token, user])

    // if (loading) {
    //     return <ComponentSpinner/>
    // }

    return (

            <BrowserRouter>
                <NavBar/>
                {/*<AppRouter/>*/}
             </BrowserRouter>
    )
};

export default App;