import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {PUBLIC_ROUTE} from "../utils/consts";

const CompanyItem = ({companies}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(PUBLIC_ROUTE + '/' + companies.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + companies.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Samsung...</div>

                </div>
                <div>{companies.name}</div>
            </Card>
        </Col>
    );
};

export default CompanyItem;
