import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateAdmin from "../components/modals/CreateAdmin";
import CreateCompany from "../components/modals/CreateCompany";
import CreateType from "../components/modals/CreateType";
import {observer} from "mobx-react";

const Admin = observer(() => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateAdmin show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateCompany show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
    );
});

export default Admin;
