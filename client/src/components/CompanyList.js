import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CompanyItem from "./CompanyItem";
import {fetchCompany} from "../http/companyAPI";
import EditCompany from "./modals/EditCompany";

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

        fetchCompany(startDate, endDate, company.minCapital,company.maxCapital, user.getCurrentUser.id,user.getCurrentUser.role,
            company.page, company.limit,company.getNameSort, company.getTypeSort).then(data => {
                company.setCompany(data.rows)
                company.setTotalCount(data.count)
            }
        )
        company.setFlagRedrawCompany(0)

    }, [company.page, company.flagRedrawCompany, company.getNameSort, company.getTypeSort])
    return (
        <Row className="d-flex">
            {company.getCompany.map(companyInfo =>
                <CompanyItem key={companyInfo.id} companyInfo={companyInfo} onEdit={handleEdit}/>
            )}
            <EditCompany show={companyVisible} onHide={() => setCompanyVisible(false)} companyId={companyId}/>
        </Row>
    );
});

export default CompanyList;
