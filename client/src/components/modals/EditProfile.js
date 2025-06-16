import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {editUser, getUserById} from "../../http/userAPI";

const EditProfile = observer(({show, onHide, userId}) => {
    const {user, role} = useContext(Context)
    const [email, setEmail] = useState(user.getCurrentUser.email)
    const [description, setDescription] = useState(user.getCurrentUserInfo.description)
    const [roleUser, setRoleUser] = useState(user.getCurrentUser.role)
    const [img, setImg] = useState('')
    const saveUser = () => {
        const formData = new FormData()
        formData.append('id', user.getCurrentUser.id)
        formData.append('email', email)
        formData.append('role', roleUser)
        formData.append('description', description)
        formData.append('img', img)

        const selectFile = e => {
            setImg(e.target.files[0])
        }
        editUser(formData).then(_ => {
            onHide()
            user.setFlagRedrawUser(3)
            alert('Сохранено')
        }).catch(e => {
            alert(e.message)
        })

    }
    const selectFile = e => {
        setImg(e.target.files[0])
    }
    useEffect(()=>{
        if(userId!==user.getCurrentUser.id ){
            user.setUserId(userId)
            const userData = user.getUserById
            if(userData){
                setEmail(userData.email)
                setRoleUser(userData.role)
                setDescription(userData.user_info.description)
            }

        } else {
            setEmail(user.getCurrentUser.email)
            setRoleUser(user.getCurrentUser.role)
            setDescription(user.getCurrentUserInfo.description)
        }
    },[userId])
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
                    <Form.Label className=" mt-2 mb-0 p-0">Email</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mt-3"
                        placeholder="Введите email"
                    />
                    {user.getCurrentUser.role !== 'USER' &&
                        <div className="d-flex flex-column  ">
                            <Form.Label className=" mt-2 mb-0 p-0 ">Роли</Form.Label>
                            <div className="d-flex flex-row"><Dropdown className="me-2 mt-3">
                                <Dropdown.Toggle>{"Выберите роль"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {role.getRoles.map(role =>
                                        <Dropdown.Item
                                            onClick={() => setRoleUser(role.name)}
                                            key={role.id}
                                        >
                                            {role.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                                <Form.Control
                                    disabled="disable"
                                    value={roleUser}
                                    onChange={e => setEmail(e.target.value)}
                                    className="mt-3"
                                    placeholder="Введите email"
                                /></div>
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
