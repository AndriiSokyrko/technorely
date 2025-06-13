import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import '../styles/page.css';

const Pages = observer(({company}) => {
    // const {company} = useContext(Context)
    const pageCount = Math.ceil(company.totalCount / company.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3 text-black">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={company.page === page}
                    onClick={() => company.setPage(page)}
                    className={company.page === page ? 'active-pagination' : ''}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
