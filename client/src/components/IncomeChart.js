import React, {useContext} from 'react';
import {Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Context} from "../index";

const IncomeChart = ({info}) => {
    const data = [
        { quarter: 'Q1', income: info.pricePolitic1kv, expenses: 2400 },
        { quarter: 'Q2', income: info.pricePolitic2kv, expenses: 1398 },
        { quarter: 'Q3', income: info.pricePolitic3kv, expenses: 9800 },
        { quarter: 'Q4', income: info.pricePolitic4kv, expenses: 3908 },
    ];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="expenses" stroke="#ff7300" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default IncomeChart;