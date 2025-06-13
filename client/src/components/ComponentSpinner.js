import React from 'react';
import Container from "react-bootstrap/Container";
import {Spinner} from "react-bootstrap";

const ComponentSpinner = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <ComponentSpinner animation="border" role="status">
                  <Spinner animation="grow" />;
            </ComponentSpinner>
        </Container>
    );
};

export default ComponentSpinner;