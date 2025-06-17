import React, {useContext,  useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createAdmin} from "../../http/userAPI";
import toast from "react-hot-toast";

const CreateAdmin = observer(({show, onHide}) => {
            const {user, role} = useContext(Context)
            const [email, setEmail] = useState('')
            const [description, setDescription] = useState('')
            const [roleInfo, setRoleInfo] = useState('ADMIN')
            const [img, setImg] = useState('')
            const [password, setPassword] = useState('')
            const [reset, setReset] = useState(false)

            const saveUser = () => {
                const formData = new FormData()
                formData.append('email', email)
                formData.append('role', roleInfo)
                formData.append('password', password)
                formData.append('description', description)
                formData.append('img', img)

                createAdmin(formData).then(_ => {
                    onHide()
                    user.setFlagRedrawUser(3)
                    toast.success("Успешно сохранено!")
                }).catch(e => {
                    toast.error("Пользователь с таким email зарегистрирован!")
                })
            }
            const selectFile = e => {
                setImg(e.target.files[0])
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
                            {user.getCurrentUser.role !== 'USER' &&
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                    {/*<Form.Label className=" mt-2 mb-0 p-0">Роли</Form.Label>*/}
                                    <Dropdown className="me-2 mt-3">
                                        <Dropdown.Toggle>{"Выберите роль"}</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {role.getRoles.map(role =>
                                                <Dropdown.Item
                                                    onClick={() => setRoleInfo(role.name)}
                                                    key={role.id}
                                                >
                                                    {role.name}
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form.Control
                                        disabled="disable"
                                        value={roleInfo}
                                        onChange={e => setRoleInfo(e.target.value)}
                                        className="mt-3"
                                        placeholder="Введите email"
                                    />
                                </div>
                            }
                            <Form.Label className=" mt-2 mb-0 p-0">Описание</Form.Label>
                            <Form.Control
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
        }
    )
;

export default CreateAdmin;
