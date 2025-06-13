import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CompanyItem from "./CompanyItem";
import {fetchCompany} from "../http/companyAPI";
import EditCompany from "./modals/EditCompany";
import {forEach} from "react-bootstrap/ElementChildren";

// const CompanyList = observer(({handleEditCompany,nameSort, typeSort}) => {
const CompanyList = observer(() => {
    const {company, user} = useContext(Context)
    const [companyVisible, setCompanyVisible] = useState(false)
    const [companyId, setCompanyId] = useState(false)

    const handleEdit = (id) => {
        setCompanyId(id)
        setCompanyVisible(true)
    }

    useEffect(() => {
            const startDate = company.getStartDate!=null ? new Date(company.getStartDate.setHours(0, 0, 0, 0) ): null
            const endDate = company.getEndDate!=null ? new Date(company.getEndDate.setHours(23, 59, 999, 0) ): null

        fetchCompany(startDate, endDate, company.minCapital,company.maxCapital, user.getUser.id,user.getUser.role,
            company.page, company.limit,company.getNameSort, company.getTypeSort).then(data => {
                company.setCompany(data.rows)
                company.setTotalCount(data.count)
            }
        )
        company.setFlagRedraw(0)

    }, [company.page, company.flagRedraw, company.getNameSort, company.getTypeSort])
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
