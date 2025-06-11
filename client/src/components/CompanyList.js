import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CompanyItem from "./CompanyItem";
import {fetchCompany} from "../http/companyAPI";
import EditCompany from "./modals/EditCompany";
import {forEach} from "react-bootstrap/ElementChildren";

const CompanyList = observer(({handleEditCompany}) => {
    const {company, user} = useContext(Context)
    const [companyVisible, setCompanyVisible] = useState(false)
    const [companyId, setCompanyId] = useState(false)

    const handleEdit = (id) => {
        setCompanyId(id)
        setCompanyVisible(true)
    }

    useEffect(() => {
        company.setFlagRedraw(0)
        fetchCompany(null, null, null,null, user.id, company.page, company.limit).then(data => {
                company.setCompany(data.rows)
                company.setTotalCount(data.count)
                // let min = data.rows[0]
                // let max = data.rows[0]
            console.log(data.rows)
                // data.rows.each(item => {
                //     if (min > item.capital) min = data.capital
                //     if (max < item.capital) min = data.capital
                // })
                // company.setMinCapital(min)
                // company.setMaxCapital(max)
            }
        )

    }, [company.page, company.flagRedraw])
    return (
        <Row className="d-flex">
            {company.getCompany.map(comp =>
                <CompanyItem key={comp.id} comp={comp} onEdit={handleEdit}/>
            )}
            <EditCompany show={companyVisible} onHide={() => setCompanyVisible(false)} companyId={companyId}/>
        </Row>
    );
});

export default CompanyList;
