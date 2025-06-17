import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button,  Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createCompany} from "../../http/companyAPI";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import toast from "react-hot-toast";

const CreateCompany = observer(({show, onHide}) => {
    const {company, user} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [service, setService] = useState('')
    const [capital, setCapital] = useState(0)
    const [img, setImg] = useState('')
    const [info, setInfo] = useState({})

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
        formData.append('userId', user.getCurrentUser.id)
        formData.append('info', JSON.stringify(info))
        createCompany(formData).then( _ => {
            onHide()
            company.setFlagRedrawCompany(3)
            toast.success("Успешно сохранено!")
        }).catch(e => {
            toast.error("Компания с таким название уже зарегистрирована!")
        })
        company.setFlagRedrawCompany(3)
    }
    const handleInfoChange = (key, value) => {
        info[key]=value
    };

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
                    <Form.Label className=" mt-2 mb-0 p-0">Название</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите naзвание"
                    />
                    <Form.Label className=" mt-2 mb-0 p-0">Описание</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Описание"
                    />
                    <Form.Label className=" mt-2 mb-0 p-0">Сервисы</Form.Label>
                    <Form.Control
                        value={service}
                        onChange={e => setService(e.target.value)}
                        className="mt-3"
                        placeholder="Сервисы"
                    />
                    <Form.Label className=" mt-2 mb-0 p-0">Капитал</Form.Label>
                    <Form.Control
                        value={capital}
                        onChange={e => setCapital(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Капитал"
                        type="number"
                    />
                    <Form.Label className=" mt-2 mb-0 p-0">Выберите картинку</Form.Label>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <Form.Label className=" mt-2 mb-0 p-0">Ценовая политиак компании</Form.Label>
                        <Row className="mt-4" >
                            <Col md={3}>
                                <Form.Control
                                    onChange={ (e)=>handleInfoChange( 'pricePolitic1kv', e.target.value)}
                                    placeholder="Введите ценовую политику 1 кв"
                                    type="number"

                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    onChange={ (e)=>handleInfoChange( 'pricePolitic2kv', e.target.value)}
                                    placeholder="Введите ценовую политику 2 кв"
                                    type="number"

                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    onChange={ (e)=>handleInfoChange( 'pricePolitic3kv', e.target.value)}
                                    placeholder="Введите ценовую политику 3 кв"
                                    type="number"


                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    onChange={ (e)=>handleInfoChange( 'pricePolitic4kv', e.target.value)}
                                    placeholder="Введите ценовую политику 4 кв"
                                    type="number"
                                />
                            </Col>
                        </Row>

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
