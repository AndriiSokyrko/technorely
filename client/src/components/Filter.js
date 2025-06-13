import React, {useContext, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Form, Button} from "react-bootstrap";
import {Context} from "../index";
import {fetchCompany} from "../http/companyAPI";
import {observer} from "mobx-react";

const Filter = observer(() => {
    const {user,company} = useContext(Context)

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [valueMin, setValueMin] = useState(company.minCapital);
    const [valueMax, setValueMax] = useState(company.maxCapital);

    const handleFilter = () => {
        company.setMinCapital(valueMin)
        company.setMaxCapital(valueMax)
        company.setFlagRedraw(3)
        company.setPage(1)
        company.setStartDate(startDate)
        company.setEndDate(endDate)
        company.setFlagRedraw(2)

    };
    const handleClear = () => {
        setStartDate(null);
        setEndDate(null);
        company.setMinCapital(0)
        company.setMaxCapital(1000000)
        setValueMin(company.minCapital)
        setValueMax(company.maxCapital)
        company.setStartDate(null)
        company.setEndDate(null)
        company.setFlagRedraw(0)

    };
    const handleChangeMin = (event) => {
        const newValueMin = event.target.value;
        setValueMin(newValueMin);
    };
    const handleChangeMax = (event) => {
        const newValueMax = event.target.value;
        setValueMax(newValueMax);
    };
    return (
        <Form bg="dark" className="d-flex flex-column bg-black p-2 rounded-2  align-items-center">
            <div className="d-flex flex-column">
                <label className="text-white">Начальная дата:</label>
                <DatePicker
                    className="rounded-2  bg-black p-2 text-white border-2 border-white mt-2 mb-2 "
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Выберите дату"
                />
            </div>
            <div className="d-flex flex-column" style={{cursor: 'pointer'}}>
                <label className="text-white">Конечная дата:</label>
                <DatePicker
                    className="rounded-2  bg-black p-2 text-white border-2 border-white mt-2 "
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Выберите дату"
                />
            </div>
            <div className="d-flex flex-column mt-2 justify-items-start" style={{cursor: 'pointer'}}>
                <Form.Label className="text-white d-flex align-items-center"><div>Выберите
                    значение от:</div>
                    <Form.Control style={{width: "30%", height: "20px", marginLeft: "10px"}}
                                  value={valueMin}
                                  onChange={e => setValueMin(e.target.value)}
                                  placeholder="Введите Min"
                                  type="text"
                    />
                </Form.Label>
                <Form.Range
                    min={0}
                    max={1000000}
                    value={valueMin}
                    onChange={handleChangeMin}
                />
                <Form.Label className="text-white d-flex align-items-center"><div>Выберите
                    значение до:</div>
                    <Form.Control style={{width: "30%", height: "20px", marginLeft: "10px"}}
                                  value={valueMax}
                                  onChange={e => setValueMax(e.target.value)}
                                  placeholder="Введите Max"
                                  type="text"
                    />
                </Form.Label>
                <Form.Range
                    min={0}
                    max={1000000}
                    value={valueMax}
                    onChange={handleChangeMax}
                />
            </div>
           <div className="d-flex flex-row  align-items-stretch bg-black mt-3 mb-2">
            <Button variant="outline-light" className=" me-3 p-2 " onClick={handleFilter}>Применить
                фильтр</Button>
            <Button variant="outline-light" className="p-2 " onClick={handleClear}>
                Очистить</Button>
           </div>
        </Form>
    );
});

export default Filter;