import React from 'react';
import Container from "react-bootstrap/Container";

const ComponentSpinner = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <ComponentSpinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </ComponentSpinner>
        </Container>
    );
};

export default ComponentSpinner;