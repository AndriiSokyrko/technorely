import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {editCompany, fetchCompanyById} from "../../http/companyAPI";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditCompany = observer(({show, onHide, companyId}) => {
    const {company, user} = useContext(Context)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [service, setService] = useState("")
    const [capital, setCapital] = useState(0)
    const [img, setImg] = useState("")
    const [info, setInfo] = useState({})
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
        formData.append('userId', user.getCurrentUser.id)
        formData.append('id', companyId)
        formData.append('info', JSON.stringify(info))
        editCompany(formData).then(_ => {
            onHide()
            company.setFlagRedrawCompany(1)
            alert('Company is updated')
        }).catch((e) => {
            alert(e.message)
        })
    }
    const handleInfoChange = (key, value) => {
        info[key]=value
        setInfo({...info})
    }
    useEffect(() => {
        if (companyId) {
            company.setCompanyId(companyId)
            const data = company.getCompanyById;
                setName(data.name)
                setDescription(data.description)
                setService(data.service)
                setCapital(data.capital)
                setImg((data.img))
                Object.keys(data.company_info).forEach(key=>{
                    info[key]=data.company_info[key]
                    setInfo(info)
                })
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
                    <Form.Label className=" mt-2 mb-0 p-0">Название</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите name"

                    />
                    <Form.Label className=" mt-2 mb-0 p-0">Описание</Form.Label>
                    <textarea value={description} className="form-control" id="exampleTextarea" rows="3"
                              placeholder="Введите текст здесь"
                              onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    <Form.Label className=" mt-2 mb-0 p-0">Сервис</Form.Label>
                    <textarea value={service} className="form-control" id="exampleTextarea" rows="3"
                              placeholder="Введите текст здесь сервиса"
                              onChange={e => setService(e.target.value)}
                    ></textarea>
                    <Form.Label className=" mt-2 mb-0 p-0">Капитал</Form.Label>
                    <Form.Control
                        value={capital}
                        onChange={e => setCapital(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите capital"
                        type="number"
                    />
                    <Form.Label className=" mt-2 mb-0 p-0">Выберите картинку</Form.Label>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}

                    />
                    <Form.Label className=" mt-2 mb-0 p-0">Ценовая политика</Form.Label>
                    <Row className="mt-4" >
                        <Col md={3}>
                            <Form.Control
                                value={info['pricePolitic1kv']}
                                onChange={ e=>handleInfoChange( 'pricePolitic1kv', e.target.value)}
                                placeholder="Введите ценовую политику 1 кв"
                                type="number"
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                value={info['pricePolitic2kv']}
                                onChange={ e=>handleInfoChange( 'pricePolitic2kv', e.target.value)}
                                placeholder="Введите ценовую политику 2 кв"
                                type="number"
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                value={info['pricePolitic3kv']}
                                onChange={ e=>handleInfoChange( 'pricePolitic3kv', e.target.value)}
                                placeholder="Введите ценовую политику 3 кв"
                                type="number"
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                value={info['pricePolitic4kv']}
                                onChange={ e=>handleInfoChange( 'pricePolitic4kv', e.target.value)}
                                placeholder="Введите ценовую политику 4 кв"
                                type="number"
                            />
                        </Col>
                    </Row>
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
