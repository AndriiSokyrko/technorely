import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {check, checkPassword, resetPassword} from "../../http/userAPI";
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";

const ResetProfile = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [reset, setReset] = useState(false)
    const [flagDisable, setFlagDisable] = useState(true)

    const savePassword = async () => {
        // control old password
        if(password.length<3){
            toast.error("Новый пароль не валидный по длине!")
            return
        }
        const token = localStorage.getItem('token');
        try {
            if (token) {
                try {
                  await  checkPassword(oldPassword, user.getCurrentUser.email)
                } catch (e) {
                    toast.error("Действующий пароль не валидный!")
                    return
                }

               await resetPassword(user.getCurrentUser.email, password).then(_ => {
                    onHide()
                    toast.success("Успешно сохранен!")
                })
                    .catch(e => {
                    toast.error("Ошибка сохранения!")
                })

            }
        } catch (e) {
            toast.error("Ошибка на сервере!")
        }
    }
    const handleReset = () => {
        if (password !== reset) toast.error("Пароли не совпадают!")
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Reset password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    <Form.Label className=" mt-2 mb-0 p-0">Для редактирование нажмите чекбокс</Form.Label>
                    <Form.Check
                        type="checkbox"
                        onClick={() => setFlagDisable(false)}
                        label="Reset password"
                    />
                    <div className="d-flex flex-column" aria-disabled={flagDisable}>
                        <Form.Label className=" mt-2 mb-0 p-0">Текущий пароль</Form.Label>
                        <Form.Control
                            onChange={e => setOldPassword(e.target.value)}
                            className="mt-3"
                            placeholder="Введите текущий пароль"
                            disabled={flagDisable}
                            type="password"
                        />
                        <Form.Label className=" mt-2 mb-0 p-0">Новый пароль</Form.Label>
                        <Form.Control
                            onChange={e => setPassword(e.target.value)}
                            className="mt-3"
                            placeholder="Введите new password"
                            disabled={flagDisable}
                            type="password"
                            minLength={3}

                        />
                        <Form.Label className=" mt-2 mb-0 p-0">Подтвердите новый пароль</Form.Label>
                        <Form.Control
                            onChange={e => {
                                setReset(e.target.value)
                            }}
                            onBlur={() => handleReset()}
                            className="mt-3"
                            placeholder="Retype new password"
                            disabled={flagDisable}
                            type="password"
                            minLength={3}
                        />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={savePassword}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ResetProfile;
