import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, USER_ROUTE, ROOT_ROUTE} from "../utils/consts";
import {getUserById, login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {validateEmail} from "../utils/common";

const Auth = observer(() => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true);
    const click = async () => {
        try {
            if (isLogin) {
                try {
                    await login(email, password);
                } catch (e){
                    alert('Пользователь не авторизирован')

                }

            } else {
                const token = await registration(email, password);
                if(token){
                    alert('Регистрация успешна!')
                }
            }
            window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5 border-black">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        type="email"
                        className="mt-3 border-black"
                        style={{cursor: "pointer"}}
                        placeholder="Введите ваш email..."
                        value={email}
                        isInvalid={!isEmailValid}
                        onChange={e => {
                            setEmail(e.target.value)
                            setIsEmailValid(validateEmail(e.target.value));
                        }}

                    />
                    <Form.Control
                        className="mt-3 border-black"
                        style={{cursor: "pointer"}}
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3  ">
                        {isLogin ?
                            <div >
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} style={{color: "black", fontWeight: "bold"}}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} style={{color: "black", fontWeight: "bold"}}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            className="mt-3"
                            variant={"outline-dark"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
