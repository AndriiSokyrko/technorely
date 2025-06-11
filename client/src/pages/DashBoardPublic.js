import React, {useContext,  useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CompanyList from "../components/CompanyList";
import Pages from "../components/Pages";
import Filter from "../components/Filter";
import {fetchCompany} from "../http/companyAPI";
import {Context} from "../index";
import CreateCompany from "../components/modals/CreateCompany";

const DashBoardPublic = () => {
    const {company} = useContext(Context)
    const {user} = useContext(Context)
    const [companyVisible, setCompanyVisible] = useState(false)
    const [minCapital, setMinCapital] = useState(0)
    const [maxCapital, setMaxCapital] = useState(0)


    // console.log(company.minCapital,company.maxCapital)
    const handleFilter = (startDate, endDate, valueMin, valueMax) => {
        let start = new Date(startDate);
        let end = new Date(endDate);

        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        if(startDate==null || endDate==null){
            start = null
            end=null
        }
        if(valueMin==null  && valueMax==null){
            valueMin=minCapital
            valueMax=maxCapital
        }
        fetchCompany(start, end, null, user.id ,company.page ,4).then(data => {
                company.setCompany(data.rows)
                company.setTotalCount(data.count)
            }
        )
    }

    return (
        <Container >
            <h2>Public DashBoard</h2>
            <Row className="mt-2">
                <Col md={4} >
                    {/*<Filter onFilter={handleFilter} minCapital={minCapital} maxCapital={maxCapital} />*/}
                    {/*<Filter onFilter={handleFilter} />*/}
                </Col>
                <Col md={8}>
                    {/* <Button variant={"outline-light"} className="bg-black text-white border-white" onClick={() => setCompanyVisible(true)}>Добавить компанию</Button>*/}
                    {/*<CreateCompany show={companyVisible} onHide={() => setCompanyVisible(false)}/>*/}
                    {/*<CompanyList />*/}
                    {/*<Pages/>*/}
                </Col>
            </Row>
        </Container>
    );
};

export default DashBoardPublic;