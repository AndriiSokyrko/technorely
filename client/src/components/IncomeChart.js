import React, {useContext} from 'react';
import {Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const IncomeChart = ({info}) => {
    const data = [
        { quarter: 'Qv1', income: info.pricePolitic1kv, expenses: (info.pricePolitic1kv/5) },
        { quarter: 'Qv2', income: info.pricePolitic2kv, expenses: (info.pricePolitic2kv/5) },
        { quarter: 'Qv3', income: info.pricePolitic3kv, expenses: (info.pricePolitic3kv/5) },
        { quarter: 'Qv4', income: info.pricePolitic4kv, expenses: (info.pricePolitic4kv/5) },
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