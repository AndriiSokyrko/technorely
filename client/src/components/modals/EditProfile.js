import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {editUser, getUserById} from "../../http/userAPI";

const EditProfile = observer(({show, onHide}) => {
    const {user, roles} = useContext(Context)
    const [email, setEmail] = useState(user.getUser.email)
    const [description, setDescription] = useState(user.getUserInfo.description)
    const [role, setRole] = useState(user.getUser.role)
    const [img, setImg] = useState(null)
    const saveUser = () => {
        const formData = new FormData()
        formData.append('id', user.getUser.id)
        formData.append('email', email)
        formData.append('role', role)
        formData.append('description', description)
        formData.append('img', img)

        const selectFile = e => {
            setImg(e.target.files[0])
        }
        editUser(formData).then(_ => {
            onHide()
            user.setFlagRedraw(3)
            alert('Сохранено')
        }).catch(e => alert(e.message))
    }
    const selectFile = e => {
        setImg(e.target.files[0])
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать profile
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
                            <Form.Label className=" mt-2 mb-0 p-0">Роли</Form.Label>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={saveUser}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditProfile;
