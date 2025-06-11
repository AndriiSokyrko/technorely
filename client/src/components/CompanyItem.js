import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {PUBLIC_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {FaEdit, FaTrash} from "react-icons/fa";
import {deleteCompany} from "../http/companyAPI";
import {Context} from "../index";

const CompanyItem = observer(({comp, onEdit}) => {
    const navigate = useNavigate()
    const {company} = useContext(Context)
    const handleDelete = (id) => {
        deleteCompany(id).then(_ => {
            alert(_.text)
            company.setFlagRedraw(2)
        })

    }
    const handleEdit = (id) => {
        onEdit(id)
    }

    return (
        <>
            <Col md={3} className={"mt-3 d-flex align-items-stretch justify-items-between"}
                onClick={() => navigate(PUBLIC_ROUTE + '/' + comp.id)}>
            <Card style={{width: "200px", height: "250px", cursor: 'pointer'}} border={"black"}
                  className="p-2 d-flex justify-content-between">
                <Image width="100%" height="50%" src={process.env.REACT_APP_API_URL + comp.img}/>
                <div className="text-black-100 mt-1 d-flex flex-column   overflow-x-hidden">
                    <div style={{fontSize: 20, fontWeight: "bold"}}>{comp.name}...</div>
                    <div className="d-flex flex-row"><p>Capital: {comp.capital}$</p></div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <FaEdit
                        className="text-primary"
                        style={{cursor: 'pointer', marginRight: '10px'}}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(comp.id);
                        }}
                    />
                    <FaTrash
                        className="text-danger"
                        style={{cursor: 'pointer'}}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(comp.id);
                        }}
                    />
                </div>
            </Card>
        </Col>

        </>

    );
});

export default CompanyItem;
