import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {USER_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {FaEdit, FaTrash} from "react-icons/fa";
import {deleteCompany} from "../http/companyAPI";
import {Context} from "../index";
import IncomeChart from "./IncomeChart";

const CompanyItem = observer(({comp, onEdit}) => {
    const navigate = useNavigate()
    const {company} = useContext(Context)
    const handleDelete = (id) => {
        deleteCompany(id).then(_ => {
            alert(_.text)
            company.setFlagRedrawCompany(2)
        })

    }
    const handleEdit = (id) => {
        onEdit(id)
    }

    return (
        <>
            <Col md={3} className={"w-50 mt-3 d-flex align-items-stretch justify-items-between border-black"}>
            <Card style={{width: "300px", height: "350px", cursor: 'pointer'}} border={"black"}
                  className="p-2 d-flex justify-content-between">
                <Image width="100%" height="50%" src={process.env.REACT_APP_API_URL + comp.img}/>
                <div className="text-black-100 mt-1 d-flex flex-column   overflow-x-hidden">
                    <div style={{fontSize: 20, fontWeight: "bold"}}>{comp.name}...</div>
                    <div className="d-flex flex-row"><p>Capital: {comp.capital}$</p></div>
                    <div className="d-flex flex-row"><p>Service: {comp.service}$</p></div>
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
                <IncomeChart info={comp.company_info}/>
        </Col>

        </>

    );
});

export default CompanyItem;
