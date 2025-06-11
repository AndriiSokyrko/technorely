import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createAdmin} from "../../http/userAPI";
import Row from "react-bootstrap/Row";
import {validateEmail} from "../../utils/common";

const CreateAdmin = ({show, onHide}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true);

    const addAdmin = () => {
        createAdmin({email, password}).then(_ => {
            setEmail('')
            setPassword('')
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить Admin
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    <Form.Control
                        type="email"
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        isInvalid={!isEmailValid}
                        onChange={e => {
                            setEmail(e.target.value)
                            setIsEmailValid(validateEmail(e.target.value));
                        }}

                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button
                            className="mt-3"
                            variant={"outline-success"}
                            onClick={click}
                        >
                              'Добавить'
                        </Button>
                    </Row>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addAdmin}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateAdmin;
