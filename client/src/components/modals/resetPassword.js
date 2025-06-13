import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {login, resetPassword} from "../../http/userAPI";

const ResetProfile = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [reset, setReset] = useState(false)
    const [disable, setDisable] = useState(true)

    const savePassword = async () => {
        // control old password

        try {
            const token = await login(user.getUser.email, oldPassword)

            if (token) {
                // reset password
                resetPassword(user.getUser.email, password).then(_ => {
                    onHide()
                    alert("Password is changed")

                }).catch((e) => {
                    alert(e.message)
                })
            } else {
                alert('Old password is not correct')
            }
        } catch (e) {
            alert('Old password is not correct')
        }

    }
    const handleReset = () => {
        if (password !== reset) alert("Passwords aren't equal")
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
                        onClick={() => setDisable(!disable)}
                        label="Reset password"
                    />
                    <div className="d-flex flex-column">
                        <Form.Label className=" mt-2 mb-0 p-0">Текущий пароль</Form.Label>
                        <Form.Control
                            onChange={e => setOldPassword(e.target.value)}
                            className="mt-3"
                            placeholder="Введите текущий пароль"
                            disabled={disable}
                            type="password"
                        />
                        <Form.Label className=" mt-2 mb-0 p-0">Новый пароль</Form.Label>
                        <Form.Control
                            onChange={e => setPassword(e.target.value)}
                            className="mt-3"
                            placeholder="Введите new password"
                            disabled={disable}
                            type="password"

                        />
                        <Form.Label className=" mt-2 mb-0 p-0">Подтвердите новый пароль</Form.Label>
                        <Form.Control
                            onChange={e => {
                                setReset(e.target.value)
                            }}
                            onBlur={() => handleReset()}
                            className="mt-3"
                            placeholder="Retype new password"
                            disabled={disable}
                            type="password"

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
