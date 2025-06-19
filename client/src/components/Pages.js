import React from 'react';
import {observer} from "mobx-react-lite";
import {Pagination} from "react-bootstrap";
import '../styles/page.css';

const Pages = observer(({company}) => {
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
                    onClick={() => {
                        company.setPage(page)
                        company.setFlagRedrawCompany(3)
                    }}
                    className={company.page === page ? 'active-pagination' : ''}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
