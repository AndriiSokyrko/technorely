import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createAdmin, editUser, getUserById} from "../../http/userAPI";

const CreateAdmin = observer(({show, onHide}) => {
    const {user, roles} = useContext(Context)
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [role, setRole] = useState('ADMIN')
    const [img, setImg] = useState(null)
    const [password, setPassword] = useState('')
    const [reset, setReset] = useState(false)

    const saveUser = () => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('role', role)
        formData.append('password', password)
        formData.append('description', description)
        formData.append('img', img)

        const selectFile = e => {
            setImg(e.target.files[0])
        }
        createAdmin(formData).then(_ => {
            onHide()
            user.setFlagRedraw(1)
            alert('Сохранено')
        }).catch(e => alert(e.message))
    }
    const selectFile = e => {
        setImg(e.target.files[0])
    }
    const handleReset = () => {
        if (password !== reset) alert("Passwords aren't equal")
        return
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className=" mt-2 mb-0 p-0">Имаил</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mt-3"
                        placeholder="Введите email"
                    />
                    {user.getUser.role !== 'USER' &&
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            {/*<Form.Label className=" mt-2 mb-0 p-0">Роли</Form.Label>*/}
                            <Dropdown className="me-2 mt-3">
                                <Dropdown.Toggle>{"Выберите роль"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {roles.getRole.map(role =>
                                        <Dropdown.Item
                                            onClick={() => setRole(role.name)}
                                            key={role.id}
                                        >
                                            {role.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Control
                                disabled="disable"
                                value={role}
                                onChange={e => setEmail(e.target.value)}
                                className="mt-3"
                                placeholder="Введите email"
                            />
                        </div>
                    }
                    <Form.Label className=" mt-2 mb-0 p-0">Описание</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание"
                    />
                    <Form.Label className=" mt-2 mb-0 p-0">Выберите картинку</Form.Label>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />

                </Form>
                <Form className="d-flex flex-column">

                    <div className="d-flex flex-column">

                        <Form.Label className=" mt-2 mb-0 p-0">Новый пароль</Form.Label>
                        <Form.Control
                            onChange={e => setPassword(e.target.value)}
                            className="mt-3"
                            placeholder="Введите new password"
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
                            type="password"

                        />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={saveUser}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateAdmin;
