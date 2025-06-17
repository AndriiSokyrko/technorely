import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css";
import {API_DOCS_ROUTE} from "../utils/consts";

const SwaggerComponent = () => {

    return (
        <div>
            <SwaggerUI  url={API_DOCS_ROUTE}/>
        </div>
    );
};

export default SwaggerComponent;