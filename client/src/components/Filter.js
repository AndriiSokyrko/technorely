import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Form, Button} from "react-bootstrap";

// const Filter = ({onFilter,minCapital,maxCapital}) => {
const Filter = ({onFilter}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [valueMin, setValueMin] = useState(0);
    const [valueMax, setValueMax] = useState(100);

    const handleFilter = () => {
        onFilter(startDate, endDate);
    };
    const handleClear = () => {
        setStartDate(null);
        setEndDate(null);
        setValueMin(0)
        setValueMax(100)
        onFilter(startDate, endDate, valueMin, valueMax);
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
                <Form.Label className="text-white">Выберите значение от: {valueMin}</Form.Label>
                <Form.Range
                    min={0}
                    max={100}
                    value={valueMin}
                    onChange={handleChangeMin}
                />
                <Form.Label className="text-white">Выберите значение до: {valueMax}</Form.Label>
                <Form.Range
                    min={0}
                    max={100}
                    value={valueMax}
                    onChange={handleChangeMax}
                />
            </div>
            <Button variant={"outline-light"} className="mt-4 mb-4 bg-black p-2 text-white" onClick={handleFilter}>Применить
                фильтр</Button>
            <Button variant={"outline-light"} className="mt-2 mb-4 bg-black p-2 text-white" onClick={handleClear}>
                Очистить форму
            </Button>
        </Form>
    );
};

export default Filter;