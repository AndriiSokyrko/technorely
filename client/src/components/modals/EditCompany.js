import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {editCompany, fetchCompanyById} from "../../http/companyAPI";

const EditCompany = observer(({show, onHide, companyId}) => {
    const {company, user} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [service, setService] = useState('')
    const [capital, setCapital] = useState(0)
    const [img, setImg] = useState('')
    const selectFile = e => {
        setImg(e.target.files[0])
    }

    const saveCompany = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('service', service)
        formData.append('description', description)
        formData.append('capital', capital)
        formData.append('img', img)
        formData.append('userId', user.getUser.id)
        formData.append('id', companyId)
        editCompany(formData).then(_ => {
            onHide()
            company.setFlagRedraw(1)

        }).catch((e) => {
            alert(e.message)
        })
    }
    useEffect(() => {
        if (companyId) {
            fetchCompanyById(companyId).then(data => {
                setName(data.name)
                setDescription(data.description)
                setService(data.service)
                setCapital(data.capital)
                setImg((data.img))
            }).catch(e => console.log(e.message))

        }
    }, [companyId])

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать компанию
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
                <Button variant="outline-success" onClick={saveCompany}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditCompany;
