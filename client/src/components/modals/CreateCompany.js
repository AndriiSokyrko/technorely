import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button,  Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createCompany} from "../../http/companyAPI";

const CreateCompany = observer(({show, onHide}) => {
    const {company, user} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [service, setService] = useState('')
    const [capital, setCapital] = useState(0)
    const [img, setImg] = useState(0)

    const selectFile = e => {
        setImg(e.target.files[0])
    }

    const addCompany = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('service', service)
        formData.append('description', description)
        formData.append('capital', capital)
        formData.append('img', img)
        formData.append('userId', user.getUser.id)
        createCompany(formData).then(_ => {
            onHide()
            company.setFlagRedraw(1)

        }).catch((e) => {
            alert(e.response.data.message)
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
                    Добавить компанию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите name"
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите description"
                    />
                    <Form.Control
                        value={service}
                        onChange={e => setService(e.target.value)}
                        className="mt-3"
                        placeholder="Введите service"
                    />
                    <Form.Control
                        value={capital}
                        onChange={e => setCapital(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите capital"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCompany}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCompany;
